# forms.py
from django import forms
from .models import Patient
from .models import Photo
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']


class PatientForm(forms.ModelForm):
    class Meta:
        model = Patient
        fields = ['name', 'ward']



class PhotoUploadForm(forms.ModelForm):
    class Meta:
        model = Photo
        fields = ['photo', 'upload_time', 'memo']
        widgets = {
            'upload_time': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }