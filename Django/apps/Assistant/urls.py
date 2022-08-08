from django.urls import path
from apps.Assistant import views

urlpatterns= [
	path("/",views.index,name="Assistant"),]