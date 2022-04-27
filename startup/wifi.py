import asyncio
import random
from time import sleep
from subprocess import check_output, getoutput

fancy = "ok"
async def leases():
    global fancy
    command = "ip neigh | grep -c 'wlan0'"
    fancy = getoutput(command)

async def randomSleep():
    global fancy
    fancy = random.randint(0,100)
    sleep(1)

async def main():
    await randomSleep()
    print(fancy)

while True:
    asyncio.run(main())
