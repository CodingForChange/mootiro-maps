#! /usr/bin/env sh

sudo apt-get install nodejs npm python-dev -y

# install and configure rabbitmq for working with celery
sudo apt-get install rabbitmq-server -y
sudo rabbitmqctl add_user komoo komoo
sudo rabbitmqctl add_vhost mootiro_maps_mq
sudo rabbitmqctl set_permissions -p mootiro_maps_mq komoo ".*" ".*" ".*"

pip install -r settings/requirements.txt

sudo npm install -g coffee-script@1.2
sudo npm install -g requirejs@2.1
sudo npm install -g less@1.3.1

# apply patch for django 1.3
fab build_environment

# run tests
fab test

