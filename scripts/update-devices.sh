#!/bin/bash

# Navigate to the scripts directory
cd "$(dirname "$0")"

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the TypeScript updater
npx ts-node-esm update-devices.ts

# Stage the changes
cd ../
git add src/rules/devices/phones/*.json

# Check if there are any changes to commit
if ! git diff-index --quiet HEAD --; then
  # Commit the changes
  git commit -m "chore: update device data $(date +'%Y-%m-%d')"
  echo "Changes committed."
else
  echo "No changes to commit."
fi
