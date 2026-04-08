const MODEL = {
  prevalence: 1 / 100000,
  truePositive: 0.99,
  trueNegative: 0.995
};

const P_D = MODEL.prevalence;
const P_NOT_D = 1 - P_D;
const P_TP_D = MODEL.truePositive;
const P_TP_NOT_D = 1 - MODEL.trueNegative;
const TERM1 = P_TP_D * P_D;
const TERM2 = P_TP_NOT_D * P_NOT_D;
const POST_D_TP = TERM1 / (TERM1 + TERM2);

const STEPS = [
  {
    caption: 'Setup: disease prevalence is 1 in 100,000. Test sensitivity is 99%, specificity is 99.5%.',
    formula: ''
  },
  {
    caption: 'Target quantity: probability you have disease given a positive test.',
    formula: 'Solve P(D|TP)'
  },
  {
    caption: 'Fill known values from the prompt.',
    formula: 'P(TP|D)=0.99,  P(TP|D̄)=0.005,  P(D)=1/100000'
  },
  {
    caption: 'Bayes inversion setup.',
    formula: 'P(D|TP) = [P(TP|D)P(D)] / [P(TP|D)P(D) + P(TP|D̄)P(D̄)]'
  },
  {
    caption: 'Compute weighted terms (numerator pieces).',
    formula: `P(TP|D)P(D)=${TERM1.toFixed(8)},  P(TP|D̄)P(D̄)=${TERM2.toFixed(8)}`
  },
  {
    caption: 'Normalize by dividing by total positive probability.',
    formula: `P(D|TP) = ${TERM1.toExponential(4)} / (${TERM1.toExponential(4)} + ${TERM2.toExponential(4)})`
  },
  {
    caption: 'Final answer: despite an accurate test, rarity dominates.',
    formula: `P(D|TP) = ${POST_D_TP.toFixed(6)} = ${(POST_D_TP * 100).toFixed(3)}%`
  }
];

class BayesDemo2 {
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
    if (this.isPlaying || this.step === 0) return;
    this.step -= 1;
    this.render();
  }

  next() {
    if (this.isPlaying || this.step >= STEPS.length - 1) return;
    this.step += 1;
    this.render();
  }

  play() {
    if (this.isPlaying || this.step >= STEPS.length - 1) return;
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

  renderBoxes() {
    this.el.boxes.innerHTML = `
      <div class="box" id="dCard">
        <h2>Disease (D)</h2>
        <p class="box-subtitle">Rare prior, but high true-positive rate</p>
        <div class="stats">
          <div id="d_prior" class="stat"><span class="k">P(D):</span>1/100000 = ${P_D.toFixed(5)}</div>
          <div id="d_tp" class="stat"><span class="k">P(TP|D):</span>0.99</div>
          <div id="d_term" class="stat"><span class="k">Term:</span>P(TP|D)P(D) = ${TERM1.toFixed(8)}</div>
        </div>
      </div>
      <div class="box" id="ndCard">
        <h2>No Disease (D̄)</h2>
        <p class="box-subtitle">Very common prior, small false-positive rate</p>
        <div class="stats">
          <div id="nd_prior" class="stat"><span class="k">P(D̄):</span>${P_NOT_D.toFixed(5)}</div>
          <div id="nd_tp" class="stat"><span class="k">P(TP|D̄):</span>${P_TP_NOT_D.toFixed(3)}</div>
          <div id="nd_term" class="stat"><span class="k">Term:</span>P(TP|D̄)P(D̄) = ${TERM2.toFixed(8)}</div>
        </div>
      </div>
    `;
  }

  applyStepStyling() {
    const s = this.step;
    const dCard = document.getElementById('dCard');
    const ndCard = document.getElementById('ndCard');
    const stats = this.el.boxes.querySelectorAll('.stat');

    stats.forEach(st => st.classList.remove('highlight', 'dim'));
    dCard.classList.remove('active');
    ndCard.classList.remove('active');

    if (s === 1) {
      dCard.classList.add('active');
      ndCard.classList.add('active');
    }

    if (s === 2) {
      document.getElementById('d_tp').classList.add('highlight');
      document.getElementById('nd_tp').classList.add('highlight');
      document.getElementById('d_prior').classList.add('highlight');
      document.getElementById('nd_prior').classList.add('highlight');
      document.getElementById('d_term').classList.add('dim');
      document.getElementById('nd_term').classList.add('dim');
    }

    if (s === 3) {
      dCard.classList.add('active');
      ndCard.classList.add('active');
      document.getElementById('d_term').classList.add('dim');
      document.getElementById('nd_term').classList.add('dim');
    }

    if (s >= 4) {
      document.getElementById('d_term').classList.add('highlight');
      document.getElementById('nd_term').classList.add('highlight');
    }

    if (s === 6) {
      document.getElementById('nd_term').classList.add('dim');
      document.getElementById('dCard').classList.add('active');
    }
  }

  renderBreakdown() {
    const show = this.step >= 4;
    this.el.breakdownPanel.classList.toggle('hidden', !show);
    if (!show) return;

    this.el.breakdownEq.textContent = 'P(D|TP) = [P(TP|D)P(D)] / [P(TP|D)P(D) + P(TP|D̄)P(D̄)]';
    this.el.term1Text.textContent = `(0.99)·(1/100000) = ${TERM1.toFixed(8)}`;
    this.el.term2Text.textContent = `(0.005)·(99999/100000) = ${TERM2.toFixed(8)}`;

    const denom = TERM1 + TERM2;
    this.el.barTerm1.style.width = `${((TERM1 / denom) * 100).toFixed(1)}%`;
    this.el.barTerm2.style.width = `${((TERM2 / denom) * 100).toFixed(1)}%`;

    if (this.step === 6) {
      this.el.breakdownEq.textContent += ` = ${POST_D_TP.toFixed(6)} (${(POST_D_TP * 100).toFixed(3)}%)`;
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

  updateButtons() {
    const atStart = this.step === 0;
    const atEnd = this.step === STEPS.length - 1;

    this.el.prevBtn.disabled = atStart || this.isPlaying;
    this.el.nextBtn.disabled = atEnd || this.isPlaying;
    this.el.playBtn.disabled = atEnd || this.isPlaying;
    this.el.pauseBtn.disabled = !this.isPlaying;
  }
}

window.addEventListener('DOMContentLoaded', () => new BayesDemo2());
