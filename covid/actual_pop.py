import csv

file = open("population-by-country.csv", mode="r", newline="")

reader = csv.reader(file)
header = next(reader)
population = {}

for data in reader:
    try:
        population[data[0] + "," + data[1]] = int(float(data[3]))
    except:
        print("Erro", data)

population = {key: value for key, value in sorted(population.items(), key=lambda item: item[1])}

file_out = open("actual-population-by-country.csv", mode="w", newline="")
writer = csv.writer(file_out)

writer.writerow(["entity", "code", "population"])

for item in population.items():
    writer.writerow([item[0], item[1]])
