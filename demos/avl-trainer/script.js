class AVLNode {
    constructor(key, id) {
        this.key = key;
        this.id = id;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.height = 1;
    }
}

class AVLTree {
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

    height(node) {
        return node ? node.height : 0;
    }

    balanceFactor(node) {
        return this.height(node?.right ?? null) - this.height(node?.left ?? null);
    }

    updateHeight(node) {
        if (!node) return;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    createNode(key) {
        const node = new AVLNode(key, this.nextId++);
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

        this.updateHeight(x);
        this.updateHeight(y);
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

        this.updateHeight(y);
        this.updateHeight(x);
        return x;
    }

    rebalanceFrom(startNode) {
        let node = startNode;
        while (node) {
            this.updateHeight(node);
            const bf = this.balanceFactor(node);

            if (bf < -1) {
                if (this.balanceFactor(node.left) > 0) {
                    this.rotateLeft(node.left);
                }
                node = this.rotateRight(node);
            } else if (bf > 1) {
                if (this.balanceFactor(node.right) < 0) {
                    this.rotateRight(node.right);
                }
                node = this.rotateLeft(node);
            }

            node = node.parent;
        }
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

        this.rebalanceFrom(parent);
        return node;
    }

    insertWithoutRebalance(key) {
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

        let walk = parent;
        while (walk) {
            this.updateHeight(walk);
            walk = walk.parent;
        }

        return node;
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
                id: node.id,
                key: node.key,
                height: node.height,
                left: encode(node.left),
                right: encode(node.right)
            };
        };

        return {
            nextId: this.nextId,
            root: encode(this.root)
        };
    }

    fromSerializable(data) {
        this.clear();
        this.nextId = data?.nextId ?? 1;

        const decode = (payload, parent) => {
            if (!payload) return null;
            const node = new AVLNode(payload.key, payload.id);
            node.height = payload.height;
            node.parent = parent;
            this.idToNode.set(node.id, node);
            node.left = decode(payload.left, node);
            node.right = decode(payload.right, node);
            return node;
        };

        this.root = decode(data?.root ?? null, null);
        if (this.idToNode.size > 0) {
            const maxId = Math.max(...this.idToNode.keys());
            this.nextId = Math.max(this.nextId, maxId + 1);
        }
    }
}

class AVLTrainer {
    constructor() {
        this.tree = new AVLTree();

        this.mode = null; // null | label-balances | insert-traverse | insert-fix | insert-post-rotation-choice | insert-await-next | remove-traverse | remove-action | remove-swap-choice | remove-swap-path | remove-fix-select-start | remove-fix | remove-post-rotation-choice | remove-fix-await-next
        this.errorCount = 0;
        this.timerStart = null;
        this.timerInterval = null;
        this.elapsedMs = 0;

        this.labelSession = null;
        this.insertSession = null;
        this.removeSession = null;

        this.nodeStatus = new Map(); // id => 'correct' | 'wrong'
        this.currentHighlightNodeId = null;

        this.treeSpacing = { horizontal: 80, vertical: 90 };

        this.bindEvents();
        this.applyQueryString();
        this.render();
    }

    bindEvents() {
        document.getElementById('buildFromKeysBtn').addEventListener('click', () => this.buildFromKeysInput());
        document.getElementById('buildRandomBtn').addEventListener('click', () => this.buildRandomN());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearTree());
        document.getElementById('labelBalancesBtn').addEventListener('click', () => this.startLabelBalances());
        document.getElementById('insertBtn').addEventListener('click', () => this.startInsert());
        document.getElementById('removeBtn').addEventListener('click', () => this.startRemove());

        document.getElementById('insertRandom').addEventListener('change', (e) => this.handleInsertRandomChange(e));
        document.getElementById('removeRandom').addEventListener('change', (e) => this.handleRemoveRandomChange(e));

        document.getElementById('treeView').addEventListener('click', (e) => {
            const nodeEl = e.target.closest('.tree-node');
            if (!nodeEl) return;
            const nodeId = parseInt(nodeEl.dataset.nodeId, 10);
            const isPlaceholder = nodeEl.dataset.placeholder === '1';
            if (isPlaceholder) {
                const parentId = nodeEl.dataset.parentId ? parseInt(nodeEl.dataset.parentId, 10) : null;
                this.handlePlaceholderClick(nodeEl.dataset.placeholderSide || null, parentId);
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
        document.getElementById('labelBalancesBtn').disabled = !hasTree || inExercise;
        document.getElementById('insertBtn').disabled = inExercise;
        document.getElementById('removeBtn').disabled = !hasTree || inExercise;
    }

    updateStats() {
        document.getElementById('errorCount').textContent = String(this.errorCount);
        const totalSeconds = Math.floor(this.elapsedMs / 1000);
        const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
        const ss = String(totalSeconds % 60).padStart(2, '0');
        document.getElementById('timerDisplay').textContent = `${mm}:${ss}`;
    }

    resetStats() {
        this.errorCount = 0;
        this.elapsedMs = 0;
        this.updateStats();
    }

    addError() {
        this.errorCount += 1;
        this.updateStats();
    }

    startTimer() {
        this.stopTimer();
        this.timerStart = Date.now();
        this.elapsedMs = 0;
        this.updateStats();
        this.timerInterval = setInterval(() => {
            this.elapsedMs = Date.now() - this.timerStart;
            this.updateStats();
        }, 250);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    showStats(show) {
        document.getElementById('practiceStats').style.display = show ? 'flex' : 'none';
    }

    parseSequenceInput() {
        const raw = document.getElementById('sequenceInput').value.trim();
        
        // Allow empty input to create an empty tree
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
        this.labelSession = null;
        this.removeSession = null;
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
        this.setSuccess(`Built AVL tree with ${parsed.keys.length} node(s).`);

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
        this.setSuccess(`Generated random AVL tree with n = ${nValue}.`);

        if (!fromQuery) {
            history.replaceState(null, '', this.buildQueryString(generated));
        }
    }

    clearTree() {
        this.cancelExercise(false);
        this.tree.clear();
        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;
        this.setButtonsEnabled(false);
        this.renderPanelIdle();
        this.renderTree();
        this.setInfo('Tree cleared.');
        history.replaceState(null, '', window.location.pathname);
    }

    buildQueryString(keys) {
        const params = new URLSearchParams();
        params.set('keys', keys.join(','));
        return `${window.location.pathname}?${params.toString()}`;
    }

    generateUniqueRandomKeys(n) {
        const out = new Set();
        const min = -99;
        const max = 199;

        while (out.size < n) {
            const v = Math.floor(Math.random() * (max - min + 1)) + min;
            out.add(v);
        }

        return Array.from(out);
    }

    randomUniqueKeyNotInTree() {
        const used = new Set(this.tree.getAllNodes().map((n) => n.key));
        let candidate = null;
        let guard = 0;
        while (candidate === null || used.has(candidate)) {
            candidate = Math.floor(Math.random() * 301) - 100;
            guard += 1;
            if (guard > 5000) {
                candidate = Math.floor(Math.random() * 100000) + 1000;
            }
        }
        return candidate;
    }

    pickRandomExistingKey() {
        const all = this.tree.getAllNodes();
        if (all.length === 0) return null;
        return all[Math.floor(Math.random() * all.length)].key;
    }

    startLabelBalances() {
        if (!this.tree.root || this.mode) return;

        const all = this.tree.getAllNodes();
        const shuffled = [...all].sort(() => Math.random() - 0.5);
        this.mode = 'label-balances';
        this.resetStats();
        this.showStats(true);
        this.startTimer();
        this.nodeStatus.clear();

        this.labelSession = {
            order: shuffled.map((n) => n.id),
            index: 0
        };

        this.currentHighlightNodeId = this.labelSession.order[0] ?? null;
        this.setButtonsEnabled(true);
        this.setInfo('Label balances: choose -1, 0, or +1 and click Next.');
        this.render();
        this.renderLabelPanel();
    }

    handleLabelNext() {
        if (this.mode !== 'label-balances' || !this.labelSession) return;

        const selected = document.querySelector('input[name="lbBalance"]:checked');
        if (!selected) {
            this.setError('Pick a balance value first.');
            return;
        }

        const nodeId = this.labelSession.order[this.labelSession.index];
        const node = this.tree.getNodeById(nodeId);
        if (!node) return;

        const userValue = Number(selected.value);
        const actual = this.tree.balanceFactor(node);

        if (userValue === actual) {
            this.nodeStatus.set(nodeId, 'correct');
            this.setSuccess(`Correct for node ${node.key}.`);
        } else {
            this.nodeStatus.set(nodeId, 'wrong');
            this.addError();
            this.setError(`Incorrect for node ${node.key}. Actual balance is ${actual}.`);
        }

        this.labelSession.index += 1;
        if (this.labelSession.index >= this.labelSession.order.length) {
            this.stopTimer();
            this.currentHighlightNodeId = null;
            const total = this.labelSession.order.length;
            const timeSec = Math.floor(this.elapsedMs / 1000);
            this.setInfo(`Label balances complete. Errors: ${this.errorCount}, Time: ${timeSec}s.`);
            this.mode = null;
            this.labelSession = null;
            this.setButtonsEnabled(true);
            this.render();
            this.renderPanelIdle();
            return;
        }

        this.currentHighlightNodeId = this.labelSession.order[this.labelSession.index];
        this.render();
        this.renderLabelPanel();
    }

    stopLabelExercise() {
        if (this.mode !== 'label-balances') return;
        this.stopTimer();
        this.mode = null;
        this.labelSession = null;
        this.currentHighlightNodeId = null;
        this.setButtonsEnabled(true);
        this.setInfo('Label balances exercise stopped.');
        this.render();
        this.renderPanelIdle();
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
                oldHeights: new Map(),
                pathNodeIds: [],
                pathIndex: 0,
                parentId: null,
                side: 'root',
                insertedNodeId: null,
                fixNodeId: null,
                expectedNextNodeId: null,
                pendingRotations: null,
                pendingRotationIndex: 0,
                selectedRotationNodeId: null,
                postRotationDecisionPending: false
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
            oldHeights: new Map(this.tree.getAllNodes().map((n) => [n.id, n.height])),
            pathNodeIds: path.pathNodeIds,
            pathIndex: 0,
            parentId: path.parentId,
            side: path.side,
            insertedNodeId: null,
            fixNodeId: null,
            expectedNextNodeId: null,
            pendingRotations: null,
            pendingRotationIndex: 0,
            selectedRotationNodeId: null,
            postRotationDecisionPending: false
        };

        this.nodeStatus.clear();
        this.currentHighlightNodeId = null;

        this.setButtonsEnabled(true);
        this.setInfo(`Insert target key: ${key}. Click each traversed node in order.`);
        this.render();
        this.renderInsertTraversePanel();
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

    countChildren(node) {
        if (!node) return 0;
        return (node.left ? 1 : 0) + (node.right ? 1 : 0);
    }

    computeSwapPath(targetNode, swapType) {
        const path = [];
        if (!targetNode) return path;

        if (swapType === 'successor') {
            let cur = targetNode.right;
            while (cur) {
                path.push(cur.id);
                cur = cur.left;
            }
        } else {
            let cur = targetNode.left;
            while (cur) {
                path.push(cur.id);
                cur = cur.right;
            }
        }

        return path;
    }

    swapNodeKeysById(idA, idB) {
        const a = this.tree.getNodeById(idA);
        const b = this.tree.getNodeById(idB);
        if (!a || !b) return false;
        const tmp = a.key;
        a.key = b.key;
        b.key = tmp;
        return true;
    }

    deleteNodeZeroOrOneChild(nodeId) {
        const node = this.tree.getNodeById(nodeId);
        if (!node) return null;

        const child = node.left ?? node.right;
        const parent = node.parent;

        if (child) {
            child.parent = parent;
        }

        if (!parent) {
            this.tree.root = child;
        } else if (parent.left === node) {
            parent.left = child;
        } else {
            parent.right = child;
        }

        this.tree.idToNode.delete(node.id);

        let walk = parent;
        while (walk) {
            this.tree.updateHeight(walk);
            walk = walk.parent;
        }
        if (this.tree.root) {
            this.refreshHeights(this.tree.root);
        }

        return parent;
    }

    handleNodeClick(nodeId) {
        if (this.mode === 'label-balances') {
            return;
        }

        if (this.mode === 'insert-traverse') {
            this.handleInsertTraverseClick(nodeId);
            return;
        }

        if (this.mode === 'insert-fix') {
            if (this.insertSession?.pendingRotations) {
                this.insertSession.selectedRotationNodeId = nodeId;
                this.setInfo('Node selected for rotation step. Choose direction and apply.');
                this.render();
                this.renderInsertFixPanel();
                return;
            }
            return;
        }

        if (this.mode === 'insert-post-rotation-choice') {
            return;
        }

        if (this.mode === 'insert-await-next') {
            this.handleInsertNextNodeClick(nodeId);
            return;
        }

        if (this.mode === 'remove-traverse') {
            this.handleRemoveTraverseClick(nodeId);
            return;
        }

        if (this.mode === 'remove-swap-path') {
            this.handleRemoveSwapPathClick(nodeId);
            return;
        }

        if (this.mode === 'remove-fix-select-start') {
            this.handleRemoveFixStartClick(nodeId);
            return;
        }

        if (this.mode === 'remove-fix') {
            if (this.removeSession?.pendingRotations) {
                this.removeSession.selectedRotationNodeId = nodeId;
                this.currentHighlightNodeId = nodeId;
                this.setInfo('Node selected for removeFix rotation step. Choose direction and apply.');
                this.render();
                this.renderRemovePanel();
            }
            return;
        }

        if (this.mode === 'remove-fix-await-next') {
            this.handleRemoveFixNextNodeClick(nodeId);
            return;
        }
    }

    handleInsertTraverseClick(nodeId) {
        if (!this.insertSession) return;
        this.currentHighlightNodeId = nodeId;
        const expected = this.insertSession.pathNodeIds[this.insertSession.pathIndex];
        if (nodeId !== expected) {
            this.addError();
            this.setError('Incorrect traversal node. Try again.');
            this.render();
            this.renderInsertTraversePanel();
            return;
        }

        this.insertSession.pathIndex += 1;

        if (this.insertSession.pathIndex >= this.insertSession.pathNodeIds.length) {
            this.setSuccess('Traversal path complete. Click the placeholder child (+) to insert.');
            this.render();
            this.renderInsertTraversePanel(true);
            return;
        }

        this.setSuccess('Correct. Continue traversal.');
        this.render();
        this.renderInsertTraversePanel();
    }

    handlePlaceholderClick(chosenSide = null, parentId = null) {
        if (this.mode !== 'insert-traverse' || !this.insertSession) return;

        // Check if user clicked an intermediate placeholder (wrong side of a node with 1 child)
        if (parentId && parentId !== this.insertSession.parentId) {
            this.addError();
            this.setError('That is not the correct location to attach the new node. Keep going.');
            this.render();
            this.renderInsertTraversePanel(true);
            return;
        }

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
        this.insertSession.fixNodeId = inserted.id;
        this.currentHighlightNodeId = inserted.id;
        this.mode = 'insert-fix';
        this.setInfo(`Inserted ${this.insertSession.key}. Now update AVL balances/rotations from node ${inserted.key} upward.`);
        this.render();
        this.renderInsertFixPanel();
    }

    insertAtMarkedPlaceholder() {
        if (!this.insertSession) return null;
        const key = this.insertSession.key;

        if (this.insertSession.parentId === null) {
            return this.tree.insertWithoutRebalance(key);
        }

        const parent = this.tree.getNodeById(this.insertSession.parentId);
        if (!parent) return null;

        const inserted = this.tree.insertWithoutRebalance(key);
        if (!inserted) return null;

        return inserted;
    }

    getRotationPlan(node) {
        const bf = this.tree.balanceFactor(node);
        if (bf >= -1 && bf <= 1) return [];

        if (bf < -1) {
            const child = node.left;
            const childBf = this.tree.balanceFactor(child);
            if (childBf <= 0) {
                return [{ downId: node.id, direction: 'right' }];
            }
            return [
                { downId: child.id, direction: 'left' },
                { downId: node.id, direction: 'right' }
            ];
        }

        const child = node.right;
        const childBf = this.tree.balanceFactor(child);
        if (childBf >= 0) {
            return [{ downId: node.id, direction: 'left' }];
        }

        return [
            { downId: child.id, direction: 'right' },
            { downId: node.id, direction: 'left' }
        ];
    }

    applyRotation(direction, downId) {
        const node = this.tree.getNodeById(downId);
        if (!node) return;

        if (direction === 'left') {
            this.tree.rotateLeft(node);
        } else {
            this.tree.rotateRight(node);
        }

        // refresh heights globally up from touched nodes
        let walk = node;
        while (walk) {
            this.tree.updateHeight(walk);
            walk = walk.parent;
        }
        if (this.tree.root) {
            this.refreshHeights(this.tree.root);
        }
    }

    refreshHeights(node) {
        if (!node) return 0;
        const lh = this.refreshHeights(node.left);
        const rh = this.refreshHeights(node.right);
        node.height = 1 + Math.max(lh, rh);
        return node.height;
    }

    submitFixBalance(nextRequested) {
        if (this.mode !== 'insert-fix' || !this.insertSession) return;

        const node = this.tree.getNodeById(this.insertSession.fixNodeId);
        if (!node) {
            this.finishInsertExercise('Insert exercise complete.');
            return;
        }

        const selectedBal = document.querySelector('input[name="fixBalance"]:checked');
        if (!selectedBal) {
            this.setError('Choose the current balance first.');
            return;
        }

        const userBalance = Number(selectedBal.value);
        const actualBalance = this.tree.balanceFactor(node);
        if (userBalance !== actualBalance) {
            this.addError();
            this.setError(`Incorrect balance for node ${node.key}. Try again.`);
            return;
        }

        const selectedRot = document.querySelector('input[name="rotationCount"]:checked');
        if (!selectedRot) {
            this.setError('Choose how many rotations are needed on this node.');
            return;
        }

        const userRotCount = Number(selectedRot.value);
        const plan = this.getRotationPlan(node);
        if (userRotCount !== plan.length) {
            this.addError();
            this.setError('Rotation count is incorrect for this node.');
            return;
        }

        if (plan.length > 0) {
            this.insertSession.pendingRotations = plan;
            this.insertSession.pendingRotationIndex = 0;
            this.insertSession.selectedRotationNodeId = null;
            this.setInfo('Correct so far. Click the node that rotates downward, choose direction, then apply.');
            this.render();
            this.renderInsertFixPanel();
            return;
        }

        this.advanceFixStep(nextRequested, false);
    }

    applyRotationStep() {
        if (this.mode !== 'insert-fix' || !this.insertSession?.pendingRotations) return;

        const session = this.insertSession;
        const expected = session.pendingRotations[session.pendingRotationIndex];
        const directionSelect = document.getElementById('rotationDirectionSelect');
        if (!directionSelect) return;

        const chosenDirection = directionSelect.value;
        const selectedNodeId = session.selectedRotationNodeId;

        if (!selectedNodeId) {
            this.setError('Click a node to mark it as the node rotating downward.');
            return;
        }

        if (selectedNodeId !== expected.downId || chosenDirection !== expected.direction) {
            this.addError();
            this.setError('Incorrect node or direction for this rotation step. Try again.');
            return;
        }

        this.applyRotation(expected.direction, expected.downId);
        session.pendingRotationIndex += 1;
        session.selectedRotationNodeId = null;

        if (session.pendingRotationIndex < session.pendingRotations.length) {
            this.setSuccess('Rotation step correct. Complete the next rotation step.');
            this.render();
            this.renderInsertFixPanel();
            return;
        }

        session.pendingRotations = null;
        session.pendingRotationIndex = 0;
        this.setSuccess('All required rotations on this node are correct.');
        this.enterPostRotationChoice();
    }

    enterPostRotationChoice() {
        if (!this.insertSession) return;

        const nextNode = this.computeNextNodeAfterCurrentFixStep(this.insertSession.fixNodeId, true);
        this.insertSession.expectedNextNodeId = nextNode ? nextNode.id : null;
        this.insertSession.postRotationDecisionPending = true;
        this.mode = 'insert-post-rotation-choice';
        this.currentHighlightNodeId = null;
        this.setInfo("Choose the next node that needs to be visited to update balance, or press Done if no more nodes need to be visited.");
        this.render();
        this.renderInsertPostRotationChoicePanel();
    }

    handlePostRotationChoice(nextRequested) {
        if (this.mode !== 'insert-post-rotation-choice' || !this.insertSession) return;

        const nextNodeId = this.insertSession.expectedNextNodeId;
        if (nextRequested) {
            if (!nextNodeId) {
                this.addError();
                this.setError('No further updates are needed. Press Done instead of Next.');
                this.render();
                this.renderInsertPostRotationChoicePanel();
                return;
            }

            this.insertSession.postRotationDecisionPending = false;
            this.mode = 'insert-await-next';
            this.currentHighlightNodeId = null;
            this.setInfo('Click the next node on the parent chain to update.');
            this.render();
            this.renderInsertNextNodePanel();
            return;
        }

        if (nextNodeId) {
            this.addError();
            this.setError('More updates are required. Press Next and click the correct next node.');
            this.render();
            this.renderInsertPostRotationChoicePanel();
            return;
        }

        this.insertSession.postRotationDecisionPending = false;
        this.finishInsertExercise('Insert exercise complete.');
    }

    advanceFixStep(nextRequested, hadRotation) {
        if (!this.insertSession) return;

        const nextNode = this.computeNextNodeAfterCurrentFixStep(this.insertSession.fixNodeId, hadRotation);
        this.insertSession.expectedNextNodeId = nextNode ? nextNode.id : null;

        if (nextRequested) {
            if (!nextNode) {
                this.addError();
                this.setError('No further updates are needed. Press Done instead of Next.');
                this.render();
                this.renderInsertFixPanel();
                return;
            }

            this.mode = 'insert-await-next';
            this.currentHighlightNodeId = null;
            this.setInfo('Click the next node on the parent chain to update.');
            this.render();
            this.renderInsertNextNodePanel();
            return;
        }

        if (nextNode) {
            this.addError();
            this.setError('More updates are required. Press Next and click the correct next node.');
            this.render();
            this.renderInsertFixPanel();
            return;
        }

        this.finishInsertExercise('Insert exercise complete.');
    }

    computeNextNodeAfterCurrentFixStep(fixNodeId, hadRotation) {
        if (!this.insertSession) return null;

        const oldHeight = this.insertSession.oldHeights.get(fixNodeId) ?? 0;
        let subtreeRoot = null;

        if (hadRotation) {
            const fixedNode = this.tree.getNodeById(fixNodeId);
            subtreeRoot = fixedNode ? fixedNode.parent : null;
            if (!subtreeRoot) {
                subtreeRoot = this.tree.root;
            }
        } else {
            subtreeRoot = this.tree.getNodeById(fixNodeId);
        }

        if (!subtreeRoot) return null;

        const heightChanged = subtreeRoot.height !== oldHeight;
        if (!heightChanged) {
            return null;
        }

        return subtreeRoot.parent;
    }

    handleInsertNextNodeClick(nodeId) {
        if (this.mode !== 'insert-await-next' || !this.insertSession) return;
        this.currentHighlightNodeId = nodeId;
        if (nodeId !== this.insertSession.expectedNextNodeId) {
            this.addError();
            this.setError('That is not the next node to update. Try again.');
            this.render();
            this.renderInsertNextNodePanel();
            return;
        }

        this.insertSession.fixNodeId = nodeId;
        this.insertSession.expectedNextNodeId = null;
        this.mode = 'insert-fix';
        this.currentHighlightNodeId = nodeId;
        this.setSuccess('Correct next node. Continue with balance/rotation checks.');
        this.render();
        this.renderInsertFixPanel();
    }

    cancelExercise(withMessage = true) {
        if (!this.mode) return;

        if (this.insertSession?.snapshot) {
            this.tree.fromSerializable(this.insertSession.snapshot);
        }
        if (this.removeSession?.snapshot) {
            this.tree.fromSerializable(this.removeSession.snapshot);
        }

        this.mode = null;
        this.labelSession = null;
        this.insertSession = null;
        this.removeSession = null;
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

    finishInsertExercise(message) {
        if (this.insertSession?.postRotationDecisionPending) {
            this.mode = 'insert-post-rotation-choice';
            this.setInfo("Choose the next node that needs to be visited to update balance, or press Done if no more nodes need to be visited.");
            this.render();
            this.renderInsertPostRotationChoicePanel();
            return;
        }

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

        const targetNode = this.tree.findNodeByKey(key);
        const pathNodeIds = this.computeSearchPathForKey(key);

        this.mode = 'remove-traverse';
        this.resetStats();
        this.showStats(true);
        this.startTimer();
        this.nodeStatus.clear();

        this.removeSession = {
            snapshot: this.tree.toSerializable(),
            oldHeights: new Map(this.tree.getAllNodes().map((n) => [n.id, n.height])),
            key,
            targetNodeId: targetNode?.id ?? null,
            pathNodeIds,
            pathIndex: 0,
            correctClickedPathIds: [],
            actionType: null,
            swapType: null,
            swapPathIds: [],
            swapPathIndex: 0,
            lastSwapClickedId: null,
            deletedNodeParentId: null,
            fixCurrentNodeId: null,
            expectedNextNodeId: null,
            pendingRotations: null,
            pendingRotationIndex: 0,
            selectedRotationNodeId: null,
            postRotationDecisionPending: false
        };

        this.currentHighlightNodeId = null;
        this.setInfo(`Remove target key: ${key}. Click nodes on the search path in order.`);
        this.render();
        this.renderRemovePanel();
    }

    handleRemoveTraverseClick(nodeId) {
        if (this.mode !== 'remove-traverse' || !this.removeSession) return;

        const expected = this.removeSession.pathNodeIds[this.removeSession.pathIndex];

        if (nodeId !== expected) {
            this.addError();
            this.setError('Incorrect node on remove path. Try again.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.currentHighlightNodeId = nodeId;
        this.removeSession.correctClickedPathIds.push(nodeId);
        this.removeSession.pathIndex += 1;

        if (this.removeSession.pathIndex >= this.removeSession.pathNodeIds.length) {
            this.mode = 'remove-action';
            this.setSuccess('Reached node to remove. Choose the correct next action.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.setSuccess('Correct. Continue along the remove path.');
        this.render();
        this.renderRemovePanel();
    }

    submitRemoveAction() {
        if (this.mode !== 'remove-action' || !this.removeSession) return;

        const selected = document.querySelector('input[name="removeAction"]:checked');
        if (!selected) {
            this.setError('Choose an action first.');
            return;
        }

        const action = selected.value;
        const target = this.tree.getNodeById(this.removeSession.targetNodeId);
        if (!target) {
            this.setError('Target node no longer exists.');
            return;
        }

        const childCount = this.countChildren(target);
        const correct = childCount === 0
            ? 'delete'
            : childCount === 1
                ? 'reattach'
                : 'swap';

        if (action !== correct) {
            this.addError();
            this.setError('That action is incorrect for this node. Try again.');
            return;
        }

        this.removeSession.actionType = action;

        if (action === 'delete' || action === 'reattach') {
            const parent = this.deleteNodeZeroOrOneChild(target.id);
            this.removeSession.deletedNodeParentId = parent ? parent.id : null;
            this.setSuccess('Correct action. Node removed. Now choose where removeFix should start.');
            this.enterRemoveFixStartSelection();
            return;
        }

        this.mode = 'remove-swap-choice';
        this.setSuccess('Correct. Choose predecessor or successor for swap.');
        this.render();
        this.renderRemovePanel();
    }

    chooseRemoveSwapType(type) {
        if (this.mode !== 'remove-swap-choice' || !this.removeSession) return;

        const target = this.tree.getNodeById(this.removeSession.targetNodeId);
        if (!target) {
            this.setError('Target node no longer exists.');
            return;
        }

        if (type !== 'predecessor' && type !== 'successor') return;

        const path = this.computeSwapPath(target, type);
        if (path.length === 0) {
            this.addError();
            this.setError(`Cannot use ${type} path from this target. Try the other option.`);
            return;
        }

        this.removeSession.swapType = type;
        this.removeSession.swapPathIds = path;
        this.removeSession.swapPathIndex = 0;
        this.removeSession.lastSwapClickedId = null;
        this.mode = 'remove-swap-path';
        this.currentHighlightNodeId = null;
        this.setInfo(`Click nodes on the path to the ${type} in order.`);
        this.render();
        this.renderRemovePanel();
    }

    handleRemoveSwapPathClick(nodeId) {
        if (this.mode !== 'remove-swap-path' || !this.removeSession) return;

        const expected = this.removeSession.swapPathIds[this.removeSession.swapPathIndex];

        if (nodeId !== expected) {
            this.addError();
            this.setError('Incorrect node on swap path. Try again.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.currentHighlightNodeId = nodeId;
        this.removeSession.swapPathIndex += 1;
        this.removeSession.lastSwapClickedId = nodeId;
        this.setSuccess('Correct path node. Continue or swap when at destination.');
        this.render();
        this.renderRemovePanel();
    }

    swapWithNodeToRemove() {
        if (this.mode !== 'remove-swap-path' || !this.removeSession) return;

        const destinationId = this.removeSession.swapPathIds[this.removeSession.swapPathIds.length - 1];
        const clicked = this.removeSession.lastSwapClickedId;

        if (!clicked || clicked !== destinationId) {
            this.addError();
            this.setError('First reach the chosen predecessor/successor node, then swap.');
            return;
        }

        const ok = this.swapNodeKeysById(this.removeSession.targetNodeId, destinationId);
        if (!ok) {
            this.setError('Swap failed.');
            return;
        }

        const parent = this.deleteNodeZeroOrOneChild(destinationId);
        this.removeSession.deletedNodeParentId = parent ? parent.id : null;
        this.setSuccess('Swap complete and removed swapped node. Now choose where removeFix should start.');
        this.enterRemoveFixStartSelection();
    }

    enterRemoveFixStartSelection() {
        if (!this.removeSession) return;
        this.mode = 'remove-fix-select-start';
        this.currentHighlightNodeId = null;
        this.render();
        this.renderRemovePanel();
    }

    handleRemoveFixStartClick(nodeId) {
        if (this.mode !== 'remove-fix-select-start' || !this.removeSession) return;
        this.currentHighlightNodeId = nodeId;

        const expected = this.removeSession.deletedNodeParentId;
        if (expected === null) {
            this.addError();
            this.setError('No parent exists for removeFix start. Press Done to finish remove.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        if (nodeId !== expected) {
            this.addError();
            this.setError('Incorrect start node for removeFix. Choose the parent of the removed node.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.removeSession.fixCurrentNodeId = nodeId;
        this.mode = 'remove-fix';
        this.setSuccess('Correct removeFix start node. Continue with balance and rotations.');
        this.render();
        this.renderRemovePanel();
    }

    getRemoveRotationPlan(node) {
        return this.getRotationPlan(node);
    }

    submitRemoveFixBalance(nextRequested) {
        if (this.mode !== 'remove-fix' || !this.removeSession) return;

        const node = this.tree.getNodeById(this.removeSession.fixCurrentNodeId);
        if (!node) {
            this.finishRemoveExercise('Remove exercise complete.');
            return;
        }

        const selectedBal = document.querySelector('input[name="removeFixBalance"]:checked');
        if (!selectedBal) {
            this.setError('Choose the current balance first.');
            return;
        }

        const userBalance = Number(selectedBal.value);
        const actualBalance = this.tree.balanceFactor(node);
        if (userBalance !== actualBalance) {
            this.addError();
            this.setError(`Incorrect balance for node ${node.key}. Try again.`);
            return;
        }

        const selectedRot = document.querySelector('input[name="removeRotationCount"]:checked');
        if (!selectedRot) {
            this.setError('Choose how many rotations are needed on this node.');
            return;
        }

        const userRotCount = Number(selectedRot.value);
        const plan = this.getRemoveRotationPlan(node);
        if (userRotCount !== plan.length) {
            this.addError();
            this.setError('Rotation count is incorrect for this removeFix step.');
            return;
        }

        if (plan.length > 0) {
            this.removeSession.pendingRotations = plan;
            this.removeSession.pendingRotationIndex = 0;
            this.removeSession.selectedRotationNodeId = null;
            this.setInfo('Correct so far. Click the node that rotates downward, choose direction, then apply.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.advanceRemoveFixStep(nextRequested, false);
    }

    applyRemoveRotationStep() {
        if (this.mode !== 'remove-fix' || !this.removeSession?.pendingRotations) return;

        const session = this.removeSession;
        const expected = session.pendingRotations[session.pendingRotationIndex];
        const directionSelect = document.getElementById('removeRotationDirectionSelect');
        if (!directionSelect) return;

        const chosenDirection = directionSelect.value;
        const selectedNodeId = session.selectedRotationNodeId;

        if (!selectedNodeId) {
            this.setError('Click a node to mark it as the node rotating downward.');
            return;
        }

        if (selectedNodeId !== expected.downId || chosenDirection !== expected.direction) {
            this.addError();
            this.setError('Incorrect node or direction for this removeFix rotation step. Try again.');
            return;
        }

        this.applyRotation(expected.direction, expected.downId);
        session.pendingRotationIndex += 1;
        session.selectedRotationNodeId = null;

        if (session.pendingRotationIndex < session.pendingRotations.length) {
            this.setSuccess('Rotation step correct. Complete the next rotation step.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        session.pendingRotations = null;
        session.pendingRotationIndex = 0;
        this.setSuccess('All required rotations for this removeFix node are correct.');
        this.enterRemovePostRotationChoice();
    }

    computeNextNodeAfterRemoveFixStep(fixNodeId, hadRotation) {
        if (!this.removeSession) return null;

        const oldHeight = this.removeSession.oldHeights.get(fixNodeId) ?? 0;
        let subtreeRoot = null;

        if (hadRotation) {
            const fixedNode = this.tree.getNodeById(fixNodeId);
            subtreeRoot = fixedNode ? fixedNode.parent : null;
            if (!subtreeRoot) {
                subtreeRoot = this.tree.root;
            }
        } else {
            subtreeRoot = this.tree.getNodeById(fixNodeId);
        }

        if (!subtreeRoot) return null;

        const heightChanged = subtreeRoot.height !== oldHeight;
        if (!heightChanged) {
            return null;
        }

        return subtreeRoot.parent;
    }

    advanceRemoveFixStep(nextRequested, hadRotation) {
        if (!this.removeSession) return;

        const currentId = this.removeSession.fixCurrentNodeId;
        const nextNode = this.computeNextNodeAfterRemoveFixStep(currentId, hadRotation);
        this.removeSession.expectedNextNodeId = nextNode ? nextNode.id : null;

        if (nextRequested) {
            if (!nextNode) {
                this.addError();
                this.setError('No further removeFix updates are needed. Press Done instead of Next.');
                this.render();
                this.renderRemovePanel();
                return;
            }

            this.mode = 'remove-fix-await-next';
            this.currentHighlightNodeId = null;
            this.setInfo('Click the next node where removeFix should run.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        if (nextNode) {
            this.addError();
            this.setError('More removeFix updates are required. Press Next and choose the next node.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.finishRemoveExercise('Remove exercise complete.');
    }

    enterRemovePostRotationChoice() {
        if (!this.removeSession) return;

        const nextNode = this.computeNextNodeAfterRemoveFixStep(this.removeSession.fixCurrentNodeId, true);
        this.removeSession.expectedNextNodeId = nextNode ? nextNode.id : null;
        this.removeSession.postRotationDecisionPending = true;
        this.mode = 'remove-post-rotation-choice';
        this.currentHighlightNodeId = null;
        this.setInfo("Choose the next node that needs removeFix, or press Done if no more nodes need to be visited.");
        this.render();
        this.renderRemovePanel();
    }

    handleRemovePostRotationChoice(nextRequested) {
        if (this.mode !== 'remove-post-rotation-choice' || !this.removeSession) return;

        const nextNodeId = this.removeSession.expectedNextNodeId;
        if (nextRequested) {
            if (!nextNodeId) {
                this.addError();
                this.setError('No further removeFix updates are needed. Press Done instead of Next.');
                this.render();
                this.renderRemovePanel();
                return;
            }

            this.removeSession.postRotationDecisionPending = false;
            this.mode = 'remove-fix-await-next';
            this.currentHighlightNodeId = null;
            this.setInfo('Click the next node where removeFix should run.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        if (nextNodeId) {
            this.addError();
            this.setError('More removeFix updates are required. Press Next and choose the next node.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.removeSession.postRotationDecisionPending = false;
        this.finishRemoveExercise('Remove exercise complete.');
    }

    handleRemoveFixNextNodeClick(nodeId) {
        if (this.mode !== 'remove-fix-await-next' || !this.removeSession) return;
        this.currentHighlightNodeId = nodeId;

        if (nodeId !== this.removeSession.expectedNextNodeId) {
            this.addError();
            this.setError('That is not the next removeFix node. Try again.');
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.removeSession.fixCurrentNodeId = nodeId;
        this.removeSession.expectedNextNodeId = null;
        this.mode = 'remove-fix';
        this.setSuccess('Correct next removeFix node. Continue with balance and rotations.');
        this.render();
        this.renderRemovePanel();
    }

    finishRemoveExercise(message) {
        if (this.removeSession?.postRotationDecisionPending) {
            this.mode = 'remove-post-rotation-choice';
            this.setInfo("Choose the next node that needs removeFix, or press Done if no more nodes need to be visited.");
            this.render();
            this.renderRemovePanel();
            return;
        }

        this.stopTimer();
        this.mode = null;
        this.currentHighlightNodeId = null;
        this.nodeStatus.clear();
        this.setButtonsEnabled(true);
        this.setSuccess(`${message} Errors: ${this.errorCount}.`);
        this.showStats(false);
        this.removeSession = null;
        this.render();
        this.renderPanelIdle();

        const allKeys = this.tree.getAllNodes().map((n) => n.key);
        history.replaceState(null, '', this.buildQueryString(allKeys));
    }

    render() {
        const hasTree = !!this.tree.root;
        this.setButtonsEnabled(hasTree);
        this.renderTree();

        if (this.mode === 'label-balances') {
            this.renderLabelPanel();
        } else if (this.mode === 'insert-traverse') {
            this.renderInsertTraversePanel(this.insertSession?.pathIndex >= this.insertSession?.pathNodeIds.length);
        } else if (this.mode === 'insert-fix') {
            this.renderInsertFixPanel();
        } else if (this.mode === 'insert-post-rotation-choice') {
            this.renderInsertPostRotationChoicePanel();
        } else if (this.mode === 'insert-await-next') {
            this.renderInsertNextNodePanel();
        } else if (this.mode?.startsWith('remove-') || this.removeSession) {
            this.renderRemovePanel();
        } else {
            this.renderPanelIdle();
        }
    }

    renderPanelIdle() {
        const panel = document.getElementById('exercisePanel');
        panel.innerHTML = '<p>No active exercise.</p>';
    }

    renderLabelPanel() {
        if (!this.labelSession) return;

        const panel = document.getElementById('exercisePanel');
        const nodeId = this.labelSession.order[this.labelSession.index];
        const node = this.tree.getNodeById(nodeId);
        const idx = this.labelSession.index + 1;
        const total = this.labelSession.order.length;

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Label Balances (${idx}/${total})</h3>
                <p>Current node: <strong>${node?.key ?? '?'}</strong></p>
                <div class="radio-row">
                    <label><input type="radio" name="lbBalance" value="-1"> -1</label>
                    <label><input type="radio" name="lbBalance" value="0"> 0</label>
                    <label><input type="radio" name="lbBalance" value="1"> +1</label>
                </div>
                <div class="btn-row">
                    <button id="lbNextBtn">Next</button>
                    <button id="lbStopBtn" class="btn-secondary">Stop Now</button>
                </div>
            </div>
        `;

        document.getElementById('lbNextBtn').addEventListener('click', () => this.handleLabelNext());
        document.getElementById('lbStopBtn').addEventListener('click', () => this.stopLabelExercise());
    }

    renderInsertTraversePanel(showPlaceholderPrompt = false) {
        if (!this.insertSession) return;

        const panel = document.getElementById('exercisePanel');
        const idx = Math.min(this.insertSession.pathIndex + 1, this.insertSession.pathNodeIds.length);
        const total = Math.max(1, this.insertSession.pathNodeIds.length);

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Insert Traversal</h3>
                <p>Target key: <strong>${this.insertSession.key}</strong></p>
                <p>Step ${idx} / ${total}</p>
                ${showPlaceholderPrompt ? '<p><strong>Now click the correct placeholder child (+) to place the new node.</strong></p>' : '<p>Click nodes in the BST search path in order.</p>'}
                <div class="btn-row">
                    <button id="insertCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('insertCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderInsertFixPanel() {
        if (!this.insertSession) return;
        const panel = document.getElementById('exercisePanel');
        const node = this.tree.getNodeById(this.insertSession.fixNodeId);

        if (!node) {
            this.finishInsertExercise('Insert exercise complete.');
            return;
        }

        let rotationBlock = '';
        if (this.insertSession.pendingRotations) {
            const stepNum = this.insertSession.pendingRotationIndex + 1;
            const total = this.insertSession.pendingRotations.length;
            const selectedNode = this.insertSession.selectedRotationNodeId ? this.tree.getNodeById(this.insertSession.selectedRotationNodeId) : null;
            rotationBlock = `
                <div class="exercise-block">
                    <h3>Rotation Step ${stepNum} / ${total}</h3>
                    <p>Click the node that rotates downward, then choose direction.</p>
                    <p>Selected node: <strong>${selectedNode ? selectedNode.key : '(none)'}</strong></p>
                    <div class="radio-row">
                        <label for="rotationDirectionSelect">Direction:</label>
                        <select id="rotationDirectionSelect">
                            <option value="left">left</option>
                            <option value="right">right</option>
                        </select>
                    </div>
                    <div class="btn-row">
                        <button id="applyRotationBtn">Apply Rotation Step</button>
                        <button id="insertCancelRotationBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
        }

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>AVL Fix-Up</h3>
                <p>Current node: <strong>${node.key}</strong></p>
                <p>Choose current balance and required rotations.</p>

                <div class="radio-row">
                    <label><input type="radio" name="fixBalance" value="-2"> -2</label>
                    <label><input type="radio" name="fixBalance" value="-1"> -1</label>
                    <label><input type="radio" name="fixBalance" value="0"> 0</label>
                    <label><input type="radio" name="fixBalance" value="1"> +1</label>
                    <label><input type="radio" name="fixBalance" value="2"> +2</label>
                </div>

                <div class="radio-row">
                    <label><input type="radio" name="rotationCount" value="0"> no rotations</label>
                    <label><input type="radio" name="rotationCount" value="1"> 1 rotation</label>
                    <label><input type="radio" name="rotationCount" value="2"> 2 rotations</label>
                </div>

                <div class="btn-row">
                    <button id="fixNextBtn">Next</button>
                    <button id="fixDoneBtn">Done</button>
                    <button id="insertCancelMainBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
            ${rotationBlock}
        `;

        const cancelMainBtn = document.getElementById('insertCancelMainBtn');
        if (cancelMainBtn) {
            cancelMainBtn.addEventListener('click', () => this.cancelExercise());
        }

        const cancelRotationBtn = document.getElementById('insertCancelRotationBtn');
        if (cancelRotationBtn) {
            cancelRotationBtn.addEventListener('click', () => this.cancelExercise());
        }

        const nextBtn = document.getElementById('fixNextBtn');
        const doneBtn = document.getElementById('fixDoneBtn');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.submitFixBalance(true));
        }
        if (doneBtn) {
            doneBtn.addEventListener('click', () => this.submitFixBalance(false));
        }

        const applyBtn = document.getElementById('applyRotationBtn');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => this.applyRotationStep());
        }
    }

    renderInsertPostRotationChoicePanel() {
        if (!this.insertSession) return;
        const panel = document.getElementById('exercisePanel');

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>After Rotations</h3>
                <p>Choose the next node that needs to be visited to update balance, or press <strong>Done</strong> if no more nodes need to be visited.</p>
                <div class="btn-row">
                    <button id="postRotNextBtn">Next</button>
                    <button id="postRotDoneBtn">Done</button>
                    <button id="postRotCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
        `;

        document.getElementById('postRotNextBtn').addEventListener('click', () => this.handlePostRotationChoice(true));
        document.getElementById('postRotDoneBtn').addEventListener('click', () => this.handlePostRotationChoice(false));
        document.getElementById('postRotCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderInsertNextNodePanel() {
        if (!this.insertSession) return;
        const panel = document.getElementById('exercisePanel');
        const expected = this.tree.getNodeById(this.insertSession.expectedNextNodeId);

        panel.innerHTML = `
            <div class="exercise-block">
                <h3>Select Next Node</h3>
                <p>Click the next node on the upward parent chain to update.</p>
                <p>No hint is shown. The node will highlight when you click it.</p>
                <div class="btn-row">
                    <button id="insertCancelBtn" class="btn-secondary">Cancel</button>
                </div>
            </div>
            <div class="exercise-block">
                <p><strong>Hint:</strong> go to the parent after finishing this node.
                ${expected ? '' : ' (No next node exists; Done should be used.)'}</p>
            </div>
        `;

        document.getElementById('insertCancelBtn').addEventListener('click', () => this.cancelExercise());
    }

    renderRemovePanel() {
        if (!this.removeSession) return;
        const panel = document.getElementById('exercisePanel');

        if (this.mode === 'remove-traverse') {
            const idx = Math.min(this.removeSession.pathIndex + 1, this.removeSession.pathNodeIds.length);
            const total = Math.max(1, this.removeSession.pathNodeIds.length);
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>Remove Traversal</h3>
                    <p>Target key: <strong>${this.removeSession.key}</strong></p>
                    <p>Step ${idx} / ${total}</p>
                    <p>Click nodes on the path to the node to remove in order.</p>
                    <div class="btn-row">
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-action') {
            const target = this.tree.getNodeById(this.removeSession.targetNodeId);
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>Choose Next Remove Action</h3>
                    <p>Node to remove: <strong>${target ? target.key : this.removeSession.key}</strong></p>
                    <div class="radio-row">
                        <label><input type="radio" name="removeAction" value="delete"> delete the node</label>
                        <label><input type="radio" name="removeAction" value="reattach"> reattach the node's child to the node's parent</label>
                        <label><input type="radio" name="removeAction" value="swap"> swap values with predecessor/successor</label>
                    </div>
                    <div class="btn-row">
                        <button id="removeActionSubmitBtn">Submit</button>
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removeActionSubmitBtn').addEventListener('click', () => this.submitRemoveAction());
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-swap-choice') {
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>Swap Choice</h3>
                    <p>Choose predecessor or successor to swap with.</p>
                    <div class="btn-row">
                        <button id="removeUsePredBtn">Use predecessor</button>
                        <button id="removeUseSuccBtn">Use successor</button>
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removeUsePredBtn').addEventListener('click', () => this.chooseRemoveSwapType('predecessor'));
            document.getElementById('removeUseSuccBtn').addEventListener('click', () => this.chooseRemoveSwapType('successor'));
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-swap-path') {
            const idx = Math.min(this.removeSession.swapPathIndex + 1, this.removeSession.swapPathIds.length);
            const total = Math.max(1, this.removeSession.swapPathIds.length);
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>Path to ${this.removeSession.swapType === 'predecessor' ? 'Predecessor' : 'Successor'}</h3>
                    <p>Step ${idx} / ${total}</p>
                    <p>Click each node on the path. When at destination, click <strong>Swap with node to remove</strong>.</p>
                    <div class="btn-row">
                        <button id="removeSwapNowBtn">Swap with node to remove</button>
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removeSwapNowBtn').addEventListener('click', () => this.swapWithNodeToRemove());
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-fix-select-start') {
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>Start removeFix</h3>
                    <p>Click the node where removeFix should be called first (parent of the node just removed).</p>
                    <div class="btn-row">
                        <button id="removeNoFixDoneBtn">Done</button>
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removeNoFixDoneBtn').addEventListener('click', () => {
                if (this.removeSession?.deletedNodeParentId !== null) {
                    this.addError();
                    this.setError('removeFix start node exists. Click that node instead of Done.');
                    this.render();
                    this.renderRemovePanel();
                    return;
                }
                this.finishRemoveExercise('Remove exercise complete.');
            });
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-fix') {
            const node = this.tree.getNodeById(this.removeSession.fixCurrentNodeId);
            if (!node) {
                this.finishRemoveExercise('Remove exercise complete.');
                return;
            }

            let rotationBlock = '';
            if (this.removeSession.pendingRotations) {
                const stepNum = this.removeSession.pendingRotationIndex + 1;
                const total = this.removeSession.pendingRotations.length;
                const selectedNode = this.removeSession.selectedRotationNodeId ? this.tree.getNodeById(this.removeSession.selectedRotationNodeId) : null;
                rotationBlock = `
                    <div class="exercise-block">
                        <h3>removeFix Rotation Step ${stepNum} / ${total}</h3>
                        <p>Click the node that rotates downward, then choose direction.</p>
                        <p>Selected node: <strong>${selectedNode ? selectedNode.key : '(none)'}</strong></p>
                        <div class="radio-row">
                            <label for="removeRotationDirectionSelect">Direction:</label>
                            <select id="removeRotationDirectionSelect">
                                <option value="left">left</option>
                                <option value="right">right</option>
                            </select>
                        </div>
                        <div class="btn-row">
                            <button id="removeApplyRotationBtn">Apply Rotation Step</button>
                            <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                        </div>
                    </div>
                `;
            }

            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>removeFix</h3>
                    <p>Current node: <strong>${node.key}</strong></p>
                    <p>Choose current balance and required rotations.</p>
                    <div class="radio-row">
                        <label><input type="radio" name="removeFixBalance" value="-2"> -2</label>
                        <label><input type="radio" name="removeFixBalance" value="-1"> -1</label>
                        <label><input type="radio" name="removeFixBalance" value="0"> 0</label>
                        <label><input type="radio" name="removeFixBalance" value="1"> +1</label>
                        <label><input type="radio" name="removeFixBalance" value="2"> +2</label>
                    </div>
                    <div class="radio-row">
                        <label><input type="radio" name="removeRotationCount" value="0"> no rotations</label>
                        <label><input type="radio" name="removeRotationCount" value="1"> 1 rotation</label>
                        <label><input type="radio" name="removeRotationCount" value="2"> 2 rotations</label>
                    </div>
                    <div class="btn-row">
                        <button id="removeFixNextBtn">Next</button>
                        <button id="removeFixDoneBtn">Done</button>
                        <button id="removeCancelMainBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
                ${rotationBlock}
            `;

            const nextBtn = document.getElementById('removeFixNextBtn');
            const doneBtn = document.getElementById('removeFixDoneBtn');
            if (nextBtn) nextBtn.addEventListener('click', () => this.submitRemoveFixBalance(true));
            if (doneBtn) doneBtn.addEventListener('click', () => this.submitRemoveFixBalance(false));

            const applyBtn = document.getElementById('removeApplyRotationBtn');
            if (applyBtn) applyBtn.addEventListener('click', () => this.applyRemoveRotationStep());

            const cancelMain = document.getElementById('removeCancelMainBtn');
            if (cancelMain) cancelMain.addEventListener('click', () => this.cancelExercise());
            const cancel = document.getElementById('removeCancelBtn');
            if (cancel) cancel.addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-post-rotation-choice') {
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>After removeFix Rotations</h3>
                    <p>Choose the next node that needs removeFix, or press <strong>Done</strong> if no more nodes need to be visited.</p>
                    <div class="btn-row">
                        <button id="removePostRotNextBtn">Next</button>
                        <button id="removePostRotDoneBtn">Done</button>
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removePostRotNextBtn').addEventListener('click', () => this.handleRemovePostRotationChoice(true));
            document.getElementById('removePostRotDoneBtn').addEventListener('click', () => this.handleRemovePostRotationChoice(false));
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        if (this.mode === 'remove-fix-await-next') {
            panel.innerHTML = `
                <div class="exercise-block">
                    <h3>Select Next removeFix Node</h3>
                    <p>Click the next node where removeFix should be performed.</p>
                    <p>No hint is shown. The node highlights once you click it.</p>
                    <div class="btn-row">
                        <button id="removeCancelBtn" class="btn-secondary">Cancel</button>
                    </div>
                </div>
            `;
            document.getElementById('removeCancelBtn').addEventListener('click', () => this.cancelExercise());
            return;
        }

        panel.innerHTML = '<p>No active remove exercise step.</p>';
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

            if (this.mode === 'insert-fix' && this.insertSession?.selectedRotationNodeId === node.id) {
                el.classList.add('selected-rotation');
            }

            if (this.mode === 'remove-fix' && this.removeSession?.selectedRotationNodeId === node.id) {
                el.classList.add('selected-rotation');
            }

            container.appendChild(el);
        }

        if (this.mode === 'insert-traverse' && this.insertSession) {
            // Show intermediate placeholders for nodes with only 1 child
            const intermediatePlaceholders = this.buildIntermediatePlaceholderElements(positions, scale);
            for (const placeholder of intermediatePlaceholders) {
                container.appendChild(placeholder);
            }
        }

        if (this.shouldShowInsertPlaceholder() && this.insertSession) {
            const placeholders = this.buildInsertPlaceholderElements(positions, scale);
            for (const placeholder of placeholders) {
                container.appendChild(placeholder);
            }
        }

        treeView.appendChild(container);
    }

    buildIntermediatePlaceholderElements(positions, scale) {
        const session = this.insertSession;
        if (!session) return [];

        const placeholders = [];
        
        // Only show intermediate placeholder for the current/most recently visited node
        // Don't show if we haven't started traversing or have reached the final insertion point
        if (session.pathIndex === 0 || session.pathIndex >= session.pathNodeIds.length) {
            return placeholders;
        }

        // Get the current node being visited (last node in the visited path)
        const currentNodeId = session.pathNodeIds[session.pathIndex - 1];
        const currentNode = this.tree.getNodeById(currentNodeId);
        if (!currentNode) return placeholders;

        // Only show placeholder if current node has exactly 1 child (test of understanding)
        const childCount = (currentNode.left ? 1 : 0) + (currentNode.right ? 1 : 0);
        if (childCount !== 1) return placeholders;

        const p = positions.get(currentNode.id);
        if (!p) return placeholders;

        const depth = Math.max(0, p.depth ?? 0);
        const base = this.treeSpacing.horizontal * Math.max(0.6, scale);
        const offset = Math.max(38, base * Math.pow(0.64, depth));
        const y = p.y + this.treeSpacing.vertical * Math.max(0.7, scale);

        // Show placeholder for the missing child
        const side = currentNode.left ? 'right' : 'left';
        const x = side === 'left' ? p.x - offset : p.x + offset;

        const el = document.createElement('div');
        el.className = 'tree-node placeholder';
        el.dataset.placeholder = '1';
        el.dataset.placeholderSide = side;
        el.dataset.parentId = currentNode.id;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.textContent = side === 'left' ? '+L' : '+R';
        placeholders.push(el);

        return placeholders;
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
    new AVLTrainer();
});
