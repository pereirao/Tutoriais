a = 1
while a > 0:
    a = input("a: ").split()
    b = input("b: ").split()
    c = input("c: ").split()

    a = int(a[0])
    b = int(b[0])
    c = int(c[0])

    ab = ("00000" + bin(a)[2:])[-5:]
    bb = ("00000" + bin(b)[2:])[-5:]
    cb = ("00000" + bin(c)[2:])[-5:]

    for x in range(a, -1, -1):
        xb = ("00000" + bin(x)[2:])[-5:]
        s1 = int(xb[0]) + int(bb[0]) + int(cb[0])
        s2 = int(xb[1]) + int(bb[1]) + int(cb[1])
        s3 = int(xb[2]) + int(bb[2]) + int(cb[2])
        s4 = int(xb[3]) + int(bb[3]) + int(cb[3])
        s5 = int(xb[4]) + int(bb[4]) + int(cb[4])
        if s1 % 2 == 0 and s2 % 2 == 0 and s3 % 2 == 0 and s4 % 2 == 0 and s5 % 2 == 0:
            print(f"{x} - {b} - {c} => {xb} - {bb} - {cb}")

    for x in range(b, -1, -1):
        xb = ("00000" + bin(x)[2:])[-5:]
        s1 = int(ab[0]) + int(xb[0]) + int(cb[0])
        s2 = int(ab[1]) + int(xb[1]) + int(cb[1])
        s3 = int(ab[2]) + int(xb[2]) + int(cb[2])
        s4 = int(ab[3]) + int(xb[3]) + int(cb[3])
        s5 = int(ab[4]) + int(xb[4]) + int(cb[4])
        if s1 % 2 == 0 and s2 % 2 == 0 and s3 % 2 == 0 and s4 % 2 == 0 and s5 % 2 == 0:
            print(a, x, c)

    for x in range(c, -1, -1):
        xb = ("00000" + bin(x)[2:])[-5:]
        s1 = int(ab[0]) + int(bb[0]) + int(xb[0])
        s2 = int(ab[1]) + int(bb[1]) + int(xb[1])
        s3 = int(ab[2]) + int(bb[2]) + int(xb[2])
        s4 = int(ab[3]) + int(bb[3]) + int(xb[3])
        s5 = int(ab[4]) + int(bb[4]) + int(xb[4])
        if s1 % 2 == 0 and s2 % 2 == 0 and s3 % 2 == 0 and s4 % 2 == 0 and s5 % 2 == 0:
            print(a, b, x)
