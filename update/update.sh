#!/bin/bash
echo "Updating as of $(date)"
cd /home/pi/quadratura;
git reset --hard origin/main;
git pull;
cd /home/pi/playground;
git reset --hard origin/main;
git pull;
