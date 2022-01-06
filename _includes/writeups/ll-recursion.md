Write a program that reads two lists of integers specified in a text file with integers separated by spaces on two lines (and only two lines) of the file into two singly linked lists.  Then use recursion to:

1. Recursively remove consecutive integers that are equal from the first list (only keeping one)
1. Makes a new list (i.e. copying the items in the list) such that the new list contains the concatenation of the first and second list **using recursion**

Thus if the input file was:

```
1 3 3 3 5 9 7 7
2 4 4 4
```

you would output:

``` 
1 3 5 9 7 2 4 4 4
```

Each of the two operations above should be implemented as separate recursive functions (you can feel free to define helper function if you want a different signature) that should be called in succession as in:

```c++
removeDuplicates(head1);
head3 = concatenateLists(head1, head2);
```

**These recursive functions should not contain any loops.  If you do use loops in these functions you will receive a 0.**

Using the `Item` definition and prototypes in the provided `rem_dup_lib.h` from the `resources/hw3` folder. 

Write the definitions for the two functions in a file `rem_dup_lib.cpp`.  You are welcome to define recursive helper functions if you like in this file. Again, no loops are allowed in these function nor any helpers you define.

Finally, complete the test program (in `rem_dup.cpp`) that will read in the integers from a file into the two lists, call `removeDuplicates` on the 1st list and the call concatenate on the resulting 1st and original 2nd list.   We have completed the `main()` which will make the appropriate sequence of calls. You only need to complete the function to read in the 2 input lists from a file:  `readLists`.  You may use loops for reading in the numbers.  Do **NOT** define any classes or use STL structures.   Note: `readLists` will need to produce 2 outputs (head1 for the first list and head2 for the second)...and you can't return 2 values from a function in C++.  Thus you'd need to pass in the pointers by reference as either:

```
void readLists(const char* filename, Item*& head1, Item*& head2);
```

or

```
void readLists(const char* filename, Item** head1, Item** head2);
```

**Feel free to add other arguments to these functions if you need; we're just showing how you'd have to pass the head pointer.**

We will test `rem_dup_lib.cpp/.h` separately but please use the `rem_dup.cpp` program to test your code. The usage for `rem_dup.cpp` (after you compile to a `rem_dup` executable) is:

`$ ./rem_dup input.txt output.txt`

Your input should be read from the filename given as the 1st command line argument.  Your output show be stored in the filename given as the 2nd command line argument.

There will be no formatting errors in the input file, though each of the two lines may be blank (have no numbers) which indicates an empty list.

Memory should not be leaked when you remove consecutive equal items and all items should be deleted at the end of the program.

Ensure your `Makefile` must have a rule `rem_dup` to compile this program and that rule should also be listed under your `all` rule.