import datetime

from django.db import models


# Create your models here.
class Project(models.Model):
    MAX_PROJECT_NAME_LENGTH = 40

    name: str = models.CharField(max_length=MAX_PROJECT_NAME_LENGTH, unique = True)
    description: str = models.TextField(default="")
    avatar = models.ImageField(null=True, blank=True)
    duration: int = models.PositiveIntegerField(default=0, db_index=True)
    created_at: datetime.datetime = models.DateTimeField(auto_now=True)
    updated_at: datetime.datetime = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']
