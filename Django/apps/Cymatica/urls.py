from django.urls import path
from apps.Cymatica import views

urlpatterns= [
	path("/",views.index,name="Cymatica"),]