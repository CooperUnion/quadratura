#!/usr/bin/env python3
import sys
import io
import fileinput
import ST7789 as ST7789
from time import sleep
from datauri import DataURI
from PIL import Image

# Create ST7789 LCD display class, but only for the target display.
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
"""
while True:
    for x in range(1,5):
        image = Image.open('{x}.png'.format(x=x))
        disp.display(image)
"""
previousURI = ''
counter = 0
while True:
    # print("hi")
    f = fileinput.input()
    for line in fileinput.input():
        # print("start")
        currentURI = DataURI(line)
        if previousURI != currentURI:
            counter += 1
            filename = "output/test-{counter}.png".format(counter=counter)
            image = Image.open(io.BytesIO(currentURI.data))
            disp.display(image)
        sleep(1/30)
