import numpy as np

grid = [[1,0,0,0,0,0,0,0,0],
        [0,2,0,0,0,0,0,0,0],
        [0,0,3,0,0,0,0,0,0],
        [0,0,0,4,0,0,0,0,0],
        [0,0,0,0,5,0,0,0,0],
        [0,0,0,0,0,6,0,0,0],
        [0,0,0,0,0,0,7,0,0],
        [0,0,0,0,0,0,0,8,0],
        [0,0,0,0,0,0,0,0,9]]

def possible(y, x, n):
    global grid
    for i in range(9):
        if grid[y][i] == n:
            return False
        if grid[i][x] == n:
            return False
    y0 = (y // 3) * 3
    x0 = (x // 3) * 3
    for y1 in range(y0, y0 + 3):
        for x1 in range(x0, x0 + 3):
            if grid[y1][x1] == n:
                return False
    return True

def print_sudoku_grid():
    global grid
    hl = ("+---" * 9) + "+"
    print(hl)
    for y in range(9):
        print("| " + " | ".join(str(n) for n in grid[y]) + " |")
        print(hl)

def print_sudoku():
    global grid
    hl = "+" + ("-" * 19) + "+"
    print(hl)
    for y in range(9):
        print("| " + " ".join(str(n) for n in grid[y]) + " |")
    print(hl)

def solve():
    global grid
    #print_sudoku()
    #input("solve...")
    for y in range(9):
        for x in range(9):
            if grid[y][x] == 0:
                for n in range(1, 10):
                    if possible(y, x, n):
                        grid[y][x] = n
                        solve()
                        grid[y][x] = 0
                return
    print_sudoku()
    input("Mais?")

print_sudoku()

solve()

