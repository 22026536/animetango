#!/bin/bash

# Commit và push thay đổi trong tất cả các submodule
echo "Committing changes in submodules..."
git submodule foreach --recursive '
  echo "Processing submodule: $name"
  git status
  if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "Update submodule changes"
    git push
  else
    echo "No changes to commit in $name"
  fi
'

# Commit và push thay đổi trong repo chính
echo "Committing changes in main repository..."
git add .
if [ -n "$(git status --porcelain)" ]; then
  git commit -m "Update main repository and submodule pointers"
  git push
else
  echo "No changes to commit in main repository"
fi

echo "All changes pushed successfully!"
