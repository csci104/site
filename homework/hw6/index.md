---
layout: default
title: Homework 6
nav: assignments
---

## Homework 6

  + Due: Friday, November 13, 11:59pm (PST)  
  + Directory name for this homework (case sensitive): `hw6`
    - This directory should be in your `hw-username` repository

### Objective

In this homework you will implement a templated binary search trees and then extend it to build an AVL tree.

### Design and Code Base

We are providing you with interface specifications for binary search trees.

### Problem 1 (Binary Search Trees, 50%)

We are providing for you a half-finished file `bst.h` in the resources repository which implements a simple binary search tree. Note that the bst we are building will be templated, so the entire implementation will go in this header file. We are also providing a complete `print_bst.h` file that allows you to visually see your tree, for help debugging.  You will need to complete the implementation for all seven public functions that have `TODO` next to their declaration in `bst.h`, as well as a number of mandatory helper functions. We provide additional clarifications/requirements for the following functions, where `n` is the number of nodes in the tree, and `h` is the height of the tree:

1. `void insert(const std::pair<const Key, Value>& keyValuePair)` : This function will insert a new node into the tree with the specified key and value.  There is no guarantee the tree is balanced before or after the insertion.  If key is already in the tree, you should overwrite the current value with the new value. Required runtime is `O(h)`.
2. `void remove(const Key& key)` : This function will remove the node with the specified key from the tree.  There is no guarantee the tree is balanced before or after the removal. If the key is not already in the tree, this function will do nothing. If the node to be removed has two children, promote its _predecessor_ (not its _successor_) in the BST removal algorithm. If the node to be removed has exactly one child, you can promote the child. You may **NOT** just swap key,value pairs. You must swap the actual nodes by changing pointers, but we have given you a helper function to do this in the BST class:  `nodeSwap(...)`. Required runtime is `O(h)`. 
3. `void clear()` : Deletes all nodes inside the tree, resetting it to the empty tree.   Required runtime is `O(n)`.
4. `Node* internalFind(const Key& key)` : Returns a pointer to the node with the specified key.  Required runtime is `O(h)`.
5. `Node* getSmallestNode()` : Returns a pointer to the node with the smallest key.  This function is used by the iterator.  Required runtime is `O(h)`.
6. `bool isBalanced() const` : Returns true if the BST is an AVL Tree (that is, for every node, the height of its left subtree is within 1 of the height of its right subtree).  It is okay if your algorithm is not particularly efficient, as long as it is `O(n^2)`.  This function may help you debug your AVL Tree in the next part.
7. Constructor and destructor : Your destructor will probably just call the clear function.  The constructor should take constant time.
8. You will have to implement the unfinished functions of the iterator class and any other TODOs in the file.

### Notes:

  - Remember a BST (as well as *any* map implementation) should always be organized via the **key** of the key/value pair.

  - The `iterator` class you write is for clients to use to access the key,value pairs and traverse the tree.  You should **not** use it as a helper to traverse the tree inernally. Instead use `std::shared_pt<Node<K,V>>` (or `std::shared_ptr<AVLNode<K,V>>` in the next problem) pointers directly along with `internalFind`, `successor`, `predecessor` etc.  

  - In this class we make use of `static` member functions. You can search online for what this means but here is a brief summary. A `static` member function **cannot** be called upon an object ( `bst.static_member_func()` ) and **DOES NOT** have a `this` pointer.  Thus in that function you cannot try to access `this->root_`. Essentially, it is like a global level function shared by all instances of BSTs.  It is a member of the class so if someone passes in an actual BST it **CAN** access private data (i.e. BST's `root_` member).  We have made `predecessor()` and `successor()` `static` member functions.  That will be useful so that the `iterator` class can just call `successor()` when we want to increment the iterator.  We use `static` for `successor` because the iterator class doesn't have a BST pointer/reference so it couldn't call `successor` if it was a normal member function. 

_**Very Important Warning:** Please do not add, remove, modify, or rename any of the public or protected data or functions in bst.h. Please do not rename any function in bst.h. If you do not heed this warning, our tests won't work, and you'll lose points._

### Problem 2 (AVL Trees, 50%)

We are providing you a half-finished file `avlbst.h` in the resources repository for implementing an AVL Tree. It builds on the BST from the previous question via public inheritance. 

You will need to implement the following funtions for this problem:

1. `void leftRotate(std::shared_ptr<AVLNode<Key, Value>> p, std::shared_ptr<AVLNode<Key, Value>>)` : 

   Perform a left rotation at the node p; n is the right child of the node p. This should run in constant time.

2. `void rightRotate(std::shared_ptr<AVLNode<Key, Value>> p, std::shared_ptr<AVLNode<Key, Value>>)` : perform a right rotation at the node p.; n is the left child of the node p. This should run in constant time.

3. `void insert(const std::pair<const Key, Value> &new_item)`: insert a new node in the AVL tree. Handle duplicate keys by overwriting the current value with the new value passed in.

4. `void remove(const Key &key)`: remove the node with the key equal to the passed in key.


### Notes: 

1. Remember, an AVL tree is a self-balancing BST, as such the resulting tree after inserting or removing a node should also be height balanced and you will need to make the necessary `leftRotate(...)` and `rightRotate(...)` calls on the correct nodes of the tree. 
2. A new AVLNODE class is provided. This class inherits from the BST Node class and includes a data member `balance_`, which you should use to store the balance of a given node.
3. When writing a class (AVLTree) that is derived from a templated class (BinarySearchTree), accessing the inherited members must be done by scoping(i.e `BinarySearchTree<Key, Value>::`) or preceding with the keyword `this->`.
4. This may not make sense until you have started coding.  Your AVLTree will inherit from your BST.  This means the root member of BST is a `Node` type pointer that points to an `AVLNode` (since you will need to create AVLNodes with `balance` values for your AVLBST), which is fine because a base `Node` pointer can point at derived `AVLNode`s.  If you need to call AVLNode-specific functions (i.e., members that are part of `AVLNode` but not `Node`) then one simple way is to cast your `Node` pointer to an `AVLNode` pointer, as in `std::static_pointer_cast<AVLNode<K,V>>(node_ptr)` to temporarily access the AVLNode-specific behavior/data.
5. When erasing (removing) a key that has 2 children, you should always swap it with its **predecessor**.  Again, you must swap the nodes positions in the tree and not just the key/value pairs. Again, use the provided `swapNode` function to help you.
6. A new `nodeSwap(...)` function is that works with our new `AVLNode` types. Make sure you use this instead of the BST version!
7. Your AVL implementation must maintain the balance of the tree and provide O(log n) runtime for `insert`, `remove`.  Failure to do so could lead to *severe* point deductions on this problem.

### Testing:

We have provided a simple `bst-test.cpp` program for you, plus a `Makefile` to compile it. This file can be used to test **both** your BST and AVL classes. The contents of this file will not be graded and you may use it to test and debug your code. We suggest getting your BST into a workable state before moving on to the AVL tree. 

We have also provided the test cases that will be used for grading. These test use a slightly different system that previous homeworks. To run the tests:

1. VM users can skip this step. If you are on docker, you have to start a shell in a special "test" mode. Close any current docker terminals and navigate to your `manage.sh` script. run `./manage.sh stop` to shut down docker (run this command a couple times if the next command gives you any errors. Run `./manage.sh test` to start docket in test mode. Run `./manage.sh shell` to open up a new shell. 
2. `cd hw-username/hw6/hw6_tests`
3. Install the Python dependencies: `sudo apt-get install python3-xmltodict`. If this gives you an error, try dropping the "sudo" part. 
4. Initialize the test suite by running `cmake .` - dont forget the dot!
5. Compile and run the tests by typing `make grade` -  To compile/run the tests again, you only need to execute this command, not any others. If some errors are produced that's fine, just make sure all the tests pass.

Hints:

- You should make sure your code compiles with the makefile in `hw-username/hw6` before trying to run these tests. If all the test fail there was probably a compiler problem. You can check the output from the compiler in `hw6/hw6_tests/compile-logs`
- To debug a single bst test, `cd hw6_tests/bst_tests`. If everything compiled you should find the test executable, `bst_tests`, which can be run with gdb. To figure out where to break, open up one of the `test_X.cpp` files and look for the line number of the failing test. The AVL test executable works the same way, and can be found in the `hw6_tests/avl_tests` directory. 
- Note if you have a slower computer, some test (specifically runtime tests) might fail due to a timeout. This will not happen on the machine you are graded on, provided your program meets AVL/bst runtime requirements. 

### Tips:

- Before you start writing, read through the functions provided!
- If the output of printBST is off it is likely that your tree's pointers have been mangled somehow by your code OR that your iterator doesn't work correctly. Start there to ensure things work.

### Submission Link
Once you've finished, check that all of the code you're submitting is consistently formatted.
The `README.md` in your homework repository provides instructions for using `clang-format` to do so automatically.
You can then submit your code on the [Curricula submission page]({{ site.baseurl }}/submit/course/usc-csci104-fall2020/hw6).
Be sure to carefully read and follow the instructions there.

- [ ] Format your code using `clang-format`.
- [ ] Submit your code.
