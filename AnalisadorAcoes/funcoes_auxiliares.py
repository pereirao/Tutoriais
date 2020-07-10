def filtra_linhas(csv_reader, stock_code):
    # TODO função que recebe um csv reader e um código de ação
    # e retorna apenas as linhas pertinentes para analise
    retorno = []
    next(csv_reader)
    for linha in csv_reader:
        if len(linha) > 0:
            if linha[1] == stock_code:
                retorno.append([linha[0], linha[1], float(linha[2]), float(linha[3])])
    return retorno

def acha_maximo(acoes, index):
    # TODO função que recebe as ações
    # e retorna o valor máximo com base no index passado
    maximo = 0
    for acao in acoes:
        if index == "A":
            if acao[2] > maximo:
                maximo = acao[2]
        else:
            if acao[3] > maximo:
                maximo = acao[3]

    return maximo


def acha_minimo(acoes, index):
    # TODO função que recebe as ações
    # e retorna o valor mínimo com base no index passado
    primeira = acoes[0]
    if index == "A":
        minimo = primeira[2]
    else:
        minimo = primeira[2]

    for acao in acoes:
        if index == "A":
            if acao[2] < minimo:
                minimo = acao[2]
        else:
            if acao[3] < minimo:
                minimo = acao[3]

    return minimo

def acha_media(acoes, index):
    # TODO função que recebe as ações
    # e retorna o valor médio com base no index passado
    total = 0
    itens = len(acoes)
    for acao in acoes:
        if index == "A":
            total = total + acao[2]
        else:
            total = total + acao[2]
    media = total / itens
    return media


def acha_soma(acoes, index):
    # TODO função que recebe as ações
    # e retorna a soma dos valores com base no index passado
    return 0

def busca_index_analise():
    # TODO função que determina se estamos falando de fechamento ou preço de abertura
    # e retorna o index que deve ser analisado no CSV completo
    # Deve aceitar apenas f ou a do usuário e pedir novamente o valor até que ele
    # digite algo válido!
    retorno = ""
    while retorno != "A" and retorno != "F":
        retorno = input("[A]bertura ou [F]echamento?")

    return retorno

def imprime_resumo(maximo, media, minimo, soma, stock_code):
    # TODO função que recebe todas as análises
    # e imprime na tela o resumo delas
    print("Falta me implementar :p")
