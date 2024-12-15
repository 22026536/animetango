#!/bin/bash

# Commit và push tất cả submodules
git submodule foreach 'git add . && git commit -m "Auto-commit changes in submodule" && git push'

# Commit và push thay đổi trong repo chính
git add .
git commit -m "Auto-commit changes in main repo and submodules"
git push --recurse-submodules=on-demand
