
In this problem you will practice implementing recursive functions that process linked lists. Skeleton code is provided in `resources/{{page.hwpath}}`. Copy those files to your `hw-username/{{page.hwpath}}` folder, if you have not already. There are **two separate functions** recursive functions that we will ask you to write. They are unrelated to each other (just part a, and part b of this problem), but each of the two problems below will use the following `Node` definition.  

```c++
struct Node {
    int val;
    Node *next;
};
```

You may declare and use helper functions as you deem necessary.  Remember to handle the cases when an input linked list is empty.  Also, most recursive solutions are *elegant*. If you find yourself writing a lot of code, you likely aren't on the right track.  If you had a recursive linked list **tracing** problem in a prior homework, that might give you an idea of the *elegance* we are referring too.

#### Part 1 - Linked List Split/Pivot
Write a **recursive** function to split the elements of a singly-linked list into two output lists, one containing the elements less than or equal to a given number, the other containing the elements larger than the number.  You must **MAINTAIN the relative ordering** of items from the original list when you split them into the two output lists. The original list should **not** be preserved. Your function must be **recursive** - you will get **NO** credit for an iterative solution.  It must also run in **O(n)**, where n is the length of the input list (and can be done with only one pass/traversal through the list).

Here is the function you should implement:

```c++
void llpivot (Node*& head, Node*& smaller, Node*& larger, int pivot);
```

When this function terminates, the following holds:
  - `smaller` is the pointer to the head of a new singly linked list containing
    all elements of `head` that were less than or equal to the pivot.
  - `larger` is the pointer to the head of a new singly linked list containing
    all elements of `head` that were (strictly) larger than the pivot.
  - the linked list `head` no longer exists (`head` should be set to NULL).

Note: `smaller` and `larger` may be garbage when called (i.e. you canNOT assume they are NULL upon entry). Also you should not `delete` or `new` nodes, but just change the pointers to form the two other lists.

As an example, suppose the list pointed to by `head` contained `2 4 8 3`.  If we used `5` as the pivot and called:

```c++
llpivot(head, smaller, larger, 5);
```

Then:
 - `head` should be an empty list
 - `smaller` should contain `2 4 3`
 - `larger` should contain `8`

See `llrec.h` for more details and description and then place your implementation in `llrec.cpp`.

#### Part 2 - Linked List Filter

Write a **recursive** function to filter/remove elements of a singly-linked list that meet a specific criteria. The criteria for removal is provided by a comparison (`Comp`) functor/function object that provides an `operator()` that takes in an `int` and returns a `bool` if the node should be removed/filtered.  Filtered nodes should be deallocated. Your function must be recursive - you will get **NO** credit for an iterative solution.   It must also run in **O(n)**, where n is the length of the input list  (and can be done with only one pass/traversal through the list).

```c++
template <typename Comp>
Node* llfilter(Node* head, Comp pred);
```
As an example, if the list pointed to by `head` contained: `3 6 4 9` and the `Comp` object's `operator()` returns true for an *ODD* integer input, then the function should return a pointer to the list containing `6 4` (since all the odd integers would have been filtered out).

Since this is a templated function (to allow for different function object types), you should put your implementation in `llrec.h`.  See `llrec.h` for more details and description.

#### Testing

We will not provide any **formal** tests for this problem. Instead, you will be required to think through the various input cases that should be tested to ensure your code works in all cases.  We have provided a skeleton file `llrec-test.cpp` in `resources/{{page.hwpath}}` with a `main()` and some helper functions that read in values from a file to create a linked list, print a linked list, and deallocate a linked list. Complete `llrec-test.cpp` to exercise your functions and verify behavior **as you see fit**.  Currently, it only reads in the contents of a file and creates the corresponding linked list. You can then call your functions on that list, print results, etc. to verify the correctness of your implementation. 

**You must update your `Makefile` with a target `llrec-test`** that will compile the necessary code in the various source files including `llrec-test.cpp` into an executable named `llrec-test`.  Once you have compiled your test program, you can run it and provide an input file.  See an example below:

```bash
./llrec-test llrec-test1.in
```

We have provided one input test file, `llrec-test1.in` that you can use. Feel free to create other input files and use that as input. (It would be appropriate to add/commit/push those files if you create them).

Note: We will not grade your `llrec-test.cpp` or any input files you create. They are **SOLELY** for your own benefit to test your code. **After submission,** we will test your code with our own full test suite and assign points based on those tests.  But you will not have access to these tests, so you need to test your own code thoroughly.  We ask that you **NOT SHARE** your test program or input files with other students.  We want everyone to go through the exercise of considering what cases to test and then implementing those tests.
