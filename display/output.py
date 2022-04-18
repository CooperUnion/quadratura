#!/usr/bin/env python
import io
import fileinput
from time import sleep
from datauri import DataURI
from PIL import Image

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
            image.save(filename)
            print("saved")
        sleep(1/30)