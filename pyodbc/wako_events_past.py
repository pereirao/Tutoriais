from bs4 import BeautifulSoup
import requests as req
import re

url = 'http://wako.sport/en/event/?type=past&page=%s'

for page_num in range(1, 58):
    page = req.get(url % page_num)
    soup = BeautifulSoup(page.text, "html.parser")

    main = soup.main

    for article in main.findAll('article'):
    
        for link in article.findAll('a', attrs={'href': re.compile("^http://")}):
            print(link.get('href'))
