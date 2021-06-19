from django.contrib import admin

from .models import *

# Register your models here.

# class TaskAdmin(admin.ModelAdmin):
#     list_display = ('name', 'description', 'start_date', 'end_date')

# admin.site.register(Task,TaskAdmin)

admin.site.register([Task,SubTask])