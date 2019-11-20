#!/usr/bin/env bash
# $1 is an npm token

# Exit when any command fail
set -eo pipefail

# Get package name from package.json
PACKAGE_NAME=$(cat package.json \
  | grep name \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

# Get package version from package.json
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

if npm show "$PACKAGE_NAME" version | grep -w "$PACKAGE_VERSION" > /dev/null; then
  echo "Already published!";
else
  npm set //registry.npmjs.org/:_authToken=$1
  npm publish;
fi
