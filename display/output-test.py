#!/usr/bin/env python
import io
import sys
import fileinput
from time import sleep
from datauri import DataURI
from PIL import Image

f = fileinput.input()
for line in fileinput.input():
    currentURI = DataURI(line)
    filename = "output/test-{counter}.png".format(counter=1)
    # image = Image.open(io.BytesIO(currentURI.data))
    # image.save(filename)
    sys.stdout.write("saved")