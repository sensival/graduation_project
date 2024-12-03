# views.py
from rest_framework import viewsets, generics, status
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ward, Patient, Photo
from .serializers import WardSerializer, PatientSerializer, PhotoSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate,logout
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from .models import Patient, Ward
from django.shortcuts import render, redirect
from .models import Ward, Patient
from .forms import SignUpForm
from django.http import HttpResponseRedirect
from django.contrib import messages
from rest_framework.exceptions import NotFound

########### 로그인 ################
class CustomLoginView(LoginView):
    template_name = 'login.html'  # 로그인 페이지 템플릿
    
    def form_valid(self, form):
        remember_me = self.request.POST.get('remember_me')

        # remember_me 옵션에 따른 세션 유지 시간 설정
        if not remember_me:
            self.request.session.set_expiry(0)  # 브라우저 종료 시 세션 만료
        else:
           self.request.session.set_expiry(1209600)  # 2주 동안 세션 유지(------)
        

        usr_name = self.request.POST.get('username')

        print("username",  usr_name)

        # 리디렉션 시 username을 쿼리 파라미터로 전달
        print(f"Redirecting to: http://192.168.0.5:3000/select-ward?username={usr_name}")
        return HttpResponseRedirect(f'https://graduation-project-nu-ashy.vercel.app/select-ward?username={usr_name}')
    
    def form_invalid(self, form):
        # 로그인 실패 시 메시지 추가
        messages.error(self.request, "아이디 또는 비밀번호가 일치하지 않습니다.")
        return super().form_invalid(form)


    def get_success_url(self):
        # 로그인 성공 후 React 앱의 /select-ward 페이지로 리디렉트
        return 'https://graduation-project-nu-ashy.vercel.app/select-ward'

########### 가입 ################
def signup_view(request):

    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('https://graduation-project-22a6.onrender.com/gallery/login/')
            # login(request, user)  # 회원가입 후 자동 로그인
            # return redirect('http://192.168.0.5:3000/select_ward')  # 병동 선택 페이지로 이동
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

######## 로그아웃 API ################
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

##################################################################################

# 병동 목록 API
class WardListAPI(generics.ListAPIView):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
    permission_classes = [AllowAny] 



# 병동 추가 API
class WardCreateAPI(generics.CreateAPIView):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
    permission_classes = [AllowAny]  # 로그인한 사용자만 접근 가능

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 환자 목록 API
class PatientListAPI(generics.ListAPIView):
    serializer_class = PatientSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        ward_id = self.kwargs['ward_id']  # URL에서 ward_id를 가져옴
        return Patient.objects.filter(ward__id=ward_id)  # ward_id를 기준으로 환자 목록 필터링
    

# 환자 추가 API
class PatientCreateAPI(generics.CreateAPIView):
    serializer_class = PatientSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        ward_id = self.kwargs['ward_id']  # URL에서 ward_id 가져오기
        try:
            ward = Ward.objects.get(id=ward_id)  # Ward 객체가 존재하는지 확인
        except Ward.DoesNotExist:
            return Response({"error": "Ward not found."}, status=status.HTTP_404_NOT_FOUND)

        # ward를 추가한 데이터로 직렬화기 검증 및 저장
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(ward=ward)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 특정 환자의 사진 목록 API
class PatientPhotosAPI(generics.ListCreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny] 

    def get_queryset(self):
        patient_id = self.kwargs['patient_id']
        # Patient가 존재하는지 확인
        try:
            queryset = Photo.objects.filter(patient_id=patient_id)
            print(f"Retrieved QuerySet: {queryset}")  # 디버깅 로그
            return queryset
        except Exception as e:
            print(f"Error in get_queryset: {e}")
            return Photo.objects.none()  # 빈 QuerySet 반환
    
    def list(self, request, *args, **kwargs):
        patient_id = self.kwargs['patient_id']
        queryset = self.get_queryset()
        print(f"Queryset: {queryset}")  # Debugging 용 로그

        if not queryset.exists():
            print(f"No photos found for patient {patient_id}")
            return Response([], status=status.HTTP_200_OK)  # 빈 배열 반환
        return super().list(request, *args, **kwargs)

    def perform_create(self, serializer):
        patient_id = self.kwargs['patient_id']
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            raise NotFound(f"ID {patient_id}에 해당하는 환자를 찾을 수 없습니다.")
        serializer.save(patient=patient)

    
# 사진 업로드 API
class PhotoCreateAPI(generics.CreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        patient_id = self.kwargs['patient_id']
        username = self.request.data.get('uploaded_by')  # 요청에서 username 가져오기

        serializer.save(
            uploaded_by=username,  # username 저장
            patient_id=patient_id  # patient_id 저장
        )



# 개별 사진에 대해 조회(Retrieve), 수정(Update), 삭제(Delete) 기능 제공.
class PhotoDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer 

    def get(self, request, *args, **kwargs):
        # 사진을 조회하는 기능
        return super().get(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        # 사진을 전체적으로 수정하는 기능
        return super().put(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        # 사진의 일부 필드만 수정하는 기능 (partial update)
        return super().patch(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        # 사진을 삭제하는 기능
        return super().delete(request, *args, **kwargs)