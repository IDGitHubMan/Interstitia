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
import re

chrome_options = Options()
chrome_options.add_argument('--headless')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),chrome_options=chrome_options)

with open("/Users/idesrosiers/Documents/Projects/Interstitia/Django/InterstitiaWebsite/static/Other/world.csv","w+") as f:
    csv_reader = csv.DictReader(f,delimiter=',')
    for row in csv_reader:
        if (row["Type"]=="r"):
            url = "https://trends.google.com/trends/api/realtimetrends?hl=en-US&tz=240&cat=all&fi=0&fs=0&geo=" + row["Country_code"]+ "&ri=300&rs=20&sort=0"
            #row["Type"] = url
            driver.command_executor._commands["send_command"] = ("POST", url)
            params = {'cmd': 'Page.setDownloadBehavior', 'params': {'behavior': 'allow', 'downloadPath': "/Users/idesrosiers/Documents/Projects/Interstitia/Projects/Google Trends Maps/Data/CSV"}}
            command_result = driver.execute("send_command", params)