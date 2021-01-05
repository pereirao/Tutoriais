import math
import random

def N(p, q):
    return p * q

def fn_e(p, q):
    phi = fn_phi(p, q)
    n = 2
    while n < phi:
        if math.gcd(n, phi) == 1:
            return n
        n += 1
    return 0

def fn_phi(p, q):
    return (p - 1) * (q - 1)

def fn_d(p, q):
    e = fn_e(p, q)
    phi = fn_phi(p, q)
    r = []
    n = 1
    while len(r) < 10:
        if (n * e) % phi == 1:
            r.append(n)
        n += 1
    r.pop(0)
    return random.choice(r)

p = 449
q = 863

n = N(p, q)
e = fn_e(p, q)
d = fn_d(p, q)
m = 65
print(f'N = {n}')
print(f'e = {e}')
print(f'd = {d}')
print((m ** e) % n)
print((((m ** e) % n) ** d) % n)
