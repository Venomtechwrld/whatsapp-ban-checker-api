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
