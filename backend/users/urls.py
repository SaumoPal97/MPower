from django.urls import re_path
from .views import UserList

urlpatterns = [
    re_path(r"", UserList.as_view()),
]
