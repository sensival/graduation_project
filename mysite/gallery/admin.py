from django.contrib import admin
from .models import Ward, Patient, Photo

admin.site.register(Ward)
admin.site.register(Patient)
admin.site.register(Photo)