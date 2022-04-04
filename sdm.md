
# SDM Commands

## Sample Configure Command

### With a known ssid
```
sdm /home/pi/quadratura/2022-01-28-raspios-bullseye-arm64-lite.img \
--customize \
--wpa /home/pi/quadratura/wpa_supplicant.conf \
--loadlocal wifi \
--apssid zero.local \
--restart
```
### With an unknown ssid

```
sdm /home/pi/quadratura/2022-01-28-raspios-bullseye-arm64-lite.img \
--customize \
--loadlocal wifi \
--apssid zero.local \
--nowpa \
--restart
```

## Sample Burn Command
`sdm --burn /dev/sdc --host zero.local --expand-root 2022-01-28-raspios-bullseye-arm64.img `

