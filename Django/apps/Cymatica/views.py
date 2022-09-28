import csv

import requests
from django.shortcuts import render
from django.http import HttpResponse
from django.http import FileResponse


songList = {}
def index(request):
	response = requests.get("https://docs.google.com/spreadsheets/d/1VGrt5DrDCbnaq7gyg0v-PHiWIHPl3Q4_4cRL7ZFPVT8/export?format=csv")
	f = open("songs.csv", "wb")
	f.write(response.content)
	f.close()
	with open("songs.csv") as file:
		reader = csv.reader(file,delimiter=",")
		line_count = 0
		for row in reader:
			if line_count == 0:
				line_count += 1
			else:
				songList[row[2]] = {"maker":row[3],"url":row[1],"num":row[0]}
	songs = {"songs":songList}
	return render(request,"ProjectPages/Cymatica.html",songs)

def songCollector(request):
	
	return FileResponse(open("/Users/isaiahdesrosiers/Documents/Projects/Interstitia/Django/apps/Cymatica/song.mp3","rb"))
