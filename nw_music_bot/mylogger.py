from pynput import mouse, keyboard
import json
import time

with open("config.json") as config:
    config = json.load(config)

output = []

start_time = 0
finish = False

def add_mousepress(location, button=None):
    global output
    global start_time
    if start_time == 0:
        start_time = time.time()
    t = time.time() - start_time
    output.append(
        {
            "time": t,
            "key": button
        }
    )


def on_click_mouse(x, y, button, pressed):
    add_mousepress((x, y), button=str(button))


def add_keypress(key, special):
    global output
    global start_time
    global finish
    if key == "q":
        finish = True
    else:
        if start_time == 0:
            start_time = time.time()
        t = time.time() - start_time
        output.append(
            {
                "time": t,
                "key": key
            }
        )


def on_press_key(key):
    try:
        add_keypress(key.char, False)
    except AttributeError:
        add_keypress(str(key), True)


def start_logging():
    mouse.Listener(on_click=on_click_mouse).start()
    keyboard.Listener(on_press=on_press_key).start()
    while not finish:
        time.sleep(1)
    finish_logging(config["storage_file"])

def finish_logging(file):
    with open(file, "w") as output_file:
        json.dump(output, output_file)

# input("Press enter to start logging")
start_logging()
