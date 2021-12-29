# This script would run every day to gather urls for the actual scraper. The actual one would run as often as possible.

#Imports
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager import chrome
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import csv
from datetime import datetime
chrome_options = Options()
chrome_options.add_argument('--headless')
s=Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=s,options=chrome_options)
driver.get("https://trends.google.com/trends/trendingsearches/realtime?geo=US&category=all")
res = driver.execute_script("return performance.getEntriesByType('resource')")
print(res)
def rtCollector():
    with open("/Users/idesrosiers/Documents/Interstitia/Google Trends Maps/Data/CSV/durls.csv","r") as f:
        reader = csv.DictReader(f,delimiter=',')
        for row in reader:
            chrome_options = Options()
            chrome_options.add_argument('--headless')
            s=Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=s,options=chrome_options)
            exts = ["b","e","m","t","s","h","all"]
            for ext in exts:
                checkURL = "https://trends.google.com/trends/trendingsearches/realtime?geo="+row["code"]+ "AR&category=" + ext
                driver.get(checkURL)
                res = driver.execute_script("return performance.getEntriesByType('resource')")
                print((res))
#rtCollector()
