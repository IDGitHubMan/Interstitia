from django.urls import path
from apps.Trends import views

urlpatterns= [
	path("/",views.index,name="Trends"),]