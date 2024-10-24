from django.urls import re_path
from .views import BankOfferList, BankOfferChat

urlpatterns = [
    re_path(r"^chat/$", BankOfferChat.as_view()),
    re_path(r"", BankOfferList.as_view()),
]
