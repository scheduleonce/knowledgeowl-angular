#!/bin/sh
set -e

node package-deploy/npm-login.js $(cat "/etc/npm-cred/NPM_AUTH_TOKEN")
npm whoami
npm i
npm publish

echo "package pushed to NPM successfully"