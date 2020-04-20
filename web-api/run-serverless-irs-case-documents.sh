#!/bin/bash -e
./web-api/run-serverless.sh "${1}" "${2}" "caseDocumentsHandlers.js" "serverless-irs-case-documents.yml" "build:api:irs:case:documents"
