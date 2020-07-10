var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

var lista = JSON.parse(localStorage.getItem('lista')) || [];

function montaLista() {
    listElement.innerHTML = '';
    for (item of lista) {
        var itemElement = document.createElement('li');
        var textElement = document.createTextNode(item);

        var linkElement = document.createElement('a');
        var pos = lista.indexOf(item);
        var linkText = document.createTextNode('X');
        linkElement.setAttribute('href', '#');
        linkElement.setAttribute('onclick', 'excluiItem(' + pos + ')');
        linkElement.appendChild(linkText);
        itemElement.appendChild(textElement);
        itemElement.appendChild(linkElement);
        listElement.appendChild(itemElement);
    }
}

montaLista();

function excluiItem(pos) {
    lista.splice(pos, 1);
    montaLista();
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('lista', JSON.stringify(lista));
}

function addItem() {
    var textElement = inputElement.value.trim();
    if (textElement != '') {
        lista.push(textElement);
        inputElement.value = '';
        montaLista();
        saveToStorage();
    }
}

buttonElement.onclick = addItem;