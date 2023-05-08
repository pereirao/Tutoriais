import socket
import pickle

HEADERSIZE = 10

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((socket.gethostname(), 1234))

msg = b""
new = True
while True:
    m = s.recv(16)
    if new:
        msglen = int(m[:HEADERSIZE])
        new = False
    
    msg += m

    if len(msg) - HEADERSIZE == msglen:
        d = pickle.loads(msg[HEADERSIZE:])
        print(d)
        new = True
        msg = b""
