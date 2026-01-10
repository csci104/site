// Simple step-based animation for 4 examples. All addresses are simulated.
(function(){
  const examples = {
  ex1: {
      title: 'Example 1 — return by value',
      code: [
        'class Item { public:',
        '  Item(int w, string y);',
        '};',
        'Item buildItem() {',
        '  Item x(4, "hi");',
        '  return x;',
        '}',
        'int main() {',
        '  Item i = buildItem();',
        '  // access i\'s data.',
        '}'
      ],
      steps: [
        {line:8, action:'call', fn:'main', addr:'0xbf4'},
          // pre-declare i in main with uninitialized members
          {line:9, action:'push', frameName:'main', vars:[{type:'object', name:'i', base:'0xbf8', members:[{name:'i.w',addr:'0xbf8',val:'???'},{name:'i.y',addr:'0xbfc',val:'???'}]}], addr:'0xbf8'},
        {line:9, action:'note', text:'call buildItem from main'},
        {line:4, action:'call', fn:'buildItem', addr:'0xbe0'},
        {line:5, action:'push', frameName:'buildItem', vars:[{type:'object', name:'x', base:'0xbe4', members:[{name:'x.w',addr:'0xbe4',val:4},{name:'x.y',addr:'0xbe8',val:'"hi"'}]}], addr:'0xbe4'},
        {line:6, action:'note', text:'return x — literal (unoptimized) semantics: copy x into caller storage'},
  {line:9, action:'copy-to-caller', fromBase:'0xbe4', toBase:'0xbf8', varName:'i', members:[{name:'i.w',addr:'0xbf8',val:4},{name:'i.y',addr:'0xbfc',val:'"hi"'}]},
  {line:6, action:'invalidate', addr:'0xbe0'},
  {action:'pop', addr:'0xbe0'},
        {line:10, action:'info', text:'In main, i is a full Item object with its own members i.w and i.y; no dangling reference and no leak.'},
        {action:'invalidate', addr:'0xbf4'}
      ]
    },
  ex2: {
      title: 'Example 2 — return reference to local (dangling)',
      code: [
        'class Item { public:',
        '  Item(int w, string y);',
        '};',
        'Item& buildItem() {',
        '  Item x(4, "hi");',
        '  return x;',
        '}',
        'int main() {',
        '  Item& i = buildItem();',
        '  // access i\'s data',
        '}'
      ],
      steps: [
        {line:8, action:'call', fn:'main', addr:'0xbf4'},
        {line:9, action:'note', text:'call buildItem from main'},
        {line:4, action:'call', fn:'buildItem', addr:'0xbe0'},
        {line:5, action:'push', frameName:'buildItem', vars:[{type:'object', name:'x', base:'0xbe4', members:[{name:'x.w',addr:'0xbe4',val:4},{name:'x.y',addr:'0xbe8',val:'"hi"'}]}], addr:'0xbe4'},
        {line:6, action:'note', text:'returning reference to local variable x (dangerous)'},
    {line:9, action:'set-ref', refName:'i', targetBase:'0xbe4', memberNames:['x.w','x.y']},
  {line:6, action:'invalidate', addr:'0xbe0'},
    {line:6, action:'pop', addr:'0xbe0'},
        {line:10, action:'info', text:'In main, i is a reference bound to the stack address 0xbe4 which was popped — this is a dangling reference and accessing i.w or i.y is undefined behavior.'},
        {action:'invalidate', addr:'0xbf4'}
      ]
    },
  ex3: {
      title: 'Example 3 — return pointer to heap (valid; potential leak)',
    arrows: false,
      code: [
        'class Item { public:',
        '  Item(int w, string y);',
        '};',
        'Item* buildItem() {',
        '  Item* x = new Item(4, "hi");',
        '  return x;',
        '}',
        'int main() {',
        '  Item *i = buildItem();',
        '  // access i\'s data',
        '}'
      ],
      steps: [
        {line:8, action:'call', fn:'main', addr:'0xbf4'},
        {line:9, action:'note', text:'call buildItem from main'},
        {line:4, action:'call', fn:'buildItem', addr:'0xbe0'},
        // show local pointer x inside buildItem (uninitialized)
        {line:5, action:'push', frameName:'buildItem', vars:[{name:'x', val:'???', addr:'0xbe4'}], addr:'0xbe4'},
        {line:5, action:'alloc-heap', objName:'new Item', members:[{name:'(heap).w',addr:'0x4000120',val:4},{name:'(heap).y',addr:'0x4000124',val:'"hi"'}], addr:'0x4000120'},
        // assign the heap address into the local pointer x in buildItem
        {line:6, action:'set-pointer', frameName:'buildItem', ptrName:'x', targetAddr:'0x4000120'},
  // copy pointer into caller (animate from buildItem::x -> main::i)
  {line:6, action:'set-pointer', ptrName:'i', targetAddr:'0x4000120', animateFrom:{frame:'buildItem', var:'x'}},
  // invalidate and now pop buildItem
  {line:6, action:'invalidate', addr:'0xbe0'},
  {line:6, action:'pop', addr:'0xbe0'},
        // highlight end of main (line 11) before showing leak
        {line:11, action:'note', text:'end of main'},
        // invalidate main and then pop (i goes away) then show leak
        {action:'invalidate', addr:'0xbf4'},
        {line:11, action:'pop', addr:'0xbf4'},
        {line:11, action:'leak-highlight', addr:'0x4000120'}
      ]
    },
  ex5: {
      title: 'Example 5 — return reference to heap object (valid)',
      code: [
        'class Item { public:',
        '  Item(int w, string y);',
        '};',
        'Item& buildItem() {',
        '  Item* x = new Item(4, "hi");',
        '  return *x;',
        '}',
        'int main() {',
        '  Item& i = buildItem();',
        '  // access i\'s data',
        '}'
      ],
      steps: [
        {line:8, action:'call', fn:'main', addr:'0xbf4'},
        {line:9, action:'note', text:'call buildItem from main'},
        {line:4, action:'call', fn:'buildItem', addr:'0xbe0'},
        {line:5, action:'push', frameName:'buildItem', vars:[{name:'x', val:'???', addr:'0xbe4'}], addr:'0xbe4'},
        {line:5, action:'alloc-heap', objName:'new Item', members:[{name:'(heap).w',addr:'0x4000c0a0',val:4},{name:'(heap).y',addr:'0x4000c0a4',val:'"hi"'}], addr:'0x4000c0a0'},
        {line:5, action:'set-pointer', frameName:'buildItem', ptrName:'x', targetAddr:'0x4000c0a0'},
        {line:9, action:'set-ref', refName:'i', targetBase:'0x4000c0a0', memberNames:['(heap).w','(heap).y']},
  {line:7, action:'invalidate', addr:'0xbe0'},
        {line:7, action:'pop', addr:'0xbe0'},
        {line:9, action:'return', to:'main'},
        {line:10, action:'info', text:'In main, i is a reference bound to the heap object at 0x4000c0a0; i.w and i.y refer to the heap members.'},
        {action:'invalidate', addr:'0xbf4'},
        {line:11, action:'leak-highlight', addr:'0x4000c0a0'}
      ]
    }
  };

  // DOM references
  const codeArea = document.getElementById('codeArea');
  const stackFrames = document.getElementById('stackFrames');
  const heapObjects = document.getElementById('heapObjects');
  const infoText = document.getElementById('infoText');
  const exampleSelect = document.getElementById('exampleSelect');
  const playBtn = document.getElementById('playBtn');
  const stepBtn = document.getElementById('stepBtn');
  const resetBtn = document.getElementById('resetBtn');

  let current = 'ex1';
  let state = null;
  let playActive = false;

  function resetState(){
    state = {
      stepIndex:0,
      stack:[],
      heap:[],
      pointers:{},
      highlightedLine:-1,
      tombstones:[],
      pendingAnimation:null
    };
    stackFrames.innerHTML='';
    heapObjects.innerHTML='';
    infoText.innerHTML='';
  }

  function loadExample(key){
    current = key;
    const ex = examples[key];
    codeArea.textContent = ex.code.map((l,i)=>`${i+1}: ${l}`).join('\n');
    resetState();
    render();
  }

  async function render(){
    // highlight code
    const ex = examples[current];
    const rawLines = ex.code.map((l,i)=>`${i+1}: ${l}`);
    // safer token-based highlighting that builds DOM fragments to avoid nested-replacement corruption
    const highlightCode = (text)=>{
      // split into segments that are string literals or non-string text
      const parts = text.split(/("[^"]*")/g);
      const frag = document.createDocumentFragment();
      const keywords = new Set(['class','public:','return','int','new','if','else']);
      const types = new Set(['Item','string']);
      const tokenRe = /\b(class|public:|return|int|new|if|else|Item|string|\d+)\b/g;
      parts.forEach(part=>{
        if(part.length===0) return;
        if(/^"[^"]*"$/.test(part)){
          const s = document.createElement('span'); s.className='str'; s.textContent = part; frag.appendChild(s);
        } else {
          // process non-string part by tokenizing known keywords/types/numbers
          let idx = 0; let m;
          while((m = tokenRe.exec(part)) !== null){
            const before = part.slice(idx, m.index);
            if(before) frag.appendChild(document.createTextNode(before));
            const tok = m[1];
            const s = document.createElement('span');
            if(keywords.has(tok)) s.className = 'kw';
            else if(types.has(tok)) s.className = 'typ';
            else s.className = 'num';
            s.textContent = tok;
            frag.appendChild(s);
            idx = tokenRe.lastIndex;
          }
          const rest = part.slice(idx);
          if(rest) frag.appendChild(document.createTextNode(rest));
        }
      });
      const wrapper = document.createElement('div');
      wrapper.appendChild(frag);
      return wrapper.innerHTML;
    }
    codeArea.innerHTML = rawLines.map((ln,idx)=>{
      const n = idx+1;
      const cls = (n===state.highlightedLine)?'line highlight':'line';
      // separate the leading line number from code
      const colonIdx = ln.indexOf(':');
      const lnNum = ln.slice(0,colonIdx+1);
      // preserve leading whitespace for indentation
      const code = ln.slice(colonIdx+1);
      return `<div class="${cls}"><span class=ln>${lnNum}</span><span>${highlightCode(code)}</span></div>`;
    }).join('');

    // render stack
    stackFrames.innerHTML = '';
    // show frames from top (most recent) down
    for(let i=state.stack.length-1;i>=0;i--){
      const f = state.stack[i];
  const div = document.createElement('div');
      div.dataset.frame = f.name;
      div.className='frame';
  if(f.invalid) div.classList.add('invalid');
      div.innerHTML = `<div class="addr">${f.addr}</div><strong>${f.name}</strong>`;
      // local vars are shown inside the frame
          if(f.vars && f.vars.length){
        const locals = document.createElement('div');
        locals.className='locals';
        f.vars.forEach(v=>{
          const vdiv = document.createElement('div');
          vdiv.className='var';
              // mark dangling if this var references a tombstoned base
              if(v.base && state.tombstones && state.tombstones.find(t=>t.addr===v.base)) vdiv.classList.add('dangling');
              // mark reference variables
              if(v.isRef) vdiv.classList.add('ref');
          // if this var is an object with members
          if(v.type==='object' || v.members){
            vdiv.innerHTML = `<strong>${v.name}${v.isRef? ' [ref]':''}</strong> @ ${v.base || v.addr || ''}`;
            // mark object container with data-base for arrow targets
            if(v.base) vdiv.dataset.addr = v.base;
            const mlist = document.createElement('div');
            mlist.style.marginLeft='12px';
            (v.members||[]).forEach(m=>{
              const mdiv = document.createElement('div');
              mdiv.className='var';
              mdiv.textContent = `${m.name}: ${m.val}  @ ${m.addr}`;
              // set data-addr on member for arrow endpoints
              if(m.addr) mdiv.dataset.addr = m.addr;
                  // mark dangling members too
                  if(state.tombstones && state.tombstones.find(t=>t.addr===m.addr)) mdiv.classList.add('dangling');
              mlist.appendChild(mdiv);
            });
            vdiv.appendChild(mlist);
          } else {
            vdiv.textContent = `${v.name}: ${v.val}`;
            if(v.addr) vdiv.dataset.addr = v.addr;
            if(v.name) vdiv.dataset.var = v.name;
          }
          locals.appendChild(vdiv);
        })
        div.appendChild(locals);
      }
      stackFrames.appendChild(div);
    }

    // render tombstones for any popped addresses that are referenced
    if(state.tombstones && state.tombstones.length){
      state.tombstones.forEach(t=>{
        const td = document.createElement('div');
        td.className = 'tombstone';
        td.dataset.addr = t.addr;
        td.textContent = `dangling ${t.addr}`;
        stackFrames.appendChild(td);
      });
    }

    // render heap
    heapObjects.innerHTML='';
    state.heap.forEach(h=>{
      const div = document.createElement('div');
      div.className='heapObj' + (h.leak? ' leak':'');
      div.dataset.addr = h.addr;
      div.innerHTML = `<div class="addr">${h.addr}</div><strong>${h.name}</strong>`;
      if(h.leak){
        const badge = document.createElement('div');
        badge.style.color='#b00020'; badge.style.fontWeight='700'; badge.textContent='LEAK';
        div.appendChild(badge);
      }
      (h.members||[]).forEach(v=>{
        const vdiv = document.createElement('div');
        vdiv.className='var';
        vdiv.textContent = `${v.name}: ${v.val}  @ ${v.addr}`;
        if(v.addr) vdiv.dataset.addr = v.addr;
        div.appendChild(vdiv);
      })
      heapObjects.appendChild(div);
    })

  // after rebuilding DOM, (arrow/svg code removed) — no-op
    // process any pending pointer-transfer animations (await so stepping can pause until animation completes)
    if(state.pendingAnimation){
      const pa = state.pendingAnimation; state.pendingAnimation = null;
      const fromFrame = document.querySelector(`#stackFrames .frame[data-frame="${pa.fromFrame}"]`);
      const fromEl = fromFrame ? fromFrame.querySelector('[data-var="'+pa.fromVar+'"]') : document.querySelector('[data-var="'+pa.fromVar+'"]');
      const toFrame = document.querySelector(`#stackFrames .frame[data-frame="${pa.toFrame}"]`);
      const toEl = toFrame ? toFrame.querySelector('[data-var="'+pa.toVar+'"]') : document.querySelector('[data-var="'+pa.toVar+'"]');
      if(fromEl && toEl){ await animateDotBetween(fromEl, toEl); }
    }

    // render pointers/pointer info
    const pText = Object.keys(state.pointers).map(k=>{
      const t = state.pointers[k];
      return `<div><span class="pointer">${k}</span> -> ${t}</div>`;
    }).join('');
    infoText.innerHTML = pText + (infoText.innerHTML||'');

    // clear prior ref-target highlights
    document.querySelectorAll('.ref-target').forEach(el=>el.classList.remove('ref-target'));
    // highlight referenced targets (for vars marked isRef)
    state.stack.forEach(f=>{
      (f.vars||[]).forEach(v=>{
        if(v.isRef && v.base){
          const targetEl = document.querySelector('[data-addr="'+v.base+'"]');
          if(targetEl) targetEl.classList.add('ref-target');
        }
      });
    });
  }

  async function applyStep(step){
    state.highlightedLine = step.line || -1;
    switch(step.action){
      case 'invalidate':
        // mark a frame invalid (grayed-out) but don't remove it yet
        if(step.addr){
          for(let f of state.stack){ if(f.addr===step.addr){ f.invalid = true; break; } }
        } else if(step.frameName){
          for(let f of state.stack){ if(f.name===step.frameName){ f.invalid = true; break; } }
        }
        break;
      case 'call':
        // push a function frame
        state.stack.push({name:step.fn,vars:step.vars||[],addr:step.addr||randomAddr()});
        infoText.innerHTML = '';
        break;
      case 'push':
        // attach local variables to the top-most frame (the current function)
        if(state.stack.length>0){
          const top = state.stack[state.stack.length-1];
          top.vars = top.vars || [];
          (step.vars||[]).forEach(v=> top.vars.push(v));
        } else {
          state.stack.push({name:step.frameName,vars:step.vars,addr:step.addr||randomAddr()});
        }
        break;
      case 'pop':
        // remove top frame with matching addr if present
        if(step.addr){
          // find and remove the frame
          for(let i=state.stack.length-1;i>=0;i--){
            if(state.stack[i].addr===step.addr){
              // before removing, check for any references/pointers to this addr and create tombstone
              const popped = state.stack[i];
              // remove frame
              state.stack.splice(i,1);
              // if any main-frame vars reference this base, create tombstone
              const mainFrame = state.stack.find(f=>f.name==='main') || state.stack[0];
              if(mainFrame){
                const refs = (mainFrame.vars||[]).filter(v=>v.base===step.addr || (v.members||[]).some(m=>m.addr===step.addr));
                if(refs.length>0){
                  state.tombstones = state.tombstones || [];
                  if(!state.tombstones.find(t=>t.addr===step.addr)) state.tombstones.push({addr:step.addr});
                }
              }
              break;
            }
          }
        } else {
          state.stack.pop();
        }
        break;
      case 'note':
        infoText.innerHTML = `<div>${step.text}</div>`;
        break;
      case 'copy-to-caller':
        // simulate storage in caller (attach object members into main frame as a full object)
        const caller = state.stack.find(f=>f.name==='main') || state.stack[0];
        const obj = {type:'object', name:step.varName, base:step.toBase || step.to, members:step.members || []};
        if(caller){
          caller.vars = caller.vars || [];
          // if a placeholder for this var already exists (pre-declared), replace its members
          const idx = caller.vars.findIndex(v=>v.name===step.varName);
          if(idx>=0){
            caller.vars[idx].type = 'object';
            caller.vars[idx].base = obj.base;
            caller.vars[idx].members = obj.members;
          } else {
            caller.vars.push(obj);
          }
        } else {
          state.stack.push({name:step.frameName,vars:[obj],addr:step.toBase||step.to||randomAddr()});
        }
        // mark the source frame invalid immediately (visual deallocation) if we have fromBase
        if(step.fromBase){
          // try to find a frame with that exact addr
          let found = false;
          for(let f of state.stack){ if(f.addr===step.fromBase){ f.invalid = true; found=true; break; } }
          // if not found, see if any frame contains a var/object whose base or member addr equals fromBase
          if(!found){
            for(let f of state.stack){
              if((f.vars||[]).some(v=> v.base===step.fromBase || (v.members||[]).some(m=>m.addr===step.fromBase))){ f.invalid = true; break; }
            }
          }
        }
        break;
      case 'set-ref':
        // create a reference in main that points to members of targetBase (stack or heap)
        const targetBase = step.targetBase || step.targetAddr;
        // try to find the object in stack or heap
        let targetObj = null;
        for(let f of state.stack){
          (f.vars||[]).forEach(v=>{ if(v.base===targetBase) targetObj=v; });
        }
        if(!targetObj){ targetObj = state.heap.find(h=>h.addr===targetBase); }
        const mainFrame = state.stack.find(f=>f.name==='main') || state.stack[0];
        if(mainFrame){ mainFrame.vars = mainFrame.vars || []; 
          if(targetObj){
            // map members to i.w / i.y names
            const members = (targetObj.members||targetObj.vars||[]).map((m,idx)=>{
              const name = (step.memberNames && step.memberNames[idx])? step.memberNames[idx].replace(/^.*\./, (s)=>('')) : m.name;
              // produce i.w style names
              const short = m.name.includes('.') ? m.name.split('.').pop() : m.name;
              return {name:`${step.refName}.${short}`, addr:m.addr, val:m.val};
            });
            // mark this var as a reference so render can show [ref]
            mainFrame.vars.push({type:'object', name:step.refName, base:targetBase, members:members, isRef:true});
          } else {
            mainFrame.vars.push({name:step.refName, val:`&${targetBase}`});
          }
        }
        break;
      case 'set-pointer':
        // record pointer mapping (by variable name -> target address)
        state.pointers[step.ptrName] = step.targetAddr;
        // find the heap object if any
        const heapObj = state.heap.find(h=>h.addr===step.targetAddr);
        // determine which frame to modify: explicit frameName else main
        let targetFrame = null;
        if(step.frameName) targetFrame = state.stack.find(f=>f.name===step.frameName);
        if(!targetFrame) targetFrame = state.stack.find(f=>f.name==='main') || state.stack[0];
        if(targetFrame){
          targetFrame.vars = targetFrame.vars || [];
          // If this step requests an animated transfer from another frame/var, enqueue it for after render
          if(step.animateFrom && step.animateFrom.frame && step.animateFrom.var){
            state.pendingAnimation = { fromFrame: step.animateFrom.frame, fromVar: step.animateFrom.var, toFrame: targetFrame.name, toVar: step.ptrName };
          }
          if(heapObj){
            const members = (heapObj.members||[]).map(m=>({name:`${step.ptrName}.${m.name.split('.').pop()}`, addr:m.addr, val:m.val}));
            const idx = targetFrame.vars.findIndex(v=>v.name===step.ptrName);
            if(idx>=0){
              targetFrame.vars[idx].type = 'object';
              targetFrame.vars[idx].base = step.targetAddr;
              targetFrame.vars[idx].members = members;
            } else {
              targetFrame.vars.push({type:'object', name:step.ptrName, base:step.targetAddr, members:members});
            }
          } else {
            const idx = targetFrame.vars.findIndex(v=>v.name===step.ptrName);
            if(idx>=0){ targetFrame.vars[idx].val = step.targetAddr; }
            else targetFrame.vars.push({name:step.ptrName, val:step.targetAddr});
          }
        }
        break;
      case 'alloc-heap':
        // heap object with members
        state.heap.push({name:step.objName, members: step.members || step.vars || [], addr:step.addr||randomAddr(), leak:false});
        break;
      case 'leak-highlight':
        // mark heap object as leaked (visual highlight)
        for(let h of state.heap){
          if(h.addr===step.addr){ h.leak = true; break; }
        }
  // redraw arrows to ensure visuals show leak state
  break;
      case 'return':
        // no-op visual
        break;
      case 'info':
        infoText.innerHTML = `<div>${step.text}</div>` + infoText.innerHTML;
        break;
      default:
        console.log('unknown step',step);
    }
    await render();
  }

    // --- SVG/arrow code removed ---
    // Pointer-transfer animation uses a DOM element so no SVG is required.
  function animateDotBetween(fromEl, toEl, duration=600){
    const r1 = fromEl.getBoundingClientRect();
    const r2 = toEl.getBoundingClientRect();
    const start = { x: r1.left + r1.width/2, y: r1.top + r1.height/2 };
    const end = { x: r2.left + r2.width/2, y: r2.top + r2.height/2 };
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.left = start.x - 6 + 'px';
    dot.style.top = start.y - 6 + 'px';
    dot.style.width = '12px'; dot.style.height = '12px';
    dot.style.borderRadius = '50%';
    dot.style.background = '#ff8800';
    dot.style.zIndex = 9999;
    document.body.appendChild(dot);
    const t0 = performance.now();
    return new Promise(res=>{
      function step(now){
        const t = Math.min(1, (now - t0) / duration);
        const x = start.x + (end.x - start.x) * t;
        const y = start.y + (end.y - start.y) * t;
        dot.style.left = (x - 6) + 'px';
        dot.style.top = (y - 6) + 'px';
        if(t < 1) requestAnimationFrame(step);
        else { setTimeout(()=>{ dot.remove(); res(); }, 60); }
      }
      requestAnimationFrame(step);
    });
  }

  function randomAddr(){
    return '0x' + Math.floor(Math.random()*0xfffff).toString(16);
  }

  async function stepForward(){
    const ex = examples[current];
    if(state.stepIndex >= ex.steps.length) return false;
    const s = ex.steps[state.stepIndex++];
    await applyStep(s);
    return state.stepIndex < ex.steps.length;
  }

  // async play loop that respects animations (awaits stepForward)
  function play(){
    if(playActive){ playActive = false; playBtn.textContent = 'Play'; return; }
    playActive = true; playBtn.textContent = 'Pause';
    (async ()=>{
      while(playActive){
        const hasMore = await stepForward();
        if(!hasMore){ playActive = false; playBtn.textContent = 'Play'; break; }
        await new Promise(r=>setTimeout(r, 1000));
      }
    })();
  }

  exampleSelect.addEventListener('change',(e)=>{ loadExample(e.target.value); });
  playBtn.addEventListener('click',play);
  stepBtn.addEventListener('click', async ()=>{ await stepForward(); });
  resetBtn.addEventListener('click',()=>{ loadExample(current); });

  // initial load
  loadExample('ex1');
})();
