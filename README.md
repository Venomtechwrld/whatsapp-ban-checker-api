<div align="center">

# VENOM TECH WRLD · WhatsApp Status Checker API

**A clean HTTP guide and client examples for the hosted WhatsApp status-checking endpoint.**

[![API](https://img.shields.io/badge/API-Hosted-08D9D6?style=for-the-badge)](https://wastatus-8mg57tmn.manus.space/v1/status)
[![Method](https://img.shields.io/badge/Method-POST-101820?style=for-the-badge)](#request)
[![Examples](https://img.shields.io/badge/Examples-cURL%20%7C%20JavaScript%20%7C%20Python-7B61FF?style=for-the-badge)](#quick-start)

</div>

---

> **What this repository is:** documentation and small client examples for an API that is already hosted at the endpoint above. It does **not** contain the backend source code and does **not** deploy, redeploy, or operate that service.

## What it does

Send an international phone number to the hosted endpoint and inspect the JSON response returned by the service. The service's successful response schema has not been independently verified, so the examples print the response as raw JSON rather than assuming fields or translating it into a definitive WhatsApp account verdict.

The endpoint requires **POST**. A GET request is not supported. Supply the number in international format, including its country calling code, in the JSON `number` field.

## Quick start

### cURL

```bash
curl --request POST \
  --url "https://wastatus-8mg57tmn.manus.space/v1/status" \
  --header "Content-Type: application/json" \
  --data '{"number":"+<COUNTRY_CODE><PHONE_NUMBER>"}'
```

Replace the placeholder with a number you own or are authorized to check. For example, `+<COUNTRY_CODE><PHONE_NUMBER>` is a template, not a real number.

A successful response is printed by the service. Its exact fields are not documented here because a successful response has not yet been verified. One verified validation error is returned when `number` is missing:

```json
{
  "ok": false,
  "error": {
    "code": "missing_number",
    "message": "Provide an international phone number with its country calling code."
  },
  "requestId": "<request-id>"
}
```

An invalid number can also return HTTP `422` with error code `invalid_phone_number`.

## JavaScript / Node.js

No WhatsApp library is needed for an HTTP request. Node.js 18 or newer includes `fetch`; save this as `examples/javascript/check-status.mjs` and run it with a number you are authorized to check:

```bash
PHONE_NUMBER="+<COUNTRY_CODE><PHONE_NUMBER>" node examples/javascript/check-status.mjs
```

```js
const endpoint = 'https://wastatus-8mg57tmn.manus.space/v1/status';
const number = process.env.PHONE_NUMBER;

if (!number) {
  console.error('Set PHONE_NUMBER in international format, including the country calling code.');
  process.exit(1);
}

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ number }),
});

const body = await response.json().catch(() => null);
console.log(`HTTP ${response.status}`);
console.log(JSON.stringify(body, null, 2));

if (!response.ok) process.exitCode = 1;
```

The code deliberately prints whatever JSON the API returns. It does not guess the success schema or classify an account on its own.

## Python

This example uses only Python's standard library. Save as `examples/python/check_status.py` and run:

```bash
PHONE_NUMBER="+<COUNTRY_CODE><PHONE_NUMBER>" python3 examples/python/check_status.py
```

```python
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
```

## Request reference

- **URL:** `https://wastatus-8mg57tmn.manus.space/v1/status`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body:** `{ "number": "+<country-code><number>" }`
- **Observed validation errors:** HTTP `422`, `missing_number` when the field is omitted, and `invalid_phone_number` for an invalid value.

The API's success fields, availability guarantees, limits, and retention behavior have not been confirmed. Check the returned HTTP status and treat the response body as service-provided data.

## About `@dexterid/bailey`

The exact package name `@dexterid/bailey` was not found in the public npm registry during research. The likely intended package is [`@dexterid/baileys`](https://www.npmjs.com/package/@dexterid/baileys) (with a final **s**). It is a server-side WhatsApp Web library, not a dependency needed to call this HTTP endpoint. This repository intentionally does not install or execute it; its implementation was not audited. See the [vendor repository](https://github.com/DEXTER-ID-NEW/dexter-tech-devil-baileys) and the upstream [Baileys introduction](https://baileys.wiki/introduction) for context.

## Privacy and responsible use

Only submit phone numbers you own or have clear permission to check. Avoid bulk lookups, public posting of results, or use that could facilitate harassment, profiling, or unsolicited contact. A status response is not a substitute for an official account appeal or support channel.

This project and the hosted endpoint are not affiliated with, endorsed by, or an official service of WhatsApp or Meta. WhatsApp is a trademark of its respective owner. The endpoint's behavior and availability are controlled by its operator and may change independently of this repository.

## Repository layout

```text
.
├── README.md
└── examples/
    ├── javascript/check-status.mjs
    ├── python/check_status.py
    └── curl/check-status.sh
```

## Project

Maintained by [VENOM TECH WRLD](https://github.com/Venomtechwrld). For updates and contact, visit the [official channel](https://t.me/number_venom) or contact the [owner](https://t.me/mr_darkvenom).
