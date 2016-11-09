#!/bin/bash

mv .env ../

git pull

composer update
yarn update

ng build --target=production --environment=prod

mv ../.env .
