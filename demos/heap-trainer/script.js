class MaryHeap {
    constructor(m, values = []) {
        this.m = m;
        this.heap = [...values];
    }

    parent(i) {
        return Math.floor((i - 1) / this.m);
    }

    children(i) {
        const children = [];
        for (let k = 1; k <= this.m; k++) {
            const child = this.m * i + k;
            if (child < this.heap.length) {
                children.push(child);
            }
        }
        return children;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    trickleUp(index) {
        while (index > 0) {
            const parentIdx = this.parent(index);
            if (this.heap[index] < this.heap[parentIdx]) {
                this.swap(index, parentIdx);
                index = parentIdx;
            } else {
                break;
            }
        }
    }

    trickleDown(index) {
        while (true) {
            const children = this.children(index);
            if (children.length === 0) break;

            let minChildIdx = children[0];
            for (let i = 1; i < children.length; i++) {
                if (this.heap[children[i]] < this.heap[minChildIdx]) {
                    minChildIdx = children[i];
                }
            }

            if (this.heap[minChildIdx] < this.heap[index]) {
                this.swap(index, minChildIdx);
                index = minChildIdx;
            } else {
                break;
            }
        }
    }

    push(value) {
        this.heap.push(value);
        this.trickleUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.trickleDown(0);
        return min;
    }

    getNextSwapForPush(currentIndex) {
        if (currentIndex === 0) return null;
        const parentIdx = this.parent(currentIndex);
        if (this.heap[currentIndex] < this.heap[parentIdx]) {
            return parentIdx;
        }
        return null;
    }

    getNextSwapForPop(currentIndex) {
        const children = this.children(currentIndex);
        if (children.length === 0) return null;

        let minChildIdx = children[0];
        for (let i = 1; i < children.length; i++) {
            if (this.heap[children[i]] < this.heap[minChildIdx]) {
                minChildIdx = children[i];
            }
        }

        if (this.heap[minChildIdx] < this.heap[currentIndex]) {
            return minChildIdx;
        }
        return null;
    }

    clone() {
        return new MaryHeap(this.m, [...this.heap]);
    }
}

class HeapVisualizer {
    constructor() {
        this.heap = null;
        this.m = 2;
        this.n = 7;
        this.mode = null; // 'push' or 'pop'
        this.selectedNode = null;
        this.currentIndex = null;
        this.savedState = null;
        this.newValue = null;
        this.pushPhase = null; // 'selectLeaf' or 'trickleUp'
        this.popPhase = null; // 'selectNode' or 'selectRoot' or 'trickleDown'
        this.buildPhase = null; // 'selectIndex' or 'heapify'
        this.buildIndex = null;
        this.dragIndex = null;
        this.buildStepState = null;
        this.nodeToRemove = null; // index of node selected to remove in pop
        this.correctPushIndex = null; // correct index for new push value
        this.interactionMode = 'tree'; // 'tree' or 'array'
        this.treeSpacing = { horizontal: 70, vertical: 90 };
        this.recentSwapIndices = new Set();
        this.recentAddedIndex = null;

        this.initEventListeners();
    }

    initEventListeners() {
        document.getElementById('generateBtn').addEventListener('click', () => this.generate());
        document.getElementById('pushBtn').addEventListener('click', () => this.startPush());
        document.getElementById('popBtn').addEventListener('click', () => this.startPop());
        document.getElementById('makeHeapBtn').addEventListener('click', () => this.startMakeHeap());
        document.getElementById('doneBtn').addEventListener('click', () => this.checkDone());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetOperation());
        document.getElementById('viewMode').addEventListener('change', (e) => {
            this.interactionMode = e.target.value;
            this.selectedNode = null;
            this.render();
        });
    }

    generate() {
        this.m = parseInt(document.getElementById('mValue').value);
        this.n = parseInt(document.getElementById('nValue').value);

        if (this.m < 2 || this.m > 10) {
            this.showMessage('M must be between 2 and 10', 'error');
            return;
        }

        const maxN = 100;
        if (this.n < 1 || this.n > maxN) {
            this.showMessage(`N must be between 1 and ${maxN}.`, 'error');
            return;
        }

        // Generate n random unique values between 1 and max(40, 6n)
        const maxVal = Math.max(40, 6 * this.n);
        const values = new Set();
        while (values.size < this.n) {
            values.add(Math.floor(Math.random() * maxVal) + 1);
        }

        // Build heap by inserting elements one by one
        this.heap = new MaryHeap(this.m);
        Array.from(values).forEach(val => this.heap.push(val));

        this.mode = null;
        this.selectedNode = null;
        this.currentIndex = null;
        this.savedState = null;
        this.recentSwapIndices.clear();
        this.recentAddedIndex = null;

        this.render();
        this.showMessage('Heap generated! Click Push, Pop, or Make-Heap to practice.', 'success');
        
        document.getElementById('pushBtn').disabled = false;
        document.getElementById('popBtn').disabled = false;
        document.getElementById('makeHeapBtn').disabled = false;
        document.getElementById('doneBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
    }

    startMakeHeap() {
        if (!this.heap) return;

        // Create a fresh unsorted array for build-heap practice
        const maxVal = Math.max(40, 6 * this.n);
        const values = new Set();
        while (values.size < this.n) {
            values.add(Math.floor(Math.random() * maxVal) + 1);
        }

        this.heap = new MaryHeap(this.m, Array.from(values));
        this.savedState = this.heap.clone();
        this.buildStepState = this.heap.clone();
        this.mode = 'make-heap';
        this.buildPhase = 'selectIndex';
        this.buildIndex = Math.floor((this.heap.heap.length - 2) / this.m);
        this.currentIndex = null;
        this.selectedNode = null;
        this.dragIndex = null;
        this.recentSwapIndices.clear();
        this.recentAddedIndex = null;

        this.render();

        if (this.buildIndex < 0) {
            this.showMessage('Make-Heap: Array is too small. Click Done to finish.', 'info');
        } else {
            this.showMessage(`Make-Heap: Click array index ${this.buildIndex} to run heapify.`, 'info');
        }

        document.getElementById('pushBtn').disabled = true;
        document.getElementById('popBtn').disabled = true;
        document.getElementById('makeHeapBtn').disabled = true;
        document.getElementById('generateBtn').disabled = true;
        document.getElementById('doneBtn').disabled = false;
        document.getElementById('doneBtn').style.display = 'inline-block';
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('resetBtn').style.display = 'inline-block';
    }

    startPush() {
        if (!this.heap) return;

        // Save current state
        this.savedState = this.heap.clone();
        this.mode = 'push';
        this.pushPhase = 'selectLeaf';
        this.recentSwapIndices.clear();
        this.recentAddedIndex = null;

        // Generate a new random value not in heap
        const maxVal = Math.max(40, 6 * this.n);
        const existingValues = new Set(this.heap.heap);
        let newValue;
        do {
            newValue = Math.floor(Math.random() * maxVal) + 1;
        } while (existingValues.has(newValue));

        this.newValue = newValue;
        // The correct position for the new value is at index equal to current heap size
        this.correctPushIndex = this.heap.heap.length;

        this.render();
        if (this.interactionMode === 'array') {
            this.showMessage(`Push ${newValue}: Choose where to add the new value.`, 'info');
        } else {
            this.showMessage(`Push ${newValue}: Choose where to attach the new value.`, 'info');
        }
        
        document.getElementById('pushBtn').disabled = true;
        document.getElementById('popBtn').disabled = true;
        document.getElementById('generateBtn').disabled = true;
        document.getElementById('doneBtn').disabled = false;
        document.getElementById('doneBtn').style.display = 'inline-block';
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('resetBtn').style.display = 'inline-block';
    }

    startPop() {
        if (!this.heap || this.heap.heap.length === 0) return;

        // Save current state
        this.savedState = this.heap.clone();
        this.mode = 'pop';
        this.popPhase = 'selectNode';
        this.nodeToRemove = null;
        this.recentSwapIndices.clear();
        this.recentAddedIndex = null;

        this.render();
        this.showMessage('Pop: Select a node to remove.', 'info');
        
        document.getElementById('pushBtn').disabled = true;
        document.getElementById('popBtn').disabled = true;
        document.getElementById('generateBtn').disabled = true;
        document.getElementById('doneBtn').disabled = false;
        document.getElementById('doneBtn').style.display = 'inline-block';
        document.getElementById('resetBtn').disabled = false;
        document.getElementById('resetBtn').style.display = 'inline-block';
    }

    handleNodeClick(index) {
        if (!this.mode) return;

        if (this.interactionMode === 'array' && (this.mode === 'push' || this.mode === 'pop')) {
            return;
        }

        if (this.mode === 'make-heap') {
            this.handleArrayClick(index);
            return;
        }

        if (this.mode === 'push' && this.pushPhase === 'selectLeaf') {
            this.handlePushLeafSelection(index);
        } else if (this.mode === 'pop' && this.popPhase === 'selectNode') {
            this.handlePopNodeSelection(index);
        } else if (this.mode === 'pop' && this.popPhase === 'selectRoot') {
            this.handlePopRootSelection(index);
        } else if ((this.mode === 'push' && this.pushPhase === 'trickleUp') || 
                   (this.mode === 'pop' && this.popPhase === 'trickleDown')) {
            // Handle swap selection for both push trickleUp and pop trickleDown
            if (this.selectedNode === null) {
                this.selectedNode = index;
                this.render();
            } else {
                // Second node clicked - attempt swap
                this.attemptSwap(this.selectedNode, index);
                this.selectedNode = null;
            }
        } else {
            if (this.selectedNode === null) {
                this.selectedNode = index;
                this.render();
            } else {
                this.attemptSwap(this.selectedNode, index);
                this.selectedNode = null;
            }
        }
    }

    handleArrayClick(index) {
        if (this.mode !== 'make-heap') return;

        if (this.buildPhase === 'selectIndex') {
            if (index !== this.buildIndex) {
                this.showMessage('✗ Error! Click Reset to try again.', 'error');
                return;
            }

            this.buildPhase = 'heapify';
            this.currentIndex = this.buildIndex;
            this.buildStepState = this.heap.clone();
            this.showMessage('Heapify started. Drag the current index to the smallest child to swap. If no swap is needed, click Done.', 'info');
            this.render();
        }
    }

    handleArrayInteractionClick(index) {
        if (!this.mode || this.interactionMode !== 'array') return;

        if (this.mode === 'push' && this.pushPhase === 'selectLeaf') {
            this.handlePushLeafSelection(index);
        } else if (this.mode === 'pop' && this.popPhase === 'selectNode') {
            this.handlePopNodeSelection(index);
        } else if (this.mode === 'pop' && this.popPhase === 'selectRoot') {
            this.handlePopRootSelection(index);
        } else if ((this.mode === 'push' && this.pushPhase === 'trickleUp') ||
                   (this.mode === 'pop' && this.popPhase === 'trickleDown')) {
            if (this.selectedNode === null) {
                this.selectedNode = index;
                this.render();
            } else {
                this.attemptSwap(this.selectedNode, index);
                this.selectedNode = null;
            }
        } else {
            if (this.selectedNode === null) {
                this.selectedNode = index;
                this.render();
            } else {
                this.attemptSwap(this.selectedNode, index);
                this.selectedNode = null;
            }
        }
    }

    handleArrayDragStart(index) {
        if (this.mode !== 'make-heap' || this.buildPhase !== 'heapify') return;
        this.dragIndex = index;
    }

    handleArrayDrop(targetIndex) {
        if (this.mode !== 'make-heap' || this.buildPhase !== 'heapify') return;
        if (this.dragIndex === null) return;

        const expectedSwap = this.heap.getNextSwapForPop(this.currentIndex);

        if (expectedSwap === null) {
            this.showMessage('✗ Error! Click Reset to try again.', 'error');
            this.dragIndex = null;
            return;
        }

        if (this.dragIndex !== this.currentIndex || targetIndex !== expectedSwap) {
            this.showMessage('✗ Error! Click Reset to try again.', 'error');
            this.heap = this.buildStepState.clone();
            this.currentIndex = this.buildIndex;
            this.dragIndex = null;
            this.render();
            return;
        }

        this.heap.swap(this.currentIndex, expectedSwap);
        this.currentIndex = expectedSwap;
        this.dragIndex = null;
        this.render();
    }

    handlePushLeafSelection(index) {
        if (this.interactionMode === 'array') {
            if (index !== this.correctPushIndex) {
                this.showMessage('✗ Error! Click Reset to try again.', 'error');
                return;
            }
        } else {
            const correctParentIndex = this.heap.parent(this.correctPushIndex);
            if (index !== correctParentIndex) {
                this.showMessage('✗ Error! Click Reset to try again.', 'error');
                return;
            }
        }

        // Attach new value at the correct next index
        this.heap.heap[this.correctPushIndex] = this.newValue;
        this.currentIndex = this.correctPushIndex;
        this.recentAddedIndex = this.correctPushIndex;
        this.pushPhase = 'trickleUp';
        
        this.render();
        if (this.interactionMode === 'array') {
            this.showMessage('New value attached! Now click indices to swap and trickle up. Click Done when the operation is complete.', 'success');
        } else {
            this.showMessage('New value attached! Now click nodes to swap and trickle up. Click Done when the operation is complete.', 'success');
        }
    }

    handlePopNodeSelection(index) {
        // Must select the last node
        const lastIndex = this.heap.heap.length - 1;
        
        if (index !== lastIndex) {
            this.showMessage('✗ Error! Click Reset to try again.', 'error');
            return;
        }

        // Correct node selected
        this.nodeToRemove = index;
        this.popPhase = 'selectRoot';
        
        this.render();
        this.showMessage(`Node ${index} selected for removal. Choose where its value should be moved.`, 'info');
    }

    handlePopRootSelection(index) {
        if (index !== 0) {
            this.showMessage('✗ Error! Click Reset to try again.', 'error');
            return;
        }

        // Correct - move the value to root and remove the last node
        const lastIndex = this.heap.heap.length - 1;
        const lastValue = this.heap.heap[lastIndex];
        this.heap.heap.pop();
        
        if (this.heap.heap.length === 0) {
            this.showMessage('✓ Pop complete! Heap is now empty.', 'success');
            this.mode = null;
            this.popPhase = null;
            this.nodeToRemove = null;
            this.render();
            document.getElementById('generateBtn').disabled = false;
            document.getElementById('pushBtn').disabled = false;
            document.getElementById('popBtn').disabled = false;
            document.getElementById('doneBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'none';
            return;
        }

        this.heap.heap[0] = lastValue;
        this.currentIndex = 0;
        this.popPhase = 'trickleDown';
        
        this.render();
        if (this.interactionMode === 'array') {
            this.showMessage(`Value moved. If the heap property is satisfied, click 'Done'. Otherwise, perform swaps until the heap is valid.`, 'success');
        } else {
            this.showMessage(`Value moved. If the heap property is satisfied, click 'Done'. Otherwise, perform swaps until the heap is valid.`, 'success');
        }
    }

    getValidNewNodePositions() {
        // Only show the one correct position for the new node in a complete tree
        // This is simply the next index that would be added to the array
        return [this.heap.heap.length];
    }

    attemptSwap(idx1, idx2) {
        if (idx1 === idx2) {
            this.selectedNode = null;
            this.render();
            return;
        }

        if (this.mode === 'push') {
            // Check if this is the correct swap
            const expectedSwap = this.heap.getNextSwapForPush(this.currentIndex);
            
            if (expectedSwap === null) {
                // No swap needed - check if they tried to swap
                this.showMessage('✗ Error! Click Reset to try again.', 'error');
                this.resetToSaved();
                return;
            }

            // Check if they selected the current index and its parent
            if ((idx1 === this.currentIndex && idx2 === expectedSwap) ||
                (idx2 === this.currentIndex && idx1 === expectedSwap)) {
                // Correct swap
                this.heap.swap(idx1, idx2);
                this.recentSwapIndices.add(idx1);
                this.recentSwapIndices.add(idx2);
                this.currentIndex = expectedSwap;

                // Check if more swaps needed
                const nextSwap = this.heap.getNextSwapForPush(this.currentIndex);
                if (nextSwap === null) {
                    this.showMessage('✓ Correct swap! Click \'Done\' to complete the operation.', 'success');
                } else {
                    this.showMessage('✓ Correct swap! Continue trickle up...', 'success');
                }
                this.render();
            } else {
                this.showMessage('✗ Wrong swap! Click Reset to try again.', 'error');
                this.resetToSaved();
            }
        } else if (this.mode === 'pop') {
            // Check if this is the correct swap
            const expectedSwap = this.heap.getNextSwapForPop(this.currentIndex);
            
            if (expectedSwap === null) {
                // No swap needed
                this.showMessage('✗ Error! Click Reset to try again.', 'error');
                this.resetToSaved();
                return;
            }

            // Check if they selected the current index and smallest child
            if ((idx1 === this.currentIndex && idx2 === expectedSwap) ||
                (idx2 === this.currentIndex && idx1 === expectedSwap)) {
                // Correct swap
                this.heap.swap(idx1, idx2);
                this.recentSwapIndices.add(idx1);
                this.recentSwapIndices.add(idx2);
                this.currentIndex = expectedSwap;

                // Check if more swaps needed
                const nextSwap = this.heap.getNextSwapForPop(this.currentIndex);
                if (nextSwap === null) {
                    this.showMessage('✓ Correct swap! Click \'Done\' to complete the operation.', 'success');
                } else {
                    this.showMessage('✓ Correct swap! Continue trickle down...', 'success');
                }
                this.render();
            } else {
                this.showMessage('✗ Wrong swap! Click Reset to try again.', 'error');
                this.resetToSaved();
            }
        }
    }

    resetToSaved() {
        this.heap = this.savedState.clone();
        
        if (this.mode === 'push') {
            this.heap.heap.push(this.newValue);
            this.currentIndex = this.heap.heap.length - 1;
        } else if (this.mode === 'pop') {
            const lastValue = this.savedState.heap[this.savedState.heap.length - 1];
            this.heap.heap.pop();
            if (this.heap.heap.length > 0) {
                this.heap.heap[0] = lastValue;
                this.currentIndex = 0;
            }
        }
        
        this.selectedNode = null;
        this.recentSwapIndices.clear();
        this.recentAddedIndex = null;
        this.render();
    }

    resetOperation() {
        if (!this.mode) return;
        
        this.heap = this.savedState.clone();
        this.mode = null;
        this.pushPhase = null;
        this.popPhase = null;
        this.buildPhase = null;
        this.buildIndex = null;
        this.dragIndex = null;
        this.buildStepState = null;
        this.nodeToRemove = null;
        this.selectedNode = null;
        this.currentIndex = null;
        this.savedState = null;
        this.newValue = null;
        this.correctPushIndex = null;
        this.recentSwapIndices.clear();
        this.recentAddedIndex = null;
        
        this.render();
        this.showMessage('Operation cancelled. Try again!', 'info');
        
        document.getElementById('pushBtn').disabled = false;
        document.getElementById('popBtn').disabled = false;
        document.getElementById('makeHeapBtn').disabled = false;
        document.getElementById('generateBtn').disabled = false;
        document.getElementById('doneBtn').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
    }

    checkDone() {
        if (!this.mode) return;
        
        // Check if heap is in valid state
        let isValid = true;
        let errorMsg = '';
        
        if (this.mode === 'make-heap') {
            if (this.buildIndex === null || this.buildIndex < 0) {
                // Validate heap property
                for (let i = 0; i < this.heap.heap.length; i++) {
                    const children = this.heap.children(i);
                    for (let child of children) {
                        if (this.heap.heap[i] > this.heap.heap[child]) {
                            isValid = false;
                            errorMsg = '✗ Heap property violated. Click Reset to try again.';
                            break;
                        }
                    }
                    if (!isValid) break;
                }

                if (isValid) {
                    this.showMessage('✓ Perfect! Make-Heap completed correctly!', 'success');
                    this.mode = null;
                    this.buildPhase = null;
                    this.buildIndex = null;
                    this.dragIndex = null;
                    this.buildStepState = null;
                    this.currentIndex = null;
                    this.selectedNode = null;
                    this.savedState = null;

                    document.getElementById('pushBtn').disabled = false;
                    document.getElementById('popBtn').disabled = false;
                    document.getElementById('makeHeapBtn').disabled = false;
                    document.getElementById('generateBtn').disabled = false;
                    document.getElementById('doneBtn').style.display = 'none';
                    document.getElementById('resetBtn').style.display = 'none';
                    this.render();
                } else {
                    this.showMessage(errorMsg, 'error');
                }
                return;
            }

            if (this.buildPhase === 'heapify') {
                const nextSwap = this.heap.getNextSwapForPop(this.currentIndex);
                if (nextSwap !== null) {
                    this.showMessage('✗ Not complete! Click Reset to try again.', 'error');
                    return;
                }

                // Heapify at this index completed, move to next index
                this.buildIndex -= 1;
                this.buildPhase = 'selectIndex';
                this.currentIndex = null;
                this.buildStepState = this.heap.clone();

                if (this.buildIndex >= 0) {
                    this.showMessage(`Make-Heap: Click array index ${this.buildIndex} to run heapify.`, 'info');
                } else {
                    this.showMessage('Make-Heap: All indices processed. Click Done to finish.', 'info');
                }
                this.render();
                return;
            }

            return;
        }

        if (this.mode === 'push') {
            if (this.pushPhase === 'selectLeaf') {
                this.showMessage('✗ Not complete! Click Reset to try again.', 'error');
                return;
            }
            const nextSwap = this.heap.getNextSwapForPush(this.currentIndex);
            if (nextSwap !== null) {
                isValid = false;
                errorMsg = '✗ Not complete! Click Reset to try again.';
            }
        } else if (this.mode === 'pop') {
            if (this.popPhase === 'selectNode') {
                this.showMessage('✗ Not complete! Click Reset to try again.', 'error');
                return;
            }
            if (this.popPhase === 'selectRoot') {
                this.showMessage('✗ Not complete! Click Reset to try again.', 'error');
                return;
            }
            const nextSwap = this.heap.getNextSwapForPop(this.currentIndex);
            if (nextSwap !== null) {
                isValid = false;
                errorMsg = '✗ Not complete! Click Reset to try again.';
            }
        }
        
        // Verify heap property for entire heap
        if (isValid) {
            for (let i = 0; i < this.heap.heap.length; i++) {
                const children = this.heap.children(i);
                for (let child of children) {
                    if (this.heap.heap[i] > this.heap.heap[child]) {
                        isValid = false;
                        errorMsg = '✗ Heap property violated. Click Reset to try again.';
                        break;
                    }
                }
                if (!isValid) break;
            }
        }
        
        if (isValid) {
            this.showMessage(`✓ Perfect! ${this.mode === 'push' ? 'Push' : 'Pop'} operation completed correctly!`, 'success');
            this.mode = null;
            this.pushPhase = null;
            this.popPhase = null;
            this.buildPhase = null;
            this.buildIndex = null;
            this.dragIndex = null;
            this.buildStepState = null;
            this.currentIndex = null;
            this.savedState = null;
            this.newValue = null;
            this.selectedNode = null;
            this.nodeToRemove = null;
            this.correctPushIndex = null;
            
            document.getElementById('pushBtn').disabled = false;
            document.getElementById('popBtn').disabled = false;
            document.getElementById('makeHeapBtn').disabled = false;
            document.getElementById('generateBtn').disabled = false;
            document.getElementById('doneBtn').style.display = 'none';
            document.getElementById('resetBtn').style.display = 'none';
            this.render();
        } else {
            this.showMessage(errorMsg, 'error');
            this.resetToSaved();
        }
    }

    showMessage(text, type) {
        const msgArea = document.getElementById('messageArea');
        msgArea.textContent = text;
        msgArea.className = 'message ' + type;
        msgArea.style.display = 'flex';
    }

    render() {
        const treeSection = document.getElementById('treeSection');
        const arraySection = document.getElementById('arraySection');
        const visualization = document.getElementById('visualization');
        const hideTree = this.interactionMode === 'array' && (this.mode === 'push' || this.mode === 'pop');

        if (treeSection) {
            treeSection.style.display = hideTree ? 'none' : 'block';
        }
        if (arraySection) {
            arraySection.style.display = 'block';
        }
        if (visualization) {
            visualization.classList.toggle('single-column', hideTree);
        }

        if (!hideTree) {
            this.renderTree();
        } else {
            const treeView = document.getElementById('treeView');
            if (treeView) {
                treeView.innerHTML = '';
            }
        }

        this.renderArray();
    }

    renderTree() {
        const treeView = document.getElementById('treeView');
        treeView.innerHTML = '';

        const treeInstructions = document.getElementById('treeInstructions');
        const showSwapInstructions =
            this.interactionMode === 'tree' &&
            ((this.mode === 'push' && this.pushPhase === 'trickleUp') ||
            (this.mode === 'pop' && this.popPhase === 'trickleDown'));
        if (treeInstructions) {
            if (showSwapInstructions) {
                treeInstructions.textContent = 'To swap, click the node you want to swap and then click the node to swap with. Click Done when the operation is complete.';
                treeInstructions.style.display = 'block';
            } else {
                treeInstructions.textContent = '';
                treeInstructions.style.display = 'none';
            }
        }

        if (!this.heap || this.heap.heap.length === 0) {
            treeView.innerHTML = '<div style="color: #888; text-align: center;">No heap to display</div>';
            return;
        }

        const container = document.createElement('div');
        container.className = 'tree-container';

        // Calculate positions for each node
        const positions = this.calculateTreePositions();
        
        // Determine how many existing nodes to show (for push phase, don't count the new value yet)
        const existingCount = (this.mode === 'push' && this.pushPhase === 'selectLeaf') ? 
            this.heap.heap.length : this.heap.heap.length;
        
        // Size container to bounds for proper centering
        if (positions.length > 0) {
            let minX = Infinity;
            let maxX = -Infinity;
            let minY = Infinity;
            let maxY = -Infinity;
            for (let pos of positions) {
                if (pos) {
                    minX = Math.min(minX, pos.x);
                    maxX = Math.max(maxX, pos.x);
                    minY = Math.min(minY, pos.y);
                    maxY = Math.max(maxY, pos.y);
                }
            }
            let width = Math.max(1, maxX - minX + 60);
            let height = Math.max(1, maxY - minY + 80);

            const treeViewWidth = treeView.clientWidth || treeView.getBoundingClientRect().width;
            const maxWidthRatio = 0.9;
            const maxWidth = maxWidthRatio * treeViewWidth;
            let scale = 1;

            if (treeViewWidth > 0) {
                const targetWidth = Math.min(maxWidth, treeViewWidth);
                scale = targetWidth / width;
                const yScale = scale < 1 ? scale : 1;
                for (let i = 0; i < positions.length; i++) {
                    if (positions[i]) {
                        positions[i].x *= scale;
                        positions[i].y *= yScale;
                    }
                }
                width = Math.max(1, width * scale);
                height = Math.max(1, height * yScale);
            }

            container.style.width = width + 'px';
            container.style.height = height + 'px';
            container.style.margin = '0 auto';

            const defaultNodeSize = 50;
            let nodeSize = defaultNodeSize;
            if (scale !== 1) {
                nodeSize = Math.max(28, Math.round(defaultNodeSize * scale));
            }
            const minGap = 4;
            const maxNodeSize = Math.max(22, Math.floor(this.treeSpacing.horizontal * scale - minGap));
            nodeSize = Math.min(nodeSize, maxNodeSize, defaultNodeSize);
            treeView.style.setProperty('--node-size', `${nodeSize}px`);
            treeView.style.setProperty('--node-font-size', `${Math.min(16, Math.max(10, Math.round(nodeSize * 0.45)))}px`);
        }

        // Draw edges for existing nodes
        const nodeSizeValue = parseFloat(getComputedStyle(treeView).getPropertyValue('--node-size')) || 50;
        const nodeRadius = nodeSizeValue / 2;

        for (let i = 0; i < existingCount; i++) {
            const children = this.heap.children(i);
            children.forEach(child => {
                if (child < existingCount) {
                    const edge = document.createElement('div');
                    edge.className = 'tree-edge';
                    
                    const x1 = positions[i].x + nodeRadius;
                    const y1 = positions[i].y + nodeRadius;
                    const x2 = positions[child].x + nodeRadius;
                    const y2 = positions[child].y + nodeRadius;
                    
                    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    edge.style.width = length + 'px';
                    edge.style.left = x1 + 'px';
                    edge.style.top = y1 + 'px';
                    edge.style.transform = `rotate(${angle}deg)`;
                    
                    container.appendChild(edge);
                }
            });
        }

        const showRecent = !this.mode;
        // Draw existing nodes
        for (let i = 0; i < existingCount; i++) {
            const node = document.createElement('div');
            node.className = 'tree-node';
            node.textContent = this.heap.heap[i];
            node.style.left = positions[i].x + 'px';
            node.style.top = positions[i].y + 'px';

            if (showRecent && (this.recentSwapIndices.has(i) || this.recentAddedIndex === i)) {
                node.classList.add('recent');
            }

            if (i === this.selectedNode && this.pushPhase !== 'selectLeaf' && this.popPhase !== 'selectNode') {
                node.classList.add('selected');
            }
            if (i === this.currentIndex) {
                node.classList.add('highlight');
            }

            node.addEventListener('click', () => this.handleNodeClick(i));
            container.appendChild(node);
        }

        // Draw placeholder nodes for push phase - show all potential child positions
        if (this.mode === 'push' && this.pushPhase === 'selectLeaf') {
            const idx = this.correctPushIndex;
            if (positions[idx]) {
                const node = document.createElement('div');
                node.className = 'tree-node placeholder';
                node.textContent = '+';
                node.style.left = positions[idx].x + 'px';
                node.style.top = positions[idx].y + 'px';
                container.appendChild(node);
            }
        }

        treeView.appendChild(container);
    }

    calculateTreePositions() {
        const positions = [];
        const horizontalSpacing = this.treeSpacing.horizontal;
        const verticalSpacing = this.treeSpacing.vertical;
        
        // Calculate subtree widths for proper spacing
        const getSubtreeWidth = (index) => {
            if (index >= this.heap.heap.length) return 0;
            
            const children = this.heap.children(index);
            if (children.length === 0) return 1;
            
            let totalWidth = 0;
            for (let child of children) {
                totalWidth += getSubtreeWidth(child);
            }
            return Math.max(1, totalWidth);
        };
        
        // Position nodes recursively (only for existing nodes)
        const positionNode = (index, x, y, level) => {
            if (index >= this.heap.heap.length) return x;
            
            const children = this.heap.children(index);
            
            if (children.length === 0) {
                // Leaf node
                positions[index] = { x: x * horizontalSpacing, y: y };
                return x + 1;
            }
            
            // Position children first
            let currentX = x;
            const childPositions = [];
            for (let child of children) {
                const childX = currentX;
                currentX = positionNode(child, childX, y + verticalSpacing, level + 1);
                childPositions.push(childX);
            }
            
            // Position this node centered over its children
            const firstChild = positions[children[0]];
            const lastChild = positions[children[children.length - 1]];
            const centerX = (firstChild.x + lastChild.x) / 2;
            
            positions[index] = { x: centerX, y: y };
            
            return currentX;
        };
        
        positionNode(0, 0, 20, 0);
        
        // Position any placeholder nodes as children of existing nodes
        if (this.mode === 'push' && this.pushPhase === 'selectLeaf') {
            let maxLeafY = 0;
            for (let i = 0; i < this.heap.heap.length; i++) {
                const children = this.heap.children(i);
                if (children.length === 0 && positions[i]) {
                    maxLeafY = Math.max(maxLeafY, positions[i].y);
                }
            }

            const validPositions = this.getValidNewNodePositions();
            for (let idx of validPositions) {
                const parentIdx = this.heap.parent(idx);
                if (positions[parentIdx]) {
                    // Offset from parent based on which child position this is
                    const childPosition = idx - this.m * parentIdx;
                    const xOffset = (childPosition - 1) * horizontalSpacing;
                    
                    positions[idx] = {
                        x: positions[parentIdx].x + xOffset,
                        y: maxLeafY + verticalSpacing
                    };
                }
            }
        }
        
        // Normalize positions to start at x = 0 for accurate centering
        if (positions.length > 0) {
            let minX = Infinity;
            for (let pos of positions) {
                if (pos) {
                    minX = Math.min(minX, pos.x);
                }
            }
            for (let i = 0; i < positions.length; i++) {
                if (positions[i]) {
                    positions[i].x -= minX;
                }
            }
        }
        
        return positions;
    }

    renderArray() {
        const arrayView = document.getElementById('arrayView');
        arrayView.innerHTML = '';

        const arrayInstructions = document.getElementById('arrayInstructions');
        const showSwapInstructions =
            this.interactionMode === 'array' &&
            ((this.mode === 'push' && this.pushPhase === 'trickleUp') ||
            (this.mode === 'pop' && this.popPhase === 'trickleDown'));
        if (arrayInstructions) {
            if (showSwapInstructions) {
                arrayInstructions.textContent = 'To swap, click the index you want to swap and then click the index to swap with. Click Done when the operation is complete.';
                arrayInstructions.style.display = 'block';
            } else {
                arrayInstructions.textContent = '';
                arrayInstructions.style.display = 'none';
            }
        }

        if (!this.heap || this.heap.heap.length === 0) {
            arrayView.innerHTML = '<div style="color: #888;">No heap to display</div>';
            return;
        }

        const showNewSlot = this.mode === 'push' && this.pushPhase === 'selectLeaf' && this.interactionMode === 'array';
        const displayCount = (this.mode === 'push' && this.pushPhase === 'selectLeaf') ? 
            (showNewSlot ? this.heap.heap.length + 1 : this.heap.heap.length - 1) : this.heap.heap.length;

        const showRecent = !this.mode;
        for (let i = 0; i < displayCount; i++) {
            const item = document.createElement('div');
            item.className = 'array-item';
            
            if (i === this.currentIndex) {
                item.classList.add('highlight');
            }
            if (i === this.selectedNode) {
                item.classList.add('highlight');
            }
            if (showRecent && (this.recentSwapIndices.has(i) || this.recentAddedIndex === i)) {
                item.classList.add('recent');
            }

            if (showNewSlot && i === this.heap.heap.length) {
                item.classList.add('placeholder');
                item.innerHTML = `
                    <div class="index">[${i}]</div>
                    <div class="value">+</div>
                `;
            } else {
                item.innerHTML = `
                    <div class="index">[${i}]</div>
                    <div class="value">${this.heap.heap[i]}</div>
                `;
            }
            if (this.mode === 'make-heap') {
                item.addEventListener('click', () => this.handleArrayClick(i));
                if (this.buildPhase === 'heapify' && i === this.currentIndex) {
                    item.classList.add('highlight');
                }
                item.draggable = this.buildPhase === 'heapify';
                item.addEventListener('dragstart', (e) => {
                    this.handleArrayDragStart(i);
                    e.dataTransfer.setData('text/plain', String(i));
                });
                item.addEventListener('dragover', (e) => e.preventDefault());
                item.addEventListener('drop', (e) => {
                    e.preventDefault();
                    this.handleArrayDrop(i);
                });
            } else if (this.interactionMode === 'array' && (this.mode === 'push' || this.mode === 'pop')) {
                item.addEventListener('click', () => this.handleArrayInteractionClick(i));
            }

            arrayView.appendChild(item);
        }
    }
}

// Initialize the visualizer
const visualizer = new HeapVisualizer();
