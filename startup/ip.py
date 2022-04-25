#!/usr/bin/env python3
import sys
import time
import os
from qrLibrary import generateQrImage

from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
# test
# https://github.com/pimoroni/displayhatmini-python/blob/0ace127f501c5ddba2823240d2a84970ddfd9c0b/examples/pwm-backlight.py
from displayhatmini import DisplayHATMini

import json

"""
with open('package.json') as f:
    d = json.load(f)
    VERSION = d['version']
"""
# For some reason, the above code works after boot, but not when launched by a cron?
VERSION="0.1.4"

import ST7789
import socket

try:
    delay = int(sys.argv[1])
except IndexError:
    delay = 60

print("""
ip.py v{version}
Display connectivity information at boot.

Usage: ./ip.py <delay>
* <delay> specified in seconds.
* If no delay is specified, the default is 60 seconds.

Currently sleeping for {delay} seconds.
""".format(delay=delay,version=VERSION))


time.sleep(delay)

try:
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    hostname = socket.gethostname()
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
BACK_ENABLED = False


def menuA():
    #to implement back sometimes
    time.sleep(1)

def menuB():
    global img
    if len(WIFI) > 0:
        img = generateQrImage(WIFI)
        img = img.resize((WIDTH, HEIGHT))
        print("creating wifi qr code")
        draw = ImageDraw.Draw(img)
        draw.text((0, 0), "Step 1: Join Wifi", font=font_ui, fill=(255, 0, 0, 50))
        draw.text((235, 220), "Next->", font=font_ui, fill=(255, 0, 0, 50))
    else:
        img = generateQrImage("http://{IP}/".format(IP=IP))
        img = img.resize((WIDTH, HEIGHT))
        print("creating admin qr code")
        draw = ImageDraw.Draw(img)
        draw.text((0, 0), "Configure Panel", font=font_ui, fill=(255, 0, 0, 50))
        back_x, back_y = draw.textsize("<-Back", font_ui)
        draw.text((0, HEIGHT-back_y), "<-Back", font=font_ui, fill=(255,0,0,50))
        draw.text((235, 0), "Run->", font=font_ui, fill=(255, 0, 0, 50))
    disp.display(img)

def menuBAlt():
    global img
    global draw
    img = Image.new('RGB', (WIDTH, HEIGHT), color=(0, 0, 0))
    draw = ImageDraw.Draw(img)

def menuX():
    #run
    os.system('sudo systemctl start display')
    os._exit(1)

def menuNext():
    global img
    img = generateQrImage("http://{IP}/".format(IP=IP))
    img = img.resize((WIDTH, HEIGHT))
    print("menuNext: creating admin qr code")
    draw = ImageDraw.Draw(img)
    draw.text((0, 0), "Step 2: Configure", font=font_ui, fill=(255, 0, 0, 50))
    draw.text((0, 220), "<-Prev", font=font_ui, fill=(255, 0, 0, 50))
    disp.display(img)


def menuY():
    os.system('sudo reboot')

def button_callback(pin):
    global MESSAGE
    global BRIGHTNESS
    global IP
    global img
    global BACK_ENABLED

    # Only handle presses
    if not displayhatmini.read_button(pin):
        return

    if pin == displayhatmini.BUTTON_A:
        print("a pressed")
        menuA()
    if pin == displayhatmini.BUTTON_B:
        print("b pressed")
        if BACK_ENABLED == False:
            menuB()
            BACK_ENABLED = True
        else:
            print("alternate function!")
            menuBAlt()
            BACK_ENABLED = False

    if pin == displayhatmini.BUTTON_X:
        print("x pressed")
        menuX()
    if pin == displayhatmini.BUTTON_Y:
        print("y pressed")
        if len(WIFI)>0:
            menuNext()
        else:
            menuY()

displayhatmini.on_button_pressed(button_callback)

if len(WIFI)>0:
    menuB()

while True:
    x = (time.time() - t_start) * 100
    x %= (size_x + disp.width)
    # x = WIDTH
    draw.rectangle((0, 0, disp.width, disp.height), (0, 0, 0))

    draw.text((int(text_x - x), text_y), MESSAGE,
              font=font, fill=(255, 255, 255))
    draw.text((0, 190), "Admin Panel", font=font_ui, fill=(255, 0, 0, 50))

    restart_x, restart_y = draw.textsize("Restart", font_ui)
    draw.text((WIDTH-restart_x, 190), "Restart", font=font_ui, fill=(255, 0, 0, 50))

    hostname_x, hostname_y = draw.textsize(hostname, font_ui)
    draw.text((0,HEIGHT-hostname_y), hostname, font=font_ui, fill=(255,255,255,255))

    version_x, version_y = draw.textsize(VERSION, font_ui)
    draw.text((WIDTH-version_x, HEIGHT-version_y), VERSION, font=font_ui, fill=(255,255,255,255))
    disp.display(img)


