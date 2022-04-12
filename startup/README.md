# Startup Script

Install as a user crontab to show ip information at boot on an attached ST7789 device.

1. Enter edit mode for the logged-in user

```
crontab -u pi -e
```

2. Add the script to your crontab to execute this script after every reboot. This assumes that you have checked out this repo to your home folder.
```
@reboot python ~/quadratura/startup/ip.py > ~/ip.log 2>&1
@reboot date >> ~/reboot.log
```

3. Attach your screen and reboot!
