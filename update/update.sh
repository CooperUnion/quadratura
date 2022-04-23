#!/bin/bash
echo "Updating as of $(date)"
cd /home/pi/quadratura;
git reset --hard origin/main;
cd /home/pi/playground;
git reset --hard origin/main;