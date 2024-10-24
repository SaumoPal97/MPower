from django.urls import re_path
from .views import SpeechToText, TextToSpeech

urlpatterns = [
    re_path(r"^stt/$", SpeechToText.as_view()),
    re_path(r"^tts/$", TextToSpeech.as_view()),
]
