from django.shortcuts import render
import requests
import csv

songList = {}
def index(request):
	response = requests.get("https://docs.google.com/spreadsheets/d/1VGrt5DrDCbnaq7gyg0v-PHiWIHPl3Q4_4cRL7ZFPVT8/export?format=csv")
	f = open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/apps/Cymatica/songs.csv", "wb")
	f.write(response.content)
	f.close()
	with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/apps/Cymatica/songs.csv") as f:
		csv_reader = csv.reader(f,delimiter=",")
		line_count = 0
		for row in csv_reader:
			if line_count == 0:
				line_count += 1
			else:
				songList[row[1]] = {"song":row[1],"maker":row[2],"url":[row[0]]}
	return render(request,"/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/Cymatica.html",songList)