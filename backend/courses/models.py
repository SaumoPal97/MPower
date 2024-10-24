from django.db import models
import uuid

# Create your models here.
def gen_uuid4_courseid():
    return f"courseid_{uuid.uuid4().hex}"

class Course(models.Model):
    courseid = models.CharField(
        max_length=64, unique=True, default=gen_uuid4_courseid
    )
    title = models.CharField(max_length=255, null=False, blank=False)
    image_url = models.URLField(max_length=255, null=True, blank=True)

def gen_uuid4_chapid():
    return f"chapid_{uuid.uuid4().hex}"

class Chapter(models.Model):
    chapid = models.CharField(
        max_length=64, unique=True, default=gen_uuid4_chapid
    )
    chapter_number = models.IntegerField(null=False, blank=False)
    title = models.CharField(max_length=255, null=False, blank=False)
    content = models.TextField(null=False, blank=False)
    resource_url = models.URLField(max_length=255, null=True, blank=True)
    course = models.ForeignKey(
        Course,
        on_delete=models.DO_NOTHING,
    )