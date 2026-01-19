// ========================================
// LINKED LIST DATA STRUCTURE
// ========================================
let usedAddresses = new Set();

function generateAddress() {
    // Generate 3-4 digit hex addresses ending in 0 or 8
    let address;
    do {
        const base = Math.floor(Math.random() * 0xFFF0);
        const lastDigit = Math.random() < 0.5 ? 0 : 8;
        address = ((base & 0xFFF0) | lastDigit).toString(16).toUpperCase().padStart(4, '0');
    } while (usedAddresses.has(address));
    usedAddresses.add(address);
    return '0x' + address;
}

class Item {
    constructor(value, address = null) {
        this.value = value;
        this.next = null;
        this.address = address || generateAddress();
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.headAddress = 'null'; // Track head pointer value
    }

    clone() {
        const newList = new LinkedList();
        let current = this.head;
        let newHead = null;
        let newCurrent = null;

        while (current) {
            const newItem = new Item(current.value);
            if (!newHead) {
                newHead = newItem;
                newCurrent = newItem;
            } else {
                newCurrent.next = newItem;
                newCurrent = newItem;
            }
            current = current.next;
        }

        newList.head = newHead;
        newList.headAddress = newHead ? newHead.address : 'null';
        return newList;
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    size() {
        let count = 0;
        let current = this.head;
        while (current) {
            count++;
            current = current.next;
        }
        return count;
    }
}

// ========================================
// CHALLENGES DEFINITION
// ========================================
const challenges = [
    {
        id: 'insert-beginning',
        name: 'Insert at Beginning',
        difficulty: 'Easy',
        instruction: 'Insert value 99 at the beginning of the list.',
        taskInfo: 'Create a new node with value 99 and make it the head of the list.',
        initialList: [5, 10, 15],
        expectedList: [99, 5, 10, 15],
        type: 'insert-value',
        params: { value: 99, position: 'beginning' },
        hint: 'Create a new node, set its next to the current head, and update head to point to the new node.'
    },
    {
        id: 'insert-end',
        name: 'Insert at End',
        difficulty: 'Easy',
        instruction: 'Insert value 20 at the end of the list.',
        taskInfo: 'Traverse to the end of the list and append a new node with value 20.',
        initialList: [5, 10, 15],
        expectedList: [5, 10, 15, 20],
        type: 'insert-value',
        params: { value: 20, position: 'end' },
        hint: 'Traverse through the list until you reach a node whose next pointer is null. Update that node\'s next to point to the new node.'
    },
    {
        id: 'remove-value',
        name: 'Remove by Value',
        difficulty: 'Medium',
        instruction: 'Remove the node with value 10 from the list.',
        taskInfo: 'Find and remove the node containing value 10. Be careful with the pointers!',
        initialList: [5, 10, 15, 20],
        expectedList: [5, 15, 20],
        type: 'remove-value',
        params: { value: 10 },
        hint: 'Traverse the list. When you find the node to remove, update the previous node\'s next pointer to skip over it.'
    },
    {
        id: 'remove-first',
        name: 'Remove First Element',
        difficulty: 'Easy',
        instruction: 'Remove the first node from the list.',
        taskInfo: 'Update the head pointer to point to the second node.',
        initialList: [5, 10, 15, 20],
        expectedList: [10, 15, 20],
        type: 'remove-first',
        params: {},
        hint: 'Just move the head pointer to head->next.'
    },
    {
        id: 'swap-last-two',
        name: 'Swap Last Two Nodes',
        difficulty: 'Hard',
        instruction: 'Swap the positions of the last two nodes in the list.',
        taskInfo: 'Find the last two nodes and swap their positions by rearranging pointers.',
        initialList: [5, 10, 15, 20],
        expectedList: [5, 10, 20, 15],
        type: 'swap-last-two',
        params: {},
        hint: 'Find the node before the last two nodes (node at size-3), then adjust pointers: node.next = last node, last node.next = second-to-last node, second-to-last node.next = null.'
    },
    {
        id: 'remove-duplicates',
        name: 'Remove Duplicates',
        difficulty: 'Hard',
        instruction: 'Remove all duplicate values, keeping only the first occurrence.',
        taskInfo: 'Traverse the list and remove nodes that have already appeared earlier in the list.',
        initialList: [5, 10, 5, 15, 10, 20],
        expectedList: [5, 10, 15, 20],
        type: 'remove-duplicates',
        params: {},
        hint: 'Keep track of values you\'ve seen. When you encounter a value you\'ve already seen, remove that node.'
    },
    {
        id: 'reverse-list',
        name: 'Reverse the List',
        difficulty: 'Hard',
        instruction: 'Reverse the entire linked list.',
        taskInfo: 'Rearrange all the pointers so the list goes in reverse order.',
        initialList: [5, 10, 15, 20],
        expectedList: [20, 15, 10, 5],
        type: 'reverse-list',
        params: {},
        hint: 'Use three pointers: previous, current, and next. Iterate through the list, reversing each link as you go.'
    },
    {
        id: 'move-to-end',
        name: 'Move First to End',
        difficulty: 'Medium',
        instruction: 'Move the first node to the end of the list.',
        taskInfo: 'Remove the first node and append it to the end.',
        initialList: [5, 10, 15, 20],
        expectedList: [10, 15, 20, 5],
        type: 'move-to-end',
        params: {},
        hint: 'Find the last node, update its next to point to the first node, update the first node\'s next to null, and update head to point to the second node.'
    },
    {
        id: 'insert-sorted',
        name: 'Insert in Sorted Position',
        difficulty: 'Hard',
        instruction: 'Insert value 12 in its correct sorted position.',
        taskInfo: 'Find the correct position to maintain sorted order and insert the node there.',
        initialList: [5, 10, 15, 20],
        expectedList: [5, 10, 12, 15, 20],
        type: 'insert-sorted',
        params: { value: 12 },
        hint: 'Traverse the list to find the first node with a value greater than 12. Insert before that node.'
    },
    {
        id: 'find-middle',
        name: 'Find Middle Element',
        difficulty: 'Medium',
        instruction: 'Highlight the middle node(s) of the list.',
        taskInfo: 'For even-length lists, highlight both middle nodes. For odd-length, just the middle one.',
        initialList: [5, 10, 15, 20, 25],
        expectedList: [5, 10, 15, 20, 25],
        type: 'find-middle',
        params: {},
        hint: 'Use the slow and fast pointer technique. Move one pointer by 1 step and another by 2 steps. When the fast pointer reaches the end, the slow pointer is at the middle.'
    }
];

// ========================================
// GLOBAL STATE
// ========================================
let currentChallenge = null;
let currentList = null;
let originalList = null;
let selectedNodes = [];
let completedChallenges = new Set();
let draggedNode = null;
let availableNodes = []; // Nodes created but not yet in the list
let editingPointer = null; // Currently editing pointer

// ========================================
// INITIALIZATION
// ========================================
function initializeGame() {
    console.log('Initializing game...')
    console.log('Challenges:', challenges.length);
    renderChallengeList();
    loadChallenge(challenges[0].id);
    console.log('Game initialized');
}

function renderChallengeList() {
    const levelList = document.getElementById('levelList');
    levelList.innerHTML = '';

    challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.className = 'level-item';
        if (challenge.id === currentChallenge?.id) li.classList.add('active');
        if (completedChallenges.has(challenge.id)) li.innerHTML += '✓ ';
        
        li.innerHTML += `${challenge.name}`;
        li.style.cursor = 'pointer';
        li.onclick = () => loadChallenge(challenge.id);
        levelList.appendChild(li);
    });

    updateStats();
}

function loadChallenge(challengeId) {
    currentChallenge = challenges.find(c => c.id === challengeId);
    if (!currentChallenge) return;

    // Reset addresses
    usedAddresses.clear();
    availableNodes = [];
    editingPointer = null;

    // Create initial list
    originalList = new LinkedList();
    currentChallenge.initialList.forEach(value => {
        const item = new Item(value);
        if (!originalList.head) {
            originalList.head = item;
        } else {
            let current = originalList.head;
            while (current.next) current = current.next;
            current.next = item;
        }
    });

    currentList = originalList.clone();
    selectedNodes = [];

    // Update UI
    document.getElementById('taskName').textContent = currentChallenge.name;
    document.getElementById('difficulty').textContent = `[${currentChallenge.difficulty}]`;
    document.getElementById('taskInstruction').textContent = currentChallenge.instruction;
    document.getElementById('taskInfo').textContent = currentChallenge.taskInfo;
    document.getElementById('infoSection').style.display = 'block';

    // Setup input fields
    setupTaskInput();

    // Render list
    renderList();
    renderChallengeList();

    // Clear feedback
    document.getElementById('feedback').classList.remove('show');
    document.getElementById('submitBtn').style.display = 'none';
}

function setupTaskInput() {
    const taskInput = document.getElementById('taskInput');
    taskInput.innerHTML = '';

    // Add task-specific input
    if (currentChallenge.type === 'insert-value' || currentChallenge.type === 'insert-sorted' || currentChallenge.type === 'remove-value') {
        if (currentChallenge.type !== 'remove-value') {
            const label = document.createElement('label');
            label.textContent = 'Value to insert: ';
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.gap = '10px';

            const input = document.createElement('input');
            input.type = 'number';
            input.value = currentChallenge.params.value;
            input.id = 'valueInput';
            input.disabled = true;

            label.appendChild(input);
            taskInput.appendChild(label);
        } else {
            const label = document.createElement('label');
            label.textContent = 'Value to remove: ';
            label.style.display = 'flex';
            label.style.alignItems = 'center';
            label.style.gap = '10px';

            const input = document.createElement('input');
            input.type = 'number';
            input.value = currentChallenge.params.value;
            input.id = 'valueInput';
            input.disabled = true;

            label.appendChild(input);
            taskInput.appendChild(label);
        }
    }

    if (currentChallenge.type === 'find-middle') {
        const info = document.createElement('p');
        info.textContent = '👉 Click on the node(s) you think are in the middle.';
        info.style.color = '#666';
        taskInput.appendChild(info);
    }

    // Add node creation controls for insert operations
    if (currentChallenge.type.includes('insert') || currentChallenge.type === 'swap-last-two' || 
        currentChallenge.type === 'reverse-list' || currentChallenge.type === 'move-to-end' ||
        currentChallenge.type === 'remove-value' || currentChallenge.type === 'remove-duplicates' ||
        currentChallenge.type === 'remove-first') {
        const createDiv = document.createElement('div');
        createDiv.style.display = 'flex';
        createDiv.style.gap = '10px';
        createDiv.style.alignItems = 'center';
        createDiv.style.marginTop = '10px';
        
        if (currentChallenge.type.includes('insert')) {
            const createLabel = document.createElement('span');
            createLabel.textContent = 'Create new node:';
            createLabel.style.fontWeight = 'bold';
            
            const createBtn = document.createElement('button');
            createBtn.textContent = '+ Create Node';
            createBtn.className = 'task-input';
            createBtn.style.padding = '8px 15px';
            createBtn.onclick = () => createNewNode(currentChallenge.params.value);
            
            createDiv.appendChild(createLabel);
            createDiv.appendChild(createBtn);
        }
        
        const helpText = document.createElement('p');
        helpText.style.fontSize = '0.9em';
        helpText.style.color = '#666';
        helpText.style.marginTop = '10px';
        helpText.innerHTML = '💡 <strong>How to edit:</strong> Click on any pointer field to change it. Type an address or "null".';
        
        taskInput.appendChild(createDiv);
        taskInput.appendChild(helpText);
    }

    // Show submit button for most challenges
    document.getElementById('submitBtn').style.display = 'inline-block';
}

// ========================================
// LIST RENDERING
// ========================================
function renderList() {
    const canvas = document.getElementById('listCanvas');
    canvas.innerHTML = '';

    // Show available nodes area
    if (availableNodes.length > 0) {
        const availableArea = document.createElement('div');
        availableArea.style.width = '100%';
        availableArea.style.padding = '10px';
        availableArea.style.background = '#fff8dc';
        availableArea.style.borderRadius = '5px';
        availableArea.style.marginBottom = '15px';
        availableArea.style.border = '2px dashed #ffa500';
        
        const title = document.createElement('div');
        title.textContent = '📦 Available Nodes (not yet in list):';
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '10px';
        title.style.color = '#ff8c00';
        availableArea.appendChild(title);
        
        const nodeContainer = document.createElement('div');
        nodeContainer.style.display = 'flex';
        nodeContainer.style.gap = '20px';
        nodeContainer.style.flexWrap = 'wrap';
        
        availableNodes.forEach(node => {
            const nodeEl = createNodeElement(node, true);
            nodeContainer.appendChild(nodeEl);
        });
        
        availableArea.appendChild(nodeContainer);
        canvas.appendChild(availableArea);
    }

    // Show current list with head pointer
    const listContainer = document.createElement('div');
    listContainer.style.position = 'relative';
    
    const listTitle = document.createElement('div');
    listTitle.textContent = '🔗 Linked List';
    listTitle.style.fontWeight = 'bold';
    listTitle.style.marginBottom = '10px';
    listTitle.style.color = '#667eea';
    listContainer.appendChild(listTitle);

    // Create head pointer box
    const headBox = createHeadPointerBox();
    listContainer.appendChild(headBox);

    // Create nodes container
    const nodesContainer = document.createElement('div');
    nodesContainer.style.display = 'flex';
    nodesContainer.style.gap = '20px';
    nodesContainer.style.flexWrap = 'wrap';
    nodesContainer.style.alignItems = 'center';
    nodesContainer.style.marginTop = '20px';
    nodesContainer.id = 'nodesContainer';

    if (!currentList.head && currentList.headAddress === 'null') {
        const emptyMsg = document.createElement('div');
        emptyMsg.style.color = '#999';
        emptyMsg.textContent = '(empty list)';
        nodesContainer.appendChild(emptyMsg);
    } else {
        // Render all nodes
        const allNodes = getAllNodes();
        allNodes.forEach((node, index) => {
            if (index > 0) {
                const spacer = document.createElement('div');
                spacer.style.width = '20px';
                nodesContainer.appendChild(spacer);
            }
            const nodeEl = createNodeElement(node, availableNodes.includes(node));
            nodesContainer.appendChild(nodeEl);
        });
    }
    
    listContainer.appendChild(nodesContainer);
    canvas.appendChild(listContainer);
    
    // Draw arrows after DOM is updated
    setTimeout(drawArrows, 50);
}

function createNodeElement(item, isAvailable = false) {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'node';
    nodeEl.draggable = false;
    nodeEl.dataset.id = item.id;
    nodeEl.dataset.value = item.value;
    nodeEl.dataset.address = item.address;

    if (selectedNodes.includes(item.id)) {
        nodeEl.classList.add('selected');
    }
    if (isAvailable) {
        nodeEl.classList.add('available');
    }

    // Create two-field node structure
    const nodeBox = document.createElement('div');
    nodeBox.className = 'node-box';
    
    // Value field
    const valueField = document.createElement('div');
    valueField.className = 'node-field';
    valueField.innerHTML = `
        <div class="field-label">value</div>
        <div class="field-value">${item.value}</div>
    `;
    
    // Pointer field
    const pointerField = document.createElement('div');
    pointerField.className = 'node-field pointer-field';
    const nextAddr = item.nextAddress || (item.next ? item.next.address : 'null');
    const isValidPointer = nextAddr === 'null' || findNodeByAddress(nextAddr);
    const bgColor = isValidPointer ? '' : '#ffcccc';
    
    pointerField.innerHTML = `
        <div class="field-label">next</div>
        <div class="field-value pointer-value" contenteditable="true" style="background: ${bgColor}">${nextAddr}</div>
    `;
    
    // Address label below
    const addressLabel = document.createElement('div');
    addressLabel.className = 'node-address';
    addressLabel.textContent = `@ ${item.address}`;
    
    nodeBox.appendChild(valueField);
    nodeBox.appendChild(pointerField);
    nodeEl.appendChild(nodeBox);
    nodeEl.appendChild(addressLabel);

    // Add pointer editing
    const pointerValue = pointerField.querySelector('.pointer-value');
    pointerValue.dataset.nodeAddress = item.address; // Store for arrow drawing
    
    pointerValue.addEventListener('focus', (e) => {
        e.stopPropagation();
        editingPointer = { node: item, element: pointerValue };
        pointerValue.style.background = '#fffacd';
    });
    
    pointerValue.addEventListener('blur', (e) => {
        e.stopPropagation();
        const newValue = pointerValue.textContent.trim();
        updatePointer(item, newValue);
        editingPointer = null;
    });
    
    pointerValue.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            pointerValue.blur();
        }
    });

    // Node click for middle-finding challenge
    nodeEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('pointer-value')) return;
        e.stopPropagation();
        if (currentChallenge.type === 'find-middle') {
            toggleNodeSelection(item.id);
        }
    });

    return nodeEl;
}

function toggleNodeSelection(nodeId) {
    const index = selectedNodes.indexOf(nodeId);
    if (index > -1) {
        selectedNodes.splice(index, 1);
    } else {
        selectedNodes.push(nodeId);
    }
    renderList();
}

function createHeadPointerBox() {
    const headBox = document.createElement('div');
    headBox.className = 'head-pointer-box';
    headBox.id = 'headPointerBox';
    
    const label = document.createElement('div');
    label.className = 'head-label';
    label.textContent = 'head';
    
    const pointerField = document.createElement('div');
    pointerField.className = 'head-pointer-field';
    
    const pointerValue = document.createElement('div');
    pointerValue.className = 'head-pointer-value';
    pointerValue.contentEditable = 'true';
    pointerValue.textContent = currentList.headAddress;
    pointerValue.id = 'headPointerValue';
    
    // Validate and color the head pointer
    const isValid = currentList.headAddress === 'null' || findNodeByAddress(currentList.headAddress);
    if (!isValid) {
        pointerValue.style.background = '#ffcccc';
    }
    
    pointerValue.addEventListener('focus', (e) => {
        e.stopPropagation();
        pointerValue.style.background = '#fffacd';
    });
    
    pointerValue.addEventListener('blur', (e) => {
        e.stopPropagation();
        const newValue = pointerValue.textContent.trim();
        updateHeadPointer(newValue);
    });
    
    pointerValue.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            pointerValue.blur();
        }
    });
    
    pointerField.appendChild(pointerValue);
    headBox.appendChild(label);
    headBox.appendChild(pointerField);
    
    return headBox;
}

function updateHeadPointer(newValue) {
    currentList.headAddress = newValue;
    
    if (newValue.toLowerCase() === 'null') {
        currentList.head = null;
    } else {
        const targetNode = findNodeByAddress(newValue);
        if (targetNode) {
            currentList.head = targetNode;
        } else {
            // Invalid address
            currentList.head = null;
        }
    }
    
    renderList();
}

function createNewNode(value) {
    const newNode = new Item(value);
    availableNodes.push(newNode);
    renderList();
    
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback show info';
    feedback.textContent = `✓ Created new node with value ${value} at address ${newNode.address}. Now set its pointer and add it to the list!`;
}

function updatePointer(item, newValue) {
    if (newValue.toLowerCase() === 'null') {
        item.next = null;
        item.nextAddress = 'null';
    } else {
        // Find node with matching address
        const targetNode = findNodeByAddress(newValue);
        if (targetNode) {
            item.next = targetNode;
            item.nextAddress = targetNode.address;
        } else if (newValue !== '') {
            // Invalid address - don't link but store the value
            item.next = null;
            item.nextAddress = newValue;
        } else {
            item.next = null;
            item.nextAddress = 'null';
        }
    }
    
    renderList();
}

function isInList(item) {
    let current = currentList.head;
    while (current) {
        if (current.id === item.id || current.address === item.address) return true;
        current = current.next;
    }
    return false;
}

function getAllNodes() {
    const allNodes = [...availableNodes];
    let current = currentList.head;
    while (current) {
        allNodes.push(current);
        current = current.next;
    }
    return allNodes;
}

function findNodeByAddress(address) {
    if (!address || address.toLowerCase() === 'null') return null;
    const normalized = address.toUpperCase().startsWith('0X') ? address.toUpperCase() : '0x' + address.toUpperCase();
    return getAllNodes().find(n => n.address === normalized);
}

function addNodeToList(node, position) {
    // Remove from available if present
    availableNodes = availableNodes.filter(n => n.id !== node.id);
    
    if (position === 'head') {
        node.next = currentList.head;
        currentList.head = node;
    }
    // Add more position logic as needed
    
    renderList();
}

// ========================================
// DRAG AND DROP (Legacy - not used)
// ========================================
function handleDragStart(e) {
    draggedNode = {
        id: e.target.dataset.id,
        value: parseInt(e.target.dataset.value)
    };
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedNode = null;
}

// ========================================
// CHALLENGE SOLUTIONS
// ========================================
function checkSolution() {
    const feedback = document.getElementById('feedback');

    let isCorrect = false;
    let message = '';

    switch (currentChallenge.type) {
        case 'insert-value': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Perfect! The list has been correctly modified.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'remove-value': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Great! You successfully removed the node.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'remove-first': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Excellent! The first element has been removed.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'swap-last-two': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Perfect! The last two elements have been swapped.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'remove-duplicates': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Excellent! All duplicates have been removed.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'reverse-list': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Perfect! The list has been reversed.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'move-to-end': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Great! The first element has been moved to the end.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'insert-sorted': {
            const currentArray = currentList.toArray();
            isCorrect = JSON.stringify(currentArray) === JSON.stringify(currentChallenge.expectedList);
            message = isCorrect ? '✓ Perfect! The node has been inserted in the correct sorted position.' : 'The list doesn\'t match the expected result.';
            break;
        }
        case 'find-middle': {
            const arr = currentList.toArray();
            const len = arr.length;
            let middleIndices = [];
            
            if (len % 2 === 1) {
                middleIndices = [Math.floor(len / 2)];
            } else {
                middleIndices = [len / 2 - 1, len / 2];
            }

            let current = currentList.head;
            let middleIds = [];
            for (let i = 0; i < len; i++) {
                if (middleIndices.includes(i)) {
                    middleIds.push(current.id);
                }
                current = current.next;
            }

            isCorrect = selectedNodes.length === middleIds.length && 
                        middleIds.every(id => selectedNodes.includes(id));
            message = isCorrect ? '✓ Correct! You found the middle node(s).' : 'The selected node(s) are not in the middle.';
            break;
        }
    }

    feedback.className = 'feedback show ' + (isCorrect ? 'success' : 'error');
    feedback.textContent = message;

    if (isCorrect) {
        completedChallenges.add(currentChallenge.id);
        showCompleteModal();
    }
}

function showHint() {
    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback show info';
    feedback.textContent = '💡 ' + currentChallenge.hint;
}

function showCompleteModal() {
    const modal = document.getElementById('completeModal');
    const message = document.getElementById('completeMessage');
    message.textContent = `You've mastered "${currentChallenge.name}"! Ready for the next challenge?`;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('completeModal').classList.remove('show');
    
    // Load next challenge
    const currentIndex = challenges.findIndex(c => c.id === currentChallenge.id);
    if (currentIndex < challenges.length - 1) {
        loadChallenge(challenges[currentIndex + 1].id);
    } else {
        showGameComplete();
    }
}

function showGameComplete() {
    const modal = document.getElementById('completeModal');
    const message = document.getElementById('completeMessage');
    message.textContent = 'You\'ve completed all challenges! You\'re now a Linked List Master! 🏆';
    modal.classList.add('show');
}

function resetCurrentTask() {
    usedAddresses.clear();
    availableNodes = [];
    editingPointer = null;
    currentList = originalList.clone();
    selectedNodes = [];
    renderList();
    document.getElementById('feedback').classList.remove('show');
}

function updateStats() {
    document.getElementById('completedCount').textContent = completedChallenges.size;
    const percentage = Math.round((completedChallenges.size / challenges.length) * 100);
    document.getElementById('scoreDisplay').textContent = `Score: ${percentage}%`;
}

// ========================================
// INTERACTIVE MODIFICATIONS (Simulated)
// ========================================
// Note: In a real implementation, these would represent student actions
// For this demo, students would actually modify the list through drag/drop UI

function simulateInsertAtBeginning(value) {
    const newItem = new Item(value);
    newItem.next = currentList.head;
    currentList.head = newItem;
    renderList();
}

function simulateInsertAtEnd(value) {
    const newItem = new Item(value);
    if (!currentList.head) {
        currentList.head = newItem;
    } else {
        let current = currentList.head;
        while (current.next) current = current.next;
        current.next = newItem;
    }
    renderList();
}

function simulateRemoveValue(value) {
    if (currentList.head && currentList.head.value === value) {
        currentList.head = currentList.head.next;
    } else {
        let current = currentList.head;
        while (current && current.next) {
            if (current.next.value === value) {
                current.next = current.next.next;
                break;
            }
            current = current.next;
        }
    }
    renderList();
}

function simulateRemoveFirst() {
    if (currentList.head) {
        currentList.head = currentList.head.next;
    }
    renderList();
}

function simulateSwapLastTwo() {
    const arr = currentList.toArray();
    if (arr.length >= 2) {
        [arr[arr.length - 1], arr[arr.length - 2]] = [arr[arr.length - 2], arr[arr.length - 1]];
        
        // Reconstruct list
        currentList = new LinkedList();
        arr.forEach(value => {
            const item = new Item(value);
            if (!currentList.head) {
                currentList.head = item;
            } else {
                let current = currentList.head;
                while (current.next) current = current.next;
                current.next = item;
            }
        });
        renderList();
    }
}

function simulateReverse() {
    const arr = currentList.toArray();
    arr.reverse();
    
    currentList = new LinkedList();
    arr.forEach(value => {
        const item = new Item(value);
        if (!currentList.head) {
            currentList.head = item;
        } else {
            let current = currentList.head;
            while (current.next) current = current.next;
            current.next = item;
        }
    });
    renderList();
}

function simulateRemoveDuplicates() {
    const seen = new Set();
    let current = currentList.head;
    let prev = null;

    while (current) {
        if (seen.has(current.value)) {
            if (prev) {
                prev.next = current.next;
            } else {
                currentList.head = current.next;
            }
            current = current.next;
        } else {
            seen.add(current.value);
            prev = current;
            current = current.next;
        }
    }
    renderList();
}

function simulateMoveToEnd() {
    if (currentList.head && currentList.head.next) {
        const firstNode = currentList.head;
        currentList.head = firstNode.next;
        
        let current = currentList.head;
        while (current.next) current = current.next;
        current.next = firstNode;
        firstNode.next = null;
        renderList();
    }
}

function simulateInsertSorted(value) {
    const newItem = new Item(value);

    if (!currentList.head || currentList.head.value > value) {
        newItem.next = currentList.head;
        currentList.head = newItem;
    } else {
        let current = currentList.head;
        while (current.next && current.next.value < value) {
            current = current.next;
        }
        newItem.next = current.next;
        current.next = newItem;
    }
    renderList();
}

// ========================================
// KEYBOARD SHORTCUTS FOR TESTING
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Shift') {
        // Ctrl+Shift+1 to simulate the appropriate operation
        switch (currentChallenge.type) {
            case 'insert-value':
                if (currentChallenge.params.position === 'beginning') {
                    simulateInsertAtBeginning(currentChallenge.params.value);
                } else {
                    simulateInsertAtEnd(currentChallenge.params.value);
                }
                break;
            case 'remove-value':
                simulateRemoveValue(currentChallenge.params.value);
                break;
            case 'remove-first':
                simulateRemoveFirst();
                break;
            case 'swap-last-two':
                simulateSwapLastTwo();
                break;
            case 'reverse-list':
                simulateReverse();
                break;
            case 'remove-duplicates':
                simulateRemoveDuplicates();
                break;
            case 'move-to-end':
                simulateMoveToEnd();
                break;
            case 'insert-sorted':
                simulateInsertSorted(currentChallenge.params.value);
                break;
        }
    }
});

function drawArrows() {
    // Remove existing arrows
    document.querySelectorAll('.pointer-arrow').forEach(el => el.remove());
    
    const canvas = document.getElementById('listCanvas');
    if (!canvas) return;
    
    // Draw arrow from head pointer
    const headPointerValue = document.getElementById('headPointerValue');
    if (headPointerValue && currentList.headAddress !== 'null') {
        const targetNode = findNodeByAddress(currentList.headAddress);
        if (targetNode) {
            const targetEl = document.querySelector(`[data-address="${targetNode.address}"]`);
            if (targetEl) {
                drawArrowBetween(headPointerValue, targetEl, '#667eea');
            }
        }
    }
    
    // Draw arrows from each node's next pointer
    const allNodes = getAllNodes();
    allNodes.forEach(node => {
        const nextAddr = node.nextAddress || (node.next ? node.next.address : 'null');
        if (nextAddr !== 'null') {
            const targetNode = findNodeByAddress(nextAddr);
            if (targetNode) {
                const sourceEl = document.querySelector(`[data-node-address="${node.address}"]`);
                const targetEl = document.querySelector(`[data-address="${targetNode.address}"]`);
                if (sourceEl && targetEl) {
                    drawArrowBetween(sourceEl, targetEl, '#28a745');
                }
            }
        }
    });
}

function drawArrowBetween(sourceEl, targetEl, color) {
    const canvas = document.getElementById('listCanvas');
    const canvasRect = canvas.getBoundingClientRect();
    const sourceRect = sourceEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    
    const arrow = document.createElement('div');
    arrow.className = 'pointer-arrow';
    arrow.style.position = 'absolute';
    arrow.style.height = '2px';
    arrow.style.background = color;
    arrow.style.transformOrigin = '0 50%';
    arrow.style.zIndex = '5';
    
    // Calculate positions relative to canvas
    const startX = sourceRect.right - canvasRect.left;
    const startY = sourceRect.top + sourceRect.height / 2 - canvasRect.top;
    const endX = targetRect.left - canvasRect.left;
    const endY = targetRect.top + targetRect.height / 2 - canvasRect.top;
    
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    
    arrow.style.left = startX + 'px';
    arrow.style.top = startY + 'px';
    arrow.style.width = length + 'px';
    arrow.style.transform = `rotate(${angle}deg)`;
    
    // Add arrowhead
    arrow.innerHTML = '<div style="position: absolute; right: 0; top: -4px; width: 0; height: 0; border-left: 8px solid ' + color + '; border-top: 5px solid transparent; border-bottom: 5px solid transparent;"></div>';
    
    canvas.style.position = 'relative';
    canvas.appendChild(arrow);
}

// Initialize on page load
window.addEventListener('load', initializeGame);
