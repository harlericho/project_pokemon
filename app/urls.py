from django.urls import path
from . import views

# ruta raiz de la app index.html
urlpatterns = [
  path('', views.index, name='index'),
]