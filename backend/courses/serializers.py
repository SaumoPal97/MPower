from rest_framework import serializers
from .models import Course, Chapter

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["title"]


class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"

class ChapterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = "__all__"