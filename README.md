# quadratura
Placeholder for a custom Creative Coding Raspberry Pi image, designed to run on a Raspberry Pi Zero 2

## Goals - End-User Experience
The goals of this image are to facilitate easy work on a Raspberry Pi, for creative coding. Roughly:
- Device with pre-flashed sd card should boot and create a hotspot with a unique, knowable name (e.g. quadratura-01)
- Hotspot capture portal should allow configuring proper wifi access
- After connecting to proper wifi, device should be available with a unique, knowable address (e.g. quadratura-01.local)
- Device should serve node apps via pm2 on boot
- Device should have `code-server` available on a knowable port (e.g. quadratura-01.local:9000), with terminal properly enabled and write access to the user filesystem

## Goals - System Support
- Pre-installed Node v16.x, pm2
- Pre-installed support for the Inky Impression and Display Mini screens from Pimoroni
- Pre-installed `code-server`
