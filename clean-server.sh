#!/bin/bash

# Script to delete all .js and .map files in src/server directory

echo "Cleaning .js .d.ts and .map files from src/server..."

# Delete all .js files
find src/server -name "*.js" -type f -delete

# Delete all .d.ts files
find src/server -name "*.d.ts" -type f -delete

# Delete all .map files
find src/server -name "*.map" -type f -delete

echo "Cleanup completed!"



