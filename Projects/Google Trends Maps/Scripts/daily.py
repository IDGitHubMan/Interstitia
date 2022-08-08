#This script would be run each day at 11:59 PM, EST to retrieve trends for the day

#Imports
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import csv
import time
import json
import re
import requests
import datetime
import random

options = webdriver.ChromeOptions()
#options.add_argument('--headless')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
driver.command_executor._commands["send_command"] = ("POST", '/session/$sessionId/chromium/send_command')
params = {'cmd':'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': "/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/JSON/daily"}}
driver.execute("send_command", params)
data = [["country","longitude","latitude","realB","realBPercent","realE","realEPercent","realM","realMPercent","realT","realtTPercent","realS","realSPercent","realH","realHPercent","realAll","realAllPercent","old","daily","dailyCount"]]
# with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldD.csv","r+") as f:
#     csv_reader = csv.DictReader(f,delimiter=',')
#     for row in csv_reader:
#         url = "https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=240&geo=" + row["country_code"]+ "&ns=15"
#         print(row["country_code"])

# with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldR.csv","r+") as f:
#     csv_reader = csv.DictReader(f,delimiter=',')
#     for row in csv_reader:
#         url = "https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=240&geo=" + row["country_code"]+ "&ns=15"
#         print(row["country_code"])
            
def allCollector():
    with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldO.csv") as f:
        csv_reader = csv.DictReader(f,delimiter=',')
        for row in csv_reader:
            #todayString = str(datetime.date.today().year()) + "-" + str(datetime.date.today().month()) + "-" + str(datetime.date.today().month())
            #print(datetime.date.today().year())
            oldTime = datetime.date.today() - datetime.timedelta(days=8)
            url = "https://trends.google.com/trends/explore?date=" + oldTime.strftime("%Y-%m-%d") + "%20" + datetime.date.today().strftime("%Y-%m-%d") +"&geo=" + row["country_code"]
            driver.get(url)
            time.sleep(5)
            r = csv.reader(open('/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV/data.csv'))
            lines = list(r)
            for line in lines:
                if (line[3] == row["country_code"]):
                    try: 
                        line[20] = driver.find_elements(By.XPATH,"//span[@ng-bind='bidiText']")[5].text
                    except NoSuchElementException:
                        driver.get("https://trends.google.com/trends/explore?date=all&geo=" + row["country_code"])
                        time.sleep(5)
                        try:
                            line[20] = driver.find_elements(By.XPATH,"//span[@ng-bind='bidiText']")[5].text
                        except NoSuchElementException:
                            line[20] = "void"
                    break
        writer = csv.writer(open('/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV/data.csv', 'w'))
        writer.writerows(lines)
    
    with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldR.csv","r+") as f:
        csv_reader = csv.DictReader(f,delimiter=',')
        for row in csv_reader:
            oldTime = datetime.date.today() - datetime.timedelta(days=8)
            url = "https://trends.google.com/trends/explore?date=" + oldTime.strftime("%Y-%m-%d") + "%20" + datetime.date.today().strftime("%Y-%m-%d") +"&geo=" + row["country_code"]
            driver.get(url)
            time.sleep(5)
            r = csv.reader(open('/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV/data.csv'))
            lines = list(r)
            for line in lines:
                if (line[3] == row["country_code"]):
                    line[20] = driver.find_elements(By.XPATH,"//span[@ng-bind='bidiText']")[5].text
                    break
        writer = csv.writer(open('/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV/data.csv', 'w'))
        writer.writerows(lines)
    
    with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldD.csv","r+") as f:
        csv_reader = csv.DictReader(f,delimiter=',')
        for row in csv_reader:
            oldTime = datetime.date.today() - datetime.timedelta(days=8)
            url = "https://trends.google.com/trends/explore?date=" + oldTime.strftime("%Y-%m-%d")+ "%20" + datetime.date.today().strftime("%Y-%m-%d") +"&geo=" + row["country_code"]
            driver.get(url)
            time.sleep(5)
            r = csv.reader(open('/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV/data.csv'))
            lines = list(r)
            for line in lines:
                if (line[3] == row["country_code"]):
                    line[20] = driver.find_elements(By.XPATH,"//span[@ng-bind='bidiText']")[5].text
                    break
        writer = csv.writer(open('/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV/data.csv', 'w'))
        writer.writerows(lines)

def realTime():
    with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldR.csv","r+") as f:
        csv_reader = csv.DictReader(f,delimiter=',')
        for row in csv_reader:
            cats = ["b","e","m","t","s","h","all"]
            for category in cats:
                url = "https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=240&cat=" + category + "&fi=0&fs=0&geo=" + row["country_code"] + "&ri=300&rs=20&sort=0"
                driver.get(url)
                print(url)

def daily():
    with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/worldD.csv","r+") as f:
        csv_reader = csv.DictReader(f,delimiter=',')
        for row in csv_reader:
            url = "https://trends.google.com/trends/api/dailytrends?hl=en-US&tz=240&geo="+row["country_code"]+"&ns=15"
            driver.get(url)
            print(url)
