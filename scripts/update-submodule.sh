#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")/../yazi" || exit

git fetch --tags --force
git reset --hard "shipped"
