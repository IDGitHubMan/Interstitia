from django.shortcuts import render
import requests
import csv
import os.path
collect = {}
def index(request):
	return render(request,'index.html')
def about(request):
	return render(request,'about.html')
def collection(request):
	response = requests.get("https://docs.google.com/spreadsheets/d/1LUZkRxjjDxCkUxpn3UHiIscy5dvs3BBfcPNF8C8FRns/export?format=csv")
	f = open("projects.csv", "wb")
	f.write(response.content)
	f.close()
	with open("/Users/idesrosiers/Documents/Interstitia/Django/projects.csv") as f:
		csv_reader = csv.reader(f,delimiter=",")
		line_count = 0
		for row in csv_reader:
			if line_count == 0:
				line_count += 1
			else:
				collect[row[0]] = {"maker":row[3],"description":row[1],"tags":row[7],"type":row[2],"contributors":row[4]}
				fileString = "/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/" + row[0] + ".html"
				cssString = "/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/static/CSS/projects/" + row[0] + ".css"
				getString = row[5][:len(row[5]) - 5] + "export?format=html"
				if (not os.path.exists(fileString)):
					res = requests.get(getString)
					html = open(fileString,"wb")
					html.write(res.content)
					html.close()
					css = open(cssString,"wb")
					css.close()
					directoryString = "/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/static/images/" + row[0]
					os.mkdir(directoryString)
	collection = {"collect":collect}
	return render(request,"collection.html",collection)
def Nodes(request):
	return render(request,"/Users/idesrosiers/Documents/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/Nodes.html")