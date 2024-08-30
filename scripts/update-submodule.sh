#!/usr/bin/env bash

git submodule update --remote
cd yazi/ || exit
git reset --hard "shipped"
