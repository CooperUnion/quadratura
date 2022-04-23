#!/bin/bash
echo "Updating as of $(date)"
cd /home/pi/quadratura;
git pull --force;
cd /home/pi/playground;
git pull --force;