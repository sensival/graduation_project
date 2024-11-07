from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
class Ward(models.Model):
    name = models.CharField(max_length=100)

class Patient(models.Model):
    name = models.CharField(max_length=100)
    ward = models.ForeignKey(Ward, on_delete=models.CASCADE)



class Photo(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='patient_photos/')
    upload_time = models.DateTimeField(default=timezone.now)  # Default to current time
    memo = models.TextField(blank=True, null=True)  # Optional memo
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_photos')  # 게시자

    def __str__(self):
        return f"Photo of {self.patient.name} - {self.upload_time}"

'''
class Photo(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to='patient_photos/')
    upload_time = models.DateTimeField(default=timezone.now)  # Default to current time
    memo = models.TextField(blank=True, null=True)  # Optional memo

    def __str__(self):
        return f"Photo of {self.patient.name} - {self.upload_time}"
'''