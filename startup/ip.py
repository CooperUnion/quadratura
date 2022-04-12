#!/usr/bin/env python3
import sys
import time

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

#https://github.com/pimoroni/displayhatmini-python/blob/0ace127f501c5ddba2823240d2a84970ddfd9c0b/examples/pwm-backlight.py
from displayhatmini import DisplayHATMini

import ST7789
import socket

try:
    delay = int(sys.argv[1])
except IndexError:
    delay = 60

time.sleep(delay)

s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
MESSAGE = s.getsockname()[0]
s.close()

print("""
ip.py - Display connectivity information at boot.


Usage: ./ip.py <delay>
* <delay> specified in seconds. 
* If no delay is specified, the default is 60 seconds.

""".format(sys.argv[0]))

# Create ST7789 LCD display class.
disp = ST7789.ST7789(
    height=240,
    width=320,
    rotation=180,
    port=0,
    cs=1,
    dc=9,
    backlight=13,
    spi_speed_hz=60 * 1000 * 1000,
    offset_left=0,
    offset_top=0
)

# Initialize display.
disp.begin()

WIDTH = disp.width
HEIGHT = disp.height


img = Image.new('RGB', (WIDTH, HEIGHT), color=(0, 0, 0))

draw = ImageDraw.Draw(img)

font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)

size_x, size_y = draw.textsize(MESSAGE, font)

text_x = disp.width
text_y = (disp.height - size_y) // 2

t_start = time.time()

displayhatmini = DisplayHATMini(img, backlight_pwm=True)

BUTTON_MESSAGE=""

def button_callback(pin):

    # Only handle presses
    if not displayhatmini.read_button(pin):
        return

    if pin == displayhatmini.BUTTON_A:
        print("a pressed")
        BUTTON_MESSAGE="A button pressed"
    if pin == displayhatmini.BUTTON_B:
        print("b pressed")
        BUTTON_MESSAGE="B button pressed"

displayhatmini.on_button_pressed(button_callback)

while True:
    x = (time.time() - t_start) * 100
    x %= (size_x + disp.width)
    draw.rectangle((0, 0, disp.width, disp.height), (0, 0, 0))
    draw.text((int(text_x - x), text_y), MESSAGE, font=font, fill=(255, 255, 255))
    disp.display(img)
    try:
        if sys.argv[2] == "debug":
            print(MESSAGE)
    except:
        pass
