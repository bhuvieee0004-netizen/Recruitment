#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Node dependencies
npm install

# Build the production bundle
npm run build
