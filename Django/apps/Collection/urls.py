from django.urls import path,include
from apps.Collection import views
import glob
import os;

urlpatterns = [
    path('/', views.index, name='colindex'),
    path('/Cymatica', include('apps.Cymatica.urls'),name="cymatica")
]

g = glob.glob("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/templates/ProjectPages/*.html")
for file in g:
    if (" " in file[99:len(file) - 5]):
        s = file[99:len(file) - 5].replace(" ","_")
    else:
        s = file[99:len(file) - 5]
    if (s in os.listdir("/Users/idesrosiers/Documents/Projects/Interstitia/Django/apps")):
        urlpatterns.append(path('/'+s,include('apps.'+s+'.urls'),name=s))
        urlpatterns = [*set(urlpatterns)]