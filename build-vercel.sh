#!/bin/bash

echo "Building client..."
cd client
npm ci
npm run build
cd ..

echo "Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo "Vercel build completed!"