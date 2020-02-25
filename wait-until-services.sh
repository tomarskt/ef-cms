#!/bin/bash

./wait-until.sh http://localhost:3001/ 404
./wait-until.sh http://localhost:3002/ 404
./wait-until.sh http://localhost:3003/ 403
./wait-until.sh http://localhost:3004/ 404
./wait-until.sh http://localhost:3005/ 404
./wait-until.sh http://localhost:3006/ 404
./wait-until.sh http://localhost:3007/ 403
./wait-until.sh http://localhost:3008/ 404
./wait-until.sh http://localhost:3009/ 403
./wait-until.sh http://localhost:3010/ 404
./wait-until.sh http://localhost:3011/ 400 true # notifications -- websocket port 3011
./wait-until.sh http://localhost:3012/ 404
./wait-until.sh http://localhost:3013/ 404
./wait-until.sh http://localhost:3020/ 404
./wait-until.sh http://localhost:3030/ 404 # migrate - putting it far away from the other ports
./wait-until.sh http://localhost:9200/ 200
