#!/usr/bin/env bash

mkdir out;
npm run build;
cp -r ext/icons out/;
cp ext/manifest.json out/manifest.json;
cp -r ext/src/browser_action/browser_action.html out/js/browser_action/;