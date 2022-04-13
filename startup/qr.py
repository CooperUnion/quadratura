#!/usr/bin/env python3
import sys
from qrLibrary import generateQrImage

import ST7789 as ST7789

print("""
image.py - Display an image on the LCD.
""")

image = generateQrImage("http://erinsparling.com")

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

WIDTH = disp.width
HEIGHT = disp.height

# Initialize display.
disp.begin()

# Load an image.
print('Loading image: {}...'.format(image))

# Resize the image
image = image.resize((WIDTH, HEIGHT))
disp.display(image)
