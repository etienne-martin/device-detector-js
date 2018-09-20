#!/usr/bin/env bash

napa
mkdir -p php_modules
cp -R node_modules/device-detector php_modules
rm -rf node_modules/device-detector
node dist/install.js