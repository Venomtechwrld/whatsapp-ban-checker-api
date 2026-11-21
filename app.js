const PROXY = 'https://venompx.manus.space/api/status';
const form = document.querySelector('#check-form');
const input = document.querySelector('#phone');
const button = document.querySelector('#submit');
const notice = document.querySelector('#notice');
const section = document.querySelector('#result-section');
const tree = document.querySelector('#tree');
const raw = document.querySelector('#raw-json');
const statusLine = document.querySelector('#http-status');

function addValue(parent, key, value) {
  if (value && typeof value === 'object') {
    const group = document.createElement('section'); group.className = 'group';
    const heading = document.createElement('h3'); heading.textContent = key; group.append(heading);
    if (Array.isArray(value)) value.forEach((item, i) => addValue(group, `[${i}]`, item));
    else Object.entries(value).forEach(([k, v]) => addValue(group, k, v));
    parent.append(group); return;
  }
  const row = document.createElement('div'); row.className = 'field-row';
  const k = document.createElement('span'); k.className = 'field-key'; k.textContent = key;
  const v = document.createElement('span'); v.className = 'field-value'; v.textContent = value === null ? 'null' : String(value);
  row.append(k, v); parent.append(row);
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const number = input.value.trim();
  if (!number) { notice.textContent = 'Enter an international phone number.'; input.focus(); return; }
  notice.textContent = '';
  button.disabled = true; button.querySelector('span').textContent = 'CHECKING…';
  try {
    const response = await fetch(PROXY, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ number }) });
    const text = await response.text();
    let body; try { body = JSON.parse(text); } catch { body = text; }
    section.hidden = false; tree.replaceChildren();
    statusLine.textContent = `HTTP ${response.status} · ${response.ok ? 'response received' : 'API returned an error'}`;
    raw.textContent = typeof body === 'string' ? body : JSON.stringify(body, null, 2);
    if (body && typeof body === 'object') Object.entries(body).forEach(([key, value]) => addValue(tree, key, value));
    else addValue(tree, 'response', body);
    section.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  } catch {
    notice.textContent = 'Could not reach the checker. Please try again shortly.';
  } finally {
    button.disabled = false; button.querySelector('span').textContent = 'CHECK STATUS';
  }
});

document.querySelector('#copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(raw.textContent); notice.textContent = 'Response JSON copied.'; }
  catch { notice.textContent = 'Clipboard unavailable. Select and copy the raw JSON below.'; }
});
