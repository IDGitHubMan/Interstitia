from django.urls import path
from apps.ChoiceStories import views

urlpatterns= [
	path("/",views.index,name="ChoiceStories"),]