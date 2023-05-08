from bs4 import BeautifulSoup
import requests as req
import re

urls = [
    'http://wako.sport/en/event/',
    'http://wako.sport/en/event/?page=2'
]

for url in urls:
    page = req.get(url)
    soup = BeautifulSoup(page.text, "html.parser")

    main = soup.main

    for article in main.findAll('article'):
    
        for link in article.findAll('a', attrs={'href': re.compile("^http://")}):
            print(link.get('href'))
