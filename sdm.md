
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
1. docker non-sudo user `sudo usermod -aG docker ${USER}` [via](https://dev.to/elalemanyo/how-to-install-docker-and-docker-compose-on-raspberry-pi-)
1. node 16 `docker pull arm64v8/node` [via](https://hub.docker.com/r/arm64v8/node/)
1. code-server `docker pull codercom/code-server:latest` [via](https://hub.docker.com/r/codercom/code-server)
  - ```
    mkdir -p ~/.config
    docker run -it --name code-server -p 127.0.0.1:8080:8080 \
    -v "$HOME/.config:/home/coder/.config" \
    -v "$PWD:/home/coder/project" \
    -u "$(id -u):$(id -g)" \
    -e "DOCKER_USER=$USER" \
    codercom/code-server:latest
  ```
1. Install git `sudo apt-get install git`
1. Dependencies for node-canvas: `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev` [via](https://github.com/Automattic/node-canvas#compiling)
  - Potential fix if `node-canvas` won't install: `sudo npm install -g node-gyp; cd node_modules/canvas; node-gyp rebuild` [via](https://github.com/Automattic/node-canvas/issues/1499)
1. Make sure python has everything it needs
  - [st7789 library](https://github.com/pimoroni/st7789-python)
  - [python-datauri](https://pypi.org/project/python-datauri/) and not just `datauri`
