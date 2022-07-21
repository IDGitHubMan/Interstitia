from django.urls import path
#Comment to make this appear in git.
from Collection import views
import csv
import glob

urlpatterns = [
    path('', views.index, name='index'),
]

g = glob.glob("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/*.html")
for file in g:
    if (" " in file[99:len(file) - 5]):
        s = file[99:len(file) - 5].replace(" ","_")
    else:
        s = file[99:len(file) - 5]
    urlpatterns.append(path(''+s,getattr(views,s),name=s))