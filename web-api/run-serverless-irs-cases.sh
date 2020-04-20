#!/bin/bash -e

./web-api/run-serverless.sh "${1}" "${2}" "casesHandlers.js" "serverless-irs-cases.yml" "build:api:irs:cases"
