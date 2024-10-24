from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "education_level", "income_level", "skills", "phonenumber"]

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"