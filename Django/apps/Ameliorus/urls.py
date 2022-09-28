from django.urls import path
from apps.Ameliorus import views

urlpatterns= [
	path("/",views.index,name="Ameliorus"),]