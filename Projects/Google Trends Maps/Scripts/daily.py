#This script would be run each day at 11:59 PM, EST to retrieve trends for the day

#Imports
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import csv
import time
import json
from geojson import Feature,Point
from mapbox import Datasets
import re

#MAPBOX dataset uploader
key = "sk.eyJ1IjoiaWRnZW92aXN1YWxpemVyIiwiYSI6ImNreHF0MWQxNTc3d2gydm11cXNsa2tuNHIifQ.4wjsfxEGq_St-YDjXjikcA"
datasets = Datasets(key)
datasetID = "ckxp9qrur5qmn21n2afc85i73"
features = []
#Define function to be accessible in other scripts
def pageUpdate():
    # open CSV with request URLS.
    with open('/Users/idesrosiers/Documents/Interstitia/Projects/Google Trends Maps/Data/CSV/durls.csv','r') as readFile:

        #Begin processing urls
        reader = csv.DictReader(readFile,delimiter=',')
        for row in reader:
            chrome_options = Options()
            chrome_options.add_argument('--headless')
            chrome_options.add_experimental_option("prefs", {"download.default_directory": "/Users/idesrosiers/Documents/Interstitia/Projects/Google Trends Maps/Data/JSON/daily","download.prompt_for_download": False})
            s=Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=s,options=chrome_options)
            driver.get(row["url"])
            time.sleep(1) #Necessary to let json.txt download

            #Open and parse json.txt
            with open("/Users/idesrosiers/Documents/Interstitia/Projects/Google Trends Maps/Data/JSON/daily/json.txt",'r+') as f:
                l = f.readlines()
                t = ""
                for i in range(1,len(l)):
                    t = t + l[i] + "\n"
                d = json.loads(t)

                #Generate URL to retrieve search concentration from graph
                graphURL = "https://trends.google.com" + d["default"]["trendingSearchesDays"][0]["trendingSearches"][0]["title"]["exploreLink"]
                driver.get(graphURL)

                #Let page load
                time.sleep(1)

                #Retrieve secondary requests made by page
                res = driver.execute_script("return performance.getEntriesByType('resource')")
                for obj in res:
                    #Find request that retrieves graph data
                    if "https://trends.google.com/trends/api/widgetdata/multiline" in obj["name"]:
                        driver.quit()

                        #Reinitialize driver and reset download settings to avoid confusion of json.txt files
                        chrome_options = Options()
                        chrome_options.add_argument('--headless')
                        chrome_options.add_experimental_option("prefs", {"download.default_directory": "/Users/idesrosiers/Documents/Interstitia/Projects/Google Trends Maps/Data/JSON/daily/graphs","download.prompt_for_download": False})
                        s=Service(ChromeDriverManager().install())
                        driver = webdriver.Chrome(service=s,options=chrome_options)
                        driver.get(obj["name"])
                        time.sleep(1) #Necessary to let json.txt download
                        driver.quit()

                        #Retrieve values from second json.txt
                        with open("/Users/idesrosiers/Documents/Interstitia/Projects/Google Trends Maps/Data/JSON/daily/graphs/json.txt","r+") as f2:
                            l2 = f2.readlines()
                            t2 = ""
                            for i2 in range(1,len(l2)):
                                t2 = t2 + l2[i2] + "\n"
                            d2 = json.loads(t2)
                            try:
                                concentration = d2["default"]["timelineData"][-1]["value"][0]
                                for thing in d2["default"]["timelineData"]:
                                    concentration+=thing["value"][0]
                                concentration/=len(thing)
                            except IndexError or ZeroDivisionError:
                                concentration = 0
                            trafficNum = re.sub('\D','',d["default"]["trendingSearchesDays"][0]["trendingSearches"][0]["formattedTraffic"].split("K")[0])
                            trafficChar = re.sub('\d','',d["default"]["trendingSearchesDays"][0]["trendingSearches"][0]["formattedTraffic"].split("K")[0])
                            if ("K" in trafficChar):
                                traffic = float(trafficNum)*1000
                            elif ("M" in trafficChar):
                                traffic = float(trafficNum)*1000000
                            else:
                                traffic = trafficNum
                            #Generate and export GEOjson to mapbox.
                            p = Point((float(row["long"]),float(row["lat"])))
                            f = Feature(geometry=p,properties={"concentration":concentration,"traffic":traffic,"query":d["default"]["trendingSearchesDays"][0]["trendingSearches"][0]["title"]["query"],"date":d["default"]["trendingSearchesDays"][0]["formattedDate"]})
                            datasets.update_feature(datasetID,row["country"] + " " + d["default"]["trendingSearchesDays"][0]["formattedDate"],f)
                            datasets.update_feature("ckxs37g8z0u8v21qnfefkfft6",row["country"],f)
                            features.append(f)
                            os.environ['MAPBOX_ACCESS_TOKEN']=key
pageUpdate()