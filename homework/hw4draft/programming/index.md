---
layout: asides
toc: true
tasks: true
title: Homework 4 Programming
---

# HW4: Programming Assignment

+ Due: Friday, December 6th, 11:59pm PST

+ To access the written portion of this assignment, click [here](..)

+ Directory name in your github repository for this homework (case sensitive): `hw4`

  - In this project we have provided a **substantial** code base.  Do a `git pull` in your `resources` repo.
  - Then copy the `resources/hw4` folder into your `hw-username` repo and use the skeletons provided to start work in that `hw4` folder.
  
  - You **MUST** provide a `Makefile` so that we can compile your code (not run it) by simply typing `make` which should, among other compilation commands, produce an executable `floorplan`
  - Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
  - Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.
  - We will **not** be providing the full testing suite for this assignment.  You are expected to test your own code to figure out if it works.
  
  ### Problem 1 (Binary Search Tree Iterators, 17%)
  
  We are providing you with interface specifications for binary search trees.
  
  We are providing for you a half-finished file `bst.h` (in the homework-resources repository) which implements a simple binary search tree.    We are also providing a complete `print_bst.h` file that allows you to visually see your tree, for help in debugging.  You will need to complete the implementation for all seven functions that have `TODO` next to their declaration in `bst.h`. We provide additional clarifications for the following functions, where `n` is the number of nodes in the tree, and `h` is the height of the tree:
  
  1. `void insert(const std::pair<const Key, Value>& keyValuePair)` : This function will insert a new node into the tree with the specified key and value.  There is no guarantee the tree is balanced before or after the insertion.  If key is already in the tree, you should overwrite the current value with the updated value. Runtime is `O(h)`.
  2. `void remove(const Key& key)` : This function will remove the node with the specified key from the tree.  There is no guarantee the tree is balanced before or after the removal. If the key is not already in the tree, this function will do nothing. If the node to be removed has two children, swap with its **predecessor** (not its _successor_) in the BST removal algorithm. If the node to be removed has exactly one child, you can promote the child.  You may **NOT** just swap key,value pairs. You must swap the actual nodes by changing pointers, but we have given you a helper function to do this in the BST class:  `nodeSwap()`. Runtime of removal should be `O(h)`. 
  3. `void clear()` : Deletes all nodes inside the tree, resetting it to the empty tree.   Runtime is `O(n)`.
  4. `Node* internalFind(const Key& key)` : Returns a pointer to the node with the specified key.  Runtime is `O(h)`.
  5. `Node* getSmallestNode()` : Returns a pointer to the node with the smallest key.  This function is used by the iterator.  Runtime is `O(h)`.
  6. `bool isBalanced() const` : Returns true if the BST is an AVL Tree (that is, for every node, the height of its left subtree is within 1 of the height of its right subtree).  It is okay if your algorithm is not particularly efficient, as long as it is `O(n^2)`.  This function may help you debug your AVL Tree in problem 2.
  7. Constructor and destructor : Your destructor will probably just call the clear function.  The constructor should take constant time.
  8. You will need to implement the unfinished functions of the iterator class.
  
  Note that a BST (as well as *any* map implementation) should always be organized via the **key** of the key/value pair.
  
  ### Problem 2 (AVL Trees, 30%)
  
  We are providing you a half-finished file `avlbst.h` for implementing an AVL Tree.  It builds on the file you completed for the previous question.
  
  Complete this file by implementing the `insert()` and `remove()` functions for AVL Trees.  You are strongly encouraged to use private/protected helper functions.
  
  #### Notes and Requirements
  
  1. For the `insert()` method, you should handle duplicate entries by overwriting the current value with the updated value. 
  1. There is a data member variable `height_` for the `AVLNode` in `avlbst.h` which you should use to store and update the height of a given node.
  1. When writing a class (AVLTree) that is derived from a templated class (BinarySearchTree), accessing the inherited members must be done by scoping (i.e. `BinarySearchTree<Key,Value>::` or preceding with the keyword `this->`.
  1. This note may not make sense until you have started coding.  Your AVLTree will inherit from your BST.  This means the root member of BST is a `Node` type pointer that points to an `AVLNode` (since you will need to create AVLNodes with `height` values for your AVLTree), which is fine because a base `Node` pointer can point at derived `AVLNode`s.  If you need to access AVLNode-specific members (i.e., members that are part of AVLNode but not Node) then one simple way is to (down)cast your `Node` pointer to an `AVLNode` pointer, as in `static_cast<AVLNode<K,V>*>(root)` to temporarily access the AVLNode-specific behavior/data.
  1. When erasing (removing) a key that has 2 children, you should always swap it with its **predecessor**.  Again, you must swap the nodes positions in the tree and not just the key/value pairs.  Again, use the provided `nodeSwap` function to help you.
  1. You do not need to submit any tests for your AVL tree and iterator but obviously you should test it. You are welcome to commit/push those tests but they will not be graded.
  1. Your AVL implementation must maintain the balance of the tree and provide O(log n) runtime for `insert`, `remove`, and `find`.  Failure to do so could lead to *severe* point deductions on this problem.
  
  #### Tips
  
   - Helper functions like:  `rotateLeft(...)` and `rotateRight(...)` are a great idea.  Even simple ones like `isLeftChild(n, p)` or `isRightChild(n,p`, etc. are fine.  Anything that makes it easier to abstract (and thus ensure correctness) of the algorithm.
  
  ### Problem 3 (Backtracking, 20%)
  
  In this problem you will be given a set of rectangular pieces and an NxM rectangular surface with the goal of finding a layout of all those pieces such that they ALL fit within the surface without overlapping each other (like a puzzle).  Each tile will have a specified length and height.
  
  Your program should take two parameters: the first is the filename input, and the second is the filename output.  You will call your program in the following manner:
  
  ```bash
  	./floorplan input.txt output.txt
  ```
  
  The input file will be in the following format:
  
  ```
  N M X 
  ID1 l1 h1
  ID2 l2 h2
  ...
  IDX lX hX
  ```
  
  `N` is the length of the surface, `M` is the height of the surface, `X` is the number of tiles you have to place, `IDi` is the identifying number of the `i`th tile, `li` is the length of the `i`th tile, and `hi` is the height of the `i`th tile.  (0,0) represents the lower-left corner of the surface and (N-1, 0) represents the lower-right corner.  All values will be integers.  Other than a bad filename (i.e. file doesn't exist) there will be no other format errors you have to check for in this file.
  
  You will store this data in a map (first `std::map` then later your `AVLTree`).  The keyType will be an integer, which will organize rectangles by their integer ID value.  The valueType will be the class of type  `Rectangle`, specified below:
  
  ```
  struct Rectangle {
  	int ID;
  	int length;
  	int height;
  };
  ```
  
  You must place all `X` tiles within the surface in such a way that no tiles overlap.  You can rotate the rectangles (i.e. change their orientation), which will be accomplished by swapping a rectangle's height and length values.  It is perfectly fine to have free space on the surface as long as all the rectangles fit somewhere.
  
  Your solution will be stored in another map (again, first `std::map` then later your `AVLTree`).  The keyValue of the map will be a rectangle's ID, and the valueType will be a pair of integers, indicating the lower-left coordinate of the tile's location.  The orientation of the rectangle does not need to be stored explicitly but will be reflected by the current height and length.
  
  Your program should solve this problem using  backtracking search.  Probably the easiest way to accomplish this (though there are others) is to recurse over all rectangles.  Try to place the tile in any available coordinate.  If no coordinate works, you should backtrack.
  
  Don't forget you can rotate a tile by swapping its height and length values (i.e. when you try to place it you would need to try both orientations before declaring failure).
  
  If all tiles are placed, then you should print the contents of your solution using the following format:
  
  ```
  ID1 x1 y1 l1 h1
  ID2 x2 y2 l2 h2
  ...
  IDX xX yX lX hX
  ```
  
  `(xi, yi)` are the bottom left coordinates of tile `i`, `li` is the length of tile `i`, and `hi` is the height of tile `i`.
  
  If you exhaustively search all possibilities and find no solution, you should output `No solution found.`.
  
  In either case, your program should terminate when it finds a solution or is unable to find a solution.  You do not need to output all possible solutions.
  
  #### Examples:
  
  Input:
  
  ```
  10 10 2
  576 10 5
  297 4 10
  ```
  
  Possible Output:
  
  ```
  297 0 0 4 10
  576 4 0 5 10
  ```
  
  Rectangle `576` is rotated so as to fit in the above example.
  
  Input:
  
  ```
  5 5 2
  17 3 3
  29 3 3
  ```
  
  Necessary Output:
  
  ```
  No solution found.
  ```
  
  Input:
  
  ```
  6 6 4
  42 3 5
  56 6 1
  79 5 1
  89 5 2
  ```
  
  Possible Output:
  
  ```
  42 0 0 3 5
  56 0 5 6 1
  79 3 0 1 5
  89 4 0 2 5
  ```
  
  There may be many possible layouts. You need show only 1 valid layout.  Which one does not matter, just one that works. 
  
  Debug your code until it works.
  
  #### Using your AVL Map Implementation
  
  Because AVL-Trees (and BSTs in general) are just one way of implementing a `map` or `set` let's attempt to replace `std::map` 
  **5 points** of this problem is to go back and change the typedef's of `InputMapType` and `OutputMapType` to use your `AVLTree` implementations.  You will need to update any calls to `std::map::erase` to appropriately pass a key (rather than an iterator) to `AVLTree::remove`.  
  
  Test your code again.  If it does not work now, it is a bug in your AVLTree.  If you can't get your AVL Tree working or can't solve a new bug in your AVL Tree that this application exposes, go back and use `std::map`.  You will not be eligible for those 10 points.
  

### Finishing Up

### Completion Checklist

Use `git status` in the `pa4-username` directory to make sure that there are no modified source code files that need to be submitted. If there are, use `git add` and `git commit` to commit those changes. Then use `git push` to push those changes to Github.

Files to push:

- `floorplan.cpp`, `bst.h`, `avlbst.h`, `print_bst.h`
- Your `Makefile`, make sure it will create a `floorplan` exe file in the hw4 directory (same as where Makefile should be). You shouldn't need to worry about this unless you modified your `Makefile`.
- If you have files you don't want to push (like garbage .o files), you can edit the `.gitignore` file and push that instead.

Ensure you add/commit/push all your source code files to your `pa4-username` repository.

WAIT! You aren’t done yet. Complete the sections below to ensure you’ve committed all your code.

### GitHub Actions Summary

+ Make sure to check the Actions summary of your latest commit and that it matches your expectations based on what you saw on your local machine.
+ Make sure there are no compilation errors and warnings, along with no Valgrind errors.
+ By default, we will grade your latest commit (unless it's after the late deadline) so if you are satisfied with your Actions report, you are done! If you want an earlier commit to be graded, you must fill out the `Homework Submit SHA Form` form found on the [home page](https://bytes.usc.edu/cs104/) before the late deadline.
+ **WARNING:** While a green checkmark is better than a red X, it may not mean that your program had no issues. Please check the Actions summary as mentioned earlier!
  - A common issue for failure is that the file name capitalization doesn't match exactly what we said to do. This also includes the capitalization in Makefile and any #includes in your code.

### Commit then Re-clone your Repository (Optional)

If you want extra peace of mind on your submission or GitHub Actions isn't working for some reason, try doing the following:

1. In your terminal, `cd` to the folder that has your `resources` and `pa4-username` (i.e. `csci104`)
2. Create a `verify-hw3` directory: `$ mkdir verify-hw4`
3. Go into that directory: `$ cd verify-hw4`
4. Clone your hw_username repo: `$ git clone git@github.com:usc-csci104-fall2024/pa4-username.git`
5. Go into your hw3 folder `$ cd pa4-username`
6. Switch over to a docker shell, navigate to the same `verify-hw4/pa4-username` folder.
7. Recompile and rerun your programs and tests to ensure that what you submitted works.
