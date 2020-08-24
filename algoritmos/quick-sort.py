import math
import random

def quick_sort(a):
    return qs(a, 0, len(a) - 1)

def qs(a, l, r):
    if l >= r:
        return
    p = partition(a, l, r)
    qs(a, l, p - 1)
    qs(a, p + 1, r)
    return a

def partition(a, l, r):
    i = l - 1
    for j in range(l, r):
        if a[j] < a[r]:
            i += 1
            a[i], a[j] = a[j], a[i]
    a[i + 1], a[r] = a[r], a[i + 1]
    return i + 1

def generate_array(n, m = 1000):
    a = random.choices(population=range(1, m + 1), k=n)
    return a   

a = generate_array(35, 100)
print("Antes..:", a)
print("Depois.:", quick_sort(a))
