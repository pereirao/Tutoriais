from bs4 import BeautifulSoup
import requests as req
import re
import os
import glob


def get_url_list(url, last_page):
    url_list = []

    for page_num in range(1, last_page + 1):
        print("Parsing links from page %s of %s" % (page_num, last_page))
        page = req.get(url % page_num)
        soup = BeautifulSoup(page.text, "html.parser")
        main = soup.main

        for article in main.findAll("article"):
            for link in article.findAll("a", attrs={"href": re.compile("^http://")}):
                url_list.append(link.get("href"))

    return url_list

def save_page(page_text, destination_folder):
    file = os.path.join(destination_folder, "index.htm")
    if os.path.exists(destination_folder):
        if os.path.exists(file):
            os.remove(file)
    else:
        os.mkdir(destination_folder)
    arq = open(file, "w")
    arq.write(page_text)
    arq.close()

def get_destination_folder_name(destination_folder, url):
    folder_name = (
        re.match(r'(http:\/\/wako\.sport\/en\/\w+\/)(.*)(\/[0-9]+\/$)', url)
        .group(2)
        .replace("/", "_")
    )
    return os.path.join(destination_folder, folder_name)

def get_page(url):
    page = req.get(url)
    return page.text

def process_page(url, destination_folder):
    page = get_page(url)
    destination_folder_name = get_destination_folder_name(destination_folder, url)
    save_page(page, destination_folder_name)

test_run = [
    "http://wako.sport/en/article/2021/11/26/wako-world-championship-for-seniors-and-masters-all-disciplines-jesolo/268/",
    "http://wako.sport/en/article/2021/11/26/wako-european-championship-for-older-cadets-and-juniors-5-14-november-/267/",
    "http://wako.sport/en/article/2021/11/10/wakos-because-we-care-solidarity-program-has-been-implemented-in-iraq/266/",
    "http://wako.sport/en/article/2021/09/16/the-gamechangers-meeting-was-a-great-success/265/",
    "http://wako.sport/en/article/2021/09/13/15th-balkan-championships-and-competitions-are-on/264/",
    "http://wako.sport/en/article/2021/08/24/wako-panam-activities/263/",
    "http://wako.sport/en/article/2021/07/19/wako-kickboxing-scientist/262/",
    "http://wako.sport/en/article/2021/07/19/wako-venezuela-activities/261/"
]


url = "http://wako.sport/en/article/?page=%s"
last_page = 23

#url_list = get_url_list(url, last_page)
for link in test_run:
    process_page(link, "G:\\Work\\wako\\articles")
