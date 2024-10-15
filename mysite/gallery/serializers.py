# serializers.py
from rest_framework import serializers
from .models import Ward, Patient, Photo
from django.contrib.auth.models import User



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # 비밀번호는 입력만 가능
    password_confirm = serializers.CharField(write_only=True)  # 비밀번호 확인 필드

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password_confirm']

    def create(self, validated_data):
        password = validated_data.pop('password')
        password_confirm = validated_data.pop('password_confirm')

        # 비밀번호 확인
        if password != password_confirm:
            raise serializers.ValidationError("비밀번호가 일치하지 않습니다.")

        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(password)  # 비밀번호 암호화
        user.save()
        return user




class WardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ward
        fields = ['id', 'name']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'ward']

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['photo', 'upload_time', 'memo']
