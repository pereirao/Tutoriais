import math
import time

def is_prime(n):
    if n < 2:
        return False

    if n % 2 == 0:
        if n > 2:
            return False
    
    u = math.floor(math.sqrt(n)) + 1
    for d in range(3, u, 2):
        if n % d == 0:
            return False

    return True


t1 = time.time()

for t in range(1000000):
    p = is_prime(t)

print(time.time() - t1)

