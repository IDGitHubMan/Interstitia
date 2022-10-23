from django.urls import path
from apps.Genera import views

urlpatterns= [
	path("",views.index,name="Genera"),]