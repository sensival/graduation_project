
from django.urls import path
from django.contrib.auth.views import LoginView
from .views import CustomLoginView, signup_view, LogoutView, WardListAPI, PatientListAPI, PatientPhotosAPI, WardCreateAPI, PatientCreateAPI, PhotoCreateAPI, PhotoDetailAPI
from rest_framework_simplejwt import views as jwt_views

app_name = 'gallery'


urlpatterns = [
    path('signup/', signup_view, name='signup'),  # 회원가입 페이지
    path('login/', CustomLoginView.as_view(), name='login'),  # 로그인 페이지
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/wards/', WardListAPI.as_view(), name='api_ward_list'),
    path('api/wards/create/', WardCreateAPI.as_view(), name='ward-create'),  # 병동 추가
    path('api/wards/<int:ward_id>/patients/', PatientListAPI.as_view(), name='api_patient_list'),  # 병동별 환자 목록
    path('api/wards/<int:ward_id>/patients/add', PatientCreateAPI.as_view(), name='add_patient'),
    path('api/patients/<int:patient_id>/photos/', PatientPhotosAPI.as_view(), name='api_patient_photos'),
    path('api/patients/<int:patient_id>/photos/add/', PhotoCreateAPI.as_view(), name='add_photo'),  # 사진 업로드 API
    path('api/patients/<int:patient_id>/photos/<int:pk>/update/', PhotoDetailAPI.as_view(), name='photo_detail'),  # 개별 사진 조회, 수정, 삭제
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