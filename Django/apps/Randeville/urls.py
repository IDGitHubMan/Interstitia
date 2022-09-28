from django.urls import path
from apps.Randeville import views

urlpatterns= [
	path("/",views.index,name="Randeville"),]