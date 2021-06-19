import datetime

from django.db import models

from projects.models import Project

# Create your models here.
MAX_TASK_NAME_LENGTH = 40
MAX_SUBTASK_NAME_LENGTH = 40


class Task(models.Model):

    name: str = models.CharField(max_length=MAX_TASK_NAME_LENGTH, unique = True)
    description: str = models.TextField(default="")
    project: Project = models.ForeignKey(Project, related_name="tasks", on_delete=models.CASCADE, null=True)
    start_date: datetime.datetime = models.DateField(blank=True)
    end_date: datetime.datetime = models.DateField(blank=True)
    created_at: datetime.datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime.datetime = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'tasks'
        ordering = ['-created_at']


class SubTask(models.Model):

    name: str = models.CharField(max_length=MAX_SUBTASK_NAME_LENGTH, unique = True)
    description: str = models.TextField(default="")
    task: Task = models.ForeignKey(Task, related_name="sub_tasks", on_delete=models.CASCADE, null=True)
    start_date: datetime.datetime = models.DateField(auto_now=True)
    end_date: datetime.datetime = models.DateField(auto_now=True, blank=True)
    created_at: datetime.datetime = models.DateTimeField(auto_now_add=True)
    updated_at: datetime.datetime = models.DateTimeField(auto_now=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'subtasks'
        ordering = ['-created_at']

