// ── Build all steps for b^n mod m ─────────────────────────────────────────────
function buildSteps(b, n, m) {
  // Convert n to bits, LSB first
  const bits = [];
  let tmp = n;
  if (tmp === 0) bits.push(0);
  while (tmp > 0) {
    bits.push(tmp & 1);
    tmp = tmp >>> 1;
  }

  const rows = [];   // one entry per table row
  const steps = [];  // one entry per animation step

  let x = 1;
  let r = ((b % m) + m) % m;

  // ── Initial row (shown from step 0) ──────────────────────────────────────────
  rows.push({
    type: 'init',
    i: null, bit: null,
    x, r,
    xChanged: false, xBefore: null, rBefore: null,
    rPower: 0   // r = b^(2^0) = b^1
  });

  steps.push({
    type: 'init',
    visibleRows: 1,
    activeRowIdx: 0,
    codeHL: { cl3: 'hl-init' },
    curBitIdx: null,
    xVal: x, rVal: r,
    explain:
      `<b>Initialize:</b> <code><span class="hi-x">x = 1</span></code> and
       <code><span class="hi-r">r = b mod m = ${b} mod ${m} = ${r}</span></code>.<br><br>
       Two variables track the computation:<br>
       &bull; <span class="hi-r">r</span> tracks the <em>raw powers</em> of b: starting at
         b<sup>1</sup>&nbsp;=&nbsp;${r}, it gets <strong>squared every iteration</strong>
         (b<sup>1</sup> → b<sup>2</sup> → b<sup>4</sup> → b<sup>8</sup> → &hellip;) regardless of the bits of n.<br>
       &bull; <span class="hi-x">x</span> accumulates the <em>partial answer</em>: it starts at 1
         and is multiplied by r <strong>only when the current bit of n is 1</strong>.`
  });

  // ── One step per iteration ────────────────────────────────────────────────────
  for (let i = 0; i < bits.length; i++) {
    const bit = bits[i];
    const xBefore = x;
    const rBefore = r;
    const xChanged = (bit === 1);

    if (xChanged) x = (x * rBefore) % m;
    r = (rBefore * rBefore) % m;

    rows.push({
      type: 'iter',
      i, bit,
      isLSB: i === 0,
      isMSB: i === bits.length - 1,
      x, r,
      xChanged, xBefore, rBefore,
      rPower: i + 1   // after update r = b^(2^(i+1))
    });

    // Which code lines to highlight
    const codeHL = { cl4: 'hl-loop' };
    if (xChanged) {
      codeHL.cl5 = 'hl-x';
      codeHL.cl6 = 'hl-x';
    } else {
      codeHL.cl5 = 'hl-check';
    }
    codeHL.cl7 = 'hl-r';

    // Explanation text
    let xPart;
    if (xChanged) {
      xPart =
        `N[${i}] = <span class="hi-x">1</span> &rarr;
         <span class="hi-x">x = x &times; r mod m = ${xBefore} &times; ${rBefore} mod ${m} = <b>${x}</b></span>.<br>
         &nbsp;&nbsp;The power b<sup>2<sup>${i}</sup></sup>&nbsp;=&nbsp;${rBefore}
         <em>is included</em> in the running product (bit is 1).`;
    } else {
      xPart =
        `N[${i}] = <span class="hi-no">0</span> &rarr; x stays <b>${x}</b>.
         The power b<sup>2<sup>${i}</sup></sup>&nbsp;=&nbsp;${rBefore}
         is <em>skipped</em> (bit is 0).`;
    }

    const rPart =
      `<em>Always:</em> <span class="hi-r">r = r&sup2; mod m =
       ${rBefore}&sup2; mod ${m} = <b>${r}</b></span> &nbsp;
       (now holds b<sup>2<sup>${i + 1}</sup></sup> mod m, ready for the next bit).`;

    steps.push({
      type: 'iter',
      visibleRows: i + 2,
      activeRowIdx: i + 1,
      codeHL,
      curBitIdx: i,
      xVal: x, rVal: r,
      explain: `<b>Iteration i&nbsp;=&nbsp;${i}:</b><br>${xPart}<br>${rPart}`
    });
  }

  // ── Done step ─────────────────────────────────────────────────────────────────
  const binaryMSBFirst = bits.slice().reverse().join('');
  steps.push({
    type: 'done',
    visibleRows: rows.length,
    activeRowIdx: -1,
    codeHL: { cl9: 'hl-ret' },
    curBitIdx: null,
    xVal: x, rVal: r,
    explain:
      `<b>Return x = ${x}.</b><br><br>
       Final answer: <span class="hi-x">${b}<sup>${n}</sup> mod ${m} = <b>${x}</b></span>.<br><br>
       The answer was built by multiplying together exactly the b<sup>2<sup>i</sup></sup> values
       corresponding to <em>set bits</em> in n = ${n} = (${binaryMSBFirst})<sub>2</sub>.<br>
       The <span class="hi-r">r column</span> generated all the raw powers &mdash; squaring blindly every step.
       The <span class="hi-x">x column</span> picked up only the ones whose bit was 1.`
  });

  return { steps, rows, bits, b, n, m, bReduced: ((b % m) + m) % m };
}

// ── DOM refs ──────────────────────────────────────────────────────────────────
const el = {
  baseIn:       document.getElementById('baseIn'),
  expIn:        document.getElementById('expIn'),
  modIn:        document.getElementById('modIn'),
  buildBtn:     document.getElementById('buildBtn'),
  prevBtn:      document.getElementById('prevBtn'),
  nextBtn:      document.getElementById('nextBtn'),
  resetBtn:     document.getElementById('resetBtn'),
  stepLabel:    document.getElementById('stepLabel'),
  problemDisplay: document.getElementById('problemDisplay'),
  bitsRow:      document.getElementById('bitsRow'),
  xVal:         document.getElementById('xVal'),
  rVal:         document.getElementById('rVal'),
  tbody:        document.getElementById('tbody'),
  explainCard:  document.getElementById('explainCard'),
  cl:           {}
};
for (let i = 1; i <= 10; i++) el.cl[`cl${i}`] = document.getElementById(`cl${i}`);

const ALL_HL = ['hl-init', 'hl-loop', 'hl-x', 'hl-check', 'hl-r', 'hl-ret'];

let state = null;
let curStep = 0;

// ── Render ────────────────────────────────────────────────────────────────────
function render() {
  const step = state.steps[curStep];
  const { rows, bits } = state;

  // Step label
  el.stepLabel.textContent = `Step ${curStep + 1} / ${state.steps.length}`;

  // Variable display
  el.xVal.textContent = step.xVal !== undefined ? step.xVal : '—';
  el.rVal.textContent = step.rVal !== undefined ? step.rVal : '—';

  // Code highlight: clear all, then apply
  Object.values(el.cl).forEach(c => { if (c) ALL_HL.forEach(cls => c.classList.remove(cls)); });
  if (step.codeHL) {
    Object.entries(step.codeHL).forEach(([id, cls]) => {
      if (el.cl[id]) el.cl[id].classList.add(cls);
    });
  }

  // Binary bit boxes
  el.bitsRow.innerHTML = '';
  bits.forEach((bit, idx) => {
    const box = document.createElement('div');
    box.className = `bit-box ${bit === 1 ? 'b1' : 'b0'}`;
    if (step.curBitIdx === idx) box.classList.add('active-bit');

    const val = document.createElement('span');
    val.textContent = bit;
    box.appendChild(val);

    const label = document.createElement('span');
    label.className = 'bidx';
    label.textContent = `[${idx}]`;
    box.appendChild(label);

    el.bitsRow.appendChild(box);
  });

  // Table
  el.tbody.innerHTML = '';
  for (let ri = 0; ri < step.visibleRows; ri++) {
    const row = rows[ri];
    const isActive = (ri === step.activeRowIdx);
    const tr = document.createElement('tr');
    if (isActive) tr.classList.add('active-row');
    if (row.type === 'init') tr.classList.add('init-row');

    // i cell
    const iCell = document.createElement('td');
    iCell.textContent = row.i === null ? 'init' : row.i;
    tr.appendChild(iCell);

    // N[i] cell
    const bitCell = document.createElement('td');
    if (row.bit === null) {
      bitCell.textContent = '—';
    } else {
      let label = String(row.bit);
      if (row.isLSB) label += ' (LSB)';
      if (row.isMSB) label += ' (MSB)';
      bitCell.textContent = label;
      bitCell.className = row.bit === 1 ? 'bit1' : 'bit0';
    }
    tr.appendChild(bitCell);

    // x cell
    const xCell = document.createElement('td');
    xCell.className = 'xc';
    if (isActive && row.xChanged) xCell.classList.add('x-updated');
    else if (isActive && row.type === 'iter' && !row.xChanged) xCell.classList.add('x-same');
    xCell.textContent = row.x;
    tr.appendChild(xCell);

    // r cell  (value + small power annotation)
    const rCell = document.createElement('td');
    rCell.className = 'rc';

    const rMain = document.createElement('span');
    rMain.textContent = row.r;
    rCell.appendChild(rMain);

    const rNote = document.createElement('small');
    rNote.className = 'rpow';
    const rNote2 = document.createElement('small');
    rNote2.className = 'rpow2';
    const rNote3 = document.createElement('small');
    rNote3.className = 'rpow3';

    if (row.type === 'init') {
      rNote.innerHTML = `start: ${state.bReduced}<sup>1</sup> mod ${state.m}`;
      rNote2.innerHTML = `${state.bReduced} mod ${state.m}`;
      rNote3.innerHTML = `= ${row.r}`;
    } else {
      const pow = 2 ** row.i;
      rNote.innerHTML = `${state.bReduced}<sup>${pow}</sup> &times; ${state.bReduced}<sup>${pow}</sup>`;
      rNote2.innerHTML = `${row.rBefore} &times; ${row.rBefore}`;
      rNote3.innerHTML = `mod ${state.m} = ${row.r}`;
    }

    rCell.appendChild(rNote);
    rCell.appendChild(rNote2);
    rCell.appendChild(rNote3);

    tr.appendChild(rCell);

    el.tbody.appendChild(tr);
  }

  // Explanation
  el.explainCard.innerHTML = step.explain;

  // Nav buttons
  el.prevBtn.disabled = (curStep === 0);
  el.nextBtn.disabled = (curStep === state.steps.length - 1);
  el.resetBtn.disabled = false;
}

// ── Event handlers ────────────────────────────────────────────────────────────
el.buildBtn.addEventListener('click', () => {
  const b = parseInt(el.baseIn.value, 10);
  const n = parseInt(el.expIn.value, 10);
  const m = parseInt(el.modIn.value, 10);

  if (isNaN(b) || isNaN(n) || isNaN(m) || b < 0 || n < 0 || m < 2) {
    el.explainCard.innerHTML = '<b style="color:#f87171">Invalid inputs: need b ≥ 0, n ≥ 0, m ≥ 2.</b>';
    return;
  }

  state = buildSteps(b, n, m);
  curStep = 0;

  el.problemDisplay.textContent = `${b}^${n} mod ${m}`;
  el.prevBtn.disabled = false;
  el.nextBtn.disabled = false;

  render();
});

el.prevBtn.addEventListener('click', () => {
  if (!state || curStep === 0) return;
  curStep--;
  render();
});

el.nextBtn.addEventListener('click', () => {
  if (!state || curStep === state.steps.length - 1) return;
  curStep++;
  render();
});

el.resetBtn.addEventListener('click', () => {
  if (!state) return;
  curStep = 0;
  render();
});
