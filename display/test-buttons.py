#!/usr/bin/env python
import io
import sys
import time
import os


from PIL import Image
from displayhatmini import DisplayHATMini

print("test-buttons starting")
img = Image.new('RGB', (320, 240), color=(0, 0, 0))

displayhatmini = DisplayHATMini(img, backlight_pwm=False)


def button_callback(pin):
    # Only handle presses

    if not displayhatmini.read_button(pin):
        return

    if pin == displayhatmini.BUTTON_A:
        print("a pressed")
    if pin == displayhatmini.BUTTON_B:
        print("b pressed")
    if pin == displayhatmini.BUTTON_X:
        print("x pressed")
    if pin == displayhatmini.BUTTON_Y:
        print("y pressed")

displayhatmini.on_button_pressed(button_callback)

counter = 0

while True:
    counter += 1