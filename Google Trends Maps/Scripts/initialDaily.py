#When website is fully launched, will be run once intially to collect 12 days before of daily trends for map

#Imports
from datetime import datetime, timedelta
from os import error
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

#