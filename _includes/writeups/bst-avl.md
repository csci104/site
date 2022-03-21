We are providing you a half-finished file `avlbst.h` (in the homework-resources repository) for implementing an AVL Tree.  It builds on the file you completed for the previous question.

Complete this file by implementing the `insert()` and `remove()` functions for AVL Trees.  You are strongly encouraged to use private/protected helper functions.

When you compile code that includes `avlbst.` you will need to add the option `--std=c++11` to the `g++` compilation command.  This is because of the usage of the `override` keyword for various virtual functions.  You can read about it online but it mainly provides some additional compiler checks to ensure the signatures of a virtual function in the derived class matches the one you are attempting to "override" in the base class (i.e. if your base virtual function is a `const`-member but you forget to add `const` to the derived and thus are creating a whole new member function, the compiler will catch the error).

#### Related Videos

- A [video walkthrough](https://ee.usc.edu/~redekopp/Streaming/cs104/20221/cs104-sp22-bst-avl-debugging/cs104-sp22-bst-avl-debugging.html) is available and demonstrates techniques that can be used to debug either your BST or AVL tree.

#### Notes and Requirements

1. You know this one already, but you are **NOT** allowed to use online sources to give you the game plan for coding an AVL tree.  Feel free, however, to ask various questions on Piazza, utilize course materials, or ask in office hours.
1. For the `insert()` method, you should handle duplicate entries by overwriting the current value with the updated value.
1. There is a data member variable `balance_` for the `AVLNode` in `avlbst.h` which you should use to store and updated the balance of a given node.  It is a `char` type to save memory because it only needs to represent -2, -1, 0, 1, or 2.  A full 32-bit `int` is unnecessary. Note that you can assign integers to a char (e.g. `char b = -2`) it's just that the char is 8-bits and thus has a range of -128 to +127.  One issue is if you `cout` that char, you need to cast it to an `int`, because `operator<<` will try to interpret a `char` variable as an ASCII char (which would yield garbage) when you want to see the integer value of that char.
1. When writing a class (AVLTree) that is derived from a templated class (BinarySearchTree), accessing the inherited members must be done by scoping (i.e. `BinarySearchTree<Key,Value>::` or preceding with the keyword `this->`.
1. This note may not make sense until you have started coding.  Your AVLTree will inherit from your BST.  This means the root member of BST is a `Node` type pointer that points to an `AVLNode` (since you will need to create AVLNodes with `balance` values for your AVLTree), which is fine because a base `Node` pointer can point at derived `AVLNode`s.  If you need to access AVLNode-specific members (i.e., members that are part of AVLNode but not Node) then one simple way is to (down)cast your `Node` pointer to an `AVLNode` pointer, as in `static_cast<AVLNode<K,V>*>(root)` to temporarily access the AVLNode-specific behavior/data.
1. When erasing (removing) a key that has 2 children, you should always swap it with its **predecessor**.  Again, you must swap the nodes positions in the tree and **CANNOT** just swap the key/value pair data.  Again, use the provided `swapNode` function to help you.
1. Your AVL implementation must maintain the balance of the tree and provide O(log n) runtime for `insert`, `remove`, and `find`.  Failure to do so could lead to *severe* point deductions on this problem.
1. We have started a simple `bst-test.cpp` test program where you can test your `BST` and `AVLTree`. We will **NOT** grade its contents but it should at least create a BST and a separate AVLTree so that we can test your compilation when you submit.  It should at least call insert, remove, and find on each of the two trees.  Also  having this small test that you can use to debug your code will be much easier than trying to debug with the large tests that we provide.  Start by using it to do basic sanity checks on your code and only use our provided tests once you have confidence your code works.


#### Tips

 - Helper functions like:  `rotateLeft(...)` and `rotateRight(...)` are a great idea.  Even simple ones like `isLeftChild(n, p)` or `isRightChild(n,p`, etc. are fine.  Anything that makes it easier to abstract (and thus ensure correctness) the algorithm.

 - Using `gdb` will be of more use on this homework more than any other.  Having a small test program (your own .cpp with a `main()`) that does a sequence of operations that you want to check will be helpful. Then you can set a breakpoint at an operation and then step through it.  Or if you are concerned about a certain operation you can set a breakpoint at the start of a function like `rotateRight()` or `rotateLeft()` and step through it.  It may seem painful but we suggest getting a piece of paper, drawing some node and using gdb to print out the pointers `n`, `n->left`, `n->right`, `n->parent`, and similarly for the parent and potentially grandparent node. Once you know all the addresses, step through your code in gdb and print out the update values of these pointers and make sure it is correct!

 - If the output of printBST is off it is likely that your tree's pointers have been mangled somehow by your code OR that your iterator doesn't work correctly. Start there to ensure things work.

#### Testing

We will post BST and AVL tests in the `resources` repo.  Feel free to use them for more in-depth testing once you have some confidence things seem to be working. **We do NOT recommend starting your testing with these. They may be too much to debug initially.** Write your own test `.cpp` and do some basic operations on samll trees to ensure those work before running the more exhaustive tests that we provide.