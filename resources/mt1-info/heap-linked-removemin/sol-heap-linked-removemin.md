# Solution: Link-Based Heap RemoveMin

## Problem Summary
Implement `removeMin()` for a min-heap implemented with linked nodes (not array-based). The heap must remain valid after removal, but doesn't need to stay balanced (O(log n) height).

## Solution

```cpp
struct Node {
    Node *left, *right, *parent;
    int priority; // smaller means higher priority.
    int element;
    // this is an index of where to find the actual element in an array somewhere
};

// Helper function to find the node with minimum priority in the subtree
Node* findMin(Node* node) {
    if (node == nullptr) {
        return nullptr;
    }
    
    Node* minNode = node;
    
    // Check left subtree
    Node* leftMin = findMin(node->left);
    if (leftMin != nullptr && leftMin->priority < minNode->priority) {
        minNode = leftMin;
    }
    
    // Check right subtree
    Node* rightMin = findMin(node->right);
    if (rightMin != nullptr && rightMin->priority < minNode->priority) {
        minNode = rightMin;
    }
    
    return minNode;
}

// Helper function to find a leaf node (or any node we can easily remove)
Node* findLeaf(Node* node) {
    if (node == nullptr) {
        return nullptr;
    }
    
    // If this is a leaf, return it
    if (node->left == nullptr && node->right == nullptr) {
        return node;
    }
    
    // Otherwise, recursively search (prefer right for simplicity)
    if (node->right != nullptr) {
        return findLeaf(node->right);
    }
    return findLeaf(node->left);
}

void removeMin(Node* root) {
    if (root == nullptr) {
        return;
    }
    
    // The root has the minimum value in a min-heap
    // Strategy: Replace root's data with a leaf node's data, then delete the leaf
    
    // Find a leaf node to swap with
    Node* leaf = findLeaf(root);
    
    if (leaf == nullptr || leaf == root) {
        // Edge case: root is the only node
        // In this case, we can't actually delete it without returning the new root
        // Since the function is void, we'll just mark it somehow or leave it
        // For a proper implementation, this function should return Node*
        // For now, we'll just clear its children
        root->left = nullptr;
        root->right = nullptr;
        return;
    }
    
    // Copy leaf's data to root
    root->priority = leaf->priority;
    root->element = leaf->element;
    
    // Remove the leaf from the tree
    if (leaf->parent != nullptr) {
        if (leaf->parent->left == leaf) {
            leaf->parent->left = nullptr;
        } else {
            leaf->parent->right = nullptr;
        }
    }
    
    // Delete the leaf node
    delete leaf;
    
    // Now we need to restore heap property by bubbling down
    // The root might now violate the heap property
    Node* current = root;
    
    while (current != nullptr) {
        Node* smallest = current;
        
        // Find the smallest among current, left child, and right child
        if (current->left != nullptr && current->left->priority < smallest->priority) {
            smallest = current->left;
        }
        if (current->right != nullptr && current->right->priority < smallest->priority) {
            smallest = current->right;
        }
        
        // If current is the smallest, we're done
        if (smallest == current) {
            break;
        }
        
        // Swap data with the smallest child
        int tempPriority = current->priority;
        int tempElement = current->element;
        current->priority = smallest->priority;
        current->element = smallest->element;
        smallest->priority = tempPriority;
        smallest->element = tempElement;
        
        // Move down to continue bubbling
        current = smallest;
    }
}
```

## Explanation

### Strategy

Since this is a min-heap, the root always contains the minimum element. To remove it:

1. **Replace root with a leaf**: Copy a leaf node's data to the root, then delete the leaf
   - This preserves the tree structure
   - Avoids complex pointer manipulation

2. **Restore heap property**: Bubble down (heapify)
   - Compare root with its children
   - Swap with the smaller child if needed
   - Repeat until heap property is restored

### Algorithm Steps

1. **Handle edge cases**
   - If root is null, return
   - If root is the only node, special handling

2. **Find a leaf node**
   - Any leaf will do (we chose rightmost for simplicity)
   - This is the node we'll remove from the tree

3. **Copy leaf data to root**
   - Root now has the leaf's priority and element
   - Leaf will be deleted

4. **Remove leaf from tree**
   - Update parent's pointer to null
   - Delete the leaf node

5. **Heapify down (bubble down)**
   - Start at root
   - While heap property is violated:
     - Find smallest among current node and its children
     - If current is smallest, done
     - Otherwise, swap with smallest child
     - Move to that child and repeat

### Visualization

Before removing min:
```
        2 (min)
       / \
      5   3
     / \
    8   7
```

After copying leaf (7) to root:
```
        7
       / \
      5   3
     /
    8
```

After bubbling down:
```
        3
       / \
      5   7
     /
    8
```

Heap property restored! ✓

## Time Complexity

- Finding leaf: O(h) where h is the height
- Heapify down: O(h)
- **Total: O(h)**

Since we don't maintain balance, h could be O(n) in the worst case, giving us O(n) time. If the tree stays reasonably balanced, this is O(log n).

## Space Complexity

O(h) for the recursion stack in findLeaf (could be optimized to O(1) with iteration)

## Note on Balancing

The problem explicitly states we don't need to keep the heap balanced at O(log n) height. Our solution correctly maintains the heap property but may result in a deeper tree over time. For a production implementation, you would want to:

1. Use array-based representation (much simpler!)
2. If using links, implement a "complete binary tree" maintenance strategy
3. Consider using a pointer to the last node for O(log n) removal

## Alternative Approach (Simpler but Less Efficient)

```cpp
void removeMin(Node* root) {
    // Find the minimum (it's at the root for a min-heap)
    // Replace root with right child, then reinsert left subtree
    
    if (root == nullptr) return;
    
    // This is tricky with void return type
    // Best approach: swap with a child and recursively remove
    
    if (root->left == nullptr && root->right == nullptr) {
        // Leaf node - can't actually remove without returning new root
        return;
    }
    
    // Replace root with the smaller child
    if (root->left == nullptr) {
        // Copy right child to root
        *root = *(root->right);
    } else if (root->right == nullptr) {
        // Copy left child to root
        *root = *(root->left);
    } else {
        // Both children exist - choose smaller one
        if (root->left->priority < root->right->priority) {
            *root = *(root->left);
        } else {
            *root = *(root->right);
        }
    }
}
```

This is simpler but may not maintain heap property as well.
