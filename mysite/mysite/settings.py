"""
Django settings for mysite project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path
import os
from decouple import config

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
print(STATICFILES_DIRS)
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles') 

 # 클라이언트가 접근하는 URL 경로
MEDIA_URL = '/media/' 
MEDIA_ROOT = os.path.join(BASE_DIR, 'patient_photos')
print("MEDIA ROOT:",MEDIA_ROOT)


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-3i9(=h5o$!)w#)hy2p+(c$_=$iw1l+x7w_(30w-roz8ekvw53l'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'gallery',
    'rest_framework',
    'corsheaders',

]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.ModelBackend',
# ]
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',   
]

ROOT_URLCONF = 'mysite.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'mysite.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    # {
    #     'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    # },
    # {
    #     'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    # },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/



# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


LOGIN_REDIRECT_URL = '192.168.0.5:3000/select_ward/'   # 로그인 후 병동 선택 페이지로 이동

# CORS 설정
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React 앱이 호스팅되는 주소
    "http://192.168.0.5:3000",  # 모바일 네트워크에서 접근하는 IP 주소
    "https://graduation-project-22a6.onrender.com"
    "https://graduation-project-nu-ashy.vercel.app"
]

CORS_ALLOW_CREDENTIALS = True 

ALLOWED_HOSTS = [
    '192.168.0.5',  # 호스팅하는 컴퓨터의 IP 주소
    'localhost',     # 로컬호스트
    '127.0.0.1',     # 로컬호스트 IP
    '*',              # 모든 호스트를 허용 (보안에 주의!)
]

# Render에서 제공하는 포트 번호 사용
PORT = os.getenv("PORT", 8000)



# 세션 만료 시간 설정 (예: 2주)
SESSION_COOKIE_AGE = 1209600  # 2주 동안 세션 유지
# SESSION_EXPIRE_AT_BROWSER_CLOSE = False  # 브라우저 종료 시 세션을 유지할지 여부

# settings.py
LOGOUT_REDIRECT_URL = 'http://192.168.0.5:3000/login'


SECRET_KEY = config('SECRET_KEY', default='fallback-secret-key')