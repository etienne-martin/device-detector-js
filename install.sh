#!/usr/bin/env bash

node_modules/napa/bin/napa
mkdir -p php_modules
cp -R node_modules/device-detector php_modules
rm -rf node_modules/device-detector