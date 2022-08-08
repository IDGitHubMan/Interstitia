from django.urls import path
from apps.SpaceAgainstTime import views

urlpatterns= [
	path("/",views.index,name="SpaceAgainstTime"),]