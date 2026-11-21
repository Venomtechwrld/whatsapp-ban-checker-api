#!/usr/bin/env sh

set -eu



: "${PHONE_NUMBER:?Set PHONE_NUMBER in international format, including country calling code}"



curl --fail-with-body --silent --show-error \

  --request POST \
  
  --url "https://wastatus-8mg57tmn.manus.space/v1/status" \
  
  --header "Content-Type: application/json" \
  
  --data "$(python3 -c 'import json,os; print(json.dumps({"number": os.environ["PHONE_NUMBER"]}))')"
  




