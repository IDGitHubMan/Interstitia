from django.urls import path
from apps.SimonSays import views

urlpatterns= [
	path("/",views.index,name="SimonSays"),]