#This script would be run each day at 11:59 PM, EST to retrieve trends for the day

#Imports
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager import chrome
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import csv
import time
import json
from datetime import datetime

#Define function to be accessible in other scripts
def pageUpdate():
    # open CSV with request URLS.
    with open('/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/CSV/durls.csv','r') as readFile:

        #Set headers for generated CSV. Will change to GeoJSON for mapbox sometime soon.
        csvRows = [["concentration","traffic","query","lat","long","time","country"]]

        #Begin processing urls
        reader = csv.DictReader(readFile,delimiter=',')
        for row in reader:
            chrome_options = Options()
            chrome_options.add_argument('--headless')
            chrome_options.add_experimental_option("prefs", {"download.default_directory": "/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/JSON/daily","download.prompt_for_download": False})
            s=Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=s,options=chrome_options)
            driver.get(row["url"])
            time.sleep(1) #Necessary to let json.txt download

            #Open and parse json.txt
            with open("/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/JSON/daily/json.txt",'r+') as f:
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
                        chrome_options.add_experimental_option("prefs", {"download.default_directory": "/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/JSON/daily/graphs","download.prompt_for_download": False})
                        s=Service(ChromeDriverManager().install())
                        driver = webdriver.Chrome(service=s,options=chrome_options)
                        driver.get(obj["name"])
                        time.sleep(1) #Necessary to let json.txt download
                        driver.quit()

                        #Retrieve values from second json.txt
                        with open("/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/JSON/daily/graphs/json.txt") as f2:
                            l2 = f2.readlines()
                            t2 = ""
                            for i2 in range(1,len(l2)):
                                t2 = t2 + l2[i2] + "\n"
                            d2 = json.loads(t2)
                            try:
                                concentration = d2["default"]["timelineData"][-1]["value"][0]
                            except IndexError:
                                concentration = 0
                            
                            #add values to array storing data for csv
                            csvrow = [concentration,d["default"]["trendingSearchesDays"][0]["trendingSearches"][0]["formattedTraffic"].split("K")[0],d["default"]["trendingSearchesDays"][0]["trendingSearches"][0]["title"]["query"],row["lat"],row["long"],d["default"]["trendingSearchesDays"][0]["formattedDate"],row["country"]]
                            csvRows.append(csvrow)
                            f2.close()
                        break
    #actually write the csv
    with open("/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/CSV","w+") as out:
        for r in csvRows:
            writer = csv.writer(out,delimiter=',',quotechar='"')
            writer.writerow(r)
            print(r)
        print(out)
        out.close()