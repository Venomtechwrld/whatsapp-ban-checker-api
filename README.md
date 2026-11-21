# 𝐕𝐄𝐍𝐎𝐌༞𝐓𝐄𝐂𝐇-𝐖𝐑𝐋𝐃 · WhatsApp Ban Checker



[**Open the live VENOM BAN CHECKER**](https://venomtechwrld.github.io/whatsapp-ban-checker-api/)



This repository contains the GitHub Pages frontend and documentation for the existing hosted status API. Browser requests use a Manus proxy because the upstream API does not accept browser CORS preflight requests.



- Upstream: `https://wastatus-8mg57tmn.manus.space/v1/status`
- 
- Browser proxy: `https://venompx-gjgfathg.manus.space/api/status`
- 


The site prefills `+2348123456789` as an example but sends no request on load. A lookup is sent only after a visitor presses **CHECK STATUS**. The page renders all returned fields, unknown/null values and errors, and preserves raw JSON.



## Request



Send an international number you own or are authorized to check:



```http

POST https://wastatus-8mg57tmn.manus.space/v1/status

Content-Type: application/json

```



```json

{ "number": "+<country-code><phone-number>" }

```



For browser use, POST the same JSON to the proxy. It forwards to the fixed upstream URL.



## Observed success fields



Observed in a successful permanent-ban response; not every response is guaranteed to contain every field:



- Top-level: `ok`, `phone`, `result`, `requestId`
- 
- `phone`: `valid`, `input`, `e164`, `country`, `callingCode`, `nationalNumber`, `type`
- 
- `result`: `number`, `status`, `isBanned`, `isNeedOfficialWa`, `banInfo`
- 
- `result.banInfo`: `banType`, `violationType`, `violationReason`, `canAppeal`, `banTime`, `banDate`, `appealStatus`, `appealCreatedAt`
- 


## Validation



A missing `number` was observed as HTTP `422`:



```json

{"ok":false,"error":{"code":"missing_number","message":"Provide an international phone number with its country calling code."},"requestId":"<request-id>"}

```



Invalid numbers have also returned code `invalid_phone_number`. Inspect actual error bodies rather than assuming a fixed shape.



## Proxy and responsible use



The proxy accepts `POST /api/status`, allows CORS from the GitHub Pages origin, limits bodies to 8 KB, and times out upstream requests after 30 seconds. It does not persist or log request bodies. CORS is not authentication or abuse prevention.



Only check numbers you own or have permission to check. Avoid bulk requests and publishing personal results. This independent project by **𝐕𝐄𝐍𝐎𝐌༞𝐓𝐄𝐂𝐇-𝐖𝐑𝐋𝐃** is not affiliated with WhatsApp or Meta; its responses are not official determinations or appeal decisions.



Updates: [official channel](https://t.me/number_venom) · [owner](https://t.me/mr_darkvenom)







