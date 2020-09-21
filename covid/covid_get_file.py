import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys


def get_covid_file():
    path = "D:\\Work\\Tutoriais\\covid\\"
    driver_file = path + "geckodriver.exe"
    log_file = path + "geckodriver.log"
    url = "https://ourworldindata.org/grapher/total-covid-deaths-per-million"

    try:
        os.remove(path + "total-covid-deaths-per-million.csv")
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

    assert "Total confirmed COVID-19" in driver.title
    try:
        link = driver.find_element_by_xpath("/html/body/div[3]/div/div/div/div[2]/button")
        link.click()
    except:
        pass
    try:
        link = driver.find_element_by_xpath("/html/body/main/figure/div/div[3]/div[2]/nav/ul/li[5]")
        link.click()
    except:
        pass
    link = driver.find_element_by_xpath("/html/body/main/figure/div/div[4]/div[2]/a")
    link.click()
    driver.close()
