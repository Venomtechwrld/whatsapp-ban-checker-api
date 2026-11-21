import json

import os

import sys

from urllib.error import HTTPError, URLError

from urllib.request import Request, urlopen



ENDPOINT = "https://wastatus-8mg57tmn.manus.space/v1/status"

number = os.environ.get("PHONE_NUMBER")



if not number:
  
    sys.exit("Set PHONE_NUMBER in international format, including the country calling code.")
  


payload = json.dumps({"number": number}).encode("utf-8")

request = Request(
  
    ENDPOINT,
  
    data=payload,
  
    headers={"Content-Type": "application/json"},
  
    method="POST",
  
)



try:
  
    with urlopen(request, timeout=30) as response:
      
        status = response.status
      
        raw_body = response.read().decode("utf-8")
      
except HTTPError as error:
  
    status = error.code
  
    raw_body = error.read().decode("utf-8", errors="replace")
  
except URLError as error:
  
    sys.exit(f"Request failed: {error.reason}")
  


print(f"HTTP {status}")

try:
  
    print(json.dumps(json.loads(raw_body), indent=2, ensure_ascii=False))
  
except json.JSONDecodeError:
  
    print(raw_body)
  


if status >= 400:
  
    sys.exit(1)
  






















