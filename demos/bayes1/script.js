const BOXES = {
  B1: { gold: 2, cardinal: 7 },
  B2: { gold: 4, cardinal: 3 }
};

const TOTAL_B1 = BOXES.B1.gold + BOXES.B1.cardinal;
const TOTAL_B2 = BOXES.B2.gold + BOXES.B2.cardinal;

// Experiment: choose a box uniformly at random, then choose a coin from that box.
const P_CC_B1 = BOXES.B1.cardinal / TOTAL_B1; // 7/9
const P_CC_B2 = BOXES.B2.cardinal / TOTAL_B2; // 3/7
const P_B1 = 1 / 2;
const P_B2 = 1 / 2;
const TERM1 = P_CC_B1 * P_B1; // 7/18
const TERM2 = P_CC_B2 * P_B2; // 3/14
const POST_B1_CC = TERM1 / (TERM1 + TERM2); // 49/76

const STEPS = [
  {
    caption: 'Setup: Box 1 has 2 gold + 7 cardinal. Box 2 has 4 gold + 3 cardinal.',
    formula: ''
  },
  {
    caption: 'What is P(CC|B1)? Focus on Box 1 — what fraction of its coins are cardinal?',
    formula: 'P(CC | B1) = ?'
  },
  {
    caption: 'P(CC|B1) = 7/9 — 7 cardinal coins out of 9 total in Box 1.',
    formula: 'P(CC | B1) = 7/9'
  },
  {
    caption: 'Now flip it: you draw a coin and it is cardinal. What is P(B1|CC)?',
    formula: 'Solve: P(B1 | CC) = ?'
  },
  {
    caption: 'By Bayes\' theorem (without solving yet):',
    formula: 'P(B1|CC) = P(CC|B1)·P(B1) / P(CC)'
  },
  {
    caption: 'What is P(CC)? Is it just (7+3)/(9+7) — total cardinals over total coins? If not, how can we compute P(CC) using the Law of Total Probability?',
    formula: 'P(CC) = (7+3)/(9+7) ?'
  },
  {
    caption: 'By Law of Total Probability: P(CC) = P(CC|B1)·P(B1) + P(CC|B2)·P(B2)',
    formula: 'P(B1|CC) = [P(CC|B1)·P(B1)] / [P(CC|B1)·P(B1) + P(CC|B2)·P(B2)]'
  },
  {
    caption: 'Final comparison: forward vs inverse condition.',
    formula: 'P(CC | B1) = 7/9   vs   P(B1 | CC) = 49/76 ≈ 0.6447'
  }
];

class BayesDemo {
  constructor() {
    this.step = 0;
    this.isPlaying = false;
    this.timer = null;

    this.el = {
      prevBtn: document.getElementById('prevBtn'),
      nextBtn: document.getElementById('nextBtn'),
      playBtn: document.getElementById('playBtn'),
      pauseBtn: document.getElementById('pauseBtn'),
      resetBtn: document.getElementById('resetBtn'),
      stepText: document.getElementById('stepText'),
      caption: document.getElementById('caption'),
      formula: document.getElementById('formulaBox'),
      boxes: document.getElementById('boxesArea'),
      breakdownPanel: document.getElementById('breakdownPanel'),
      breakdownEq: document.getElementById('breakdownEq'),
      barTerm1: document.getElementById('barTerm1'),
      barTerm2: document.getElementById('barTerm2'),
      term1Text: document.getElementById('term1Text'),
      term2Text: document.getElementById('term2Text')
    };

    this.bind();
    this.render();
  }

  bind() {
    this.el.prevBtn.addEventListener('click', () => this.prev());
    this.el.nextBtn.addEventListener('click', () => this.next());
    this.el.playBtn.addEventListener('click', () => this.play());
    this.el.pauseBtn.addEventListener('click', () => this.pause());
    this.el.resetBtn.addEventListener('click', () => this.reset());
  }

  reset() {
    this.pause();
    this.step = 0;
    this.render();
  }

  prev() {
    if (this.isPlaying) return;
    if (this.step === 0) return;
    this.step -= 1;
    this.render();
  }

  next() {
    if (this.isPlaying) return;
    if (this.step >= STEPS.length - 1) return;
    this.step += 1;
    this.render();
  }

  play() {
    if (this.isPlaying) return;
    if (this.step >= STEPS.length - 1) return;
    this.isPlaying = true;
    this.timer = setInterval(() => {
      if (this.step >= STEPS.length - 1) {
        this.pause();
        return;
      }
      this.step += 1;
      this.render();
    }, 1400);
    this.updateButtons();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.updateButtons();
  }

  makeCoins(type, count, sourceClass = '') {
    let html = '';
    for (let i = 1; i <= count; i++) {
      html += `<div class="coin ${type} ${sourceClass}" data-type="${type}" data-source="${sourceClass}">${type === 'gold' ? 'Gold' : 'Cardinal'} ${i}</div>`;
    }
    return html;
  }

  renderBoxes() {
    this.el.boxes.innerHTML = `
      <div class="box" id="box1">
        <h2>Box 1 (B1)</h2>
        <div class="coin-grid" id="box1Coins">
          ${this.makeCoins('gold', BOXES.B1.gold)}
          ${this.makeCoins('cardinal', BOXES.B1.cardinal)}
        </div>
      </div>
      <div class="box" id="box2">
        <h2>Box 2 (B2)</h2>
        <div class="coin-grid" id="box2Coins">
          ${this.makeCoins('gold', BOXES.B2.gold)}
          ${this.makeCoins('cardinal', BOXES.B2.cardinal)}
        </div>
      </div>
    `;
  }

  applyStepStyling() {
    const s = this.step;
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');
    const allCoins = this.el.boxes.querySelectorAll('.coin');

    allCoins.forEach(c => c.classList.remove('dim', 'highlight', 'source-b1', 'source-b2'));
    box1.classList.remove('active');
    box2.classList.remove('active');

    // Step 2: ask P(CC|B1) — focus on B1, dim B2
    if (s === 1) {
      box1.classList.add('active');
      this.el.boxes.querySelectorAll('#box2 .coin').forEach(c => c.classList.add('dim'));
    }

    // Step 3: show P(CC|B1)=7/9 — highlight cardinals in B1, dim rest
    if (s === 2) {
      box1.classList.add('active');
      this.el.boxes.querySelectorAll('#box2 .coin').forEach(c => c.classList.add('dim'));
      this.el.boxes.querySelectorAll('#box1 .coin.cardinal').forEach(c => c.classList.add('highlight'));
      this.el.boxes.querySelectorAll('#box1 .coin.gold').forEach(c => c.classList.add('dim'));
    }

    // Steps 4–6: observed CC — highlight all cardinals from both boxes
    if (s >= 3 && s <= 5) {
      this.el.boxes.querySelectorAll('.coin.gold').forEach(c => c.classList.add('dim'));
      this.el.boxes.querySelectorAll('.coin.cardinal').forEach(c => c.classList.add('highlight'));
    }

    // Steps 7–8: show source labels — B1 cardinals highlighted, B2 cardinals labeled
    if (s >= 6) {
      this.el.boxes.querySelectorAll('.coin.gold').forEach(c => c.classList.add('dim'));
      this.el.boxes.querySelectorAll('#box1 .coin.cardinal').forEach(c => {
        c.classList.add('highlight', 'source-b1');
      });
      this.el.boxes.querySelectorAll('#box2 .coin.cardinal').forEach(c => {
        c.classList.add('highlight', 'source-b2');
      });
    }
  }

  render() {
    const data = STEPS[this.step];
    this.el.stepText.textContent = `${this.step + 1} / ${STEPS.length}`;
    this.el.caption.textContent = data.caption;
    this.el.formula.textContent = data.formula;

    this.renderBoxes();
    this.applyStepStyling();
    this.renderBreakdown();
    this.updateButtons();
  }

  renderBreakdown() {
    const show = this.step >= 6;
    this.el.breakdownPanel.classList.toggle('hidden', !show);
    if (!show) return;

    this.el.breakdownEq.textContent = 'P(B1|CC) = [P(CC|B1)P(B1)] / [P(CC|B1)P(B1) + P(CC|B2)P(B2)]';

    this.el.term1Text.textContent = `(7/9)·(1/2) = 7/18 = ${TERM1.toFixed(4)}`;
    this.el.term2Text.textContent = `(3/7)·(1/2) = 3/14 = ${TERM2.toFixed(4)}`;

    const denom = TERM1 + TERM2;
    const w1 = (TERM1 / denom) * 100;
    const w2 = (TERM2 / denom) * 100;
    this.el.barTerm1.style.width = `${w1.toFixed(1)}%`;
    this.el.barTerm2.style.width = `${w2.toFixed(1)}%`;

    if (this.step === 7) {
      this.el.breakdownEq.textContent += ` = ${TERM1.toFixed(4)} / (${TERM1.toFixed(4)} + ${TERM2.toFixed(4)}) = ${POST_B1_CC.toFixed(4)} = 49/76`;
    }
  }

  updateButtons() {
    const atStart = this.step === 0;
    const atEnd = this.step === STEPS.length - 1;

    this.el.prevBtn.disabled = atStart || this.isPlaying;
    this.el.nextBtn.disabled = atEnd || this.isPlaying;
    this.el.playBtn.disabled = atEnd || this.isPlaying;
    this.el.pauseBtn.disabled = !this.isPlaying;
  }
}

window.addEventListener('DOMContentLoaded', () => new BayesDemo());
