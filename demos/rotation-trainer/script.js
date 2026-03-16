class RotationTrainer {
    constructor() {
        this.current = null;
        this.draggedEl = null;

        this.newRightBtn = document.getElementById('newRightBtn');
        this.newLeftBtn = document.getElementById('newLeftBtn');
        this.resetOrderBtn = document.getElementById('resetOrderBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.messageArea = document.getElementById('messageArea');
        this.poolArea = document.getElementById('poolArea');
        this.sequenceArea = document.getElementById('sequenceArea');
        this.scenarioMeta = document.getElementById('scenarioMeta');
        this.scenarioFacts = document.getElementById('scenarioFacts');
        this.scenarioTree = document.getElementById('scenarioTree');

        this.bindEvents();
    }

    bindEvents() {
        this.newRightBtn.addEventListener('click', () => this.newProblem('right'));
        this.newLeftBtn.addEventListener('click', () => this.newProblem('left'));
        this.resetOrderBtn.addEventListener('click', () => this.resetOrdering());
        this.submitBtn.addEventListener('click', () => this.submit());
        window.addEventListener('resize', () => {
            if (this.current) this.drawScenarioTree();
        });

        this.setupDropZone(this.poolArea);
        this.setupDropZone(this.sequenceArea);
    }

    setupDropZone(zone) {
        zone.addEventListener('dragover', (e) => {
            if (!this.draggedEl) return;
            e.preventDefault();
            zone.classList.add('drag-over');

            const after = this.getDropAfterElement(zone, e.clientY);

            if (zone === this.poolArea) {
                if (after == null) zone.appendChild(this.draggedEl);
                else zone.insertBefore(this.draggedEl, after);
                return;
            }

            const draggingFromPool = this.poolArea.contains(this.draggedEl);
            if (draggingFromPool) {
                return;
            }

            if (this.draggedEl.contains(zone)) {
                return;
            }

            if (after == null) zone.appendChild(this.draggedEl);
            else zone.insertBefore(this.draggedEl, after);
        });

        zone.addEventListener('drop', (e) => {
            if (!this.draggedEl) return;
            e.preventDefault();
            zone.classList.remove('drag-over');

            if (zone === this.poolArea) return;

            if (this.draggedEl.contains(zone)) return;

            const draggingFromPool = this.poolArea.contains(this.draggedEl);
            if (draggingFromPool) {
                const lineId = this.draggedEl.dataset.id;
                const line = this.current?.lines.find((l) => l.id === lineId);
                if (!line) return;

                const placedEl = this.makePlacedElement(line);
                const after = this.getDropAfterElement(zone, e.clientY);
                if (after == null) zone.appendChild(placedEl);
                else zone.insertBefore(placedEl, after);

                this.draggedEl.remove();
                this.draggedEl = null;
            }
        });

        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    }

    newProblem(direction) {
        const scenario = this.generateScenario(direction);
        const lines = this.buildLineBank(direction);
        const shuffled = [...lines].sort(() => Math.random() - 0.5);

        this.current = {
            direction,
            scenario,
            lines,
            shuffled,
            initialModel: this.buildInitialModel(direction, scenario),
            expectedModel: null
        };
        this.current.expectedModel = this.rotateModelCanonical(this.cloneModel(this.current.initialModel), direction, scenario.parentSide);

        this.renderScenario();
        this.renderLines();
        this.showMessage(`New ${direction === 'right' ? 'right' : 'left'} rotation problem generated.`, 'info');
    }

    generateScenario(direction) {
        return {
            hasParent: Math.random() < 0.75,
            parentSide: Math.random() < 0.5 ? 'left' : 'right',
            hasMid: Math.random() < 0.65,
            hasOther: Math.random() < 0.7,
            hasOuter: Math.random() < 0.6,
            direction
        };
    }

    buildLineBank(direction) {
        if (direction === 'right') {
            return [
                { id: 'check_n_null', text: 'if (n == nullptr) return;', type: 'stmt' },
                { id: 'set_p', text: 'Node* p = n->parent;', type: 'stmt' },
                { id: 'set_child', text: 'Node* lc = n->left;', type: 'stmt' },
                { id: 'check_child_null', text: 'if (lc == nullptr) return;', type: 'stmt' },
                { id: 'if_child_not_null', text: 'if (lc != nullptr) { }', type: 'if' },
                { id: 'noop_child_body', text: '/* unnecessary defensive check */', type: 'stmt' },
                { id: 'set_mid', text: 'Node* lrc = lc->right;', type: 'stmt' },
                { id: 'if_p_not_null', text: 'if (p != nullptr) { }', type: 'if' },
                { id: 'if_which_left', text: 'if (whichChild(n) == -1) { }', type: 'if' },
                { id: 'if_which_right', text: 'if (whichChild(n) == 1) { }', type: 'if' },
                { id: 'assign_parent_left', text: 'p->left = lc;', type: 'stmt' },
                { id: 'assign_parent_right', text: 'p->right = lc;', type: 'stmt' },
                { id: 'set_child_parent_p', text: 'lc->parent = p;', type: 'stmt' },
                { id: 'set_child_to_n', text: 'lc->right = n;', type: 'stmt' },
                { id: 'set_n_parent_child', text: 'n->parent = lc;', type: 'stmt' },
                { id: 'set_n_to_mid', text: 'n->left = lrc;', type: 'stmt' },
                { id: 'if_mid_not_null', text: 'if (lrc != nullptr) { }', type: 'if' },
                { id: 'set_mid_parent_n', text: 'lrc->parent = n;', type: 'stmt' }
            ];
        }

        return [
            { id: 'check_n_null', text: 'if (n == nullptr) return;', type: 'stmt' },
            { id: 'set_p', text: 'Node* p = n->parent;', type: 'stmt' },
            { id: 'set_child', text: 'Node* rc = n->right;', type: 'stmt' },
            { id: 'check_child_null', text: 'if (rc == nullptr) return;', type: 'stmt' },
            { id: 'if_child_not_null', text: 'if (rc != nullptr) { }', type: 'if' },
            { id: 'noop_child_body', text: '/* unnecessary defensive check */', type: 'stmt' },
            { id: 'set_mid', text: 'Node* rlc = rc->left;', type: 'stmt' },
            { id: 'if_p_not_null', text: 'if (p != nullptr) { }', type: 'if' },
            { id: 'if_which_left', text: 'if (whichChild(n) == -1) { }', type: 'if' },
            { id: 'if_which_right', text: 'if (whichChild(n) == 1) { }', type: 'if' },
            { id: 'assign_parent_left', text: 'p->left = rc;', type: 'stmt' },
            { id: 'assign_parent_right', text: 'p->right = rc;', type: 'stmt' },
            { id: 'set_child_parent_p', text: 'rc->parent = p;', type: 'stmt' },
            { id: 'set_child_to_n', text: 'rc->left = n;', type: 'stmt' },
            { id: 'set_n_parent_child', text: 'n->parent = rc;', type: 'stmt' },
            { id: 'set_n_to_mid', text: 'n->right = rlc;', type: 'stmt' },
            { id: 'if_mid_not_null', text: 'if (rlc != nullptr) { }', type: 'if' },
            { id: 'set_mid_parent_n', text: 'rlc->parent = n;', type: 'stmt' }
        ];
    }

    renderLines() {
        this.poolArea.innerHTML = '';
        this.sequenceArea.innerHTML = '';

        this.current.shuffled.forEach((line) => {
            this.poolArea.appendChild(this.makePaletteElement(line));
        });
    }

    makePaletteElement(line) {
        const el = document.createElement('div');
        el.className = `code-line palette-item ${line.type === 'if' ? 'if-template' : ''}`;
        el.textContent = line.text;
        el.draggable = true;
        el.dataset.id = line.id;
        el.dataset.type = line.type;
        el.addEventListener('dragstart', () => {
            this.draggedEl = el;
            setTimeout(() => el.style.opacity = '0.5', 0);
        });
        el.addEventListener('dragend', () => {
            el.style.opacity = '1';
            this.draggedEl = null;
            this.poolArea.classList.remove('drag-over');
            this.sequenceArea.classList.remove('drag-over');
            for (const z of this.sequenceArea.querySelectorAll('.if-body')) {
                z.classList.remove('drag-over');
            }
        });
        return el;
    }

    makePlacedElement(line) {
        if (line.type === 'if') {
            const block = document.createElement('div');
            block.className = 'if-block';
            block.draggable = true;
            block.dataset.id = line.id;
            block.dataset.type = 'if';

            const head = document.createElement('div');
            head.className = 'if-head';
            head.textContent = line.text;

            const body = document.createElement('div');
            body.className = 'if-body dropzone';
            body.dataset.parentIf = line.id;
            this.setupDropZone(body);

            block.appendChild(head);
            block.appendChild(body);

            block.addEventListener('dragstart', () => {
                this.draggedEl = block;
                setTimeout(() => block.style.opacity = '0.5', 0);
            });
            block.addEventListener('dragend', () => {
                block.style.opacity = '1';
                this.draggedEl = null;
                this.poolArea.classList.remove('drag-over');
                this.sequenceArea.classList.remove('drag-over');
                for (const z of this.sequenceArea.querySelectorAll('.if-body')) {
                    z.classList.remove('drag-over');
                }
            });

            return block;
        }

        const el = document.createElement('div');
        el.className = 'code-line placed-stmt';
        el.textContent = line.text;
        el.draggable = true;
        el.dataset.id = line.id;
        el.dataset.type = 'stmt';
        el.addEventListener('dragstart', () => {
            this.draggedEl = el;
            setTimeout(() => el.style.opacity = '0.5', 0);
        });
        el.addEventListener('dragend', () => {
            el.style.opacity = '1';
            this.draggedEl = null;
            this.poolArea.classList.remove('drag-over');
            this.sequenceArea.classList.remove('drag-over');
            for (const z of this.sequenceArea.querySelectorAll('.if-body')) {
                z.classList.remove('drag-over');
            }
        });
        return el;
    }

    getDropAfterElement(container, y) {
        const draggableElements = [...container.children].filter((child) => child !== this.draggedEl);
        let closest = { offset: Number.NEGATIVE_INFINITY, element: null };

        draggableElements.forEach((child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                closest = { offset, element: child };
            }
        });

        return closest.element;
    }

    renderScenario() {
        const s = this.current.scenario;
        const dirText = this.current.direction === 'right' ? 'Right rotation at n' : 'Left rotation at n';
        this.scenarioMeta.textContent = `${dirText}.`;

        const facts = [];
        facts.push(`n has parent p: ${s.hasParent ? 'yes' : 'no'}`);
        if (s.hasParent) facts.push(`n is ${s.parentSide} child of p`);
        facts.push(`${this.current.direction === 'right' ? 'lrc (lc->right)' : 'rlc (rc->left)'} exists: ${s.hasMid ? 'yes' : 'no'}`);
        facts.push(`${this.current.direction === 'right' ? 'n->right' : 'n->left'} exists: ${s.hasOther ? 'yes' : 'no'}`);
        facts.push(`${this.current.direction === 'right' ? 'lc->left' : 'rc->right'} exists: ${s.hasOuter ? 'yes' : 'no'}`);

        this.scenarioFacts.innerHTML = `<strong>Randomized facts:</strong><ul>${facts.map(f => `<li>${f}</li>`).join('')}</ul>`;
        this.drawScenarioTree();
    }

    drawScenarioTree() {
        const s = this.current.scenario;
        const dir = this.current.direction;
        this.scenarioTree.innerHTML = '';

        const nodeSize = 66;
        const radius = nodeSize / 2;
        const viewWidth = Math.max(360, this.scenarioTree.clientWidth || 520);
        const viewHeight = Math.max(300, this.scenarioTree.clientHeight || 320);

        const xPctToPx = (pct) => (pct / 100) * viewWidth;
        const yPctToPx = (pct) => (pct / 100) * viewHeight;

        const nodes = [];
        const edges = [];

        const addNode = (id, label, cls, xPct, yPct) => {
            nodes.push({
                id,
                label,
                cls,
                cx: xPctToPx(xPct),
                cy: yPctToPx(yPct)
            });
        };
        const addEdge = (from, to) => edges.push({ from, to });

        if (s.hasParent) {
            addNode('p', 'p', 'node-p', 50, 9);
        }

        addNode('n', 'n', 'node-n', 50, 39);

        if (dir === 'right') {
            addNode('child', 'lc', 'node-child', 30, 66);
            addEdge('n', 'child');
            if (s.hasParent) addEdge('p', 'n');

            if (s.hasOuter) {
                addNode('outer', 'll', 'node-outer', 18, 88);
                addEdge('child', 'outer');
            }
            if (s.hasMid) {
                addNode('mid', 'lrc', 'node-mid', 42, 88);
                addEdge('child', 'mid');
            }
            if (s.hasOther) {
                addNode('other', 'rc', 'node-other', 66, 66);
                addEdge('n', 'other');
            }
        } else {
            addNode('child', 'rc', 'node-child', 70, 66);
            addEdge('n', 'child');
            if (s.hasParent) addEdge('p', 'n');

            if (s.hasMid) {
                addNode('mid', 'rlc', 'node-mid', 58, 88);
                addEdge('child', 'mid');
            }
            if (s.hasOuter) {
                addNode('outer', 'rr', 'node-outer', 82, 88);
                addEdge('child', 'outer');
            }
            if (s.hasOther) {
                addNode('other', 'lc', 'node-other', 34, 66);
                addEdge('n', 'other');
            }
        }

        const byId = new Map(nodes.map((n) => [n.id, n]));

        edges.forEach((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return;
            const dx = b.cx - a.cx;
            const dy = b.cy - a.cy;
            const dist = Math.hypot(dx, dy);
            if (dist <= 0.0001) return;
            const ux = dx / dist;
            const uy = dy / dist;
            const x1 = a.cx + ux * radius;
            const y1 = a.cy + uy * radius;
            const x2 = b.cx - ux * radius;
            const y2 = b.cy - uy * radius;
            const len = Math.hypot(x2 - x1, y2 - y1);
            if (len <= 1) return;
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const edgeEl = document.createElement('div');
            edgeEl.className = 'tree-edge';
            edgeEl.style.left = `${x1}px`;
            edgeEl.style.top = `${y1}px`;
            edgeEl.style.width = `${len}px`;
            edgeEl.style.transform = `rotate(${angle}deg)`;
            this.scenarioTree.appendChild(edgeEl);
        });

        nodes.forEach((n) => {
            const el = document.createElement('div');
            el.className = `tree-node ${n.cls}`;
            el.style.left = `${n.cx - radius}px`;
            el.style.top = `${n.cy - radius}px`;
            el.textContent = n.label;
            this.scenarioTree.appendChild(el);
        });
    }

    resetOrdering() {
        if (!this.current) {
            this.showMessage('Create a problem first.', 'error');
            return;
        }
        this.renderLines();
        this.showMessage('Ordering reset.', 'info');
    }

    submit() {
        if (!this.current) {
            this.showMessage('Create a problem first.', 'error');
            return;
        }

        const program = this.serializeFromZone(this.sequenceArea);
        if (program.length === 0) {
            this.showMessage('Drag at least one line into the sequence area before submitting.', 'error');
            return;
        }

        const result = this.evaluateOrder(program);
        if (result.ok) {
            this.showMessage('✅ Correct. This sequence is safe and produces the expected rotated tree.', 'success');
        } else {
            this.showMessage(`❌ ${result.message}`, 'error');
        }
    }

    showMessage(text, type) {
        this.messageArea.textContent = text;
        this.messageArea.className = `message ${type}`;
    }

    buildInitialModel(direction, scenario) {
        const nodes = {
            n: { parent: null, left: null, right: null },
            child: { parent: 'n', left: null, right: null },
            p: scenario.hasParent ? { parent: null, left: null, right: null } : null,
            mid: scenario.hasMid ? { parent: 'child', left: null, right: null } : null,
            other: scenario.hasOther ? { parent: 'n', left: null, right: null } : null,
            outer: scenario.hasOuter ? { parent: 'child', left: null, right: null } : null
        };

        if (direction === 'right') {
            nodes.n.left = 'child';
            nodes.n.right = scenario.hasOther ? 'other' : null;
            nodes.child.left = scenario.hasOuter ? 'outer' : null;
            nodes.child.right = scenario.hasMid ? 'mid' : null;
        } else {
            nodes.n.right = 'child';
            nodes.n.left = scenario.hasOther ? 'other' : null;
            nodes.child.left = scenario.hasMid ? 'mid' : null;
            nodes.child.right = scenario.hasOuter ? 'outer' : null;
        }

        if (scenario.hasParent) {
            if (scenario.parentSide === 'left') nodes.p.left = 'n';
            else nodes.p.right = 'n';
            nodes.n.parent = 'p';
        }

        return { nodes, direction };
    }

    cloneModel(model) {
        return JSON.parse(JSON.stringify(model));
    }

    rotateModelCanonical(model, direction, side) {
        const n = model.nodes.n;
        const child = model.nodes.child;
        const p = model.nodes.p;

        if (!child) return model;

        const midName = direction === 'right' ? child.right : child.left;

        if (p) {
            if (side === 'left') p.left = 'child';
            else p.right = 'child';
        }
        child.parent = p ? 'p' : null;

        if (direction === 'right') {
            child.right = 'n';
            n.left = midName;
        } else {
            child.left = 'n';
            n.right = midName;
        }

        n.parent = 'child';

        if (midName && model.nodes[midName]) {
            model.nodes[midName].parent = 'n';
        }

        return model;
    }

    serializeFromZone(zone) {
        const out = [];
        for (const child of [...zone.children]) {
            if (child.classList.contains('if-block')) {
                const body = child.querySelector(':scope > .if-body');
                out.push({
                    type: 'if',
                    id: child.dataset.id,
                    body: body ? this.serializeFromZone(body) : []
                });
            } else if (child.dataset.type === 'stmt') {
                out.push({ type: 'stmt', id: child.dataset.id });
            }
        }
        return out;
    }

    evaluateOrder(program) {
        const model = this.cloneModel(this.current.initialModel);
        const vars = {
            n: 'n',
            p: undefined,
            child: undefined,
            mid: undefined
        };

        const direction = this.current.direction;

        const useVar = (name) => {
            if (vars[name] === undefined) {
                return { ok: false, message: `Line uses ${name} before assigning it.` };
            }
            return { ok: true };
        };

        const deref = (varName) => {
            const use = useVar(varName);
            if (!use.ok) return use;
            const ptr = vars[varName];
            if (ptr === null) {
                return { ok: false, message: `Segfault risk: ${varName} is nullptr when dereferenced.` };
            }
            return { ok: true, node: model.nodes[ptr], ptr };
        };

        const whichChild = () => {
            const nNode = model.nodes.n;
            if (!nNode.parent) return 0;
            const parentNode = model.nodes[nNode.parent];
            if (!parentNode) return 0;
            if (parentNode.left === 'n') return -1;
            if (parentNode.right === 'n') return 1;
            return 0;
        };

        const runTokens = (tokens, shouldExec) => {
            for (const token of tokens) {
                if (token.type === 'if') {
                    let cond = false;
                    if (token.id === 'if_child_not_null') {
                        const u = useVar('child');
                        if (!u.ok) return u;
                        cond = vars.child !== null;
                    } else if (token.id === 'if_p_not_null') {
                        const u = useVar('p');
                        if (!u.ok) return u;
                        cond = vars.p !== null;
                    } else if (token.id === 'if_which_left') {
                        cond = whichChild() === -1;
                    } else if (token.id === 'if_which_right') {
                        cond = whichChild() === 1;
                    } else if (token.id === 'if_mid_not_null') {
                        const u = useVar('mid');
                        if (!u.ok) return u;
                        cond = vars.mid !== null;
                    } else {
                        return { ok: false, message: 'Unknown if block in sequence.' };
                    }

                    const nested = runTokens(token.body, shouldExec && cond);
                    if (!nested.ok) return nested;
                    continue;
                }

                const id = token.id;
                if (!shouldExec) continue;

                if (id === 'check_n_null') {
                    if (vars.n === null) return { ok: true, earlyReturn: true };
                    continue;
                }

                if (id === 'set_p') {
                    const d = deref('n');
                    if (!d.ok) return d;
                    vars.p = d.node.parent;
                    continue;
                }

                if (id === 'set_child') {
                    const d = deref('n');
                    if (!d.ok) return d;
                    vars.child = direction === 'right' ? d.node.left : d.node.right;
                    continue;
                }

                if (id === 'check_child_null') {
                    const u = useVar('child');
                    if (!u.ok) return u;
                    if (vars.child === null) {
                        const changed = JSON.stringify(model) !== JSON.stringify(this.current.initialModel);
                        if (changed) return { ok: false, message: 'Returned early after partially changing pointers.' };
                        const expectedSame = JSON.stringify(this.current.initialModel) === JSON.stringify(this.current.expectedModel);
                        if (expectedSame) return { ok: true, earlyReturn: true };
                        return { ok: false, message: 'Early return prevented the needed rotation.' };
                    }
                    continue;
                }

                if (id === 'noop_child_body') {
                    continue;
                }

                if (id === 'set_mid') {
                    const d = deref('child');
                    if (!d.ok) return d;
                    vars.mid = direction === 'right' ? d.node.right : d.node.left;
                    continue;
                }

                if (id === 'assign_parent_left') {
                    const pd = deref('p');
                    if (!pd.ok) return pd;
                    const uc = useVar('child');
                    if (!uc.ok) return uc;
                    pd.node.left = vars.child;
                    continue;
                }

                if (id === 'assign_parent_right') {
                    const pd = deref('p');
                    if (!pd.ok) return pd;
                    const uc = useVar('child');
                    if (!uc.ok) return uc;
                    pd.node.right = vars.child;
                    continue;
                }

                if (id === 'set_child_parent_p') {
                    const cd = deref('child');
                    if (!cd.ok) return cd;
                    cd.node.parent = vars.p;
                    continue;
                }

                if (id === 'set_child_to_n') {
                    const cd = deref('child');
                    if (!cd.ok) return cd;
                    if (direction === 'right') cd.node.right = 'n';
                    else cd.node.left = 'n';
                    continue;
                }

                if (id === 'set_n_parent_child') {
                    const nd = deref('n');
                    if (!nd.ok) return nd;
                    const uc = useVar('child');
                    if (!uc.ok) return uc;
                    nd.node.parent = vars.child;
                    continue;
                }

                if (id === 'set_n_to_mid') {
                    const nd = deref('n');
                    if (!nd.ok) return nd;
                    const um = useVar('mid');
                    if (!um.ok) return um;
                    if (direction === 'right') nd.node.left = vars.mid;
                    else nd.node.right = vars.mid;
                    continue;
                }

                if (id === 'set_mid_parent_n') {
                    const md = deref('mid');
                    if (!md.ok) return md;
                    md.node.parent = 'n';
                    continue;
                }

                return { ok: false, message: 'Unknown line in sequence.' };
            }

            return { ok: true };
        };

        const execResult = runTokens(program, true);
        if (!execResult.ok) return execResult;
        if (execResult.earlyReturn) return { ok: true };

        const expected = this.current.expectedModel;
        const same = this.modelsEqual(model, expected);
        if (!same.ok) {
            return { ok: false, message: same.message };
        }

        return { ok: true };
    }

    modelsEqual(a, b) {
        const names = ['p', 'n', 'child', 'mid', 'other', 'outer'];
        for (const name of names) {
            const an = a.nodes[name];
            const bn = b.nodes[name];
            if (!!an !== !!bn) {
                return { ok: false, message: `Structure mismatch around ${name}.` };
            }
            if (!an && !bn) continue;
            for (const ptr of ['parent', 'left', 'right']) {
                if (an[ptr] !== bn[ptr]) {
                    return {
                        ok: false,
                        message: `Incorrect pointers: ${name}->${ptr} should be ${bn[ptr] ?? 'nullptr'} but became ${an[ptr] ?? 'nullptr'}.`
                    };
                }
            }
        }
        return { ok: true };
    }
}

new RotationTrainer();
