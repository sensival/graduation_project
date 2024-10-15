# views.py
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Ward, Patient, Photo
from .serializers import WardSerializer, PatientSerializer, PhotoSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from rest_framework.permissions import AllowAny

from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from .models import Patient, Ward
from django.shortcuts import render, redirect
from .models import Ward, Patient
from .forms import SignUpForm
from django.contrib.auth import login

########### 로그인 ################
class CustomLoginView(LoginView):
    template_name = 'login.html'  # 로그인 페이지 템플릿 경로

########### 가입 ################
def signup_view(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # 회원가입 후 자동 로그인
            return redirect('http://localhost:3000/select_ward')  # 병동 선택 페이지로 이동
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})


# 로그인 API
class CustomLoginAPI(APIView):
    permission_classes = [AllowAny] 
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

# 회원가입 API
class SignUpAPI(generics.CreateAPIView):
    permission_classes = [AllowAny] 
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        login(request, user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# 병동 목록 API
class WardListAPI(generics.ListAPIView):
    queryset = Ward.objects.all()
    serializer_class = WardSerializer
    permission_classes = [AllowAny] 
    
# 환자 목록 API
class PatientListAPI(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [AllowAny] 

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
