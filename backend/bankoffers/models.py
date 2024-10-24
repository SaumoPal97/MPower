from django.db import models
import uuid

# Create your models here.
def gen_uuid4_boid():
    return f"boid_{uuid.uuid4().hex}"

class BankOffer(models.Model):
    boid = models.CharField(
        max_length=64, unique=True, default=gen_uuid4_boid
    )
    bank_name = models.CharField(max_length=255, null=False, blank=False)
    bank_image = models.URLField(max_length=255, null=False, blank=False)
    offer_details = models.TextField(null=False, blank=False)
    offer_url = models.URLField(max_length=255, null=False, blank=False)
    offer_details_url = models.URLField(max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
