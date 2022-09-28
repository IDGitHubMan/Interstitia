from django.shortcuts import render
import requests
import os
import csv
import glob

from webdriver_manager.chrome import ChromeDriverManager

# Create your views here.

from django.http import HttpResponse



collect = {}

def index(request):
    makers = []
    tags = []
    response = requests.get("https://docs.google.com/spreadsheets/d/1LUZkRxjjDxCkUxpn3UHiIscy5dvs3BBfcPNF8C8FRns/export?format=csv")
    f = open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/projects.csv", "wb")
    f.write(response.content)
    f.close()
    with open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/projects.csv") as f:
        csv_reader = csv.reader(f,delimiter=",")
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                collect[row[0]] = {"maker":row[3],"description":row[1],"tags":row[7],"type":row[2],"contributors":row[4],"thumb":row[8],"formatted":row[9]}
                fileString = "/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/" + row[9] + ".html"
                os.system('cd /Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps')
                if (row[9] not in os.listdir('/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps')):
                    os.system('mkdir /Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/' + row[9])
                    os.system('django-admin startapp ' + row[9] + " /Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/" + row[9])
                    f = open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/" + row[9] + "/views.py",'w+')
                    f.write('from django.shortcuts import render\n\ndef index(request):\n\treturn render(request,"ProjectP' + row[9]+'.html")')
                    f.close()
                    f = open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/" + row[9] + "/urls.py",'w+')
                    f.write('from django.urls import path\nfrom apps.' + row[9] + ' import views\n\nurlpatterns= [\n\tpath("/",views.index,name="' + row[9] + '"),]')
                    f.close()
                    f = open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/" + row[9] + "/apps.py",'w+')
                    f.write('from django.apps import AppConfig\n\n\nclass ' + row[9] + 'Config(AppConfig):\n\tdefault_auto_field = "django.db.models.BigAutoField"\n\tname = "apps.' + row[9] + '"')
                intermediate = row[7].split()
                makers.append(row[3].lower())
                for string in intermediate:
                    tags.append(string)
                if row[5] != "":
                    getString = row[5][:len(row[5]) - 5] + "export?format=html?"
                    res = requests.get(getString)
                    if (not os.path.exists(fileString)):
                        html = open(fileString,"wb")
                        html.write(res.content)
                        html.close()
                else:
                    html=open(fileString,"wb")
                    html.write('{% extends "base.html" %}'.encode() )
                    html.close()
                tags = list(set(tags))
                makers = list(set(makers))
    collection = {"collect":collect,"tagList":tags,"makeList":makers}
    return render(request,"collection.html",collection)

g = glob.glob("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectP*.html")
for file in g:
    pyFile = open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/Collection/views.py","r+")
    defined = False
    if (" " in file[99:len(file) - 5]):
        s = file[99:len(file) - 5].replace(" ","_")
        if (file[99:len(file) - 5] not in os.listdir("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps") or s not in os.listdir("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps")):
            for line in pyFile:
                if (s in line):
                    defined = True
                    break
            if not defined:
                pyFile.write("\n\ndef " + s + "(request)" + ':\n\treturn render(request,"' + file + '")')
    else:
        s = file[99:len(file) - 5]
        if (s not in os.listdir("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps")):
            for line in pyFile:
                if (s in line):
                    defined = True
                    break
            if not defined:
                pyFile.write("\n\ndef " + s + "(request)" + ':\n\treturn render(request,"' + file + '")')

def Tales(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPTales.html")

def Cymatica(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPCymatica.html")

def SimonSays(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPSimonSays.html")

def SpaceAgainstTime(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPSpaceAgainstTime.html")

def Trends(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPTrends.html")

def Ameliorus(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPAmeliorus.html")

def Neuron(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPNeuron.html")

def Randeville(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPRandeville.html")

def ChoiceStories(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPChoiceStories.html")

def Assistant(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPAssistant.html")

def Genera(request):
	return render(request,"/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPGenera.html")