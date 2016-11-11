#!/bin/bash

mv config.php ../

git fetch --all
git reset --hard origin/master

composer update
yarn

ng build --target=production --environment=prod

mv ../config.php .
