from flask import Flask
from flask import render_template
import random
import json

app = Flask(__name__,
            static_url_path='', 
            static_folder='static',
            template_folder='templates')

@app.route('/')
def hello_world():
    return render_template('index.html', name='Alexandre')

@app.route('/random')
def random_page():
    return render_template('random.html')

@app.route('/gerarPalpite')
def gera_palpite():
    jogo = set()
    while len(jogo) < 6:
        jogo.add(random.choice(range(1,61)))
    return json.dumps(sorted(tuple(jogo)))
