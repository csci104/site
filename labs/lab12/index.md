---
layout: asides
toc: true
tasks: true
title: AVL Trees
---

---

**Due Fri, Nov 19 @ 7pm**

This lab would be covered during sections on Nov 9, Nov 10, Nov 18, and Nov 19.

---


## AVL Trees

### 1 - AVL Tree Review

An AVL tree is a type of balanced Binary Search Tree that uses the height of substrees and rotations to maintain balance.

#### 1.1 - Rotations

A rotation changes the local structure of a binary tree without changing its ordering. This means that in between rotations, the BST property is still maintained.

Rotations can be broken up into left an`d` right rotations which are just inversions of eachother.

<div style="text-align:center"><img src="./assets/rotations.gif" alt="rotations" width="500" height="200" /></div>

Rotaions make up the foundation of the AVL tree. In your homework, you will need to implement these rotations in a variety of scenarios. There are 4 combinations of rotations: left-left, left-right, right-left, right-right. Sometimes, these rotations are referred to as "zig zig" or "zig zag", or something similar. The point is, during these sequences of rotations, the tree becomes more balanced than it was before.

__If longer subtrees are left and then left__

```
T1, T2, T3 and T4 are subtrees.
         z                                      y 
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \ 
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
```

__If longer subtrees are left and then right__

```
     z                               z                           x
    / \                            /   \                        /  \ 
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2
```

__If longer subtrees are right and then right__

```
  z                                y
 /  \                            /   \ 
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
```

__If longer subtrees are right and then left__

```
   z                            z                            x
  / \                          / \                          /  \ 
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
```

By using combinations of rotations during insertion and removal, we are able to maintain consistent balance throughout the lifetime of the tree.

#### 1.2 - Inserting

During insertion, we start by inserting the value at its correct location as a normal BST would. Then, we traverse up the tree, evaluating the local height of each node and fixing that portion if the height of the left and right subtrees differ by 2 or more. We only need to traverse up the tree from the inserted node because the subtree containing the new node is the only subtree where height can change and we need to rotate.

We fix the tree beginning with the newly inserted node.

#### 1.3 - Removing

During removal, we remove as normal and then proceed to fix the tree by traversing up, starting with the parent of the deleted node. In the case that we are swapping with the predecessor, you continue to delete the same node until you cannot swap any further, and then begin fixing the tree in the same fashion.

We fix the tree beginning with the parent of the deleted node.

### 2 - Exercise

Take some time to confirm your understanding by showing the tree after each of the following operations in a file named `lab12.txt`. 

__Initial Tree__

```
                13
        +--------+---+
        10          15
    +---+---+        +--+
    5       11          16
+---+---+
4       8
```

+ Insert 14

+ Insert 3 

+ Remove 3

+ Remove 4
- [ ] In `lab12.txt`, show what the tree looks like after each of the above operations. Operations should happen sequentially (ie, Insert 3 happens after Insert 14). 

(If you are checking off via Piazza, please also include your USC email and USC ID)