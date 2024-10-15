
from django.urls import path
from django.contrib.auth.views import LoginView
from .views import CustomLoginView, signup_view, WardListAPI, PatientListAPI, PatientPhotosAPI

app_name = 'gallery'


urlpatterns = [
    path('signup/', signup_view, name='signup'),  # 회원가입 페이지
    path('login/', CustomLoginView.as_view(), name='login'),  # 로그인 페이지
    path('api/wards/', WardListAPI.as_view(), name='api_ward_list'),
    path('api/patients/', PatientListAPI.as_view(), name='api_patient_list'),
    path('api/patients/<int:patient_id>/photos/', PatientPhotosAPI.as_view(), name='api_patient_photos'),
]


'''
    path('api/login/', CustomLoginAPI.as_view(), name='api_login'),
    path('api/signup/', SignUpAPI.as_view(), name='api_signup'),
    path('signup/', signup_view, name='signup'),  # 회원가입 페이지
    path('login/', CustomLoginView.as_view(), name='login'),  # 로그인 페이지
    path('select_ward/', select_ward, name='select_ward'),  # 병동 선택 페이지
    path('patients/', patient_list_view, name='patient_list'),  # 환자 목록 URL 추가
    path('patients/register/', register_patient_view, name='register_patient'),
    path('patients/<int:patient_id>/upload/', upload_photo_view, name='upload_photo'),
    path('patients/<int:patient_id>/photos/', patient_photos_view, name='patient_photos'),
'''