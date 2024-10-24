import uuid
from django.db import models

# Create your models here.
def gen_uuid4_userid():
    return f"userid_{uuid.uuid4().hex}"

class User(models.Model):
    userid = models.CharField(
        max_length=64, unique=True, default=gen_uuid4_userid
    )
    name = models.CharField(max_length=255, blank=False, null=False)
    phonenumber = models.CharField(max_length=12, unique=True, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
