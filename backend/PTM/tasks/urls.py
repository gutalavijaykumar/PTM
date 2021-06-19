from django.urls import path 

from .views import ( TaskListView,
                    TaskDetailView,
                    TaskCreateView,
                    TaskDeleteView,
                    TaskUpdateView )

urlpatterns = [
    path('tasks/', TaskListView.as_view()),
    path('task/create/', TaskCreateView.as_view()),
    path('task/<int:t_pk>/', TaskDetailView.as_view()),
    path('task/<int:t_pk>/update/', TaskUpdateView.as_view()),
    path('task/<int:t_pk>/delete/', TaskDeleteView.as_view())
]