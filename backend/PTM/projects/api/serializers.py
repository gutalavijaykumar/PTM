from rest_framework import serializers
from projects.models import Project
from tasks.serializers import TaskDetailSerializer, TaskSerializer


class ProjectListSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    avatar = serializers.ImageField(max_length=None)
    duration = serializers.IntegerField()
    tasks = serializers.StringRelatedField(many=True)
    
    class Meta:
        model = Project
        fields = ('__all__')


class ProjectSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(max_length=None, allow_empty_file=False)
    
    class Meta:
        model = Project
        fields = ('__all__')


class ProjectDetailSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    description = serializers.CharField()
    avatar = serializers.ImageField(max_length=None, allow_empty_file=False)
    duration = serializers.IntegerField()
    tasks = TaskDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ('__all__')
