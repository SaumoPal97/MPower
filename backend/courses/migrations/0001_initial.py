# Generated by Django 5.1.2 on 2024-10-16 21:41

import courses.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Course",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "courseid",
                    models.CharField(
                        default=courses.models.gen_uuid4_courseid,
                        max_length=64,
                        unique=True,
                    ),
                ),
                ("title", models.CharField(max_length=255)),
                ("image_url", models.URLField(blank=True, max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name="Chapter",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "chapid",
                    models.CharField(
                        default=courses.models.gen_uuid4_chapid,
                        max_length=64,
                        unique=True,
                    ),
                ),
                ("chapter_number", models.IntegerField()),
                ("title", models.CharField(max_length=255)),
                ("content", models.TextField()),
                (
                    "resource_url",
                    models.URLField(blank=True, max_length=255, null=True),
                ),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="courses.course",
                    ),
                ),
            ],
        ),
    ]