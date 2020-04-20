#!/bin/bash

ENV=$1

if [[ $(./web-api/deploy-diff.sh $ENV web-api/runtimes/puppeteer) = "true" ]]; then
  cd web-api/runtimes/puppeteer && ./build.sh && cd ../../..
fi

if [[ $(./web-api/deploy-diff.sh $ENV web-api/runtimes/clamav) = "true" ]]; then
  cd web-api/runtimes/clamav && ./build.sh && cd ../../..
fi

docker build -t efcms -f Dockerfile .