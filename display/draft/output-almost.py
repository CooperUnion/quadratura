#!/usr/bin/env python
import io
import sys
import base64
import select
import fileinput
from time import sleep
from datauri import DataURI
from PIL import Image

previousURI = ''

while True:
    print("hi")
    f = fileinput.input()
    for line in fileinput.input():
        # print("start")
        currentURI = DataURI(line)
        if previousURI == currentURI:
            print("duplicate")
        else:
            print("new")
        # print("end")
        sleep(1/30)
    # if select.select([sys.stdin, ], [], [], 0.0)[0]:
    #     base64decoded = base64.b64decode(sys.stdin.read())
    #     print(base64decoded)

        # print(select.select([sys.stdin, ], [], [], 0.0)[0])
    #     print(DataURI(fileinput.input()))
        # for line in fileinput.input():
            # print(line)
            # print(DataURI(line))
            # process(line)

        # f = fileinput.input(files="image.png")
        # fancy = open(f).read()
        # print(fancy)
        # sleep(1)


        # print("there is input")
        # # URI = sys.stdin.readline()
        # URI = ''
        # try:
        #     URI = open(0).read()
        #     close(0)
        # except:
        #     print("read failed")
        # if URI != previousURI:
        #     print("the input is new")
        #     sleep(1)
        #     try:
        #         decoded = DataURI(URI)
        #     except:
        #         print("failed")
        # else:
        #     print("duplicate")


        # stdinURI = DataURI(sys.stdin.readline())
        # if stdinURI != previousURI:
            # previousURI = stdinURI
            # print("new image")
    # if stdinURI != previousURI:
    #   previousURI = stdinURI
    #   uri = DataURI(stdinURI)
    #   print(uri.mimetype)

    #   image = Image.open(io.BytesIO(uri.data))
    #   image.save('test.png')