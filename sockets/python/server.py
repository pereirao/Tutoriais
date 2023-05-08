import socket
import urllib.request
import json
import time
import random
import pickle

def get_joke():
  joke = json.loads(urllib.request.urlopen("https://yomomma-api.herokuapp.com/jokes").read())
  return joke.get("joke")

def get_random_number():
  return f"Your random numvber: {random.choice(range(1, 1001))}"

def get_serialized_message():
  n = ["Ana", "Bruna", "Cibeli", "Daniela", "Eva"]
  s = ["Azevedo", "Bernardes", "Cavalcante", "Diniz", "Esteves"]
  f = {"nome": random.choice(n), "sobrenome": random.choice(s), "idade": random.choice(range(18,51))}
  return pickle.dumps(f)

HEADERSIZE = 10

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((socket.gethostname(), 1234))
s.listen(10)

cli, addr = s.accept()
print(f"Connection from {addr} has been established!")

while True:
    msg = get_serialized_message()
    fullmsg = bytes(f"{len(msg):<{HEADERSIZE}}", "utf-8") + msg
    cli.send(fullmsg)
    print(f"{time.strftime('%H:%M:%S')} Message sent.")
    time.sleep(3)

