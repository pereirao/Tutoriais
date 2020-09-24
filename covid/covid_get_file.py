import os, time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def get_covid_file():
    path = "E:\\Work\\Tutorials\\covid\\"
    driver_file = path + "geckodriver.exe"
    log_file = path + "geckodriver.log"
    url = "https://ourworldindata.org/grapher/total-covid-deaths-per-million"

    try:
        os.remove(path + "total-covid-deaths-per-million.csv")
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
    assert "Total confirmed COVID-19" in driver.title
    if try_click(driver, "/html/body/div[3]/div/div/div/div[2]/button", True):
        if try_click(driver, "/html/body/main/figure/div/div[3]/div[2]/nav/ul/li[5]"):
            if try_click(driver, "/html/body/main/figure/div/div[4]/div[2]/a"):
                time.sleep(3)
                driver.close()
                ok = True
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
