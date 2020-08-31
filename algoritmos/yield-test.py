def teste():
    yield(1)
    yield(2)
    yield(3)


x = teste()

print(next(x))
print(next(x))
print(next(x))
