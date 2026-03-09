class SplayNode {
    constructor(key, id) {
        this.key = key;
        this.id = id;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class SplayTree {
    constructor() {
        this.root = null;
        this.nextId = 1;
        this.idToNode = new Map();
    }

    clear() {
        this.root = null;
        this.nextId = 1;
        this.idToNode.clear();
    }

    createNode(key) {
        const node = new SplayNode(key, this.nextId++);
        this.idToNode.set(node.id, node);
        return node;
    }

    getNodeById(id) {
        return this.idToNode.get(id) ?? null;
    }

    containsKey(key) {
        return !!this.findNodeByKey(key);
    }

    findNodeByKey(key) {
        let cur = this.root;
        while (cur) {
            if (key === cur.key) return cur;
            cur = key < cur.key ? cur.left : cur.right;
        }
        return null;
    }

    rotateLeft(x) {
        if (!x || !x.right) return x;
        const y = x.right;
        const t2 = y.left;

        y.left = x;
        x.right = t2;

        y.parent = x.parent;
        if (x.parent === null) {
            this.root = y;
        } else if (x.parent.left === x) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        x.parent = y;
        if (t2) t2.parent = x;

        return y;
    }

    rotateRight(y) {
        if (!y || !y.left) return y;
        const x = y.left;
        const t2 = x.right;

        x.right = y;
        y.left = t2;

        x.parent = y.parent;
        if (y.parent === null) {
            this.root = x;
        } else if (y.parent.left === y) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        y.parent = x;
        if (t2) t2.parent = y;

        return x;
    }

    insert(key) {
        if (this.root === null) {
            this.root = this.createNode(key);
            return this.root;
        }

        let cur = this.root;
        let parent = null;

        while (cur) {
            if (key === cur.key) return null;
            parent = cur;
            cur = key < cur.key ? cur.left : cur.right;
        }

        const node = this.createNode(key);
        node.parent = parent;

        if (key < parent.key) parent.left = node;
        else parent.right = node;

        this.splay(node);
        return node;
    }

    insertWithoutSplay(key) {
        if (this.root === null) {
            this.root = this.createNode(key);
            return this.root;
        }

        let cur = this.root;
        let parent = null;

        while (cur) {
            if (key === cur.key) return null;
            parent = cur;
            cur = key < cur.key ? cur.left : cur.right;
        }

        const node = this.createNode(key);
        node.parent = parent;
        if (key < parent.key) parent.left = node;
        else parent.right = node;

        return node;
    }

    splay(node) {
        while (node.parent !== null) {
            if (node.parent.parent === null) {
                // Zig: node is child of root
                if (node.parent.left === node) {
                    this.rotateRight(node.parent);
                } else {
                    this.rotateLeft(node.parent);
                }
            } else if (node.parent.left === node && node.parent.parent.left === node.parent) {
                // Zig-Zig (left-left)
                this.rotateRight(node.parent.parent);
                this.rotateRight(node.parent);
            } else if (node.parent.right === node && node.parent.parent.right === node.parent) {
                // Zig-Zig (right-right)
                this.rotateLeft(node.parent.parent);
                this.rotateLeft(node.parent);
            } else if (node.parent.left === node && node.parent.parent.right === node.parent) {
                // Zig-Zag (left-right)
                this.rotateRight(node.parent);
                this.rotateLeft(node.parent);
            } else {
                // Zig-Zag (right-left)
                this.rotateLeft(node.parent);
                this.rotateRight(node.parent);
            }
        }
    }

    remove(key) {
        const node = this.findNodeByKey(key);
        if (!node) return false;

        this.removeNode(node);
        return true;
    }

    removeNode(node) {
        if (!node.left && !node.right) {
            if (node.parent === null) {
                this.root = null;
            } else if (node.parent.left === node) {
                node.parent.left = null;
            } else {
                node.parent.right = null;
            }
        } else if (!node.left || !node.right) {
            const child = node.left || node.right;
            if (node.parent === null) {
                this.root = child;
                child.parent = null;
            } else if (node.parent.left === node) {
                node.parent.left = child;
                child.parent = node.parent;
            } else {
                node.parent.right = child;
                child.parent = node.parent;
            }
        } else {
            // Find predecessor (rightmost in left subtree)
            let pred = node.left;
            while (pred.right) pred = pred.right;
            node.key = pred.key;
            this.removeNode(pred);
        }
    }

    getAllNodes() {
        const out = [];
        const dfs = (node) => {
            if (!node) return;
            out.push(node);
            dfs(node.left);
            dfs(node.right);
        };
        dfs(this.root);
        return out;
    }

    toSerializable() {
        const encode = (node) => {
            if (!node) return null;
            return {
                key: node.key,
                id: node.id,
                left: encode(node.left),
                right: encode(node.right)
            };
        };
        return { root: encode(this.root), nextId: this.nextId };
    }

    fromSerializable(data) {
        this.root = null;
        this.nextId = data.nextId;
        this.idToNode.clear();

        const decode = (obj, parent = null) => {
            if (!obj) return null;
            const node = new SplayNode(obj.key, obj.id);
            this.idToNode.set(node.id, node);
            node.parent = parent;
            node.left = decode(obj.left, node);
            node.right = decode(obj.right, node);
            return node;
        };

        this.root = decode(data.root);
    }
}

class SplayTrainer {
    constructor() {
        this.tree = new SplayTree();
        this.mode = null;
        this.errorCount = 0;
        this.elapsedMs = 0;
        this.timerInterval = null;
        this.currentHighlightNodeId = null;
        this.nodeStatus = new Map();
        this.treeSpacing = { horizontal: 80, vertical: 100 };

        this.insertSession = null;
        this.removeSession = null;
        this.splaySession = null;

        this.applyQueryString();
        this.bindEvents();
        this.render();
    }

    bindEvents() {
        document.getElementById('buildFromKeysBtn').addEventListener('click', () => this.buildFromKeysInput());
        document.getElementById('buildRandomBtn').addEventListener('click', () => this.buildRandomN());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearTree());
        document.getElementById('insertBtn').addEventListener('click', () => this.startInsert());
        document.getElementById('removeBtn').addEventListener('click', () => this.startRemove());
        document.getElementById('splayBtn').addEventListener('click', () => this.startSplay());

        document.getElementById('insertRandom').addEventListener('change', (e) => this.handleInsertRandomChange(e));
        document.getElementById('removeRandom').addEventListener('change', (e) => this.handleRemoveRandomChange(e));
        document.getElementById('splayRandom').addEventListener('change', (e) => this.handleSplayRandomChange(e));

        document.getElementById('treeView').addEventListener('click', (e) => {
            const nodeEl = e.target.closest('.tree-node');
            if (!nodeEl) return;
            const nodeId = parseInt(nodeEl.dataset.nodeId, 10);
            const isPlaceholder = nodeEl.dataset.placeholder === '1';
            if (isPlaceholder) {
                this.handlePlaceholderClick(nodeEl.dataset.placeholderSide || null);
                return;
            }
            if (!Number.isInteger(nodeId)) return;
            this.handleNodeClick(nodeId);
        });
    }

    handleInsertRandomChange(e) {
        const insertKeyInput = document.getElementById('insertKeyInput');
        if (e.target.checked) {
            insertKeyInput.classList.add('grayed-text');
        } else {
            insertKeyInput.classList.remove('grayed-text');
        }
    }

    handleRemoveRandomChange(e) {
        const removeKeyInput = document.getElementById('removeKeyInput');
        if (e.target.checked) {
            removeKeyInput.classList.add('grayed-text');
        } else {
            removeKeyInput.classList.remove('grayed-text');
        }
    }

    handleSplayRandomChange(e) {
        const splayKeyInput = document.getElementById('splayKeyInput');
        if (e.target.checked) {
            splayKeyInput.classList.add('grayed-text');
        } else {
            splayKeyInput.classList.remove('grayed-text');
        }
    }

    applyQueryString() {
        const params = new URLSearchParams(window.location.search);
        const keysParam = params.get('keys') ?? params.get('seq') ?? params.get('tree');
        const nParam = params.get('n');

        if (keysParam && keysParam.trim()) {
            document.getElementById('sequenceInput').value = keysParam.replace(/[,]+/g, ' ');
            this.buildFromKeysInput(true);
            return;
        }

        if (nParam && /^-?\d+$/.test(nParam.trim())) {
            document.getElementById('nInput').value = nParam.trim();
            this.buildRandomN(true);
        }
    }

    setMessage(text, type = 'info') {
        const el = document.getElementById('messageArea');
        el.textContent = text;
        el.className = `message ${type}`;
    }

    setError(text) {
        this.setMessage(text, 'error');
    }

    setSuccess(text) {
        this.setMessage(text, 'success');
    }

    setInfo(text) {
        this.setMessage(text, 'info');
    }

    setButtonsEnabled(hasTree) {
        const inExercise = this.mode !== null;
        document.getElementById('insertBtn').disabled = inExercise;
        document.getElementById('removeBtn').disabled = !hasTree || inExercise;
        document.getElementById('splayBtn').disabled = !hasTree || inExercise;
    }

    updateStats() {
        document.getElementById('errorCount').textContent = String(this.errorCount);
        const totalSeconds = Math.floor(this.elapsedMs / 1000);
        const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const ss = String(totalSeconds % 60).padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${mm}:${ss}`;
    }

    addError() {
        this.errorCount++;
        this.updateStats();
    }

    resetStats() {
        this.errorCount = 0;
        this.elapsedMs = 0;
        this.updateStats();
    }

    showStats(show) {
        document.getElementById('practiceStats').style.display = show ? 'flex' : 'none';
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.elapsedMs += 1000;
            this.updateStats();
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    parseSequenceInput() {
        const raw = document.getElementById('sequenceInput').value.trim();
        
        if (!raw) {
            return { ok: true, keys: [] };
        }

        const chunks = raw.split(/[\s,]+/).filter(Boolean);
        const keys = [];
        const seen = new Set();

        for (const token of chunks) {
            if (!/^-?\d+$/.test(token)) {
                return { ok: false, error: `Invalid integer: ${token}` };
            }
            const key = Number(token);
            if (!Number.isSafeInteger(key)) {
                return { ok: false, error: `Out-of-range integer: ${token}` };
            }
            if (seen.has(key)) {
                return { ok: false, error: `Duplicate key not allowed: ${key}` };
            }
            seen.add(key);
            keys.push(key);
        }

        return { ok: true, keys };
    }

    buildTreeFromKeys(keys) {
        this.tree.clear();
        for (const key of keys) {
            this.tree.insert(key);
        }
        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;
        this.mode = null;
        this.insertSession = null;
        this.removeSession = null;
        this.splaySession = null;
        this.stopTimer();
        this.showStats(false);
        this.resetStats();
        this.setButtonsEnabled(true);
        this.render();
    }

    buildFromKeysInput(fromQuery = false) {
        if (this.mode) {
            this.setError('Finish or cancel the current exercise first.');
            return;
        }

        const parsed = this.parseSequenceInput();
        if (!parsed.ok) {
            this.setError(parsed.error);
            return;
        }

        this.buildTreeFromKeys(parsed.keys);
        this.setSuccess(`Built splay tree with ${parsed.keys.length} node(s).`);

        if (!fromQuery) {
            history.replaceState(null, '', this.buildQueryString(parsed.keys));
        }
    }

    buildRandomN(fromQuery = false) {
        if (this.mode) {
            this.setError('Finish or cancel the current exercise first.');
            return;
        }

        const nValue = Number(document.getElementById('nInput').value);
        if (!Number.isInteger(nValue) || nValue < 1 || nValue > 63) {
            this.setError('n must be an integer between 1 and 63.');
            return;
        }

        const generated = this.generateUniqueRandomKeys(nValue);
        document.getElementById('sequenceInput').value = generated.join(' ');
        this.buildTreeFromKeys(generated);
        this.setSuccess(`Generated random splay tree with n = ${nValue}.`);

        if (!fromQuery) {
            history.replaceState(null, '', this.buildQueryString(generated));
        }
    }

    clearTree() {
        this.cancelExercise(false);
        this.tree.clear();
        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;
        this.setInfo('Tree cleared.');
        this.setButtonsEnabled(false);
        this.render();
    }

    buildQueryString(keys) {
        const keysStr = keys.join(',');
        return `?keys=${keysStr}`;
    }

    generateUniqueRandomKeys(n) {
        const keys = [];
        const used = new Set();
        while (keys.length < n) {
            const k = Math.floor(Math.random() * 201) - 100;
            if (!used.has(k)) {
                used.add(k);
                keys.push(k);
            }
        }
        return keys;
    }

    randomUniqueKeyNotInTree() {
        const used = new Set(this.tree.getAllNodes().map((n) => n.key));
        let k;
        do {
            k = Math.floor(Math.random() * 201) - 100;
        } while (used.has(k));
        return k;
    }

    pickRandomExistingKey() {
        const nodes = this.tree.getAllNodes();
        if (nodes.length === 0) return null;
        return nodes[Math.floor(Math.random() * nodes.length)].key;
    }

    computeSearchPathForInsert(key) {
        const pathNodeIds = [];
        let cur = this.tree.root;
        let parent = null;
        let side = 'root';

        while (cur) {
            pathNodeIds.push(cur.id);
            parent = cur;
            if (key < cur.key) {
                side = 'left';
                cur = cur.left;
            } else {
                side = 'right';
                cur = cur.right;
            }
        }

        return {
            pathNodeIds,
            parentId: parent ? parent.id : null,
            side
        };
    }

    computeSearchPathForKey(key) {
        const pathNodeIds = [];
        let cur = this.tree.root;

        while (cur) {
            pathNodeIds.push(cur.id);
            if (key === cur.key) break;
            cur = key < cur.key ? cur.left : cur.right;
        }

        return pathNodeIds;
    }

    startInsert() {
        if (this.mode) return;

        const randomOn = document.getElementById('insertRandom').checked;
        let key = null;

        if (randomOn) {
            key = this.randomUniqueKeyNotInTree();
            document.getElementById('insertKeyInput').value = String(key);
        } else {
            const raw = document.getElementById('insertKeyInput').value.trim();
            if (!raw || !/^-?\d+$/.test(raw)) {
                this.setError('Insert key must be a valid integer when random is unchecked.');
                return;
            }
            key = Number(raw);
            if (this.tree.containsKey(key)) {
                this.setError(`Key ${key} is already in the tree. Use a unique key.`);
                return;
            }
        }

        const snapshot = this.tree.toSerializable();

        this.resetStats();
        this.showStats(true);
        this.startTimer();

        // For empty tree, skip traversal and go directly to placeholder click
        if (!this.tree.root) {
            this.insertSession = {
                key,
                snapshot,
                pathNodeIds: [],
                pathIndex: 0,
                parentId: null,
                side: 'root',
                insertedNodeId: null,
                splayNodeId: null,
                expectedNextNodeId: null,
                pendingSplayOps: null,
                pendingSplayIndex: 0,
                selectedRotationNodeId: null,
                postSplayDecisionPending: false
            };

            this.nodeStatus.clear();
            this.currentHighlightNodeId = null;
            this.mode = 'insert-traverse';
            this.setButtonsEnabled(true);
            this.setInfo(`Insert target key: ${key}. Click the root placeholder to place the new node.`);
            this.render();
            this.renderInsertTraversePanel();
            return;
        }

        const path = this.computeSearchPathForInsert(key);

        this.mode = 'insert-traverse';

        this.insertSession = {
            key,
            snapshot,
            pathNodeIds: path.pathNodeIds,
            pathIndex: 0,
            parentId: path.parentId,
            side: path.side,
            insertedNodeId: null,
            splayNodeId: null,
            expectedNextNodeId: null,
            pendingSplayOps: null,
            pendingSplayIndex: 0,
            selectedRotationNodeId: null,
            postSplayDecisionPending: false
        };

        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;

        this.setButtonsEnabled(true);
        this.setInfo(`Insert target key: ${key}. Click each traversed node in order.`);
        this.render();
        this.renderInsertTraversePanel();
    }

    handleNodeClick(nodeId) {
        if (this.mode === 'insert-traverse' && this.insertSession) {
            this.handleInsertTraverseClick(nodeId);
        } else if (this.mode === 'remove-traverse' && this.removeSession) {
            this.handleRemoveTraverseClick(nodeId);
        } else if (this.mode === 'splay-traverse' && this.splaySession) {
            this.handleSplayTraverseClick(nodeId);
        } else if (this.mode === 'insert-splay' && this.insertSession) {
            this.handleInsertSplayClick(nodeId);
        } else if (this.mode === 'insert-splay-identify-op' && this.insertSession) {
            this.setInfo('Choose the operation type in the panel, then submit.');
            this.renderInsertSplayIdentifyPanel();
        } else if (this.mode === 'insert-splay-select-node' && this.insertSession) {
            this.handleInsertSplaySelectNode(nodeId);
        } else if (this.mode === 'remove-splay' && this.removeSession) {
            this.handleRemoveSplayClick(nodeId);
        } else if (this.mode === 'remove-splay-identify-op' && this.removeSession) {
            this.setInfo('Choose the operation type in the panel, then submit.');
            this.renderRemoveSplayIdentifyPanel();
        } else if (this.mode === 'remove-splay-select-node' && this.removeSession) {
            this.handleRemoveSplaySelectNode(nodeId);
        } else if (this.mode === 'splay-only' && this.splaySession) {
            this.handleSplayOnlyClick(nodeId);
        } else if (this.mode === 'splay-only-identify-op' && this.splaySession) {
            this.setInfo('Choose the operation type in the panel, then submit.');
            this.renderSplayOnlyIdentifyPanel();
        } else if (this.mode === 'splay-only-select-node' && this.splaySession) {
            this.handleSplayOnlySelectNode(nodeId);
        } else if (this.mode === 'remove-swap-path' && this.removeSession) {
            this.handleRemoveSwapPathClick(nodeId);
        }
    }

    handleInsertTraverseClick(nodeId) {
        const session = this.insertSession;
        if (session.pathIndex >= session.pathNodeIds.length) {
            this.addError();
            this.setError('Complete the traversal clicks before placing the new node.');
            return;
        }

        const expectedNodeId = session.pathNodeIds[session.pathIndex];
        if (nodeId !== expectedNodeId) {
            this.addError();
            this.setError('Click the next node on the path.');
            this.render();
            this.renderInsertTraversePanel();
            return;
        }

        session.pathIndex++;
        this.currentHighlightNodeId = nodeId;

        if (session.pathIndex >= session.pathNodeIds.length) {
            this.setInfo('You\'ve reached the insertion point. Click the correct placeholder (+) to place the new node.');
            this.render();
            this.renderInsertTraversePanel(true);
        } else {
            this.render();
            this.renderInsertTraversePanel();
        }
    }

    handlePlaceholderClick(chosenSide = null) {
        if (this.mode === 'insert-traverse' && this.insertSession) {
            if (this.insertSession.pathIndex < this.insertSession.pathNodeIds.length) {
                this.addError();
                this.setError('Complete the traversal clicks before placing the new node.');
                return;
            }

            const expectedSide = this.insertSession.side;
            if (chosenSide && expectedSide && chosenSide !== expectedSide) {
                this.addError();
                this.setError(`Incorrect child side. Choose the ${expectedSide} placeholder.`);
                this.render();
                this.renderInsertTraversePanel(true);
                return;
            }

            const inserted = this.insertAtMarkedPlaceholder();
            if (!inserted) {
                this.setError('Unable to insert at the selected position.');
                return;
            }

            this.insertSession.insertedNodeId = inserted.id;
            this.insertSession.splayNodeId = inserted.id;
            this.currentHighlightNodeId = inserted.id;
            this.mode = 'insert-splay';
            this.setInfo(`Inserted ${this.insertSession.key}. Now splay this node to the root.`);
            this.render();
            this.renderInsertSplayPanel();
        }
    }

    insertAtMarkedPlaceholder() {
        if (!this.insertSession) return null;
        const key = this.insertSession.key;

        if (this.insertSession.parentId === null) {
            return this.tree.insertWithoutSplay(key);
        }

        const parent = this.tree.getNodeById(this.insertSession.parentId);
        if (!parent) return null;

        const inserted = this.tree.insertWithoutSplay(key);
        if (!inserted) return null;

        return inserted;
    }

    handleInsertSplayClick(nodeId) {
        const session = this.insertSession;
        const splayNode = this.tree.getNodeById(session.splayNodeId);
        if (!splayNode) return;

        if (!splayNode.parent) {
            this.finishInsertExercise('Insert and splay exercise complete.');
            return;
        }

        const step = this.getSplayStep(splayNode);
        if (!step) return;

        if (nodeId !== step.pivotId) {
            this.addError();
            this.setError('Choose the next rotation pivot: grandparent for Zig-Zig/Zig-Zag, or parent for final Zig.');
            this.render();
            this.renderInsertSplayPanel();
            return;
        }

        session.pendingSplayOps = [{ ...step, nodeId: splayNode.id }];
        session.pendingSplayIndex = 0;
        session.selectedRotationNodeId = step.pivotId;
        this.mode = 'insert-splay-identify-op';
        this.setInfo('Identify the splay operation type, then submit.');
        this.render();
        this.renderInsertSplayIdentifyPanel();
    }

    handleInsertSplayIdentifyOp() {
        const session = this.insertSession;
        if (!session || !session.pendingSplayOps || session.pendingSplayOps.length === 0) return;

        const selected = document.querySelector('input[name="insertSplayOpType"]:checked');
        if (!selected) {
            this.addError();
            this.setError('Select an operation type: Zig, Zig-Zig, or Zig-Zag.');
            return;
        }

        const expected = session.pendingSplayOps[0].type;
        const chosen = selected.value;

        if (chosen !== expected) {
            this.addError();
            this.setError('Incorrect operation type. Try again.');
            this.render();
            this.renderInsertSplayIdentifyPanel();
            return;
        }

        this.mode = 'insert-splay-select-node';
        this.setInfo('Correct. Now click the node to rotate.');
        this.render();
        this.renderInsertSplayPanel();
    }

    determineSplayOp(node) {
        const parent = node.parent;
        if (!parent) return null;

        if (!parent.parent) {
            return 'zig'; // Single rotation needed
        }

        const isLeft = parent.left === node;
        const parentIsLeft = parent.parent.left === parent;

        if (isLeft === parentIsLeft) {
            return 'zig-zig';
        } else {
            return 'zig-zag';
        }
    }

    getSplayStep(node) {
        if (!node || !node.parent) return null;

        const parent = node.parent;
        const grandparent = parent.parent;

        if (!grandparent) {
            return { type: 'zig', pivotId: parent.id };
        }

        return { type: this.determineSplayOp(node), pivotId: grandparent.id };
    }

    applyOneSplayStep(node) {
        if (!node || !node.parent) return;

        const parent = node.parent;
        const grandparent = parent.parent;

        if (!grandparent) {
            if (parent.left === node) this.tree.rotateRight(parent);
            else this.tree.rotateLeft(parent);
            return;
        }

        const nodeIsLeft = parent.left === node;
        const parentIsLeft = grandparent.left === parent;

        if (nodeIsLeft && parentIsLeft) {
            this.tree.rotateRight(grandparent);
            this.tree.rotateRight(parent);
        } else if (!nodeIsLeft && !parentIsLeft) {
            this.tree.rotateLeft(grandparent);
            this.tree.rotateLeft(parent);
        } else if (nodeIsLeft && !parentIsLeft) {
            this.tree.rotateRight(parent);
            this.tree.rotateLeft(grandparent);
        } else {
            this.tree.rotateLeft(parent);
            this.tree.rotateRight(grandparent);
        }
    }

    handleInsertSplaySelectNode(nodeId) {
        // User clicked on node to rotate - validate and apply rotation
        const session = this.insertSession;
        const splayNode = this.tree.getNodeById(session.splayNodeId);
        if (!splayNode || !splayNode.parent) {
            this.finishInsertExercise('Insert and splay exercise complete.');
            return;
        }

        if (nodeId !== session.selectedRotationNodeId) {
            this.addError();
            this.setError('Incorrect rotation node. Use grandparent for Zig-Zig/Zig-Zag, and parent for final Zig.');
            this.render();
            this.renderInsertSplayPanel();
            return;
        }

        this.applyOneSplayStep(splayNode);
        session.pendingSplayIndex++;

        if (!splayNode.parent) {
            this.finishInsertExercise('Insert and splay exercise complete.');
        } else {
            session.selectedRotationNodeId = null;
            session.pendingSplayOps = null;
            session.mode = 'insert-splay';
            this.mode = 'insert-splay';
            this.setInfo('Identify the next splay operation or click Done if complete.');
            this.render();
            this.renderInsertSplayPanel();
        }
    }

    finishInsertExercise(message) {
        this.stopTimer();
        this.mode = null;
        this.insertSession = null;
        this.currentHighlightNodeId = null;
        this.nodeStatus.clear();
        this.setButtonsEnabled(true);
        this.setSuccess(`${message} Errors: ${this.errorCount}.`);
        this.showStats(false);
        this.render();
        this.renderPanelIdle();

        const allKeys = this.tree.getAllNodes().map((n) => n.key);
        history.replaceState(null, '', this.buildQueryString(allKeys));
    }

    cancelExercise(withMessage = true) {
        if (!this.mode) return;

        if (this.insertSession?.snapshot) {
            this.tree.fromSerializable(this.insertSession.snapshot);
        }
        if (this.removeSession?.snapshot) {
            this.tree.fromSerializable(this.removeSession.snapshot);
        }
        if (this.splaySession?.snapshot) {
            this.tree.fromSerializable(this.splaySession.snapshot);
        }

        this.mode = null;
        this.insertSession = null;
        this.removeSession = null;
        this.splaySession = null;
        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;
        this.stopTimer();
        this.showStats(false);
        this.setButtonsEnabled(true);

        if (withMessage) {
            this.setInfo('Exercise cancelled. Tree reverted to pre-exercise state.');
        }

        this.render();
        this.renderPanelIdle();
    }

    startRemove() {
        if (!this.tree.root || this.mode) return;

        const randomOn = document.getElementById('removeRandom').checked;
        let key = null;

        if (randomOn) {
            key = this.pickRandomExistingKey();
            if (key === null) {
                this.setError('Tree is empty.');
                return;
            }
            document.getElementById('removeKeyInput').value = String(key);
        } else {
            const raw = document.getElementById('removeKeyInput').value.trim();
            if (!raw || !/^-?\d+$/.test(raw)) {
                this.setError('Remove key must be a valid integer when random is unchecked.');
                return;
            }
            key = Number(raw);
            if (!this.tree.containsKey(key)) {
                this.setError(`Key ${key} is not in the tree.`);
                return;
            }
        }

        const path = this.computeSearchPathForKey(key);
        const snapshot = this.tree.toSerializable();

        this.mode = 'remove-traverse';
        this.resetStats();
        this.showStats(true);
        this.startTimer();

        this.removeSession = {
            key,
            snapshot,
            pathNodeIds: path,
            pathIndex: 0,
            correctClickedPathIds: [],
            targetNodeId: null,
            targetChildCount: 0,
            targetParentId: null,
            swapPathNodeId: null,
            swapPathIndex: 0,
            swapPathIds: [],
            splayNodeId: null,
            pendingSplayOps: null,
            pendingSplayIndex: 0,
            selectedRotationNodeId: null,
            postSplayDecisionPending: false
        };

        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;
        this.setButtonsEnabled(true);
        this.setInfo(`Remove target key: ${key}. Click each node on the path to the target.`);
        this.render();
        this.renderRemoveTraversePanel();
    }

    handleRemoveTraverseClick(nodeId) {
        const session = this.removeSession;
        const expectedNodeId = session.pathNodeIds[session.pathIndex];

        if (nodeId !== expectedNodeId) {
            this.addError();
            this.setError('Click the next node on the path to the target.');
            this.render();
            this.renderRemoveTraversePanel();
            return;
        }

        session.correctClickedPathIds.push(nodeId);
        session.pathIndex++;
        this.currentHighlightNodeId = nodeId;

        if (session.pathIndex >= session.pathNodeIds.length) {
            // Reached the target node
            const targetNode = this.tree.getNodeById(nodeId);
            session.targetNodeId = nodeId;
            session.targetChildCount = (targetNode.left ? 1 : 0) + (targetNode.right ? 1 : 0);
            session.targetParentId = targetNode.parent ? targetNode.parent.id : null;

            this.mode = 'remove-action';
            this.setInfo('You\'ve reached the target node. Choose an action.');
            this.render();
            this.renderRemoveActionPanel();
        } else {
            this.render();
            this.renderRemoveTraversePanel();
        }
    }

    renderRemoveActionPanel() {
        if (!this.removeSession) return;
        const panel = document.getElementById('exercisePanel');
        const session = this.removeSession;
        const node = this.tree.getNodeById(session.targetNodeId);
        const childCount = session.targetChildCount;

        let actionText = '<p><strong>Choose an action:</strong></p><div class="radio-row">';
        
        if (childCount === 0) {
            actionText += '<label><input type="radio" name="removeAction" value="delete"> Delete the node</label>';
        } else if (childCount === 1) {
            actionText += '<label><input type="radio" name="removeAction" value="reattach"> Reattach the child to the parent</label>';
        } else {
            actionText += '<label><input type="radio" name="removeAction" value="successor"> Swap with successor</label>';
            actionText += '<label><input type="radio" name="removeAction" value="predecessor"> Swap with predecessor</label>';
        }

        actionText += '</div>';

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Remove Action</h3>
                <p>Target node key: <strong>${node.key}</strong></p>
                <p>Child count: ${childCount}</p>
                ${actionText}
                <div class="btn-row">
                    <button id="removeActionSubmit">Submit</button>
                    <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('removeActionSubmit').addEventListener('click', () => this.submitRemoveAction());
        document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    submitRemoveAction() {
        const session = this.removeSession;
        const selected = document.querySelector('input[name="removeAction"]:checked');
        if (!selected) {
            this.addError();
            this.setError('Select an action.');
            return;
        }

        const action = selected.value;
        const childCount = session.targetChildCount;
        let isCorrect = false;

        if (childCount === 0 && action === 'delete') isCorrect = true;
        else if (childCount === 1 && action === 'reattach') isCorrect = true;
        else if (childCount === 2 && (action === 'successor' || action === 'predecessor')) isCorrect = true;

        if (!isCorrect) {
            this.addError();
            this.setError('Incorrect action for this node.');
            this.render();
            this.renderRemoveActionPanel();
            return;
        }

        if (childCount === 0 || childCount === 1) {
            // Delete the target and go to splay
            this.performRemoveDelete();
            this.transitionToRemoveSplay();
        } else {
            // Swap with successor/predecessor
            session.swapAction = action;
            this.transitionToRemoveSwap();
        }
    }

    performRemoveDelete() {
        const session = this.removeSession;
        const node = this.tree.getNodeById(session.targetNodeId);
        session.targetParentId = node.parent ? node.parent.id : null;
        this.tree.removeNode(node);
    }

    transitionToRemoveSwap() {
        const session = this.removeSession;
        const action = session.swapAction;
        const targetNode = this.tree.getNodeById(session.targetNodeId);

        if (action === 'successor') {
            let succ = targetNode.right;
            while (succ.left) succ = succ.left;
            session.swapTargetKey = succ.key;
            const path = this.computeSearchPathForKey(succ.key);
            session.swapPathIds = path;
        } else {
            let pred = targetNode.left;
            while (pred.right) pred = pred.right;
            session.swapTargetKey = pred.key;
            const path = this.computeSearchPathForKey(pred.key);
            session.swapPathIds = path;
        }

        session.swapPathIndex = 0;
        this.mode = 'remove-swap-path';
        this.currentHighlightNodeId = null;
        this.setInfo(`Click nodes on the path to the ${action}.`);
        this.render();
        this.renderRemoveSwapPathPanel();
    }

    handleRemoveSwapPathClick(nodeId) {
        const session = this.removeSession;
        const expectedNodeId = session.swapPathIds[session.swapPathIndex];

        if (nodeId !== expectedNodeId) {
            this.addError();
            this.setError('Click the next node on the swap path.');
            this.render();
            this.renderRemoveSwapPathPanel();
            return;
        }

        session.swapPathIndex++;
        session.swapPathNodeId = nodeId;
        this.currentHighlightNodeId = nodeId;
        this.render();
        this.renderRemoveSwapPathPanel();
    }

    renderRemoveSwapPathPanel() {
        if (!this.removeSession) return;
        const panel = document.getElementById('exercisePanel');
        const session = this.removeSession;

        const idx = Math.min(session.swapPathIndex + 1, session.swapPathIds.length);
        const total = session.swapPathIds.length;

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Remove Swap</h3>
                <p>Find path to ${session.swapAction}</p>
                <p>Step ${idx} / ${total}</p>
                <div class="btn-row">
                    <button id="swapWithNodeBtn">Swap with target node</button>
                    <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('swapWithNodeBtn').addEventListener('click', () => this.performSwapAndDelete());
        document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    performSwapAndDelete() {
        const session = this.removeSession;
        if (session.swapPathIndex !== session.swapPathIds.length) {
            this.addError();
            this.setError('Complete the path to the successor/predecessor first.');
            return;
        }

        const targetNode = this.tree.getNodeById(session.targetNodeId);
        const swapNode = this.tree.getNodeById(session.swapPathNodeId);

        // Swap keys
        const tempKey = targetNode.key;
        targetNode.key = swapNode.key;
        swapNode.key = tempKey;

        // Delete the swap node (which now has the target key)
        this.tree.removeNode(swapNode);
        session.targetParentId = targetNode.parent ? targetNode.parent.id : null;

        this.transitionToRemoveSplay();
    }

    transitionToRemoveSplay() {
        const session = this.removeSession;
        if (!session.targetParentId) {
            this.finishRemoveExercise('Remove exercise complete (root was deleted).');
            return;
        }

        session.splayNodeId = session.targetParentId;
        this.mode = 'remove-splay';
        this.currentHighlightNodeId = session.targetParentId;
        this.setInfo('Now splay the parent node to the root.');
        this.render();
        this.renderRemoveSplayPanel();
    }

    handleRemoveSplayClick(nodeId) {
        const session = this.removeSession;
        const node = this.tree.getNodeById(nodeId);
        if (!node) return;

        if (session.splayNodeId !== nodeId) {
            this.addError();
            this.setError('Select the designated splay node for the next step.');
            this.render();
            this.renderRemoveSplayPanel();
            return;
        }

        if (!node.parent) {
            this.finishRemoveExercise('Remove and splay exercise complete.');
            return;
        }

        const step = this.getSplayStep(node);
        if (!step) return;

        session.pendingSplayOps = [{ ...step, nodeId: node.id }];
        session.pendingSplayIndex = 0;
        session.selectedRotationNodeId = step.pivotId;
        this.mode = 'remove-splay-identify-op';
        this.setInfo('Identify the splay operation type, then submit.');
        this.render();
        this.renderRemoveSplayIdentifyPanel();
    }

    handleRemoveSplayIdentifyOp() {
        const session = this.removeSession;
        if (!session || !session.pendingSplayOps || session.pendingSplayOps.length === 0) return;

        const selected = document.querySelector('input[name="removeSplayOpType"]:checked');
        if (!selected) {
            this.addError();
            this.setError('Select an operation type: Zig, Zig-Zig, or Zig-Zag.');
            return;
        }

        const expected = session.pendingSplayOps[0].type;
        const chosen = selected.value;

        if (chosen !== expected) {
            this.addError();
            this.setError('Incorrect operation type. Try again.');
            this.render();
            this.renderRemoveSplayIdentifyPanel();
            return;
        }

        this.mode = 'remove-splay-select-node';
        this.setInfo('Correct. Now click the node to rotate.');
        this.render();
        this.renderRemoveSplayPanel();
    }

    handleRemoveSplaySelectNode(nodeId) {
        const session = this.removeSession;
        const splayNode = this.tree.getNodeById(session.splayNodeId);
        if (!splayNode || !splayNode.parent) {
            this.finishRemoveExercise('Remove and splay exercise complete.');
            return;
        }

        if (nodeId !== session.selectedRotationNodeId) {
            this.addError();
            this.setError('Incorrect rotation node. Use grandparent for Zig-Zig/Zig-Zag, and parent for final Zig.');
            this.render();
            this.renderRemoveSplayPanel();
            return;
        }

        this.applyOneSplayStep(splayNode);
        session.pendingSplayIndex++;

        if (!splayNode.parent) {
            this.finishRemoveExercise('Remove and splay exercise complete.');
        } else {
            session.selectedRotationNodeId = null;
            session.pendingSplayOps = null;
            this.mode = 'remove-splay';
            this.setInfo('Identify the next splay operation or click Done if complete.');
            this.render();
            this.renderRemoveSplayPanel();
        }
    }

    renderRemoveSplayPanel() {
        if (!this.removeSession) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Remove Splay</h3>
                <p>Splay the parent node to the root.</p>
                <p>Click the node to splay next, or:</p>
                <div class="btn-row">
                    <button id="splayDoneBtn">Done</button>
                    <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('splayDoneBtn').addEventListener('click', () => {
            const node = this.tree.root;
            if (node && node.id === this.removeSession.splayNodeId) {
                this.finishRemoveExercise('Remove and splay exercise complete.');
            } else {
                this.addError();
                this.setError('The parent node must be splayed to the root.');
                this.render();
                this.renderRemoveSplayPanel();
            }
        });
        document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderRemoveSplayIdentifyPanel() {
        if (!this.removeSession || !this.removeSession.pendingSplayOps || this.removeSession.pendingSplayOps.length === 0) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Identify Splay Operation</h3>
                <p>Select the operation type for the chosen node.</p>
                <div class="radio-row">
                    <label><input type="radio" name="removeSplayOpType" value="zig"> Zig</label>
                    <label><input type="radio" name="removeSplayOpType" value="zig-zig"> Zig-Zig</label>
                    <label><input type="radio" name="removeSplayOpType" value="zig-zag"> Zig-Zag</label>
                </div>
                <div class="btn-row">
                    <button id="removeSplayIdentifySubmitBtn">Submit</button>
                    <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('removeSplayIdentifySubmitBtn').addEventListener('click', () => this.handleRemoveSplayIdentifyOp());
        document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderRemoveTraversePanel() {
        if (!this.removeSession) return;
        const panel = document.getElementById('exercisePanel');
        const idx = Math.min(this.removeSession.pathIndex + 1, this.removeSession.pathNodeIds.length);
        const total = this.removeSession.pathNodeIds.length;

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Remove Traversal</h3>
                <p>Target key: <strong>${this.removeSession.key}</strong></p>
                <p>Step ${idx} / ${total}</p>
                <p>Click nodes in the BST search path in order.</p>
                <div class="btn-row">
                    <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    finishRemoveExercise(message) {
        this.stopTimer();
        this.mode = null;
        this.removeSession = null;
        this.currentHighlightNodeId = null;
        this.nodeStatus.clear();
        this.setButtonsEnabled(true);
        this.setSuccess(`${message} Errors: ${this.errorCount}.`);
        this.showStats(false);
        this.render();
        this.renderPanelIdle();

        const allKeys = this.tree.getAllNodes().map((n) => n.key);
        history.replaceState(null, '', this.buildQueryString(allKeys));
    }

    startSplay() {
        if (!this.tree.root || this.mode) return;

        const randomOn = document.getElementById('splayRandom').checked;
        let key = null;

        if (randomOn) {
            key = this.pickRandomExistingKey();
            if (key === null) {
                this.setError('Tree is empty.');
                return;
            }
            document.getElementById('splayKeyInput').value = String(key);
        } else {
            const raw = document.getElementById('splayKeyInput').value.trim();
            if (!raw || !/^-?\d+$/.test(raw)) {
                this.setError('Splay key must be a valid integer when random is unchecked.');
                return;
            }
            key = Number(raw);
            if (!this.tree.containsKey(key)) {
                this.setError(`Key ${key} is not in the tree.`);
                return;
            }
        }

        const path = this.computeSearchPathForKey(key);
        const snapshot = this.tree.toSerializable();

        this.mode = 'splay-traverse';
        this.resetStats();
        this.showStats(true);
        this.startTimer();

        this.splaySession = {
            key,
            snapshot,
            pathNodeIds: path,
            pathIndex: 0,
            correctClickedPathIds: [],
            targetNodeId: null,
            pendingSplayOps: null,
            pendingSplayIndex: 0,
            selectedRotationNodeId: null
        };

        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;
        this.setButtonsEnabled(true);
        this.setInfo(`Splay target key: ${key}. Click each node on the path.`);
        this.render();
        this.renderSplayTraversePanel();
    }

    handleSplayTraverseClick(nodeId) {
        const session = this.splaySession;
        const expectedNodeId = session.pathNodeIds[session.pathIndex];

        if (nodeId !== expectedNodeId) {
            this.addError();
            this.setError('Click the next node on the path.');
            this.render();
            this.renderSplayTraversePanel();
            return;
        }

        session.correctClickedPathIds.push(nodeId);
        session.pathIndex++;
        this.currentHighlightNodeId = nodeId;

        if (session.pathIndex >= session.pathNodeIds.length) {
            session.targetNodeId = nodeId;
            this.mode = 'splay-only';
            this.setInfo('You\'ve reached the target node. Now splay it to the root.');
            this.render();
            this.renderSplayOnlyPanel();
        } else {
            this.render();
            this.renderSplayTraversePanel();
        }
    }

    handleSplayOnlyClick(nodeId) {
        const session = this.splaySession;
        const node = this.tree.getNodeById(nodeId);
        if (!node) return;

        if (session.targetNodeId !== nodeId) {
            this.addError();
            this.setError('Select the target node for the next splay step.');
            this.render();
            this.renderSplayOnlyPanel();
            return;
        }

        if (!node.parent) {
            this.finishSplayExercise('Splay exercise complete.');
            return;
        }

        const step = this.getSplayStep(node);
        if (!step) return;

        session.pendingSplayOps = [{ ...step, nodeId: node.id }];
        session.pendingSplayIndex = 0;
        session.selectedRotationNodeId = step.pivotId;
        this.mode = 'splay-only-identify-op';
        this.setInfo('Identify the splay operation type, then submit.');
        this.render();
        this.renderSplayOnlyIdentifyPanel();
    }

    handleSplayOnlyIdentifyOp() {
        const session = this.splaySession;
        if (!session || !session.pendingSplayOps || session.pendingSplayOps.length === 0) return;

        const selected = document.querySelector('input[name="splayOnlyOpType"]:checked');
        if (!selected) {
            this.addError();
            this.setError('Select an operation type: Zig, Zig-Zig, or Zig-Zag.');
            return;
        }

        const expected = session.pendingSplayOps[0].type;
        const chosen = selected.value;

        if (chosen !== expected) {
            this.addError();
            this.setError('Incorrect operation type. Try again.');
            this.render();
            this.renderSplayOnlyIdentifyPanel();
            return;
        }

        this.mode = 'splay-only-select-node';
        this.setInfo('Correct. Now click the node to rotate.');
        this.render();
        this.renderSplayOnlyPanel();
    }

    handleSplayOnlySelectNode(nodeId) {
        const session = this.splaySession;
        const splayNode = this.tree.getNodeById(session.targetNodeId);
        if (!splayNode || !splayNode.parent) {
            this.finishSplayExercise('Splay exercise complete.');
            return;
        }

        if (nodeId !== session.selectedRotationNodeId) {
            this.addError();
            this.setError('Incorrect rotation node. Use grandparent for Zig-Zig/Zig-Zag, and parent for final Zig.');
            this.render();
            this.renderSplayOnlyPanel();
            return;
        }

        this.applyOneSplayStep(splayNode);
        session.pendingSplayIndex++;

        if (!splayNode.parent) {
            this.finishSplayExercise('Splay exercise complete.');
        } else {
            session.selectedRotationNodeId = null;
            session.pendingSplayOps = null;
            this.mode = 'splay-only';
            this.setInfo('Identify the next splay operation or click Done if complete.');
            this.render();
            this.renderSplayOnlyPanel();
        }
    }

    renderSplayTraversePanel() {
        if (!this.splaySession) return;
        const panel = document.getElementById('exercisePanel');
        const idx = Math.min(this.splaySession.pathIndex + 1, this.splaySession.pathNodeIds.length);
        const total = this.splaySession.pathNodeIds.length;

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Splay Traversal</h3>
                <p>Target key: <strong>${this.splaySession.key}</strong></p>
                <p>Step ${idx} / ${total}</p>
                <p>Click nodes in the BST search path in order.</p>
                <div class="btn-row">
                    <button id="splayCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('splayCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderSplayOnlyPanel() {
        if (!this.splaySession) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Splay to Root</h3>
                <p>Splay the target node to the root.</p>
                <p>Click the node to splay next, or:</p>
                <div class="btn-row">
                    <button id="splayDoneBtn">Done</button>
                    <button id="splayCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('splayDoneBtn').addEventListener('click', () => {
            const node = this.tree.root;
            if (node && node.id === this.splaySession.targetNodeId) {
                this.finishSplayExercise('Splay exercise complete.');
            } else {
                this.addError();
                this.setError('The target node must be splayed to the root.');
                this.render();
                this.renderSplayOnlyPanel();
            }
        });
        document.getElementById('splayCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderSplayOnlyIdentifyPanel() {
        if (!this.splaySession || !this.splaySession.pendingSplayOps || this.splaySession.pendingSplayOps.length === 0) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Identify Splay Operation</h3>
                <p>Select the operation type for the chosen node.</p>
                <div class="radio-row">
                    <label><input type="radio" name="splayOnlyOpType" value="zig"> Zig</label>
                    <label><input type="radio" name="splayOnlyOpType" value="zig-zig"> Zig-Zig</label>
                    <label><input type="radio" name="splayOnlyOpType" value="zig-zag"> Zig-Zag</label>
                </div>
                <div class="btn-row">
                    <button id="splayOnlyIdentifySubmitBtn">Submit</button>
                    <button id="splayCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('splayOnlyIdentifySubmitBtn').addEventListener('click', () => this.handleSplayOnlyIdentifyOp());
        document.getElementById('splayCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    finishSplayExercise(message) {
        this.stopTimer();
        this.mode = null;
        this.splaySession = null;
        this.currentHighlightNodeId = null;
        this.nodeStatus.clear();
        this.setButtonsEnabled(true);
        this.setSuccess(`${message} Errors: ${this.errorCount}.`);
        this.showStats(false);
        this.render();
        this.renderPanelIdle();

        const allKeys = this.tree.getAllNodes().map((n) => n.key);
        history.replaceState(null, '', this.buildQueryString(allKeys));
    }

    renderInsertTraversePanel(showPlaceholderPrompt = false) {
        if (!this.insertSession) return;

        const panel = document.getElementById('exercisePanel');
        const idx = Math.min(this.insertSession.pathIndex + 1, Math.max(1, this.insertSession.pathNodeIds.length));
        const total = Math.max(1, this.insertSession.pathNodeIds.length);

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Insert Traversal</h3>
                <p>Target key: <strong>${this.insertSession.key}</strong></p>
                <p>Step ${idx} / ${total}</p>
                ${showPlaceholderPrompt ? '<p><strong>Now click the correct placeholder (+) to place the new node.</strong></p>' : '<p>Click nodes in the BST search path in order.</p>'}
                <div class="btn-row">
                    <button id="insertCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('insertCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderInsertSplayPanel() {
        if (!this.insertSession) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Insert Splay</h3>
                <p>Splay the inserted node to the root.</p>
                <p>Click the next rotation pivot (grandparent for Zig-Zig/Zig-Zag, parent for final Zig), or:</p>
                <div class="btn-row">
                    <button id="splayInsertDoneBtn">Done</button>
                    <button id="insertCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('splayInsertDoneBtn').addEventListener('click', () => {
            const node = this.tree.root;
            if (node && node.id === this.insertSession.insertedNodeId) {
                this.finishInsertExercise('Insert and splay exercise complete.');
            } else {
                this.addError();
                this.setError('The inserted node must be splayed to the root.');
                this.render();
                this.renderInsertSplayPanel();
            }
        });
        document.getElementById('insertCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderInsertSplayIdentifyPanel() {
        if (!this.insertSession || !this.insertSession.pendingSplayOps || this.insertSession.pendingSplayOps.length === 0) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Identify Splay Operation</h3>
                <p>Select the operation type for the chosen node.</p>
                <div class="radio-row">
                    <label><input type="radio" name="insertSplayOpType" value="zig"> Zig</label>
                    <label><input type="radio" name="insertSplayOpType" value="zig-zig"> Zig-Zig</label>
                    <label><input type="radio" name="insertSplayOpType" value="zig-zag"> Zig-Zag</label>
                </div>
                <div class="btn-row">
                    <button id="insertSplayIdentifySubmitBtn">Submit</button>
                    <button id="insertCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('insertSplayIdentifySubmitBtn').addEventListener('click', () => this.handleInsertSplayIdentifyOp());
        document.getElementById('insertCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    render() {
        const hasTree = !!this.tree.root;
        this.setButtonsEnabled(hasTree);
        this.renderTree();

        if (this.mode === 'insert-traverse') {
            this.renderInsertTraversePanel(this.insertSession?.pathIndex >= this.insertSession?.pathNodeIds.length);
        } else if (this.mode === 'insert-splay-identify-op') {
            this.renderInsertSplayIdentifyPanel();
        } else if (this.mode === 'insert-splay' || this.mode === 'insert-splay-select-node') {
            this.renderInsertSplayPanel();
        } else if (this.mode === 'remove-traverse') {
            this.renderRemoveTraversePanel();
        } else if (this.mode === 'remove-action') {
            this.renderRemoveActionPanel();
        } else if (this.mode === 'remove-swap-path') {
            this.renderRemoveSwapPathPanel();
        } else if (this.mode === 'remove-splay-identify-op') {
            this.renderRemoveSplayIdentifyPanel();
        } else if (this.mode === 'remove-splay' || this.mode === 'remove-splay-select-node') {
            this.renderRemoveSplayPanel();
        } else if (this.mode === 'splay-traverse') {
            this.renderSplayTraversePanel();
        } else if (this.mode === 'splay-only-identify-op') {
            this.renderSplayOnlyIdentifyPanel();
        } else if (this.mode === 'splay-only' || this.mode === 'splay-only-select-node') {
            this.renderSplayOnlyPanel();
        } else {
            this.renderPanelIdle();
        }
    }

    renderPanelIdle() {
        const panel = document.getElementById('exercisePanel');
        panel.innerHTML = '<p>No active exercise.</p>';
    }

    shouldShowInsertPlaceholder() {
        if (this.mode !== 'insert-traverse' || !this.insertSession) return false;
        return this.insertSession.pathIndex >= this.insertSession.pathNodeIds.length;
    }

    calculateTreePositions() {
        const map = new Map();
        if (!this.tree.root) return map;

        let index = 0;
        const walk = (node, depth) => {
            if (!node) return;
            walk(node.left, depth + 1);
            map.set(node.id, { x: index * this.treeSpacing.horizontal, y: depth * this.treeSpacing.vertical + 20, depth });
            index += 1;
            walk(node.right, depth + 1);
        };

        walk(this.tree.root, 0);

        let minX = Infinity;
        for (const pos of map.values()) {
            minX = Math.min(minX, pos.x);
        }

        for (const pos of map.values()) {
            pos.x -= minX;
        }

        return map;
    }

    renderTree() {
        const treeView = document.getElementById('treeView');
        treeView.innerHTML = '';

        if (!this.tree.root) {
            // Special case: if inserting into empty tree, show root placeholder
            if (this.mode === 'insert-traverse' && this.insertSession) {
                const container = document.createElement('div');
                container.className = 'tree-container';
                container.style.width = '300px';
                container.style.height = '220px';

                const el = document.createElement('div');
                el.className = 'tree-node placeholder';
                el.dataset.placeholder = '1';
                el.dataset.placeholderSide = 'root';
                el.style.left = '120px';
                el.style.top = '50px';
                el.textContent = '+';
                
                container.appendChild(el);
                treeView.appendChild(container);
                return;
            }
            
            treeView.innerHTML = '<div style="color:#888;text-align:center;">No tree to display</div>';
            return;
        }

        const positions = this.calculateTreePositions();
        const all = this.tree.getAllNodes();

        let maxX = 0;
        let maxY = 0;
        for (const node of all) {
            const p = positions.get(node.id);
            if (!p) continue;
            maxX = Math.max(maxX, p.x);
            maxY = Math.max(maxY, p.y);
        }

        const container = document.createElement('div');
        container.className = 'tree-container';

        const viewWidth = treeView.clientWidth || 800;
        let width = Math.max(300, maxX + 100);
        let height = Math.max(200, maxY + 110);

        let scale = 1;
        if (width > 0 && width > viewWidth * 0.92) {
            scale = (viewWidth * 0.92) / width;
        }

        const nodeSize = Math.max(28, Math.min(50, Math.round(50 * scale)));
        treeView.style.setProperty('--node-size', `${nodeSize}px`);
        treeView.style.setProperty('--node-font-size', `${Math.max(10, Math.round(nodeSize * 0.42))}px`);

        for (const p of positions.values()) {
            p.x *= scale;
            p.y *= Math.max(0.75, scale);
        }
        width *= scale;
        height *= Math.max(0.75, scale);

        container.style.width = `${Math.max(300, width)}px`;
        container.style.height = `${Math.max(220, height)}px`;

        const radius = nodeSize / 2;

        for (const node of all) {
            const p1 = positions.get(node.id);
            if (!p1) continue;

            for (const child of [node.left, node.right]) {
                if (!child) continue;
                const p2 = positions.get(child.id);
                if (!p2) continue;

                const edge = document.createElement('div');
                edge.className = 'tree-edge';

                const x1 = p1.x + radius;
                const y1 = p1.y + radius;
                const x2 = p2.x + radius;
                const y2 = p2.y + radius;
                const length = Math.hypot(x2 - x1, y2 - y1);
                const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

                edge.style.width = `${length}px`;
                edge.style.left = `${x1}px`;
                edge.style.top = `${y1}px`;
                edge.style.transform = `rotate(${angle}deg)`;

                container.appendChild(edge);
            }
        }

        for (const node of all) {
            const p = positions.get(node.id);
            if (!p) continue;

            const el = document.createElement('div');
            el.className = 'tree-node';
            el.dataset.nodeId = String(node.id);
            el.style.left = `${p.x}px`;
            el.style.top = `${p.y}px`;
            el.textContent = String(node.key);

            if (this.currentHighlightNodeId === node.id) {
                el.classList.add('highlight');
            }

            const status = this.nodeStatus.get(node.id);
            if (status === 'correct') {
                el.classList.add('correct');
            } else if (status === 'wrong') {
                el.classList.add('wrong');
            }

            if (this.mode === 'insert-traverse' && this.insertSession) {
                const traversed = this.insertSession.pathNodeIds.slice(0, this.insertSession.pathIndex);
                if (traversed.includes(node.id)) {
                    el.classList.add('path');
                }
            }

            if (this.mode === 'remove-traverse' && this.removeSession) {
                if (this.removeSession.correctClickedPathIds.includes(node.id)) {
                    el.classList.add('path');
                }
            }

            if (this.mode === 'remove-swap-path' && this.removeSession) {
                const visited = this.removeSession.swapPathIds.slice(0, this.removeSession.swapPathIndex);
                if (visited.includes(node.id)) {
                    el.classList.add('path');
                }
            }

            if (this.mode === 'splay-traverse' && this.splaySession) {
                if (this.splaySession.correctClickedPathIds.includes(node.id)) {
                    el.classList.add('path');
                }
            }

            if (this.mode === 'insert-splay-select-node' && this.insertSession?.selectedRotationNodeId === node.id) {
                el.classList.add('selected-rotation');
            }

            if (this.mode === 'remove-splay-select-node' && this.removeSession?.selectedRotationNodeId === node.id) {
                el.classList.add('selected-rotation');
            }

            if (this.mode === 'splay-only-select-node' && this.splaySession?.selectedRotationNodeId === node.id) {
                el.classList.add('selected-rotation');
            }

            container.appendChild(el);
        }

        if (this.shouldShowInsertPlaceholder() && this.insertSession) {
            const placeholders = this.buildInsertPlaceholderElements(positions, scale);
            for (const placeholder of placeholders) {
                container.appendChild(placeholder);
            }
        }

        treeView.appendChild(container);
    }

    buildInsertPlaceholderElements(positions, scale) {
        const session = this.insertSession;
        if (!session) return [];

        if (session.parentId === null) {
            const el = document.createElement('div');
            el.className = 'tree-node placeholder';
            el.dataset.placeholder = '1';
            el.dataset.placeholderSide = 'root';
            el.style.left = '20px';
            el.style.top = '20px';
            el.textContent = '+';
            return [el];
        }

        const parent = this.tree.getNodeById(session.parentId);
        const p = positions.get(session.parentId);
        if (!parent || !p) return [];

        const depth = Math.max(0, p.depth ?? 0);
        const base = this.treeSpacing.horizontal * Math.max(0.6, scale);
        const offset = Math.max(38, base * Math.pow(0.64, depth));
        const y = p.y + this.treeSpacing.vertical * Math.max(0.7, scale);

        const sides = [];
        const isLeaf = !parent.left && !parent.right;
        if (isLeaf) {
            sides.push('left', 'right');
        } else if (!parent.left) {
            sides.push('left');
        } else if (!parent.right) {
            sides.push('right');
        }

        const placeholders = [];
        for (const side of sides) {
            const x = side === 'left' ? p.x - offset : p.x + offset;
            const el = document.createElement('div');
            el.className = 'tree-node placeholder';
            el.dataset.placeholder = '1';
            el.dataset.placeholderSide = side;
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.textContent = side === 'left' ? '+L' : '+R';
            placeholders.push(el);
        }

        return placeholders;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new SplayTrainer();
});
