#!/usr/bin/env bash

cd yazi/ || exit

git fetch --tags --force
git reset --hard "shipped"
