const CODE_LINES = [
  'void allCombosHelper(const vector<char>& letters, int n, string curr)',
  '{',
  '   if(n == curr.size()){',
  '     cout << curr << endl;',
  '   }',
  '   else {',
  '      for(unsigned int i=0; i < letters.size(); i++){',
  '         // try adding i-th letter and recurse',
  '        allCombosHelper(letters, n, curr+letters[i]);',
  '      }',
  '   }',
  '}',
  '',
  'void allCombos(const vector<char>& letters, int n)',
  '{',
  '   allCombosHelper(letters, n, "");',
  '}'
];

class ComboRecursionDemo {
  constructor() {
    this.letters = [];
    this.n = 0;
    this.states = [];
    this.step = 0;
    this.isPlaying = false;
    this.playTimer = null;

    this.el = {
      lettersInput: document.getElementById('lettersInput'),
      lenInput: document.getElementById('lenInput'),
      buildBtn: document.getElementById('buildBtn'),
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      resetBtn: document.getElementById('resetBtn'),
      playBtn: document.getElementById('playBtn'),
      pauseBtn: document.getElementById('pauseBtn'),
      speedInput: document.getElementById('speedInput'),
      speedText: document.getElementById('speedText'),
      toggleCodeBtn: document.getElementById('toggleCodeBtn'),
      message: document.getElementById('message'),
      stepText: document.getElementById('stepText'),
      lineText: document.getElementById('lineText'),
      currText: document.getElementById('currText'),
      recursionGraphic: document.getElementById('recursionGraphic'),
      slots: document.getElementById('slots'),
      stack: document.getElementById('stack'),
      outputs: document.getElementById('outputs'),
      codePanel: document.getElementById('codePanel'),
      codeBlock: document.getElementById('codeBlock')
    };

    this.renderCode();
    this.handleSpeedChange();
    this.bindEvents();
    this.updateButtons();
  }

  bindEvents() {
    this.el.buildBtn.addEventListener('click', () => this.buildTrace());
    this.el.prevBtn.addEventListener('click', () => this.goPrev());
    this.el.nextBtn.addEventListener('click', () => this.goNext());
    this.el.resetBtn.addEventListener('click', () => this.resetStep());
    this.el.playBtn.addEventListener('click', () => this.play());
    this.el.pauseBtn.addEventListener('click', () => this.pause());
    this.el.speedInput.addEventListener('input', () => this.handleSpeedChange());
    this.el.toggleCodeBtn.addEventListener('click', () => this.toggleCode());
  }

  handleSpeedChange() {
    this.el.speedText.textContent = `${this.getSpeedMs()} ms`;
    if (this.isPlaying) {
      this.restartPlayTimer();
    }
  }

  getSpeedMs() {
    return Number(this.el.speedInput.value);
  }

  play() {
    if (!this.states.length) return;
    if (this.step >= this.states.length - 1) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.restartPlayTimer();
    this.updateButtons();
  }

  pause() {
    this.isPlaying = false;
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    this.updateButtons();
  }

  restartPlayTimer() {
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }

    this.playTimer = setInterval(() => {
      if (!this.isPlaying) return;
      if (this.step >= this.states.length - 1) {
        this.pause();
        return;
      }
      this.step += 1;
      this.renderState();
      this.updateButtons();
    }, this.getSpeedMs());
  }

  setMessage(text, type = 'info') {
    this.el.message.textContent = text;
    this.el.message.className = `message ${type}`;
  }

  parseLetters(raw) {
    const chars = [];
    for (const c of raw) {
      if (!c.trim()) continue;
      chars.push(c);
    }
    const uniq = [];
    const seen = new Set();
    for (const c of chars) {
      if (!seen.has(c)) {
        seen.add(c);
        uniq.push(c);
      }
    }
    return uniq;
  }

  cloneStack(stack) {
    return stack.map(f => ({ ...f }));
  }

  pushState({ line, curr, stack, outputs, message }) {
    this.states.push({
      line,
      curr,
      stack: this.cloneStack(stack),
      outputs: [...outputs],
      message
    });
  }

  buildTrace() {
    const letters = this.parseLetters(this.el.lettersInput.value);
    const n = Number(this.el.lenInput.value);

    if (!Number.isInteger(n) || n < 0) {
      this.setMessage('n must be a non-negative integer.', 'error');
      return;
    }
    if (letters.length === 0) {
      this.setMessage('Please enter at least one letter.', 'error');
      return;
    }

    this.letters = letters;
    this.n = n;
    this.states = [];
    this.pause();

    const stack = [];
    const outputs = [];

    this.pushState({
      line: 14,
      curr: '',
      stack,
      outputs,
      message: `Start allCombos(letters={${letters.join(', ')}}, n=${n}).`
    });

    this.pushState({
      line: 16,
      curr: '',
      stack,
      outputs,
      message: 'Call allCombosHelper(letters, n, "").'
    });

    const helper = (curr) => {
      const depth = stack.length;
      stack.push({ depth, curr, loopI: null });
      this.pushState({
        line: 1,
        curr,
        stack,
        outputs,
        message: `Enter helper(curr="${curr}").`
      });

      this.pushState({
        line: 3,
        curr,
        stack,
        outputs,
        message: `Check base case: curr.size()=${curr.length}, n=${n}.`
      });

      if (curr.length === n) {
        outputs.push(curr);
        this.pushState({
          line: 4,
          curr,
          stack,
          outputs,
          message: `Base case true → output "${curr}".`
        });

        this.pushState({
          line: 5,
          curr,
          stack,
          outputs,
          message: 'Return from base case.'
        });

        stack.pop();
        return;
      }

      this.pushState({
        line: 6,
        curr,
        stack,
        outputs,
        message: 'Base case false → iterate letters in for-loop.'
      });

      for (let i = 0; i < letters.length; i++) {
        stack[stack.length - 1].loopI = i;
        this.pushState({
          line: 7,
          curr,
          stack,
          outputs,
          message: `Loop i=${i}, try letter '${letters[i]}'.`
        });

        const nextCurr = curr + letters[i];
        this.pushState({
          line: 9,
          curr,
          stack,
          outputs,
          message: `Recurse with curr+letters[i] = "${nextCurr}".`
        });

        helper(nextCurr);

        this.pushState({
          line: 10,
          curr,
          stack,
          outputs,
          message: `Returned from recursive call for i=${i}. Continue loop.`
        });
      }

      stack[stack.length - 1].loopI = null;

      this.pushState({
        line: 11,
        curr,
        stack,
        outputs,
        message: 'For-loop done, leave else block.'
      });

      stack.pop();
    };

    helper('');

    this.pushState({
      line: 17,
      curr: '',
      stack,
      outputs,
      message: `allCombos complete. Generated ${outputs.length} combinations.`
    });

    this.step = 0;
    this.setMessage('Trace built. Use Next/Prev/Reset to step through recursion.', 'info');
    this.renderState();
    this.updateButtons();
  }

  renderCode() {
    this.el.codeBlock.innerHTML = CODE_LINES.map((line, idx) => {
      const ln = idx + 1;
      const safe = line
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
      return `<div class="code-line" data-line="${ln}"><span class="ln">${ln}</span><span>${safe}</span></div>`;
    }).join('');
  }

  renderState() {
    if (this.states.length === 0) {
      this.el.stepText.textContent = '0 / 0';
      this.el.lineText.textContent = '—';
      this.el.currText.textContent = '""';
      this.el.recursionGraphic.innerHTML = '';
      this.el.slots.innerHTML = '';
      this.el.stack.innerHTML = '<div class="frame">No active calls.</div>';
      this.el.outputs.innerHTML = '';
      this.highlightCodeLine(null);
      return;
    }

    const state = this.states[this.step];
    this.el.stepText.textContent = `${this.step + 1} / ${this.states.length}`;
    this.el.lineText.textContent = String(state.line);
    this.el.currText.textContent = `"${state.curr}"`;

    this.setMessage(state.message, 'info');
    this.renderRecursionGraphic(state);

    const slotsHtml = [];
    for (let i = 0; i < this.n; i++) {
      const ch = i < state.curr.length ? state.curr[i] : '_';
      slotsHtml.push(`<div class="slot ${i < state.curr.length ? 'filled' : ''}">${ch}</div>`);
    }
    this.el.slots.innerHTML = slotsHtml.join('');

    if (state.stack.length === 0) {
      this.el.stack.innerHTML = '<div class="frame">No active calls.</div>';
    } else {
      this.el.stack.innerHTML = [...state.stack].reverse().map((f, idx) => {
        const loopText = f.loopI === null ? '—' : String(f.loopI);
        return `<div class="frame ${idx === 0 ? 'current' : ''}">depth=${f.depth}, curr="${f.curr}", i=${loopText}</div>`;
      }).join('');
    }

    this.el.outputs.innerHTML = state.outputs.length
      ? state.outputs.map(out => `<span class="out-chip">${out}</span>`).join('')
      : '<span style="color:#718096">No outputs yet.</span>';

    this.highlightCodeLine(state.line);
  }

  renderRecursionGraphic(state) {
    const k = this.letters.length;
    const framesByDepth = new Map();
    for (const frame of state.stack) {
      framesByDepth.set(frame.depth, frame);
    }

    const optionsHtml = this.letters
      .map(ch => `<div class="option-cell">${ch}</div>`)
      .join('');

    const colsHtml = [];
    for (let pos = 0; pos < this.n; pos++) {
      const frame = framesByDepth.get(pos);
      const show = !!(frame && frame.loopI !== null);

      const cells = [];
      for (let i = 0; i < k; i++) {
        const active = show && frame.loopI === i;
        cells.push(`<div class="i-cell ${active ? 'active' : ''}">${i}</div>`);
      }

      colsHtml.push(`
        <div class="i-col ${show ? '' : 'hidden'}">
          <div class="i-head">i</div>
          ${cells.join('')}
        </div>
      `);
    }

    const partialHtml = [];
    for (let i = 0; i < this.n; i++) {
      const ch = i < state.curr.length ? state.curr[i] : '-';
      partialHtml.push(`<div class="partial-cell ${i < state.curr.length ? '' : 'empty'}">${ch}</div>`);
    }

    this.el.recursionGraphic.innerHTML = `
      <div class="rg-top">
        <div class="rg-options-wrap">
          <div class="rg-options-label">Options</div>
          <div class="options-col">${optionsHtml}</div>
        </div>
        <div class="i-cols">${colsHtml.join('')}</div>
      </div>
      <div class="rg-bottom">
        <div class="rg-partial-label">Partial Solution</div>
        <div class="partial-row">${partialHtml.join('')}</div>
      </div>
    `;
  }

  highlightCodeLine(lineNum) {
    this.el.codeBlock.querySelectorAll('.code-line').forEach(el => {
      el.classList.toggle('active', Number(el.dataset.line) === lineNum);
    });
  }

  goPrev() {
    if (this.isPlaying) return;
    if (this.step <= 0) return;
    this.step -= 1;
    this.renderState();
    this.updateButtons();
  }

  goNext() {
    if (this.isPlaying) return;
    if (this.step >= this.states.length - 1) return;
    this.step += 1;
    this.renderState();
    this.updateButtons();
  }

  resetStep() {
    if (this.isPlaying) return;
    if (!this.states.length) return;
    this.step = 0;
    this.renderState();
    this.updateButtons();
  }

  toggleCode() {
    const isHidden = this.el.codePanel.style.display === 'none';
    this.el.codePanel.style.display = isHidden ? '' : 'none';
    this.el.toggleCodeBtn.textContent = isHidden ? 'Hide Code Panel' : 'Show Code Panel';
  }

  updateButtons() {
    const hasStates = this.states.length > 0;
    const atEnd = hasStates && this.step >= this.states.length - 1;

    this.el.prevBtn.disabled = !hasStates || this.step === 0 || this.isPlaying;
    this.el.nextBtn.disabled = !hasStates || atEnd || this.isPlaying;
    this.el.resetBtn.disabled = !hasStates || this.isPlaying;
    this.el.playBtn.disabled = !hasStates || atEnd || this.isPlaying;
    this.el.pauseBtn.disabled = !this.isPlaying;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new ComboRecursionDemo();
});
