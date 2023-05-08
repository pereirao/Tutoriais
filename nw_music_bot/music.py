
import pyautogui
import time
from pynput.keyboard import Controller

x1 = 2521
x2 = 2518
cw = 800
ca = 832
cs = 862
cd = 895
c_ = 923

print('Start')
keyb = Controller()
# time.sleep(3)
# keyb.press('e')
# keyb.release('e')




while True:
    x = 0
    while x != 350:
        x +=1
        if pyautogui.pixel(x1, cw) == (0, 0, 0) or pyautogui.pixel(x2, cw) == (214, 203, 173):
            print("w")
            pyautogui.typewrite('w')
        
        elif pyautogui.pixel(x1, ca) == (0, 0, 0) or pyautogui.pixel(x2, ca) == (214, 203, 173):
            print("a")
            pyautogui.typewrite('a')
        
        elif pyautogui.pixel(x1, cs) == (0, 0, 0) or pyautogui.pixel(x2, cs) == (214, 203, 173):
            print("s")
            pyautogui.typewrite('s')

        elif pyautogui.pixel(x1, cd) == (0, 0, 0) or pyautogui.pixel(x2, cd) == (214, 203, 173):
            print("d")
            pyautogui.typewrite('d')

        elif pyautogui.pixel(x1, c_) == (0, 0, 0) or pyautogui.pixel(x2, c_) == (214, 203, 173):
            print("spc")
            pyautogui.press('space')

    # keyb.press('e')
    # time.sleep(3)
    # keyb.release('e')
    # time.sleep(2)
    # pyautogui.press('e')
    x = 0
