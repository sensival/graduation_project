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
        return HttpResponseRedirect(f'http://192.168.0.5:3000/select-ward?username={usr_name}')
    
    def form_invalid(self, form):
        # 로그인 실패 시 메시지 추가
        messages.error(self.request, "아이디 또는 비밀번호가 일치하지 않습니다.")
        return super().form_invalid(form)


    def get_success_url(self):
        # 로그인 성공 후 React 앱의 /select-ward 페이지로 리디렉트
        return 'http://192.168.0.5:3000/select-ward'

########### 가입 ################
def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # 회원가입 후 자동 로그인
            return redirect('http://192.168.0.5:3000/select_ward')  # 병동 선택 페이지로 이동
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

# 로그아웃 API
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

# 로그인 API
# class CustomLoginAPI(APIView):
#     permission_classes = [AllowAny] 
#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")
#         user = authenticate(request, username=username, password=password)
#         if user:
#             login(request, user)
#             serializer = UserSerializer(user)
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# # 회원가입 API
# class SignUpAPI(generics.CreateAPIView):
#     permission_classes = [AllowAny] 
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         login(request, user)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        return Photo.objects.filter(patient_id=patient_id)

    def perform_create(self, serializer):
        patient_id = self.kwargs['patient_id']
        patient = Patient.objects.get(id=patient_id)
        serializer.save(patient=patient)

# 사진 업로드 API
class PhotoCreateAPI(generics.CreateAPIView):
    serializer_class = PhotoSerializer
    permission_classes =  [AllowAny] 

    def perform_create(self, serializer):
        # URL에서 patient_id를 가져옵니다.
        patient_id = self.kwargs['patient_id']
        serializer.save(
            uploaded_by=self.request.user,
            patient_id=patient_id  # Photo 모델에 patient 필드가 있어야 함
        )


# 개별 사진에 대해 조회(Retrieve), 수정(Update), 삭제(Delete) 기능 제공.
class PhotoDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer