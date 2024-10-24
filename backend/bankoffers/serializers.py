from rest_framework import serializers
from .models import BankOffer

class BankOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankOffer
        fields = ["bank_name", "bank_image", "offer_details", "offer_url", "offer_details_url"]

class BankOfferListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankOffer
        fields = "__all__"