# views.py
from django.contrib.auth.views import LoginView
from django.contrib.auth.decorators import login_required
from .models import Patient, Ward
from .forms import PhotoUploadForm
from django.shortcuts import render, redirect
from .models import Ward, Patient
from .forms import PhotoUploadForm, SignUpForm
from django.contrib.auth.decorators import login_required
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
            return redirect('select_ward')  # 병동 선택 페이지로 이동
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

############ 병동 선택 페이지 뷰 ##############33
@login_required
def select_ward(request):
    if request.method == 'POST':
        ward_id = request.POST.get('ward')
        request.session['ward_id'] = ward_id  # 병동을 세션에 저장
        return redirect('gallery:patient_list')  # 병동 선택 후 업로드 페이지로 이동
    wards = Ward.objects.all()
    return render(request, 'select_ward.html', {'wards': wards})

################# 목록 뷰 ########################
@login_required
def patient_list_view(request):
    patients = Patient.objects.all()
    return render(request, 'patient_list.html', {'patients': patients})


################ 환자 등록 뷰 ######################
# views.py
from django.shortcuts import render, redirect
from .models import Ward, Patient
from .forms import PatientForm

@login_required
def register_patient_view(request):
    if request.method == 'POST':
        form = PatientForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('gallery:patient_list')  # Redirect to patient list after registration
    else:
        form = PatientForm()

    return render(request, 'register_patient.html', {'form': form})


################# 사진 등록 뷰 #################
from .models import Patient, Photo
from .forms import PhotoUploadForm

@login_required
def upload_photo_view(request, patient_id):
    patient = Patient.objects.get(id=patient_id)

    if request.method == 'POST':
        form = PhotoUploadForm(request.POST, request.FILES)
        if form.is_valid():
            photo = form.save(commit=False)
            photo.patient = patient
            photo.save()
            return redirect('gallery:patient_photos', patient_id=patient.id)  # Redirect to patient’s photo list after upload
    else:
        form = PhotoUploadForm()

    return render(request, 'upload_photo.html', {'form': form, 'patient': patient})


################ 환자 사진 목록 뷰 ##############
@login_required
def patient_photos_view(request, patient_id):
    patient = Patient.objects.get(id=patient_id)
    photos = Photo.objects.filter(patient=patient)

    return render(request, 'patient_photos.html', {'patient': patient, 'photos': photos})
