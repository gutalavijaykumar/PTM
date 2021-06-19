from rest_framework import serializers

from .models import Task, SubTask
from projects.models import Project
from .exceptions import DateError

import datetime


class SubTaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = SubTask
        fields=['name']


class SubTaskDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = ('__all__')


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('__all__')


class TaskCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = Task
        fields=('__all__')

    def validate_start_and_end_date(self, start_date, end_date):
        if end_date < start_date:
            raise serializers.ValidationError("End date should be greater than start date.")
        return "End Date should be greater"

    def create(self, validated_data):
        task_data = {
            "name" : validated_data.pop('name'),
            "description" : validated_data.pop('description'),
            "project_id" : validated_data.pop('project').id,
            "start_date" :  validated_data.pop('start_date'),
            "end_date" : validated_data.pop('end_date'),
        }
        try:
            self.validate_start_and_end_date(task_data['start_date'],task_data['end_date'])
        except:
            raise DateError
        
        task = Task.objects.create(**task_data)
        return task


class TaskDetailSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    start_date = serializers.DateField(initial=datetime.date.today)
    end_date = serializers.DateField(initial=datetime.date.today)
    sub_tasks = SubTaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = Task
        fields = ('__all__')


class TaskListSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    start_date = serializers.DateField(initial=datetime.date.today)
    end_date = serializers.DateField(initial=datetime.date.today)
    sub_tasks = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Task
        fields = ('__all__')

