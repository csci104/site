---
layout: asides
toc: true
tasks: false
permalink: /:path/:basename/
---

## Binary Tree Traversal

### 1 - Binary Trees

What does it mean for a tree to be binary?

A Binary Search Tree is a specific type of binary tree. In a BST, left children (the left subtree) hold values that are *less than* the parent's value, and right children (the right subtree) hold values *greater than* the parent's value. 

### 2 - Traversals

A traversal is a methodology for stepping through a structure (such as using Breadth-First Traversal as opposed to Depth-First Traversal on a graph). BFS is sometimes called "Level-Order Traversal". In the case of DFS, there are a few different ways we can traverse.

The three main DFS traversals are **Pre-Order Traversal, In-Order Traversal, and Post-Order Traversal**. In each of these traversals, we must eventually operate on every node. The difference between these traversals is lies in the *order* nodes are operated on.

**Pre-Order Traversal**

```
// Operate on current node
// Recurse left
// Recurse right
// return
```

**In-Order Traversal**

```
// Recurse left
// Operate on current node
// Recurse right
// return
```

**Post-Order Traversal**

```
// Recurse left
// Recurse right
// Operate on current node
// return
```

+ If we wanted to delete an entire tree, which traversal would we use?

### Exercise 1

Given this *binary tree*:

<img src="./../assets/bst.png" alt="bst" height="300" /> 

What order will the nodes be printed out with Pre-Order traversal? In-Order? Post-Order?

### Exercise 2

Given a *binary tree*, write a function to return the level order traversal of its nodes' values. (i.e. from left to right, level by level).