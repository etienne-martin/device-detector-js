#!/usr/bin/env bash

napa
rm -rf fixtures
node load-fixtures.js
rm -rf node_modules/device-detector
