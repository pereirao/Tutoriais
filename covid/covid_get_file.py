import os, time
import requests
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def get_covid_file():
    filename = "owid-covid-data.csv"
    path = "E:\\Work\\Tutorials\\covid\\"
    url = "https://covid.ourworldindata.org/data/"

    try:
        print("Dowloading...")
        file = requests.get(url + filename)
        open(path + filename, "wb").write(file.content)
        print("Done!")
        ok = True
    except:
        ok = False
    return ok

def get_covid_file_old():
    path = "E:\\Work\\Tutorials\\covid\\"
    driver_file = path + "geckodriver.exe"
    log_file = path + "geckodriver.log"
    url = "https://ourworldindata.org/grapher/total-covid-deaths-per-million"
    url = "https://covid.ourworldindata.org/data/owid-covid-data.csv"
    try:
        os.remove(path + "owid-covid-data.csv")
        os.remove(log_file)
        log = open(log_file, "w")
        log.close()
    except:
        pass

    profile = webdriver.FirefoxProfile()
    profile.set_preference("browser.download.folderList", 2)
    profile.set_preference("browser.download.manager.showWhenStarting", False)
    profile.set_preference("browser.download.dir", path)
    profile.set_preference("browser.helperApps.neverAsk.saveToDisk", "text/csv")

    driver = webdriver.Firefox(
        executable_path=driver_file,
        service_log_path=log_file,
        firefox_profile=profile)
    driver.implicitly_wait(15)
    driver.get(url)

    ok = False
    assert "Coronavirus Pandemic Data Explorer" in driver.title
    if try_click(driver, "/html/body/div[3]/div/div/div/div/div[2]/button", True):
        if try_click(driver, "/html/body/main/div[2]/div[4]/div/div[3]/div[2]/nav/ul/li[5]"):
            if try_click(driver, "/html/body/main/div[2]/div[4]/div/div[4]/div[2]/a"):
                ok = True
    driver.close()

    return ok

def try_click(driver, xpath, bypass = False):
    retry = 0
    while retry < 3:
        try:
            link = driver.find_element_by_xpath(xpath)
            link.click()
            break
        except:
            retry += 1
            time.sleep(3)
    return retry != 3 or bypass
