# forms.py
from django import forms
from .models import Patient
from .models import Photo
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class SignUpForm(UserCreationForm):
    password1 = forms.CharField(
        label=_("비밀번호"),  # 새로운 라벨
        widget=forms.PasswordInput,
        help_text=_(
            "최소 4자리 이상이어야 합니다."
        ),
    )
    
    # 비밀번호2 필드 오버라이드
    password2 = forms.CharField(
        label=_("비밀번호 확인"),  # 새로운 라벨
        widget=forms.PasswordInput,
        help_text=_(""),
    )

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2')
        labels = {
            'username': '사용자 이름',
            'password1': '비밀번호',
            'password2': '비밀번호 확인',
        }
        help_texts = {
            'username': '',  # 사용자 이름의 기본 안내문구를 없앰
            'password1': '',  # 비밀번호의 기본 안내문구를 없앰
            'password2': '',  # 비밀번호 확인의 기본 안내문구를 없앰
        }

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')

        # 비밀번호 길이 검증
        if password1 and len(password1) < 4:
            raise forms.ValidationError(_("비밀번호는 최소 4자 이상이어야 합니다."))

        return password1

    def clean(self):
        super().clean()
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")

        # 비밀번호 확인 일치 여부 검증
        if password1 and password2 and password1 != password2:
            self.add_error('password2', _("비밀번호가 일치하지 않습니다."))

        return self.cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        # 필요한 추가적인 사용자 설정을 여기에 할 수 있습니다.
        if commit:
            user.save()
        return user
'''
class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2']

'''
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