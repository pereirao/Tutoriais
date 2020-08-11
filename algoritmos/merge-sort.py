import math
import random

def split_array(a):
    if len(a) > 1:
        p = math.ceil(len(a) / 2)
        return a[0:p], a[p:]
    else:
        raise Exception("Invalid array length")

def merge_sort(a):
    if len(a) > 1:
        b, c = split_array(a)
        b = merge_sort(b)
        c = merge_sort(c)
        return order_arrays(b, c)
    return a

def order_arrays(a1, a2):
    p1 = p2 = 0
    a = []
    while p1 < len(a1) and p2 < len(a2):
        if a1[p1] <= a2[p2]:
            a.append(a1[p1])
            p1 += 1
        else:
            a.append(a2[p2])
            p2 += 1
    a.extend(a1[p1:])
    a.extend(a2[p2:])
    return a

def generate_array(n, m = 1000):
    a = random.choices(population=range(1, m + 1), k=n)
    return a   

a = generate_array(25, 100)
print(a)
print(merge_sort(a))
