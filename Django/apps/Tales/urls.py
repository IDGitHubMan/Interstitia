from django.urls import path
from apps.Tales import views

urlpatterns= [
	path("/",views.index,name="Tales"),]