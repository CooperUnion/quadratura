#!/usr/bin/env python
import io
import fileinput
from time import sleep
from datauri import DataURI
from PIL import Image

counter = 0
run = True
while run:
    f = fileinput.input()
    for line in fileinput.input():
        # print("start")
        currentURI = DataURI(line)
        counter += 1
        filename = "output/test-{counter}.png".format(counter=counter)
        image = Image.open(io.BytesIO(currentURI.data))
        image.save(filename)
        print("saved {filename}".format(filename=filename))
        if counter==5:
            run = False
    sleep(1/30)