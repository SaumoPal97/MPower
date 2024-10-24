from django.urls import re_path
from .views import CourseList, ChapterList, CourseChat

urlpatterns = [
    re_path(r"^(?P<courseid>[0-9a-zA-Z-_]+)/$", ChapterList.as_view()),
    re_path(r"^chat/(?P<courseid>[0-9a-zA-Z-_]+)/$", CourseChat.as_view()),
    re_path(r"", CourseList.as_view()),
]
