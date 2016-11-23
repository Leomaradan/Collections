#!/bin/bash

mv conf.php ~/collection.conf.php

git fetch --all
git reset --hard origin/master

composer update
yarn

ng build --target=production --environment=prod

grunt

mv ~/collection.conf.php conf.php

chmod +x build.sh
