#!/bin/bash
HONEYBADGER_API_KEY=$1
REVISION=$2

APP_URL="https%3A//ui-${ENV}.${EFCMS_DOMAIN}"
PARCEL_HASH=$(find web-client/dist/index.$ENV.*.js | cut -d'.' -f3)

curl https://api.honeybadger.io/v1/source_maps \
  -F api_key=${HONEYBADGER_API_KEY} \
  -F revision=${ENV} \
  -F minified_url=${APP_URL}/index.${ENV}.${PARCEL_HASH}.min.js \
  -F source_map=web-client/dist/index.${ENV}.${PARCEL_HASH}.js.map \
  -F minified_file=web-client/dist/index.${ENV}.${PARCEL_HASH}.min.js
