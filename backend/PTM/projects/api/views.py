from django.db.models import query
from django.http import Http404, JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.generics import (ListAPIView) 
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import mixins
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.exceptions import ValidationError
from rest_framework import viewsets

from projects.models import Project 
from .serializers import ProjectSerializer, ProjectDetailSerializer, ProjectListSerializer

class ProjectListView(ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer


class ProjectDetailView(RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    parser_classes = [FormParser, MultiPartParser, JSONParser]

    def get_object(self, *args, **kwargs):
        obj = get_object_or_404(Project, id=self.kwargs['p_pk'])
        return obj

class ProjectCreateView(APIView):
    serializer_class = ProjectSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def post(self, request, *args, **kwargs):
            print("request ===>", request.data)
            project_serializer = ProjectSerializer(data=request.data)
            if project_serializer.is_valid():
                project_serializer.save()
                return JsonResponse(project_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Could have maintained consistency of using only ClassBasedViews or GenericViews
# Using both of them for impelentation purpose.

class ProjectDeleteView(APIView):
    """
    For deleting project instance
    """
    def get_object(self, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            raise Http404

    def delete(self, request, *args, **kwargs):
        project = self.get_object(id=self.kwargs['p_pk'])
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# View for Update supports Partial Update aswell.
class ProjectUpdateView(mixins.UpdateModelMixin, generics.GenericAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def put(self, request, *args, **kwargs):
        self.project = get_object_or_404(Project, id=self.kwargs['p_pk'])
        return self.project.partial_update(request, *args, **kwargs)


class ProjectPartialUpdateView(APIView):

    def patch(self, request, pk, *args, **kwargs):
        project = get_object_or_404(Project, pk=pk)
        serializer = ProjectSerializer(project, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

