
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
--cscript custom-phase-script
--restart
```

## Sample Burn Command
`sdm --burn /dev/sdc --host zero.local --expand-root 2022-01-28-raspios-bullseye-arm64-lite.img `

## Things to setup for Docker
1. docker `curl https://get.docker.com | sh` 
1. docker non-sudo user `sudo usermod -aG docker ${USER}` [via](https://dev.to/elalemanyo/how-to-install-docker-and-docker-compose-on-raspberry-pi-
1. node 16 `docker pull arm64v8/node` [via](https://hub.docker.com/r/arm64v8/node/)
1. code-server `docker pull codercom/code-server:latest` [via](https://hub.docker.com/r/codercom/code-server)
