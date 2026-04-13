function byId(id) {
  return document.getElementById(id);
}

function toBigInt(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return null;
  return BigInt(n);
}

function modPow(base, exp, mod) {
  if (mod <= 0n) return null;
  base = ((base % mod) + mod) % mod;
  let result = 1n;
  let e = exp;
  let b = base;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % mod;
    b = (b * b) % mod;
    e >>= 1n;
  }
  return result;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const el = {
  primeInput: byId('primeInput'),
  baseInput: byId('baseInput'),

  aPrivate: byId('aPrivate'),
  aPublic: byId('aPublic'),
  aPartnerPublic: byId('aPartnerPublic'),
  aShared: byId('aShared'),

  aRandomBtn: byId('aRandomBtn'),
  aPublicBtn: byId('aPublicBtn'),
  aSharedBtn: byId('aSharedBtn'),
  resetBtn: byId('resetBtn'),
  status: byId('status')
};

function params() {
  const p = toBigInt(el.primeInput.value);
  const g = toBigInt(el.baseInput.value);
  if (p === null || g === null || p <= 2n || g <= 1n || g >= p) {
    return null;
  }
  return { p, g };
}

function setStatus(msg, type = '') {
  el.status.textContent = msg;
  el.status.classList.remove('ok', 'bad');
  if (type) el.status.classList.add(type);
}

function computePublic(privateInput, publicOutput, who) {
  const pg = params();
  const priv = toBigInt(privateInput.value);
  if (!pg) {
    setStatus('Set valid public parameters first (p > 2 and 1 < g < p).', 'bad');
    return;
  }
  if (priv === null || priv < 0n || priv >= pg.p) {
    setStatus(`Enter a private number for ${who} in range 0 to p-1.`, 'bad');
    return;
  }

  const pub = modPow(pg.g, priv, pg.p);
  publicOutput.value = pub.toString();
  setStatus(`${who} public value computed and ready to share.`);
}

function computeShared(myPrivateInput, partnerPublicInput, sharedOutput, who) {
  const pg = params();
  const priv = toBigInt(myPrivateInput.value);
  const partnerPub = toBigInt(partnerPublicInput.value);

  if (!pg) {
    setStatus('Set valid public parameters first (p > 2 and 1 < g < p).', 'bad');
    return;
  }
  if (priv === null || priv < 0n || priv >= pg.p) {
    setStatus(`Enter a private number for ${who} in range 0 to p-1.`, 'bad');
    return;
  }
  if (partnerPub === null || partnerPub < 0n || partnerPub >= pg.p) {
    setStatus(`Enter a valid partner public value for ${who} (0 to p-1).`, 'bad');
    return;
  }

  const secret = modPow(partnerPub, priv, pg.p);
  sharedOutput.value = secret.toString();
  setStatus(`${who} shared secret computed.`);
}

function resetAll() {
  el.primeInput.value = '103';
  el.baseInput.value = '5';

  el.aPrivate.value = '6';

  el.aPublic.value = '';
  el.aPartnerPublic.value = '';
  el.aShared.value = '';

  setStatus('Pick private a in [0, p-1], compute A, share A, enter partner B, then compute shared secret.');
}

el.aRandomBtn.addEventListener('click', () => {
  const pg = params();
  if (!pg) {
    setStatus('Set valid public parameters first (p > 2 and 1 < g < p).', 'bad');
    return;
  }
  el.aPrivate.value = String(randomInt(0, Number(pg.p - 1n)));
  setStatus('Random private a selected in range 0 to p-1.');
});

el.aPublicBtn.addEventListener('click', () => computePublic(el.aPrivate, el.aPublic, 'you'));

el.aSharedBtn.addEventListener('click', () => computeShared(el.aPrivate, el.aPartnerPublic, el.aShared, 'you'));

el.resetBtn.addEventListener('click', resetAll);

setStatus('Pick private a in [0, p-1], compute A, share A, enter partner B, then compute shared secret.');
