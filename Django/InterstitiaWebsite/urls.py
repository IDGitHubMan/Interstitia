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
from django.contrib import admin
from django.urls import path
from . import views
import glob

f = open("/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/views.py","w+")
f.write("from django.shortcuts import render\n")
f.write("import requests\n")
f.write("import csv\n")
f.write("import os.path\n")
f.write("collect = {}\n")
f.write("def index(request):\n")
f.write("\treturn render(request,'index.html')\n")
f.write("def about(request):\n")
f.write("\treturn render(request,'about.html')\n")
f.write("def collection(request):\n")
f.write('\tresponse = requests.get("https://docs.google.com/spreadsheets/d/1LUZkRxjjDxCkUxpn3UHiIscy5dvs3BBfcPNF8C8FRns/export?format=csv")\n')
f.write('\tf = open("projects.csv", "wb")\n')
f.write('\tf.write(response.content)\n')
f.write('\tf.close()\n')
f.write('\twith open("/Users/idesrosiers/Documents/Interstitia/Django/projects.csv") as f:\n')
f.write('\t\tcsv_reader = csv.reader(f,delimiter=",")\n')
f.write('\t\tline_count = 0\n')
f.write('\t\tfor row in csv_reader:\n')
f.write('\t\t\tif line_count == 0:\n')
f.write('\t\t\t\tline_count += 1\n')
f.write('\t\t\telse:\n')
f.write('\t\t\t\tcollect[row[0]] = {"maker":row[3],"description":row[1],"tags":row[7],"type":row[2],"contributors":row[4]}\n')
f.write('\t\t\t\tfileString = "/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/" + row[0] + ".html"\n')
f.write('\t\t\t\tcssString = "/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/static/CSS/projects/" + row[0] + ".css"\n')
f.write('\t\t\t\tgetString = row[5][:len(row[5]) - 5] + "export?format=html"\n')
f.write('\t\t\t\tif (not os.path.exists(fileString)):\n')
f.write('\t\t\t\t\tres = requests.get(getString)\n')
f.write('\t\t\t\t\thtml = open(fileString,"wb")\n')
f.write('\t\t\t\t\thtml.write(res.content)\n')
f.write('\t\t\t\t\thtml.close()\n')
f.write('\t\t\t\t\tcss = open(cssString,"wb")\n')
f.write('\t\t\t\t\tcss.close()\n')
f.write('\t\t\t\t\tdirectoryString = "/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/static/images/" + row[0]\n')
f.write('\t\t\t\t\tos.mkdir(directoryString)\n')
f.write('\tcollection = {"collect":collect}\n')
f.write('\treturn render(request,"collection.html",collection)')
f.close()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index,name='index'),
    path('about',views.about,name='about'),
    path('collection',views.collection,name='collection')
]

g = glob.glob("/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/*.html")
for file in g:
    f = open("/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/views.py","a+")
    f.write("\ndef " + file[90:len(file) - 5] + "(request):")
    f.write('\n\treturn render(request,"' + file + '")')
    f.close()
    urlpatterns.append(path('collection/'+file[90:len(file) - 5],getattr(views,file[90:len(file) - 5]),name=file[90:len(file) - 5]))