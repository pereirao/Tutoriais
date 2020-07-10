# configurar
setwd("G:\\Work\\Tutoriais\\covid")
Sys.setlocale("LC_TIME", "English")

# ler arquivo
library(readr)
deaths_per_million <- read_csv("total-covid-deaths-per-million.csv",
                               skip = 1,
                               col_names = c("Entity", "Code", "Date", "Deaths"),
                               col_types = cols(Date = col_date(format = "%b %d, %Y"),
                                                Deaths = col_number()))

deaths_per_million <- subset(deaths_per_million, Date >= "2020-03-01")

deaths_per_million_table <- spread(deaths_per_million, Date, Deaths)

View(filter(deaths_per_million_table, `2020-03-01` >= 0))
