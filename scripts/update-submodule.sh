#!/usr/bin/env bash

cd yazi/ >/dev/null 2>&1 || cd ../yazi/ || exit

git fetch --tags --force
git reset --hard "shipped"
