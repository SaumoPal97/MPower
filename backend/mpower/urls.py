from django.urls import include, re_path

urlpatterns = [
    re_path(r"^v1/api/users/", include("users.urls")),
    re_path(r"^v1/api/speech/", include("speech.urls")),
    re_path(r"^v1/api/bank_offers/", include("bankoffers.urls")),
    re_path(r"^v1/api/courses/", include("courses.urls")),
]
