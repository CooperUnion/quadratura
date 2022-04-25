# quadratura
Placeholder for a custom Creative Coding Raspberry Pi image, designed to run on a Raspberry Pi Zero 2

## Sample Image
Download the image used on our Pi devices:
- [5gb dietpi image with apps loaded](https://www.dropbox.com/s/kux7vj8az0df7ki/quadratura-v1.0-tiny.img?dl=0)

## Goals - End-User Experience
The goals of this image are to facilitate easy work on a Raspberry Pi, for creative coding. Roughly:
- Device with pre-flashed sd card should boot and create a hotspot with a ~unique~ random name (e.g. 1234-cooper)
- [x] Hotspot capture portal should allow configuring proper wifi access
- [x] After connecting to proper wifi, device should be available with a ~unique~ random address (e.g. 1234-cooper.local)
- [x] Device should serve node apps ~via pm2~ on boot
- [x] Device should have `code-server` available on a knowable port (e.g. quadratura-01.local:9000), with terminal properly enabled and write access to the user filesystem

## Goals - System Support
- [x] Pre-installed Node v18.x
- [x] Pre-installed support for the Inky Impression and Display Mini screens from Pimoroni
- [x] Pre-installed `code-server`
