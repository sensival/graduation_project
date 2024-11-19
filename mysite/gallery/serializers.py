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
    ward = serializers.PrimaryKeyRelatedField(queryset=Ward.objects.all())
    
    class Meta:
        model = Patient
        fields = ['id', 'name', 'ward']

class PhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Photo
        fields = ['id','photo', 'upload_time', 'memo', 'uploaded_by']

    def update(self, instance, validated_data):
        # 파일 업로드가 없는 경우 기존 사진을 유지
        photo = validated_data.get('photo', None)
        if photo:
            # 새로운 파일이 있다면, 이를 기존 사진으로 교체
            instance.photo = photo

        # 메모와 같은 다른 필드는 변경이 있을 때 업데이트
        instance.memo = validated_data.get('memo', instance.memo)
        instance.uploaded_by = validated_data.get('uploaded_by', instance.uploaded_by)

        # 저장
        instance.save()
        return instance
    


'''
class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['photo', 'upload_time', 'memo']
'''