"""
Adjust COVID-19 deaths per million data
Get the data from WHO
"""
import csv, os
from datetime import datetime
from selenium import webdriver

import covid_get_file as cgf

if cgf.get_covid_file() != True:
    print("Download failed...")
    quit()

def flag_link(code):
    return "https://restcountries.eu/data/" + code.lower() + ".svg"

path = os.path.dirname(os.path.realpath(__file__))
path_in = os.path.join(path, "owid-covid-data.csv")
path_out = os.path.join(path, "death-per-million-per-day.csv")

file_in = open(path_in, mode="r", newline="")
file_out = open(path_out, mode="w", newline="")

reader = csv.reader(file_in)
writer = csv.writer(file_out)

header = next(reader)
data = []

for row in reader:
    entity = row[2]
    code = row[0]
    date = datetime.strptime(row[3], "%Y-%m-%d")
    deaths = float("0" + row[13])
    data.append([entity, code, date, deaths])

header_out = [
    "Entity",
    "Code",
    "Flag"
]
data_out = []
row_out = { "code": "" }
for row in data:
    if row[1] != row_out["code"]:

        if row_out["code"] != "":
            data_out.append(row_out)

        row_out = {
            "entity": row[0],
            "code": row[1],
            "flag": flag_link(row[1]) if len(row[1]) == 3 else ""
        }

    date = datetime.strftime(row[2], ("%Y-%m-%d"))

    if (date not in header_out):
        header_out.append(date)

    row_out[date] = row[3]

data_out.append(row_out)

# Sort and write the header
dates = [d for d in header_out[3:]]
dates = sorted(dates)
header_out = header_out[0:3]
for d in dates:
    header_out.append(d)
writer.writerow(header_out)

# get the values, filling the blanks
values = []
for data in data_out:
    try:
        values_out = [data["entity"], data["code"], data["flag"]]
        for date in dates:
            if date in data:
                value = data[date]
            else:
                # repeat the last value or "0"
                value = values_out[-1] if len(values_out) > 3 else 0.0
            values_out.append(value)
    except:
        print(data)
    values.append(values_out)

writer.writerows(values)

file_out.close()
