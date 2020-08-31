import random

GEN = 9
BASE = 9857

a_secret = 23
a_public = (GEN ** a_secret) % BASE

b_secret = 51
b_public = (GEN ** b_secret) % BASE

a_hash = (b_public ** a_secret) % BASE

b_hash = (a_public ** b_secret) % BASE


print(f"a_secret...: {a_secret}")
print(f"a_public...: {a_public}")

print(f"b_secret...: {b_secret}")
print(f"b_public...: {b_public}")

print(f"a_hash...: {a_hash}")
print(f"b_hash...: {b_hash}")


