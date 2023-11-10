---
layout: asides
toc: true
tasks: true
title: Homework 6 Programming
---

# HW6: Programming Assignment

+ Due: Friday, December 1st, 11:59pm PST
+ Due to the Thanksgiving holiday, there is no written assignment.  However, the programming portion is **substantial** so start early!
+ Directory name in your github repository for this homework (case sensitive): `hw6`

  - In this project we have provided a **substantial** code base.  Do a `git pull` in your `resources` repo.
  - Then copy the `resources/hw6` folder into your `hw-username` repo and use the skeletons provided to start work in that `hw6` folder.
  - You **MUST** provide a `Makefile` so that we can compile your code (not run it) by simply typing `make` which should, among other compilation commands, produce an executable `scheduling`
  - Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
  - Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.
  - **We will NOT provide a test suite before the due date for this homework**.  You will need to test the coding questions yourself with your own test programs.
    - Why?  Same as for homework 1.  Unlike homework 4 and 5, you should be able to figure out when an answer is right or wrong for this homework.  Being able to effectively test your own code is an important skill you'll need to learn.

### Problem 1 (Binary Search Tree Iterators, 25%)

We are providing you with interface specifications for binary search trees.

We are providing for you a half-finished file `bst.h` (in the resources repository) which implements a simple binary search tree.    We are also providing a complete `print_bst.h` file that allows you to visually see your tree, for help in debugging.  You will need to complete the implementation for all seven functions that have `TODO` next to their declaration in `bst.h`. We provide additional clarifications for the following functions, where `n` is the number of nodes in the tree, and `h` is the height of the tree:

1. `void insert(const std::pair<const Key, Value>& keyValuePair)` : This function will insert a new node into the tree with the specified key and value.  There is no guarantee the tree is balanced before or after the insertion.  If key is already in the tree, you should overwrite the current value with the updated value. Runtime is `O(h)`.  We recommend writing a protected helper function that inserts the key/value pair and returns a pointer to the created node (this will be handy in problem 2).
2. `void remove(const Key& key)` : This function will remove the node with the specified key from the tree.  There is no guarantee the tree is balanced before or after the removal. If the key is not already in the tree, this function will do nothing. If the node to be removed has two children, swap with its **successor** (not its _predecessor_) in the BST removal algorithm. If the node to be removed has exactly one child, you can promote the child.  You may **NOT** just swap key,value pairs. You must swap the actual nodes by changing pointers, but we have given you a helper function to do this in the BST class:  `nodeSwap()`. Runtime of removal should be `O(h)`.   We recommend writing a protected helper function that deletes the key/value pair and returns a pointer to the parent of the deleted node (this will be handy in problem 2).
3. `void clear()` : Deletes all nodes inside the tree, resetting it to the empty tree.   Runtime is `O(n)`.
4. `Node* internalFind(const Key& key)` : Returns a pointer to the node with the specified key.  Runtime is `O(h)`.
5. `Node* getSmallestNode()` : Returns a pointer to the node with the smallest key.  This function is used by the iterator.  Runtime is `O(h)`.
6. `bool isBalanced() const` : Returns true if the BST is an AVL Tree (that is, for every node, the height of its left subtree is within 1 of the height of its right subtree).  It is okay if your algorithm is not particularly efficient, as long as it is `O(n^2)`.  This function may help you debug your AVL Tree is problem 4.
7. Constructor and destructor : Your destructor will probably just call the clear function.  The constructor should take constant time.
8. You will need to implement the unfinished functions of the iterator class.

Note that a BST (as well as *any* map implementation) should always be organized via the **key** of the key/value pair.

_**Very Important Warning:** Please do not add, remove, modify, or rename any of the public or protected data or functions that we provide in bst.h. Please do not rename any function in bst.h. If you do not heed this warning, our tests won't work, and you'll lose points._

### Problem 2 (AVL Trees, 40%)

We are providing you a half-finished file `avlbst.h` (in the resources repository) for implementing an AVL Tree.  It builds on the file you completed for the previous question.

Complete this file by implementing the `insert()` and `remove()` functions for AVL Trees.  You are strongly encouraged to use private/protected helper functions.

#### Notes and Requirements

1. You know this one already, but you are **NOT** allowed to use online sources to give you the game plan for coding an AVL tree.  Feel free, however, to ask various questions on Piazza, utilize course materials, or ask in office hours.
1. For the `insert()` method, you should handle duplicate entries by overwriting the current value with the updated value. 
1. There is a data member variable `height_` for the `AVLNode` in `avlbst.h` which you should use to store and update the height of a given node.
1. When writing a class (AVLTree) that is derived from a templated class (BinarySearchTree), accessing the inherited members must be done by scoping (i.e. `BinarySearchTree<Key,Value>::` or preceding with the keyword `this->`.
1. This note may not make sense until you have started coding.  Your AVLTree will inherit from your BST.  This means the root member of BST is a `Node` type pointer that points to an `AVLNode` (since you will need to create AVLNodes with `height` values for your AVLTree), which is fine because a base `Node` pointer can point at derived `AVLNode`s.  If you need to access AVLNode-specific members (i.e., members that are part of AVLNode but not Node) then one simple way is to (down)cast your `Node` pointer to an `AVLNode` pointer, as in `static_cast<AVLNode<K,V>*>(root)` to temporarily access the AVLNode-specific behavior/data.
1. When erasing (removing) a key that has 2 children, you should always swap it with its **successor**.  Again, you must swap the nodes positions in the tree and not just the key/value pairs.  Use the provided `nodeSwap` function to help you.
1. You do not need to submit any tests for your AVL tree and iterator but obviously you should test it.
1. Your AVL implementation must maintain the balance of the tree and provide O(log n) runtime for `insert`, `remove`, and `find`.  Failure to do so could lead to *severe* point deductions on this problem.

#### Tips

 - Helper functions like:  `rotateLeft(...)` and `rotateRight(...)` are a great idea.  Even simple ones like `isLeftChild(n, p)` or `isRightChild(n,p`, etc. are fine.  Anything that makes it easier to abstract (and thus ensure correctness) of the algorithm.  Your helper functions should all be protected or private.

### Problem 3 (Backtracking, 35%)

In a file named `scheduling.cpp`, write a program to schedule exam time slots so that no student has two exams at the same time, using recursion and backtracking.  The input file (whose name will be passed in at the command line) will have three parameters on the first line: how many exams there are, how many students there are, and how many timeslots there are, separated by an arbitrary amount of whitespace.  Each successive line will have the name of a student (a string of lowercase letters), followed by the name of the classes that student is in (each one being an integer greater than 0).  There will be an arbitrary amount of whitespace between the student name and each class.  You may assume you always receive a correctly formatted input file.

```
5 4 3
aaron    104 170
leia 104   170 350
jarjar  101
finn  270  350
```

The output should be an assignment of classes to the integers between `1` and the number of timeslots, one class per line:

```
101 1
104 1
170 2
270 1
350 3
```

There are of course other solutions, you only need to find one that works.  If there is no solution for the requested number of timeslots, you should output `No valid solution.`

You must maintain a map of each class to its timeslot, using your AVL implementation.  As there is no method to update a value in a Binary Search Tree, you will need to delete the old value and insert the new value.

Since some of the function calls throw exceptions, make sure to use `try` and `catch` appropriately, even if you do not expect the catch blocks to be used.

Your Makefile should compile your program into an executable called `scheduling`

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw6`
  - This directory should be in your `hw-username` repository
  - `scheduling.cpp`, `bst.h`, `avlbst.h`, `print_bst.h`
  - Your `Makefile`
  - Successful compilation of a problem 3 executable in your `hw6` directory after typing `make` and garbage file cleaning with `make clean`
    - Don't turn in executable/object/garbage files!
+ Please follow the [`submission instructions`](https://bytes.usc.edu/cs104/homework/submission-instructions/). The TLDR is to push to GitHub and submit the SHA of the commit you want graded to Curricula. Failure to follow these instructions without a valid excuse may result in late days being used, a 0 on the PA, or other penalties. The submission link will be posted on [`Curricula`](https://bytes.usc.edu/cs104/submit/course/usc-csci104-fall2023) a few days before the due date.
