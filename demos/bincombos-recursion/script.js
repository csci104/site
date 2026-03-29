const CODE_LINES = [
  '// user interface',
  'void binCombos(int len)',
  '{',
  '  binCombos("", len);',
  '}',
  '',
  '// helper-function',
  'void binCombos(string prefix,',
  '               int len)',
  '{',
  '  if(prefix.length() == len )',
  '    cout << prefix << endl;',
  '  else {',
  '    // recurse',
  '    binCombos(prefix + "0", len);',
  '    // recurse',
  '    binCombos(prefix + "1", len);',
  '  }',
  '}'
];

class BinComboRecursionDemo {
  constructor() {
    this.options = ['0', '1'];
    this.n = 0;
    this.states = [];
    this.step = 0;
    this.isPlaying = false;
    this.playTimer = null;

    this.el = {
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
    this.bindEvents();
    this.handleSpeedChange();
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

  setMessage(text, type = 'info') {
    this.el.message.textContent = text;
    this.el.message.className = `message ${type}`;
  }

  cloneStack(stack) {
    return stack.map(frame => ({ ...frame }));
  }

  pushState({ line, prefix, stack, outputs, message }) {
    this.states.push({
      line,
      prefix,
      stack: this.cloneStack(stack),
      outputs: [...outputs],
      message
    });
  }

  getSpeedMs() {
    return Number(this.el.speedInput.value);
  }

  handleSpeedChange() {
    this.el.speedText.textContent = `${this.getSpeedMs()} ms`;
    if (this.isPlaying) this.restartPlayTimer();
  }

  play() {
    if (!this.states.length || this.step >= this.states.length - 1 || this.isPlaying) return;
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

  buildTrace() {
    const n = Number(this.el.lenInput.value);
    if (!Number.isInteger(n) || n < 0) {
      this.setMessage('len must be a non-negative integer.', 'error');
      return;
    }

    this.n = n;
    this.states = [];
    this.pause();

    const stack = [];
    const outputs = [];

    this.pushState({
      line: 2,
      prefix: '',
      stack,
      outputs,
      message: `Start binCombos(len=${n}).`
    });

    this.pushState({
      line: 4,
      prefix: '',
      stack,
      outputs,
      message: 'Call binCombos("", len).'
    });

    const helper = (prefix) => {
      const depth = stack.length;
      stack.push({ depth, prefix, branch: null });

      this.pushState({
        line: 10,
        prefix,
        stack,
        outputs,
        message: `Enter helper(prefix="${prefix}").`
      });

      this.pushState({
        line: 11,
        prefix,
        stack,
        outputs,
        message: `Check base case: prefix.length()=${prefix.length}, len=${n}.`
      });

      if (prefix.length === n) {
        outputs.push(prefix);
        this.pushState({
          line: 12,
          prefix,
          stack,
          outputs,
          message: `Base case true → output "${prefix}".`
        });

        stack.pop();
        return;
      }

      this.pushState({
        line: 13,
        prefix,
        stack,
        outputs,
        message: 'Base case false → recurse on 0 then 1.'
      });

      stack[stack.length - 1].branch = 0;
      this.pushState({
        line: 15,
        prefix,
        stack,
        outputs,
        message: `Recurse with "${prefix}0".`
      });
      helper(prefix + '0');

      this.pushState({
        line: 15,
        prefix,
        stack,
        outputs,
        message: 'Returned from recurse(0).'
      });

      stack[stack.length - 1].branch = 1;
      this.pushState({
        line: 17,
        prefix,
        stack,
        outputs,
        message: `Recurse with "${prefix}1".`
      });
      helper(prefix + '1');

      this.pushState({
        line: 17,
        prefix,
        stack,
        outputs,
        message: 'Returned from recurse(1).'
      });

      stack[stack.length - 1].branch = null;
      this.pushState({
        line: 18,
        prefix,
        stack,
        outputs,
        message: 'Done with this call, return.'
      });

      stack.pop();
    };

    helper('');

    this.pushState({
      line: 5,
      prefix: '',
      stack,
      outputs,
      message: `binCombos complete. Generated ${outputs.length} binary combinations.`
    });

    this.step = 0;
    this.setMessage('Trace built. Use Next/Prev/Reset or Play/Pause.', 'info');
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
    if (!this.states.length) {
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
    this.el.currText.textContent = `"${state.prefix}"`;
    this.setMessage(state.message, 'info');

    this.renderRecursionGraphic(state);

    const slots = [];
    for (let i = 0; i < this.n; i++) {
      const ch = i < state.prefix.length ? state.prefix[i] : '-';
      slots.push(`<div class="slot ${i < state.prefix.length ? 'filled' : ''}">${ch}</div>`);
    }
    this.el.slots.innerHTML = slots.join('');

    if (!state.stack.length) {
      this.el.stack.innerHTML = '<div class="frame">No active calls.</div>';
    } else {
      this.el.stack.innerHTML = [...state.stack].reverse().map((f, idx) => {
        const branchText = f.branch === null ? '—' : String(f.branch);
        return `<div class="frame ${idx === 0 ? 'current' : ''}">depth=${f.depth}, prefix="${f.prefix}", bit=${branchText}</div>`;
      }).join('');
    }

    this.el.outputs.innerHTML = state.outputs.length
      ? state.outputs.map(v => `<span class="out-chip">${v}</span>`).join('')
      : '<span style="color:#718096">No outputs yet.</span>';

    this.highlightCodeLine(state.line);
  }

  renderRecursionGraphic(state) {
    const framesByDepth = new Map();
    for (const frame of state.stack) framesByDepth.set(frame.depth, frame);

    const optionsHtml = this.options.map(v => `<div class="option-cell">${v}</div>`).join('');

    const colsHtml = [];
    for (let pos = 0; pos < this.n; pos++) {
      const frame = framesByDepth.get(pos);
      const show = !!(frame && frame.branch !== null);

      const cells = [0, 1].map(v => {
        const active = show && frame.branch === v;
        return `<div class="i-cell ${active ? 'active' : ''}">${v}</div>`;
      }).join('');

      colsHtml.push(`
        <div class="i-col ${show ? '' : 'hidden'}">
          <div class="i-head">bit</div>
          ${cells}
        </div>
      `);
    }

    const partialHtml = [];
    for (let i = 0; i < this.n; i++) {
      const ch = i < state.prefix.length ? state.prefix[i] : '-';
      partialHtml.push(`<div class="partial-cell ${i < state.prefix.length ? '' : 'empty'}">${ch}</div>`);
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
    if (this.isPlaying || this.step <= 0) return;
    this.step -= 1;
    this.renderState();
    this.updateButtons();
  }

  goNext() {
    if (this.isPlaying || this.step >= this.states.length - 1) return;
    this.step += 1;
    this.renderState();
    this.updateButtons();
  }

  resetStep() {
    if (this.isPlaying || !this.states.length) return;
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
  new BinComboRecursionDemo();
});
