import csv

import requests
from django.shortcuts import render

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
				songList[row[1]] = {"maker":row[2],"url":row[0]}
	songs = {"songs":songList}
	return render(request,"ProjectPages/Cymatica.html",songs)
