#!/bin/bash

# Commit và push thay đổi trong tất cả các submodule
echo "Committing changes in submodules..."
git submodule foreach --recursive 'git add . && git commit -m "Update submodule changes" && git push'

# Commit và push thay đổi trong repo chính
echo "Committing changes in main repository..."
git add .
git commit -m "Update main repository and submodule pointers"
git push

echo "All changes pushed successfully!"
