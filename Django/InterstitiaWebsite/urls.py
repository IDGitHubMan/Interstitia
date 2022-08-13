"""InterstitiaWebsite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from dataclasses import replace
from django.contrib import admin
from django.urls import path, include
from . import views
import glob

f = open("./InterstitiaWebsite/views.py","w+")
f.write("from django.shortcuts import render\n")
f.write("import requests\n")
f.write("import csv\n")
f.write("import os.path\n")
f.write("collect = {}\n")
f.write("def index(request):\n")
f.write("\treturn render(request,'index.html')\n")
f.write("def about(request):\n")
f.write("\treturn render(request,'about.html')")
f.close()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name='index'),
    path('about',views.about,name='about'),
    path('collection', include('apps.Collection.urls'),name="collection"),
]

g = glob.glob("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/*.html")