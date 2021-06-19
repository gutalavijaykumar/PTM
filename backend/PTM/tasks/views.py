from django.db.models import query
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.generics import (ListAPIView,
                                        RetrieveAPIView) 
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.exceptions import ValidationError


from tasks.models import Task 
from .serializers import TaskSerializer, TaskDetailSerializer, TaskListSerializer, TaskCreateSerializer


class TaskListView(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer


class TaskDetailView(RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskDetailSerializer
    parser_classes = [FormParser, MultiPartParser, JSONParser]

    def get_object(self):
        obj = get_object_or_404(Task,id=self.kwargs['t_pk'])
        return obj


class TaskCreateView(APIView):
    serializer_class = TaskCreateSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
            data = request.data;
            task_serializer = TaskCreateSerializer(data=request.data)
            print("====> task_serialier", task_serializer)
            if task_serializer.is_valid():
                task_serializer.save()
                return JsonResponse(task_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse(task_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskUpdateView(mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = 'p_pk' 

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


# Could have maintained consistency of using only ClassBasedViews or GenericViews
# Using both of them for impelentation purpose.
class TaskDeleteView(APIView):
    """
    For deleting project instance
    """
    def get_object(self, id):
        try:
            return Task.objects.get(id=id)
        except Task.DoesNotExist:
            raise Http404

    def delete(self,  *args, **kwargs):
        task = self.get_object(id=self.kwargs['t_pk'])
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

