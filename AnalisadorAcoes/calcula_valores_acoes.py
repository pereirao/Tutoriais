# Implemente um código de análise de um grande dataset de dados
# separado em funções!! 
# 
# Para isso implemente cada uma das funções especificadas abaixo
# da forma que elas são descritas e utilize todas em conjunto para
# obter sua resposta


# O CSV possui colunas bem formatadas, no seguinte formato:
# 1 linha de dado, 1 linha em branco
# colunas [data do ano, stock code, preco de abertura, preco de fechamento]

import csv

from funcoes_auxiliares import (
    acha_maximo,
    acha_minimo,
    acha_media,
    acha_soma,
    busca_index_analise,
    imprime_resumo,
    filtra_linhas
)

def main(stock_code):
    with open('./acoes_2019_779229.csv') as file:
        reader = csv.reader(file)

        linhas_analizadas = filtra_linhas(reader, stock_code)

        index = busca_index_analise()

        maximo = acha_maximo(linhas_analizadas, index)

        media = acha_media(linhas_analizadas, index)

        minimo = acha_minimo(linhas_analizadas, index)
        print("Minimo", minimo)
        soma = acha_soma(linhas_analizadas, index)

        imprime_resumo(maximo, media, minimo, soma, stock_code)


print("Bem vindo ao analisador de ações 2019!!")
stock_code = input("Qual o código da ação que você gostaria de analisar? ")
main(stock_code)

