#!/usr/bin/env python3
import sys
import time
import os
from qrLibrary import generateQrImage

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

# https://github.com/pimoroni/displayhatmini-python/blob/0ace127f501c5ddba2823240d2a84970ddfd9c0b/examples/pwm-backlight.py
from displayhatmini import DisplayHATMini

import ST7789
import socket

try:
    delay = int(sys.argv[1])
except IndexError:
    delay = 60

print("""
ip.py - Display connectivity information at boot.


Usage: ./ip.py <delay>
* <delay> specified in seconds.
* If no delay is specified, the default is 60 seconds.

Currently sleeping for {delay} seconds.
""".format(delay=delay))


time.sleep(delay)

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    IP = s.getsockname()[0]
    MESSAGE = s.getsockname()[0]
    s.close()
    WIFI = ""
except:
    hostname = socket.gethostname()
    IP = hostname
    MESSAGE = hostname
    WIFI = "WIFI:S:{hostname};T:WPA/WPA2;P:cooperunion;;".format(
        hostname=hostname)

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

font = ImageFont.truetype(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 30)
font_ui = ImageFont.truetype(
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 18)

size_x, size_y = draw.textsize(MESSAGE, font)

text_x = disp.width
text_y = (disp.height - size_y) // 2

t_start = time.time()

displayhatmini = DisplayHATMini(img, backlight_pwm=True)

BRIGHTNESS = 1


def menuA():
    global img
    if len(WIFI) > 0:
        img = generateQrImage(WIFI)
        draw = ImageDraw.Draw(img)
        draw.text((0, 0), "Wifi", font=font_ui, fill=(255, 0, 0))
    else:
        draw = ImageDraw.Draw(img)
        draw.text((0, 0), "Wifi - Disabled", font=font_ui, fill=(255, 0, 0))


def menuB():
    global img
    if len(WIFI) > 0:
        img = generateQrImage(WIFI)
        print("creating wifi qr code")
    else:
        img = generateQrImage("http://{IP}:8888/".format(IP=IP))
        print("creating admin qr code")
        img = img.resize((WIDTH, HEIGHT))
    disp.display(img)


def button_callback(pin):
    global MESSAGE
    global BRIGHTNESS
    global IP
    global img

    # Only handle presses
    if not displayhatmini.read_button(pin):
        return

    if pin == displayhatmini.BUTTON_A:
        print("a pressed")
        menuA()
    if pin == displayhatmini.BUTTON_B:
        print("b pressed")
        MESSAGE = "B button pressed"
        menuB()
    if pin == displayhatmini.BUTTON_X:
        print("x pressed")

    if pin == displayhatmini.BUTTON_Y:
        print("y pressed")

displayhatmini.on_button_pressed(button_callback)

while True:
    x = (time.time() - t_start) * 100
    x %= (size_x + disp.width)
    # x = WIDTH
    draw.rectangle((0, 0, disp.width, disp.height), (0, 0, 0))
    draw.text((int(text_x - x), text_y), MESSAGE,
              font=font, fill=(255, 255, 255))
    disp.display(img)
