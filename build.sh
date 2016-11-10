#!/bin/bash

mv .env ../

git fetch --all
git reset --hard origin/master

composer update
yarn update

ng build --target=production --environment=prod

mv ../.env .
