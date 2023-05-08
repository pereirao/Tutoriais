from pynput import mouse, keyboard
import json
import time
import pyautogui


keyb = keyboard.Controller()
mice = mouse.Controller()

with open("song1.json") as song_file:
    song = json.load(song_file)

time.sleep(3)

i = 0
adjust = -0.1
for key in song:
    k = key["key"]
    t = key["time"] + adjust
    if t < 0:
        t = 0
    time.sleep(t - i)
    if k == "Button":
        mice.press(mouse.Button.left)
        mice.press(mouse.Button.right)
        mice.release(mouse.Button.left)
        mice.release(mouse.Button.right)
    else:
        print(t, t - i, k)
        keyb.tap(k)
    i = t

