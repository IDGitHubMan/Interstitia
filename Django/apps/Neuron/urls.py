from django.urls import path
from apps.Neuron import views

urlpatterns= [
	path("/",views.index,name="Neuron"),]