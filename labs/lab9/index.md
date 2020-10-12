---
layout: asides
toc: true
tasks: true
title: Tree Traversal
---

## Binary Tree Traversal

### 1 - Binary Trees

What does it mean for a tree to be binary?

<img src="http://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/tree1.bmp" alt="" width="385" height="343" /> 

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
+ What is the third kind of traversal? When would it be useful?

### 3 - Searching

The **Binary Search Tree Property** (BST) states that all nodes in the left subtree must have key values less than or equal to the root and all of the nodes in the right subtree must have key values greater than the root. Usually, if key values are distinct, we do not worry about equality. BSTs exist to enable (potentially) fast searches. 

+ For a BST, what is special about operating on elements using an in-order traversal? If we were printing integers using this traversal, what would the output look like? 

+ Why do we say potentially? Can someone think of an example in which the search is really slow, even if we have a valid BST?

Our search function will simply return true or false depending on whether or not our search parameter exists in the tree. Another reasonable return value of a search function could be an iterator pointing to the found element (see std::map find).

To search for key `X` in a BST, we compare *X* to the current node.

  - If the current node is null, `X` must not reside in the tree.
  - If `X`is equal to the current node, simply return the current node.
  - If it is less than the current node, we check the left subtree.
  - Else, it must be greater than the current node, so we check the right subtree.

#### 3.1 - Example

Take a look at this example:

<img src="http://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg" alt="" width="300" height="250" />

Operation: `find(6)` // We begin at the root 

Let's walk through this.

Now, here's an example where we try to find a node that does not exist in the tree:

Operation: `find(0)` // We begin at the root 

Let's walk through this one too.

The best-case runtime for searching a value `X` in a BST with *N* elements is `O(logN)`. What is the worst-case runtime?

### What's a balanced Binary Tree?

A balanced  binary trees is a tree that ensures that the height of each subtree differs by no more than 1 node. When binary trees maintain balance, the binary tree keeps its height logarithmic in n where n is the total number of nodes in the tree for a sequence of insertions and deletions. This structure provide efficient implementations for abstract data structures.  *Any binary tree can be balanced or not. You can check this property (as demonstrated in this lab's exercises.)*

A tree is considered balanced if it conforms to the **Height-Balancing Property**: A node in a tree is height-balanced if the heights of its subtrees differ by no more than 1. 

As we will see in a few weeks, most operations on a BST take time directly proportional to the height of the tree, so we want to keep the height balanced .

Here is an example of balanced vs. non balanced trees.

<div style="text-align:center"><img src="./assets/examples.gif" alt="bst" width="550" height="250" /> </div>

### How can we maintain these properties at the same time?

We will study these details more carefully in a few weeks. However, this is a good preview to start familiarizing yourself with these ideas. The BST property is maintained by smart insertion and deletion. In an insert, you traverse the tree based on the key to be inserted. Once you encounter a situation where you can't traverse any further, you know that the key can be placed there. Because we are traversing based on the key value, we are inherently upholding the BST property.
 
The same thing can be said about a deletion in a BST. This is done by choosing which node to promote. Either the predecessor, if the node has two children, or the child if the node has 1 child. By doing this, the BST property is being maintained.

A BST that maintains its balance throughout all insertions and deletions is called a  self-balancing BST. These types of trees that auto-balance or self balance inherently with the insertion are called Self-Balancing Binary Search Trees. Examples are:

1. Splay Trees
2. AVL Trees
3. Red Black Trees
4. B-Trees
5. 2-3 Trees

For all of these self-balancing binary search trees, the height-balancing property is upheld by the nature of an insert or remove. The best way to do so is with rotation, or series of rotations. We're not going to go into how these rotations work now, but this is something you'll have to know for your last homework!

### Checkoff

Given this *binary tree*:

<img src="./assets/bst.png" alt="bst" width="300" height="300" /> 

- [ ] What order will the nodes be printed out with Pre-Order traversal? In-Order? Post-Order?
Save your answers in a .txt file for checkoff.

Next, you'll have to complete the following three binary tree traversal problems. A node is defined in `bst.h` as such: 

```
class Node {
    Node *left;
    Node *right;
    int key;
}
```

#### 2. Range Sum

Given the root of a *BST* and two values L and R, return the sum of all the nodes in the tree with values between L and R (inclusive).

For example, if L = 1, R = 3, and your BST has values {1, 2, 3, 4} return 6 (1 + 2 + 3).

- [ ] Implement `rangeSum` in `bst.cpp`

#### 3. Is a Tree Balanced?

Given a *binary tree*, determine if it obeys the height-balancing property.

For this problem, a height-balanced binary tree is defined as:

+ A binary tree in which the depth of the two subtrees of every node never differs by more than 1.

```
bool isBalanced(Node *root)
```

Something to think about: does your solution work even if the tree is not a BST?

- [ ] Implement `isBalanced` in `bst.cpp`

#### 4. Level Order Traversal

Given a *binary tree*, return the level order traversal of its nodes' values. (i.e. from left to right, level by level).

- [ ] Implement `levelOrder` in `bst.cpp`

### Check off

- [ ] Use `make` to run all tests and show a TA/CP to get checked off! 
