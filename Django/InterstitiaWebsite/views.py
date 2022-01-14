from django.shortcuts import render

collect = {"Google Trends Maps":{"maker":"Isaiah Desrosiers","description":"A collection of maps that pull and visualize trending and top searches according to Google Trends.","tags":"mapbox dataviz webscraping javascript "},"Distribution":{"maker":"Isaiah Desrosiers","description":"A program that visualizes drawing random numbers with different means.","tags":"processing dataviz"}}
def index(request):
    return render(request,"index.html")

def about(request):
    return render(request,"about.html")

def collection(request):
    collection = {"collect":collect}
    return render(request,"collection.html",collection)