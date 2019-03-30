#!/bin/bash

##### Directories
DIST_PATH="./dist"
PRODUCTS_PATH="./products"
SOURCE_PATH="./src"
BIN_PATH="${SOURCE_PATH}/bin"

##### Files
INDEX_FILE_PATH="${BIN_PATH}/ely.core.ts"
WEB_FILE_PATH="${BIN_PATH}/web.ts"

##### Binary paths
ROLLUP_PATH="node_modules/.bin/rollup"

BUILD_WEB=false
BUILD_NODE=false

##### Flags detecting
for i in "$@" ; do
    if [[ "$i" == "-web" ]]; then
        BUILD_WEB=true
        echo "FLAG: $i. Building web version..."
    elif [[ "$i" == "-noSingle" ]]; then
        BUILD_NODE=true
        echo "FLAG: $i. Building node version..."
    fi
done

if ${BUILD_WEB}; then
    echo "Building web.index.js..."

fi