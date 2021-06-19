from django.urls import path, include 
from tasks.urls import  *
from .views import ( ProjectListView,
                    ProjectDetailView,
                    ProjectCreateView,
                    ProjectDeleteView,
                    ProjectUpdateView )

urlpatterns = [
    path('', ProjectListView.as_view()),
    path('create/', ProjectCreateView.as_view()),
    path('<int:p_pk>/', ProjectDetailView.as_view()),
    path('<int:p_pk>/update/', ProjectUpdateView.as_view()),
    path('<int:p_pk>/delete/', ProjectDeleteView.as_view()),
    path('<int:p_pk>/', include('tasks.urls'))
]
