
In this problem you will practice implementing recursive functions that process linked lists. Skeleton code is provided in `resources/{{page.hwpath}}`. Copy those files to your `hw-username/{{page.hwpath}}` folder.  Each of the two problems below will use the following `Node` definition.  You may declare and use helper functions as you deem necessary.

```c++
struct Node {
    int val;
    Node *next;
};
```

#### Part 1 - Linked List Split/Pivot
Write a **recursive** function to split the elements of a singly-linked list into two output lists, one containing the elements less than or equal to a given number, the other containing the elements larger than the number. At the same time, the original list should **not** be preserved (see below). Your function must be recursive - you will get **NO** credit for an iterative solution.

Here is the function you should implement:

```c++
void llpivot (Node*& in, Node*& smaller, Node*& larger, int pivot);
 /* When this function terminates, the following holds:
    - smaller is the pointer to the head of a new singly linked list containing
      all elements of "in" that were less than or equal to the pivot.
    - larger is the pointer to the head of a new singly linked list containing
      all elements of "in" that were (strictly) larger than the pivot.
    - the linked list "in" no longer exists (should be set to NULL).
    - Note: smaller and larger may be garbage when called (i.e. do NOT need to be NULL)
```

You should not `delete` or `new` nodes, but just change the pointers to form the two other lists.

See `llrec.h` for more details and description and then place your implementation in `llrec.cpp`.

#### Part 2 - Linked List Filter

Write a **recursive** function to filter/remove elements of a singly-linked list that meet a specific criteria. The criteria for removal is provided by a comparison (`Comp`) functor/function object that provides an `operator()` that takes in an `int` and returns a `bool` if the node should be removed/filtered.  Filtered nodes should be deallocated. Your function must be recursive - you will get **NO** credit for an iterative solution.

Since this is a templated function (to allow for different function object types), you should put your implementation in `llrec.h`.  See `llrec.h` for more details and description.

#### Testing

While we will only test your `llpivot` and `llfilter` functions, you will probably want to write some `main` code to actually test it.  We have provided a skeleton file `llrec-test.cpp` in `homework-resources/{{page.hwpath}}/list-recursion` with some helpful function to read integers into a linked list from a file, print out a linked list, and deallocate the nodes in a linked list.  You may use them as you see fit to test your code.

Updated your `Makefile` in your `homework-resources/{{page.hwpath}}` folder to have a target `llrec-test` that will compile the necessary code into an executable named `llrec-test`.  Remember, we never "compile" header files. They get compiled as they get included into actual `.cpp` files.
