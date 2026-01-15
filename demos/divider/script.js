(function() {
  // Verilog code for display
  const verilogCode = [
    'module div (',
    '  input clk, rst, start, ack,',
    '  input [3:0] x_in, y_in,',
    '  output reg [3:0] quo,',
    '  output [3:0] rem',
    ');',
    '  localparam IDLE=2\'b00, COMP=2\'b01, DONE=2\'b10;',
    '  reg [1:0] state;',
    '  reg [3:0] x, y;',
    '  assign rem = x;',
    '',
    '  always @(posedge clk) begin',
    '    if (rst) begin',
    '      state <= IDLE;',
    '    end else begin',
    '      case (state)',
    '        IDLE: begin',
    '          if (start) begin',
    '            state <= COMP;',
    '            quo <= 4\'b0;',
    '          end',
    '          x <= x_in;',
    '          y <= y_in;',
    '        end',
    '        COMP: begin',
    '          if(x >= y) begin',
    '            x <= x - y;',
    '            quo <= quo + 1;',
    '          end else begin',
    '            state <= DONE;',
    '          end',
    '        end',
    '        DONE: begin',
    '          if (ack) begin',
    '            state <= IDLE;',
    '          end',
    '        end',
    '      endcase',
    '    end',
    '  end',
    'endmodule'
  ];

  // Simulate divider behavior: x_in=13, y_in=4, start=1 cycle 1, ack=1 after done
  const steps = [
    {
      cycle: 0,
      title: 'Initial State (Before Clock)',
      state: 'IDLE',
      x: '????',
      y: '????',
      quo: '????',
      rem: '????',
      activeLines: [],
      note: 'Reset state, waiting for start signal.'
    },
    {
      cycle: 1,
      title: 'Cycle 1: Capture inputs (IDLE → COMP)',
      state: 'COMP',
      x: 13,
      y: 4,
      quo: 0,
      rem: 13,
      activeLines: [16, 17, 18, 19, 20, 21, 22],
      highlightLines: [17, 20, 21, 22],
      inputs: { start: 1, ack: 0 },
      note: 'Start signal captured. Quotient cleared to 0. Inputs x_in=13, y_in=4 latched into x and y. State transitions to COMP.'
    },
    {
      cycle: 2,
      title: 'Cycle 2: First subtraction (13 - 4 = 9)',
      state: 'COMP',
      x: 9,
      y: 4,
      quo: 1,
      rem: 9,
      activeLines: [24, 25, 26, 27, 28],
      highlightLines: [25, 26, 27],
      inputs: { start: 0, ack: 0 },
      note: '13 >= 4 is true. Subtract y from x: 13 - 4 = 9. Increment quo: 0 + 1 = 1. Remain in COMP state.'
    },
    {
      cycle: 3,
      title: 'Cycle 3: Second subtraction (9 - 4 = 5)',
      state: 'COMP',
      x: 5,
      y: 4,
      quo: 2,
      rem: 5,
      activeLines: [24, 25, 26, 27, 28],
      highlightLines: [25, 26, 27],
      inputs: { start: 0, ack: 0 },
      note: '9 >= 4 is true. Subtract y from x: 9 - 4 = 5. Increment quo: 1 + 1 = 2. Remain in COMP state.'
    },
    {
      cycle: 4,
      title: 'Cycle 4: Third subtraction (5 - 4 = 1)',
      state: 'COMP',
      x: 1,
      y: 4,
      quo: 3,
      rem: 1,
      activeLines: [24, 25, 26, 27, 28],
      highlightLines: [25, 26, 27],
      inputs: { start: 0, ack: 0 },
      note: '5 >= 4 is true. Subtract y from x: 5 - 4 = 1. Increment quo: 2 + 1 = 3. Remain in COMP state.'
    },
    {
      cycle: 5,
      title: 'Cycle 5: Check fails, transition to DONE',
      state: 'DONE',
      x: 1,
      y: 4,
      quo: 3,
      rem: 1,
      activeLines: [24, 25, 29, 30],
      highlightLines: [24, 29, 30],
      inputs: { start: 0, ack: 0 },
      note: '1 >= 4 is false. State transitions to DONE. Final result: quotient=3, remainder=1. Division complete: 13 ÷ 4 = 3 R 1.'
    },
    {
      cycle: 6,
      title: 'Cycle 6: Result available (ack not set yet)',
      state: 'DONE',
      x: 1,
      y: 4,
      quo: 3,
      rem: 1,
      activeLines: [31, 32, 33],
      highlightLines: [32, 33],
      inputs: { start: 0, ack: 0 },
      note: 'Holding in DONE state waiting for ack signal to return to IDLE. Values stable.'
    },
    {
      cycle: 7,
      title: 'Cycle 7: Acknowledge and return to IDLE',
      state: 'IDLE',
      x: 1,
      y: 4,
      quo: 3,
      rem: 1,
      activeLines: [31, 32, 33],
      highlightLines: [32, 33],
      inputs: { start: 0, ack: 1 },
      note: 'Ack signal asserted. State returns to IDLE, ready for next division operation.'
    }
  ];

  // DOM elements
  const codeArea = document.getElementById('codeArea');
  const stateDisplay = document.getElementById('stateDisplay');
  const waveformDisplay = document.getElementById('waveformDisplay');
  const infoText = document.getElementById('infoText');
  const playBtn = document.getElementById('playBtn');
  const stepBtn = document.getElementById('stepBtn');
  const resetBtn = document.getElementById('resetBtn');
  const cycleInfo = document.getElementById('cycleInfo');

  let currentStep = 0;
  let playActive = false;

  function highlightCode(text) {
    const keywords = new Set(['module', 'input', 'output', 'reg', 'localparam', 'always', 'posedge', 'if', 'else', 'begin', 'end', 'case', 'endcase', 'assign', 'default']);
    const types = new Set(['clk', 'rst', 'start', 'ack', 'x_in', 'y_in', 'quo', 'rem', 'state', 'x', 'y', 'IDLE', 'COMP', 'DONE']);
    
    const parts = text.split(/("[^"]*")/g);
    let result = '';
    
    parts.forEach(part => {
      if (!part) return;
      if (/^"[^"]*"$/.test(part)) {
        result += `<span style="color:#ce9178">${part}</span>`;
      } else {
        let processed = part;
        const tokenRe = /\b(module|input|output|reg|localparam|always|posedge|if|else|begin|end|case|endcase|assign|default|clk|rst|start|ack|x_in|y_in|quo|rem|state|x|y|IDLE|COMP|DONE|\d+)\b/g;
        processed = processed.replace(tokenRe, (m) => {
          if (keywords.has(m)) return `<span style="color:#569cd6;font-weight:700">${m}</span>`;
          if (types.has(m)) return `<span style="color:#4ec9b0">${m}</span>`;
          if (/^\d+/.test(m)) return `<span style="color:#b5cea8">${m}</span>`;
          return m;
        });
        result += processed;
      }
    });
    return result;
  }

  function renderCode() {
    codeArea.innerHTML = verilogCode.map((line, idx) => {
      const n = idx + 1;
      const step = steps[currentStep];
      const isHighlighted = step.highlightLines && step.highlightLines.includes(n);
      const cls = isHighlighted ? 'line highlight' : 'line';
      return `<div class="${cls}"><span class="ln">${String(n).padStart(2, ' ')}:</span> ${highlightCode(line)}</div>`;
    }).join('');
  }

  function renderState() {
    const step = steps[currentStep];
    let html = `
      <div class="state-var"><strong>state:</strong> ${step.state}</div>
      <div class="state-var"><strong>x:</strong> ${step.x}</div>
      <div class="state-var"><strong>y:</strong> ${step.y}</div>
      <div class="state-var"><strong>quo:</strong> ${step.quo}</div>
      <div class="state-var"><strong>rem:</strong> ${step.rem}</div>
    `;
    if (step.inputs) {
      html += `<div class="state-var"><strong>start:</strong> ${step.inputs.start}</div>`;
      html += `<div class="state-var"><strong>ack:</strong> ${step.inputs.ack}</div>`;
    }
    stateDisplay.innerHTML = html;
  }

  function renderWaveform() {
    const signals = ['clk', 'start', 'ack', 'x', 'y', 'quo', 'state'];
    
    let html = '';
    signals.forEach(sig => {
      html += `<div class="waveform-signal">`;
      html += `<span class="waveform-label">${sig}:</span>`;
      html += `<div class="waveform-track">`;
      
      for (let i = 0; i < steps.length; i++) {
        let value = '';
        const step = steps[i];
        
        if (sig === 'clk') {
          value = i > 0 ? '▲' : '▼';
        } else if (sig === 'start') {
          value = step.inputs ? step.inputs.start : '0';
        } else if (sig === 'ack') {
          value = step.inputs ? step.inputs.ack : '0';
        } else if (sig === 'x') {
          value = typeof step.x === 'number' ? step.x : '?';
        } else if (sig === 'y') {
          value = typeof step.y === 'number' ? step.y : '?';
        } else if (sig === 'quo') {
          value = typeof step.quo === 'number' ? step.quo : '?';
        } else if (sig === 'state') {
          value = step.state;
        }
        
        const cls = i === currentStep ? 'wave-cycle active' : 'wave-cycle';
        html += `<div class="${cls}" title="Cycle ${i}">${value}</div>`;
      }
      
      html += `</div></div>`;
    });
    
    waveformDisplay.innerHTML = html;
  }

  function render() {
    const step = steps[currentStep];
    renderCode();
    renderState();
    renderWaveform();
    infoText.innerHTML = `<strong>${step.title}</strong><br>${step.note}`;
    cycleInfo.textContent = `Cycle: ${step.cycle}`;
  }

  function stepForward() {
    if (currentStep < steps.length - 1) {
      currentStep++;
      render();
      return true;
    }
    return false;
  }

  function play() {
    if (playActive) {
      playActive = false;
      playBtn.textContent = 'Play';
      return;
    }
    playActive = true;
    playBtn.textContent = 'Pause';
    
    (async () => {
      while (playActive && currentStep < steps.length - 1) {
        stepForward();
        await new Promise(r => setTimeout(r, 800));
      }
      if (currentStep >= steps.length - 1) {
        playActive = false;
        playBtn.textContent = 'Play';
      }
    })();
  }

  function reset() {
    currentStep = 0;
    playActive = false;
    playBtn.textContent = 'Play';
    render();
  }

  // Event listeners
  playBtn.addEventListener('click', play);
  stepBtn.addEventListener('click', stepForward);
  resetBtn.addEventListener('click', reset);

  // Initial render
  render();
})();
