class ExpressionParser {
    constructor(expr) {
        this.expr = (expr || '').replace(/\s+/g, '');
        this.pos = 0;
    }

    parse(k) {
        if (!this.expr) throw new Error('Expression is empty');
        const value = this.parseExpression(k);
        if (this.pos !== this.expr.length) {
            throw new Error(`Unexpected token at position ${this.pos + 1}`);
        }
        if (!Number.isFinite(value)) throw new Error('Expression result is not finite');
        return value;
    }

    peek() {
        return this.expr[this.pos] || null;
    }

    consume(ch) {
        if (this.peek() === ch) {
            this.pos += 1;
            return true;
        }
        return false;
    }

    parseExpression(k) {
        let value = this.parseTerm(k);
        while (true) {
            if (this.consume('+')) value += this.parseTerm(k);
            else if (this.consume('-')) value -= this.parseTerm(k);
            else break;
        }
        return value;
    }

    parseTerm(k) {
        let value = this.parseFactor(k);
        while (true) {
            if (this.consume('*')) value *= this.parseFactor(k);
            else if (this.consume('/')) value /= this.parseFactor(k);
            else if (this.consume('%')) value %= this.parseFactor(k);
            else break;
        }
        return value;
    }

    parseFactor(k) {
        if (this.consume('+')) return this.parseFactor(k);
        if (this.consume('-')) return -this.parseFactor(k);

        const c = this.peek();
        if (c === '(') {
            this.pos += 1;
            const value = this.parseExpression(k);
            if (!this.consume(')')) throw new Error('Missing closing parenthesis');
            return value;
        }

        if (c === 'k' || c === 'K') {
            this.pos += 1;
            return Number(k);
        }

        return this.parseNumber();
    }

    parseNumber() {
        const start = this.pos;
        while (/[0-9.]/.test(this.peek() || '')) this.pos += 1;
        if (start === this.pos) throw new Error(`Expected number at position ${this.pos + 1}`);
        const token = this.expr.slice(start, this.pos);
        const value = Number(token);
        if (!Number.isFinite(value)) throw new Error(`Invalid number: ${token}`);
        return value;
    }
}

class HashTrainer {
    constructor() {
        this.m = 9;
        this.collision = 'chaining';
        this.keyType = 'int';
        this.keyMode = 'manual';
        this.hMode = 'auto';
        this.hExpr = 'k';
        this.h2Mode = 'auto';
        this.h2Expr = 'k';

        this.table = this.makeEmptyTable(this.m, this.collision);

        this.operation = null;
        this.rehashState = null;
        this.errorCount = 0;
        this.timerSeconds = 0;
        this.timerId = null;

        this.totalOps = 0;
        this.totalProbes = 0;

        this.bindEvents();
        this.syncControls();
        this.renderAll();
    }

    bindEvents() {
        document.getElementById('applyTableBtn').addEventListener('click', () => this.applyTableSize());
        document.getElementById('insertBtn').addEventListener('click', () => this.startInsert());
        document.getElementById('findBtn').addEventListener('click', () => this.startFind());
        document.getElementById('removeBtn').addEventListener('click', () => this.startRemove());
        document.getElementById('rehashBtn').addEventListener('click', () => this.startRehash());
        document.getElementById('randomFillBtn').addEventListener('click', () => this.insertKRandomKeys());
        document.getElementById('resetCountersBtn').addEventListener('click', () => this.resetCounters());

        document.querySelectorAll('input[name="collision"]').forEach(el => {
            el.addEventListener('change', () => {
                this.collision = document.querySelector('input[name="collision"]:checked').value;
                this.table = this.makeEmptyTable(this.m, this.collision);
                this.cancelOperation(false);
                this.resetCounters();
                this.setInfo('Collision strategy changed. Table reset.');
                this.syncControls();
                this.renderAll();
            });
        });

        document.querySelectorAll('input[name="keyType"]').forEach(el => {
            el.addEventListener('change', () => {
                this.keyType = document.querySelector('input[name="keyType"]:checked').value;
                this.syncControls();
                this.renderAll();
            });
        });

        document.querySelectorAll('input[name="keyMode"]').forEach(el => {
            el.addEventListener('change', () => {
                this.keyMode = document.querySelector('input[name="keyMode"]:checked').value;
                this.syncControls();
            });
        });

        document.querySelectorAll('input[name="hMode"]').forEach(el => {
            el.addEventListener('change', () => {
                this.hMode = document.querySelector('input[name="hMode"]:checked').value;
                this.syncControls();
            });
        });

        document.querySelectorAll('input[name="h2Mode"]').forEach(el => {
            el.addEventListener('change', () => {
                this.h2Mode = document.querySelector('input[name="h2Mode"]:checked').value;
                this.syncControls();
            });
        });

        document.getElementById('hExprInput').addEventListener('input', (e) => {
            this.hExpr = e.target.value || 'k';
        });

        document.getElementById('h2ExprInput').addEventListener('input', (e) => {
            this.h2Expr = e.target.value || 'k';
        });

        document.getElementById('tableView').addEventListener('click', (e) => this.handleTargetClick(e));
        document.getElementById('oldTableView').addEventListener('click', (e) => this.handleTargetClick(e));
        document.getElementById('newTableView').addEventListener('click', (e) => this.handleTargetClick(e));

        document.getElementById('rehashBar').addEventListener('click', (e) => {
            const action = e.target.closest('button[data-action]');
            if (!action) return;
            this.handleAction(action.dataset.action);
        });

        document.getElementById('trainerPanel').addEventListener('click', (e) => {
            const action = e.target.closest('button[data-action]');
            if (!action) return;
            this.handleAction(action.dataset.action);
        });
    }

    syncControls() {
        const stringType = this.keyType === 'string';
        const keyAuto = this.keyMode === 'auto';
        const hManualAllowed = !stringType;
        const isDouble = this.collision === 'double';

        document.getElementById('keyInput').disabled = keyAuto;

        const hModeAuto = document.querySelector('input[name="hMode"][value="auto"]');
        const hModeManual = document.querySelector('input[name="hMode"][value="manual"]');
        hModeManual.disabled = !hManualAllowed;
        if (!hManualAllowed) {
            hModeAuto.checked = true;
            this.hMode = 'auto';
        }

        const hExpr = document.getElementById('hExprInput');
        hExpr.disabled = this.hMode !== 'manual' || !hManualAllowed;

        const h2Block = document.getElementById('h2Block');
        h2Block.classList.toggle('hidden', !isDouble);

        const h2ModeManual = document.querySelector('input[name="h2Mode"][value="manual"]');
        const h2ModeAuto = document.querySelector('input[name="h2Mode"][value="auto"]');
        h2ModeManual.disabled = !hManualAllowed;
        if (!hManualAllowed) {
            h2ModeAuto.checked = true;
            this.h2Mode = 'auto';
        }

        const h2Expr = document.getElementById('h2ExprInput');
        h2Expr.disabled = !isDouble || this.h2Mode !== 'manual' || !hManualAllowed;
    }

    setMessage(text, type = 'info') {
        const area = document.getElementById('messageArea');
        area.className = `message ${type}`;
        area.textContent = text;
    }

    setInfo(text) { this.setMessage(text, 'info'); }
    setSuccess(text) { this.setMessage(text, 'success'); }
    setError(text) { this.setMessage(text, 'error'); }

    showStats(show) {
        document.getElementById('statsBar').style.display = show ? 'flex' : 'none';
    }

    resetStats() {
        this.errorCount = 0;
        this.timerSeconds = 0;
        this.updateStats();
    }

    addError() {
        this.errorCount += 1;
        this.updateStats();
    }

    updateStats() {
        document.getElementById('errorCount').textContent = String(this.errorCount);
        const mm = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
        const ss = String(this.timerSeconds % 60).padStart(2, '0');
        document.getElementById('timerText').textContent = `${mm}:${ss}`;
    }

    updateCounters() {
        document.getElementById('totalOpsDisplay').textContent = String(this.totalOps);
        document.getElementById('totalProbesDisplay').textContent = String(this.totalProbes);
        const avg = this.totalOps > 0
            ? (this.totalProbes / this.totalOps).toFixed(2)
            : '—';
        document.getElementById('avgProbesDisplay').textContent = avg;
    }

    resetCounters() {
        this.totalOps = 0;
        this.totalProbes = 0;
        this.updateCounters();
    }

    startTimer() {
        this.stopTimer();
        this.timerId = setInterval(() => {
            this.timerSeconds += 1;
            this.updateStats();
        }, 1000);
    }

    stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    applyTableSize() {
        const m = Number(document.getElementById('tableSizeInput').value);
        if (!Number.isInteger(m) || m < 1) {
            this.setError('Table size m must be a positive integer.');
            return;
        }
        this.m = m;
        this.table = this.makeEmptyTable(this.m, this.collision);
        this.cancelOperation(false);
        this.resetCounters();
        this.setSuccess(`Table reset with m = ${m}.`);
        this.renderAll();
    }

    makeEmptyTable(m, collision) {
        if (collision === 'chaining') {
            return {
                mode: 'chaining',
                m,
                buckets: Array.from({ length: m }, () => [])
            };
        }
        return {
            mode: collision,
            m,
            slots: Array.from({ length: m }, () => ({ key: null, deleted: false }))
        };
    }

    deepClone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    normMod(x, m) {
        return ((x % m) + m) % m;
    }

    stringHash(s) {
        let h = 0;
        for (let i = 0; i < s.length; i += 1) {
            h = (h * 31 + s.charCodeAt(i)) | 0;
        }
        return h;
    }

    stringHash2(s) {
        let h = 0;
        for (let i = 0; i < s.length; i += 1) {
            h = (h * 131 + s.charCodeAt(i)) | 0;
        }
        return h;
    }

    toKeyString(key) {
        return this.keyType === 'int' ? String(Number(key)) : String(key);
    }

    keysEqual(a, b) {
        return this.keyType === 'int' ? Number(a) === Number(b) : String(a) === String(b);
    }

    parseManualKey() {
        const raw = document.getElementById('keyInput').value.trim();
        if (!raw) throw new Error('Please provide a key in the key textbox.');
        if (this.keyType === 'int') {
            if (!/^-?\d+$/.test(raw)) throw new Error('Integer key is invalid.');
            const n = Number(raw);
            if (!Number.isSafeInteger(n)) throw new Error('Integer key is out of safe range.');
            return n;
        }
        return raw;
    }

    randomString() {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const len = 4 + Math.floor(Math.random() * 4);
        let out = '';
        for (let i = 0; i < len; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
        return out;
    }

    collectAllKeys() {
        const out = [];
        if (this.table.mode === 'chaining') {
            for (const bucket of this.table.buckets) {
                for (const key of bucket) out.push(key);
            }
        } else {
            for (const slot of this.table.slots) {
                if (slot.key !== null) out.push(slot.key);
            }
        }
        return out;
    }

    makeRandomKey(avoidExisting = false) {
        const existing = this.collectAllKeys();
        for (let t = 0; t < 200; t += 1) {
            const key = this.keyType === 'int'
                ? (Math.floor(Math.random() * 200) + 1)
                : this.randomString();
            if (!avoidExisting) return key;
            if (!existing.some(k => this.keysEqual(k, key))) return key;
        }
        return this.keyType === 'int' ? (Math.floor(Math.random() * 10000) + 1) : `${this.randomString()}${Math.floor(Math.random() * 100)}`;
    }

    getOperationKey(preferMissing = false) {
        const key = this.keyMode === 'auto' ? this.makeRandomKey(preferMissing) : this.parseManualKey();
        document.getElementById('keyInput').value = this.toKeyString(key);
        return key;
    }

    evalExpr(expr, k) {
        const parser = new ExpressionParser(expr);
        return parser.parse(k);
    }

    hRaw(key) {
        if (this.keyType === 'string') return this.stringHash(String(key));
        if (this.hMode === 'manual') return this.evalExpr(this.hExpr, Number(key));
        return Number(key);
    }

    h2Raw(key) {
        if (this.keyType === 'string') return this.stringHash2(String(key));
        if (this.h2Mode === 'manual') return this.evalExpr(this.h2Expr, Number(key));
        return Number(key) * 7 + 1;
    }

    hIndex(key, m = this.table.m) {
        const raw = this.hRaw(key);
        return this.normMod(Math.floor(raw), m);
    }

    h2Step(key, m = this.table.m) {
        let step = this.normMod(Math.floor(this.h2Raw(key)), m);
        if (step === 0) step = 1;
        return step;
    }

    probeSequence(key, table = this.table) {
        const m = table.m;
        const h1 = this.hIndex(key, m);
        const seq = [];
        const seen = new Set();
        const mode = table.mode;

        if (mode === 'linear') {
            for (let i = 0; i < m + 1; i += 1) {
                const idx = this.normMod(h1 + i, m);
                if (seen.has(idx)) break;
                seen.add(idx);
                seq.push(idx);
            }
            return seq;
        }

        if (mode === 'quadratic') {
            for (let i = 0; i < m + 1; i += 1) {
                const idx = this.normMod(h1 + i * i, m);
                if (seen.has(idx)) break;
                seen.add(idx);
                seq.push(idx);
            }
            return seq;
        }

        if (mode === 'double') {
            const step = this.h2Step(key, m);
            for (let i = 0; i < m + 1; i += 1) {
                const idx = this.normMod(h1 + i * step, m);
                if (seen.has(idx)) break;
                seen.add(idx);
                seq.push(idx);
            }
            return seq;
        }

        return [h1];
    }

    planInsert(key) {
        if (this.table.mode === 'chaining') {
            const idx = this.hIndex(key);
            const chain = this.table.buckets[idx];
            const hasDup = chain.some(k => this.keysEqual(k, key));
            const path = [`bucket-${idx}`, ...chain.map((_, j) => `node-${idx}-${j}`), `plus-${idx}`];
            return {
                kind: 'chaining',
                path,
                canInsert: !hasDup,
                targetId: `plus-${idx}`,
                index: idx,
                duplicate: hasDup
            };
        }

        const seq = this.probeSequence(key);
        const path = [];
        let target = null;

        for (const idx of seq) {
            path.push(`slot-${idx}`);
            const slot = this.table.slots[idx];
            if (slot.key !== null && this.keysEqual(slot.key, key)) {
                return {
                    kind: 'open',
                    path,
                    canInsert: false,
                    duplicate: true,
                    cycleOrFull: false,
                    targetId: null,
                    index: null
                };
            }
            if (slot.key === null || slot.deleted) {
                target = idx;
                break;
            }
        }

        if (target === null) {
            return {
                kind: 'open',
                path,
                canInsert: false,
                duplicate: false,
                cycleOrFull: true,
                targetId: null,
                index: null
            };
        }

        return {
            kind: 'open',
            path,
            canInsert: true,
            duplicate: false,
            cycleOrFull: false,
            targetId: `slot-${target}`,
            index: target
        };
    }

    planFindOrRemove(key) {
        if (this.table.mode === 'chaining') {
            const idx = this.hIndex(key);
            const chain = this.table.buckets[idx];
            const path = [`bucket-${idx}`];
            let foundAt = null;
            for (let j = 0; j < chain.length; j += 1) {
                path.push(`node-${idx}-${j}`);
                if (this.keysEqual(chain[j], key)) {
                    foundAt = `node-${idx}-${j}`;
                    break;
                }
            }
            return {
                kind: 'chaining',
                path,
                found: foundAt !== null,
                foundId: foundAt,
                index: idx
            };
        }

        const seq = this.probeSequence(key);
        const path = [];
        let foundAt = null;

        for (const idx of seq) {
            const id = `slot-${idx}`;
            path.push(id);
            const slot = this.table.slots[idx];
            if (slot.key === null && !slot.deleted) break;
            if (this.keysEqual(slot.key, key)) {
                foundAt = id;
                break;
            }
        }

        return {
            kind: 'open',
            path,
            found: foundAt !== null,
            foundId: foundAt
        };
    }

    startOperation(kind, key, plan, infoLine) {
        this.operation = {
            kind,
            key,
            plan,
            clickPos: 0,
            selectedId: null,
            revealedId: null,
            snapshot: this.deepClone(this.table)
        };
        this.rehashState = null;
        this.resetStats();
        this.showStats(true);
        this.startTimer();

        this.setInfo(infoLine);
        this.renderAll();
    }

    startInsert() {
        if (this.operation || this.rehashState) return;
        let key;
        try {
            key = this.getOperationKey(true);
            this.validateHashExpressions(key);
        } catch (err) {
            this.setError(err.message);
            return;
        }

        const plan = this.planInsert(key);
        const h1 = this.hIndex(key);
        const baseInfo = this.table.mode === 'double'
            ? `h(k) = ${h1}, h2(k) = ${this.h2Step(key)}`
            : `h(k) = ${h1}`;
        this.startOperation('insert', key, plan, `Insert key ${this.toKeyString(key)}. ${baseInfo}. Click each probe/chain node in order.`);
    }

    startFind() {
        if (this.operation || this.rehashState) return;
        let key;
        try {
            key = this.getOperationKey(false);
            this.validateHashExpressions(key);
        } catch (err) {
            this.setError(err.message);
            return;
        }

        const plan = this.planFindOrRemove(key);
        const h1 = this.hIndex(key);
        const baseInfo = this.table.mode === 'double'
            ? `h(k) = ${h1}, h2(k) = ${this.h2Step(key)}`
            : `h(k) = ${h1}`;
        this.startOperation('find', key, plan, `Find key ${this.toKeyString(key)}. ${baseInfo}. Click the search path in order.`);
    }

    startRemove() {
        if (this.operation || this.rehashState) return;
        let key;
        try {
            key = this.getOperationKey(false);
            this.validateHashExpressions(key);
        } catch (err) {
            this.setError(err.message);
            return;
        }

        const plan = this.planFindOrRemove(key);
        const h1 = this.hIndex(key);
        const baseInfo = this.table.mode === 'double'
            ? `h(k) = ${h1}, h2(k) = ${this.h2Step(key)}`
            : `h(k) = ${h1}`;
        this.startOperation('remove', key, plan, `Remove key ${this.toKeyString(key)}. ${baseInfo}. Click the search path in order.`);
    }

    validateHashExpressions(sampleKey) {
        if (this.keyType === 'int' && this.hMode === 'manual') {
            this.evalExpr(this.hExpr, Number(sampleKey));
        }
        if (this.collision === 'double' && this.keyType === 'int' && this.h2Mode === 'manual') {
            this.evalExpr(this.h2Expr, Number(sampleKey));
        }
    }

    insertKRandomKeys() {
        if (this.operation || this.rehashState) {
            this.setError('Finish or cancel the active operation first.');
            return;
        }

        const kRaw = Number(document.getElementById('randomFillCountInput').value);
        if (!Number.isInteger(kRaw) || kRaw < 1) {
            this.setError('k must be a positive integer.');
            return;
        }

        try {
            this.validateHashExpressions(1);
        } catch (err) {
            this.setError(err.message);
            return;
        }

        let inserted = 0;
        let attempts = 0;
        const maxAttempts = Math.max(200, kRaw * 60);

        while (inserted < kRaw && attempts < maxAttempts) {
            attempts += 1;
            const key = this.makeRandomKey(true);
            const plan = this.planInsert(key);
            if (!plan.canInsert) {
                if (plan.cycleOrFull) break;
                continue;
            }
            this.commitInsert(key, plan);
            this.totalOps += 1;
            this.totalProbes += plan.path.length;
            inserted += 1;
        }
        this.updateCounters();

        if (inserted === 0) {
            this.setInfo('No keys inserted. Table may be full or constraints blocked insertion.');
        } else if (inserted < kRaw) {
            this.setInfo(`Inserted ${inserted} of ${kRaw} random keys.`);
        } else {
            this.setSuccess(`Inserted ${inserted} random keys.`);
        }
        this.renderAll();
    }

    startRehash() {
        if (this.operation || this.rehashState) return;

        let newM = Number(document.getElementById('rehashSizeInput').value);
        if (!Number.isInteger(newM) || newM < 1) {
            this.setError('Rehash table size must be a positive integer.');
            return;
        }

        const oldTable = this.deepClone(this.table);
        const newTable = this.makeEmptyTable(newM, this.table.mode);
        const queue = this.buildRehashQueue(oldTable);
        const steps = [];

        for (const item of queue) {
            const placement = this.computePlacementInTable(newTable, item.key);
            if (!placement.ok) {
                this.setError(`Rehash failed: cannot place key ${this.toKeyString(item.key)} in new table.`);
                return;
            }
            this.insertIntoTable(newTable, item.key, placement);
            steps.push({
                key: item.key,
                oldId: item.oldId,
                oldLabel: item.oldLabel,
                targetIndex: placement.index,
                targetId: this.table.mode === 'chaining' ? `new-bucket-${placement.index}` : `new-slot-${placement.index}`,
                h1: this.hIndex(item.key, newM),
                h2: this.table.mode === 'double' ? this.h2Step(item.key, newM) : null
            });
        }

        this.rehashState = {
            oldTable,
            newTable: this.makeEmptyTable(newM, this.table.mode),
            finalTable: newTable,
            newM,
            steps,
            stepIndex: 0,
            snapshot: this.deepClone(this.table)
        };

        this.operation = null;
        this.resetStats();
        this.showStats(true);
        this.startTimer();

        if (steps.length === 0) {
            this.finishRehash();
            return;
        }

        const first = steps[0];
        const hText = first.h2 === null ? `h(k) = ${first.h1}` : `h(k) = ${first.h1}, h2(k) = ${first.h2}`;
        this.setInfo(`Rehash started. Highlighted old source: ${first.oldLabel}. ${hText}. Click final index in new table.`);
        this.renderAll();
    }

    buildRehashQueue(oldTable) {
        const queue = [];
        if (oldTable.mode === 'chaining') {
            oldTable.buckets.forEach((chain, i) => {
                chain.forEach((key, j) => {
                    queue.push({ key, oldId: `old-node-${i}-${j}`, oldLabel: `bucket ${i} node ${j}` });
                });
            });
        } else {
            oldTable.slots.forEach((slot, i) => {
                if (slot.key !== null) {
                    queue.push({ key: slot.key, oldId: `old-slot-${i}`, oldLabel: `slot ${i}` });
                }
            });
        }
        return queue;
    }

    computePlacementInTable(table, key) {
        if (table.mode === 'chaining') {
            const idx = this.hIndex(key, table.m);
            return { ok: true, index: idx };
        }

        const seq = this.probeSequenceForTable(key, table);
        for (const idx of seq) {
            const slot = table.slots[idx];
            if (slot.key === null || slot.deleted) {
                return { ok: true, index: idx };
            }
        }
        return { ok: false, index: -1 };
    }

    probeSequenceForTable(key, table) {
        const m = table.m;
        const h1 = this.hIndex(key, m);
        const mode = table.mode;
        const seq = [];
        const seen = new Set();

        if (mode === 'linear') {
            for (let i = 0; i < m + 1; i += 1) {
                const idx = this.normMod(h1 + i, m);
                if (seen.has(idx)) break;
                seen.add(idx);
                seq.push(idx);
            }
            return seq;
        }

        if (mode === 'quadratic') {
            for (let i = 0; i < m + 1; i += 1) {
                const idx = this.normMod(h1 + i * i, m);
                if (seen.has(idx)) break;
                seen.add(idx);
                seq.push(idx);
            }
            return seq;
        }

        if (mode === 'double') {
            const step = this.h2Step(key, m);
            for (let i = 0; i < m + 1; i += 1) {
                const idx = this.normMod(h1 + i * step, m);
                if (seen.has(idx)) break;
                seen.add(idx);
                seq.push(idx);
            }
            return seq;
        }

        return [h1];
    }

    insertIntoTable(table, key, placement) {
        if (table.mode === 'chaining') {
            table.buckets[placement.index].push(key);
            return;
        }
        const slot = table.slots[placement.index];
        slot.key = key;
        slot.deleted = false;
    }

    finishOperation(successText) {
        this.stopTimer();
        if (this.operation) {
            this.totalOps += 1;
            this.totalProbes += this.operation.plan.path.length;
            this.updateCounters();
        }
        this.operation = null;
        this.showStats(false);
        this.setSuccess(successText);
        this.renderAll();
    }

    cancelOperation(showMessage = true) {
        this.stopTimer();

        if (this.operation?.snapshot) {
            this.table = this.deepClone(this.operation.snapshot);
        }
        if (this.rehashState?.snapshot) {
            this.table = this.deepClone(this.rehashState.snapshot);
        }

        this.operation = null;
        this.rehashState = null;
        this.showStats(false);
        if (showMessage) this.setInfo('Operation cancelled and state restored.');
        this.renderAll();
    }

    flashTarget(id, kind) {
        const el = document.querySelector(`[data-target-id="${id}"]`);
        if (!el) return;
        el.classList.add(kind);
        setTimeout(() => el.classList.remove(kind), 400);
    }

    handleTargetClick(e) {
        const target = e.target.closest('[data-target-id]');
        if (!target) return;
        const id = target.dataset.targetId;

        if (this.operation) {
            this.handleOperationClick(id);
            return;
        }

        if (this.rehashState) {
            this.handleRehashClick(id);
        }
    }

    handleOperationClick(id) {
        const op = this.operation;
        op.revealedId = id;
        op.selectedId = id;
        const expected = op.plan.path[op.clickPos];
        if (!expected) return;

        if (id !== expected) {
            this.addError();
            this.flashTarget(id, 'wrong');
            this.setError('Wrong click.');
            this.renderAll();
            return;
        }

        op.clickPos += 1;
        this.flashTarget(id, 'correct');
        this.setInfo(`Good. Step ${op.clickPos}/${op.plan.path.length}.`);
        this.renderAll();
    }

    handleRehashClick(id) {
        const state = this.rehashState;
        const step = state.steps[state.stepIndex];
        if (!step) return;

        if (!id.startsWith('new-')) {
            return;
        }

        if (id !== step.targetId) {
            this.addError();
            this.flashTarget(id, 'wrong');
            this.setError('Wrong new index for this key.');
            return;
        }

        this.flashTarget(id, 'correct');
        this.insertIntoTable(state.newTable, step.key, { index: step.targetIndex });
        state.stepIndex += 1;

        if (state.stepIndex >= state.steps.length) {
            this.finishRehash();
            return;
        }

        const next = state.steps[state.stepIndex];
        const hText = next.h2 === null ? `h(k) = ${next.h1}` : `h(k) = ${next.h1}, h2(k) = ${next.h2}`;
        this.setInfo(`Correct. Highlighted old source: ${next.oldLabel}. ${hText}. Click final index in new table.`);
        this.renderAll();
    }

    finishRehash() {
        const state = this.rehashState;
        this.table = state.finalTable;
        this.m = state.newM;
        document.getElementById('tableSizeInput').value = String(this.m);

        this.stopTimer();
        this.rehashState = null;
        this.showStats(false);
        this.resetCounters();
        this.setSuccess('Rehash complete. New table is now active.');
        this.renderAll();
    }

    handleAction(action) {
        if (action === 'cancel') {
            this.cancelOperation(true);
            return;
        }

        if (!this.operation) return;

        const op = this.operation;
        const donePath = op.clickPos === op.plan.path.length;

        if (action === 'insert-here') {
            if (!op.kind || op.kind !== 'insert') return;
            if (!donePath || op.selectedId !== op.plan.targetId || !op.plan.canInsert) {
                this.addError();
                this.setError('Insert Here is not valid yet. Follow full probe path and choose final slot/+ node.');
                return;
            }
            this.commitInsert(op.key, op.plan);
            this.finishOperation(`Insert complete for key ${this.toKeyString(op.key)}.`);
            return;
        }

        if (action === 'cannot-insert') {
            if (op.kind !== 'insert') return;
            if (!donePath || op.plan.canInsert || op.plan.duplicate) {
                this.addError();
                this.setError('Cannot Insert is only valid for full/cycle condition after full probing.');
                return;
            }
            this.finishOperation('Correct: insertion is impossible (cycle/full).');
            return;
        }

        if (action === 'return-found') {
            if (op.kind !== 'find') return;
            if (!donePath || !op.plan.found || op.selectedId !== op.plan.foundId) {
                this.addError();
                this.setError('Return Found is incorrect for current clicks.');
                return;
            }
            this.finishOperation(`Correct: key ${this.toKeyString(op.key)} was found.`);
            return;
        }

        if (action === 'return-not-found') {
            if (op.kind !== 'find' && op.kind !== 'remove') return;
            if (!donePath || op.plan.found) {
                this.addError();
                this.setError('Return Not Found is incorrect for current clicks.');
                return;
            }
            this.finishOperation(`Correct: key ${this.toKeyString(op.key)} is not in the table.`);
            return;
        }

        if (action === 'erase') {
            if (op.kind !== 'remove') return;
            if (!donePath || !op.plan.found || op.selectedId !== op.plan.foundId) {
                this.addError();
                this.setError('Erase is incorrect for current clicks.');
                return;
            }
            this.commitRemove(op.key, op.plan);
            this.finishOperation(`Remove complete for key ${this.toKeyString(op.key)}.`);
            return;
        }
    }

    commitInsert(key, plan) {
        if (this.table.mode === 'chaining') {
            this.table.buckets[plan.index].push(key);
            return;
        }
        const slot = this.table.slots[plan.index];
        slot.key = key;
        slot.deleted = false;
    }

    commitRemove(key, plan) {
        if (this.table.mode === 'chaining') {
            const idx = plan.index;
            const chain = this.table.buckets[idx];
            const pos = chain.findIndex(k => this.keysEqual(k, key));
            if (pos >= 0) chain.splice(pos, 1);
            return;
        }

        const id = plan.foundId;
        const idx = Number(id.split('-')[1]);
        const slot = this.table.slots[idx];
        slot.key = null;
        slot.deleted = true;
    }

    renderAll() {
        this.syncControls();

        const isRehash = !!this.rehashState;
        const hasActiveOp = !!this.operation;
        document.querySelector('.container').classList.toggle('rehash-mode', isRehash);
        document.getElementById('rehashPanels').classList.toggle('hidden', !isRehash);
        document.getElementById('rehashBar').classList.toggle('hidden', !isRehash);
        document.getElementById('tableTitle').textContent = 'Hash Table';

        const idlePanel = document.getElementById('idlePanel');
        if (idlePanel) idlePanel.classList.toggle('hidden', hasActiveOp || isRehash);
        const trainerPanel = document.getElementById('trainerPanel');
        if (trainerPanel) trainerPanel.classList.toggle('hidden', !hasActiveOp || isRehash);

        this.renderTable('tableView', this.table, '', hasActiveOp && !isRehash);

        if (isRehash) {
            const state = this.rehashState;
            document.getElementById('newMLabel').textContent = state.newM;
            this.renderTable('oldTableView', state.oldTable, 'old-', true);
            this.renderTable('newTableView', state.newTable, 'new-', true);
            this.renderRehashBar();
        }

        this.renderTrainerPanel();
    }

    renderTable(containerId, table, prefix, clickable) {
        const container = document.getElementById(containerId);
        if (!table) {
            container.innerHTML = '';
            return;
        }

        if (table.mode === 'chaining') {
            container.innerHTML = this.renderChainingTable(table, prefix, clickable);
        } else {
            container.innerHTML = this.renderOpenTable(table, prefix, clickable);
        }

        this.applyTargetClasses(container, prefix);
    }

    renderOpenTable(table, prefix, clickable) {
        const rows = table.slots.map((slot, i) => {
            const targetId = `${prefix}slot-${i}`;
            const mask = !!this.operation && prefix === '' && this.operation.revealedId !== targetId;
            const value = slot.key === null ? '∅' : this.toKeyString(slot.key);
            const delText = slot.deleted ? 'True' : 'False';
            const classes = ['target'];
            if (clickable) classes.push('clickable');
            return `
                <div class="table-row">
                    <div class="index-cell">[${i}]</div>
                    <div class="value-cell ${classes.join(' ')} ${mask ? 'masked' : ''}" data-target-id="${targetId}">${value}</div>
                    <div class="deleted-cell ${mask ? 'masked' : ''}">Deleted: ${delText}</div>
                </div>
            `;
        }).join('');
        return `<div class="table-layout">${rows}</div>`;
    }

    renderChainingTable(table, prefix, clickable) {
        const rows = table.buckets.map((chain, i) => {
            const bucketId = `${prefix}bucket-${i}`;
            const bucketClasses = [];
            if (clickable) bucketClasses.push('clickable');
            const bucketMask = !!this.operation && prefix === '' && this.operation.revealedId !== bucketId;

            const chainHtml = chain.map((key, j) => {
                const nodeId = `${prefix}node-${i}-${j}`;
                const nodeMask = !!this.operation && prefix === '' && this.operation.revealedId !== nodeId;
                const classes = ['node', 'target'];
                if (clickable) classes.push('clickable');
                return `<span class="arrow">→</span><span class="${classes.join(' ')} ${nodeMask ? 'masked' : ''}" data-target-id="${nodeId}">${this.toKeyString(key)}</span>`;
            }).join('');

            const plusId = `${prefix}plus-${i}`;
            const plusClasses = ['node', 'plus', 'target'];
            if (clickable) plusClasses.push('clickable');

            return `
                <div class="table-row chaining">
                    <div class="index-cell ${bucketClasses.join(' ')}">[${i}]</div>
                    <div class="chain">
                        <span class="value-cell target ${clickable ? 'clickable' : ''} ${bucketMask ? 'masked' : ''}" data-target-id="${bucketId}">head</span>
                        ${chainHtml}
                        <span class="arrow">→</span><span class="${plusClasses.join(' ')}" data-target-id="${plusId}">+</span>
                    </div>
                </div>
            `;
        }).join('');
        return `<div class="table-layout">${rows}</div>`;
    }

    applyTargetClasses(container, prefix) {
        container.querySelectorAll('[data-target-id]').forEach(el => {
            const id = el.dataset.targetId;
            el.classList.remove('selected', 'rehash-source');

            if (this.operation) {
                const op = this.operation;
                if (id === op.selectedId) el.classList.add('selected');
            }

            if (this.rehashState && prefix === 'old-') {
                const step = this.rehashState.steps[this.rehashState.stepIndex];
                if (step && id === step.oldId) el.classList.add('rehash-source');
            }

            if (!id.startsWith(prefix)) return;
        });
    }

    renderRehashBar() {
        const bar = document.getElementById('rehashBar');
        const state = this.rehashState;
        const step = state.steps[state.stepIndex];
        if (!step) {
            bar.innerHTML = '<span>Rehash complete.</span>';
            return;
        }
        const hText = step.h2 === null
            ? `h(k) mod new m = ${step.h1}`
            : `h(k) mod new m = ${step.h1}, h2(k) = ${step.h2}`;
        bar.innerHTML = `
            <span>
                <strong>Step ${state.stepIndex + 1}/${state.steps.length}</strong>
                &nbsp;|&nbsp; key = <strong>${this.toKeyString(step.key)}</strong>
                &nbsp;|&nbsp; ${hText}
                &nbsp;|&nbsp; Highlighted in old table &rarr; click its final slot in new table.
            </span>
            <button data-action="cancel">Cancel Rehash</button>
        `;
    }

    renderTrainerPanel() {
        const panel = document.getElementById('trainerPanel');

        if (this.rehashState || !this.operation) {
            panel.innerHTML = '';
            return;
        }

        const op = this.operation;
        const plan = op.plan;

        let details = `
            <div class="panel-block">
                <strong>${op.kind.toUpperCase()}</strong>
                <p>Key: ${this.toKeyString(op.key)}</p>
                <p>Progress: ${op.clickPos}/${plan.path.length}</p>
            </div>
        `;

        let buttons = '<button data-action="cancel">Cancel</button>';

        if (op.kind === 'insert') {
            const insertInstructions = this.table.mode === 'chaining'
                ? '<p>Click the array entry where the key hashes. Then click nodes that need to be searched, and finally, click + and <strong>Insert Here</strong> when the node should be added to the chain.</p>'
                : '<p>Use <strong>Insert Here</strong> when you are on final slot/node.</p>';
            details += `<div class="panel-block">${insertInstructions}<p>Use <strong>Cannot Insert</strong> only for full/cycle.</p>${plan.duplicate ? '<p>Note: key already exists (duplicate).</p>' : ''}</div>`;
            buttons = `
                <button data-action="insert-here">Insert Here</button>
                <button data-action="cannot-insert">Cannot Insert</button>
                <button data-action="cancel">Cancel</button>
            `;
        }

        if (op.kind === 'find') {
            details += '<div class="panel-block"><p>Click Return Found or Return Not Found when done.</p></div>';
            buttons = `
                <button data-action="return-found">Return Found</button>
                <button data-action="return-not-found">Return Not Found</button>
                <button data-action="cancel">Cancel</button>
            `;
        }

        if (op.kind === 'remove') {
            details += '<div class="panel-block"><p>Click Erase if key is found, else Return Not Found.</p></div>';
            buttons = `
                <button data-action="erase">Erase</button>
                <button data-action="return-not-found">Return Not Found</button>
                <button data-action="cancel">Cancel</button>
            `;
        }

        panel.innerHTML = `${details}<div class="panel-actions">${buttons}</div>`;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new HashTrainer();
});
