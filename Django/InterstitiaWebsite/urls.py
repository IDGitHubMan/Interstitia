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
from django.urls import path
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
f.write("\treturn render(request,'about.html')\n")
f.write("def collection(request):\n")
f.write('\tresponse = requests.get("https://docs.google.com/spreadsheets/d/1LUZkRxjjDxCkUxpn3UHiIscy5dvs3BBfcPNF8C8FRns/export?format=csv")\n')
f.write('\tf = open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/projects.csv", "wb")\n')
f.write('\tf.write(response.content)\n')
f.write('\tf.close()\n')
f.write('\twith open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/projects.csv") as f:\n')
f.write('\t\tcsv_reader = csv.reader(f,delimiter=",")\n')
f.write('\t\tline_count = 0\n')
f.write('\t\tfor row in csv_reader:\n')
f.write('\t\t\tif line_count == 0:\n')
f.write('\t\t\t\tline_count += 1\n')
f.write('\t\t\telse:\n')
f.write('\t\t\t\tcollect[row[0]] = {"maker":row[3],"description":row[1],"tags":row[7],"type":row[2],"contributors":row[4],"thumb":row[8]}\n')
f.write('\t\t\t\tfileString = "/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/" + row[0] + ".html"\n')
f.write('\t\t\t\tif row[5] != "":\n')
f.write('\t\t\t\t\tgetString = row[5][:len(row[5]) - 5] + "export?format=html?"\n')
f.write('\t\t\t\t\tres = requests.get(getString)\n')
f.write('\t\t\t\t\tif (not os.path.exists(fileString)):\n')
f.write('\t\t\t\t\t\thtml = open(fileString,"wb")\n')
f.write('\t\t\t\t\t\thtml.write(res.content)\n')
f.write('\t\t\t\t\t\thtml.close()\n')
f.write('\t\t\t\telse:\n')
f.write('\t\t\t\t\thtml=open(fileString,"wb")\n')
f.write('\t\t\t\t\tbase = open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/base.html","r")\n')
f.write('\t\t\t\t\tb = base.read()\n')
f.write('\t\t\t\t\thtml.write(b.encode())\n')
f.write('\t\t\t\t\thtml.close()\n')
f.write('\t\t\t\tdirectoryString = "/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/images/" + row[0]\n')
f.write('\t\t\t\tif not os.path.exists(directoryString):\n')
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

g = glob.glob("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/*.html")
for file in g:
    f = open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/views.py","a+")
    if (" " in file[99:len(file) - 5]):
        s = file[99:len(file) - 5].replace(" ","_")
    else:
        s = file[99:len(file) - 5]
    f.write("\ndef " + s + "(request):")
    f.write('\n\treturn render(request,"' + file + '")')
    f.close()
    urlpatterns.append(path('collection/'+s,getattr(views,s),name=s))