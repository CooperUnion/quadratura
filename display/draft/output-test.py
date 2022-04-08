from datauri import DataURI
from PIL import Image
import io
import sys
import select
from time import sleep

while True:
  if select.select([sys.stdin, ], [], [], 0.0)[0]:
      print("Have data!")
      sleep(1)
  # else:
      # print("No data")