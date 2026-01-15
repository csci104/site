### Unrolled Linked List

An unrolled linked list, is a normal linked list (doubly-linked in this case) but each node/item does not store a single data value but an array of values.  The head and tail nodes of the linked list may have arrays that are not fully occupied so we keep `first` and `last` index to indicate where the first actual data item exists in the array (this index is *inclusive*) and the last data item exists (this index is *exclusive* and points to one **beyond** the last value).  These arrays provide better underlying memory performance in most computers (due to caching effects that you'll learn about in CS 356 or EE 457) and can be more space efficient.

![An unrolled linked list]({{site.baseurl}}/homework/img/unrolled_linked_list.png)

In the image above we see each Item struct has a `next` and `prev` pointer as would be typical in a doubly-linked list.  Then, rather than a single value, it will contain an array of a fixed size where multiple items can be placed.  To track which items are used a pair of indices is used of the form: `[first, last)` where `first` is inclusive and is the index of the first used item and `last` is the index 1 beyond the last used index.  This approach allows more natural iteration and allows computing the number of items in the range through simple subtraction (i.e. `last-first`).  As an example, `first=last=0` indicates no items are used and `first=0 and last=10` indicates the 10 elements are occupied (from indices `0..9`).

To track the head `Item`, tail `Item`, and size of the linked list (i.e. number of strings stored in the entire list), the `head_`, `tail_` and `size_` members of the ULListStr class are used, respectively.

The unrolled list we implement will store `string`s.  For the sake of this homework, we will only ask you to implement the ability to add or remove a value from the front or back of the list (and not in the middle of the list). Each of these operations should run in time O(1).  Pushing to the front or back should **NOT require moving any values**.  When pushing to the front, only allocate a new `Item` if the current head `Item` has no room before the `first` Item.  When removing an item, **only deallocate** an `Item` when the number of used values in its array reaches **0**.  This means there should not be "empty" nodes in the list...when no more array entries of an `Item` are used, deallocate the `Item`.

1. You need to examine the code provided in `ulliststr.h` and `ulliststr.cpp` and add the implementations for `push_back`, `push_front`, `pop_back`, `pop_front`, `back`, `front` and `getValAtLoc` in `ulliststr.cpp`. 
    - Below is an example sequence of options:
      
      ```c++
      ULListStr dat;
      dat.push_back(7);
      dat.push_front(8);
      dat.push_back(9);
      cout << dat.get(0) << " " << dat.get(1) << " " << dat.get(2) << endl;
      // prints: 8 7 9
      cout << dat.size() << end;  // prints 3 since there are 3 strings stored
      ```
    - Here is a [video explanation](http://ee.usc.edu/~redekopp/Streaming/cs104/cs104-unrolled-ll/cs104-unrolled-ll.html) for some of the possible implementation approaches.
    - **Do NOT change** any of the public member function signatures or private data members, though you may add additional member functions or data members if you deem them useful.  
    - `getValAtLoc` is a private helper function which will return a pointer to the `i`-th value in the entire list (not just in a single Item's array) and is used in several other member functions.  If a non-existent location provided to `getValAtLoc` should cause it to return `NULL`. 
    - As you implement these member functions **be sure to meet the RUNTIME requirements**.  
    - To repeat, any comments provided in the skeleton file act as requirements that you should meet.

1. After completing the functions above, you should write a separate program name, `ulliststr_test.cpp`, to test your implementation. You should allocate one of your `ULListStr` items and make calls to `push_back`, `push_front`, `pop_back`, `pop_front`, `back` and `front` that will exercise the various cases you've coded in the functions.  For example, if you have a case in `push_back` for when the list is empty and a separate case for when it has one or more items, then you should make a call to `push_back` when the list is empty and when it has one or more items.  It is important that when you write code, you test it thoroughly, ensuring each line of code in the `ULListStr` class is triggered at some point.  You need to think about how you can test whether it worked or failed as well. In this case, calls to `get`, `size`, and others can help give you visibility as to whether your code worked or failed. 

1. Ensure your solution does not access memory incorrectly or leak memory. **Use `valgrind` to verify correct memory handling and cleanup.**

1. Ensure you do not change the filenames of the skeleton we give you and that your test file is named `ulliststr_test.cpp` and submit it with your other files.  Do **NOT** place a `main` function in the class file: `ulliststr.cpp` (it should be in your test file: `ulliststr_test.cpp`). Obviously, your own `ULListStr` class should pass your own tests.

To compile a program of multiple files you must list **ALL** the `.cpp` files in the `g++` command line AND **NEVER** compile a `.h` file on the `g++` command line.  Thus, your compilation command would look like:

 ```bash
 g++ -g -Wall ulliststr.cpp ullistr_test.cpp -o ullistr_test
```

However, we have provided a `Makefile` which is a script with compilation commands so you don't have to type the above command.  Instead, just type:

```bash
make ulliststr_test
```

**Your MISSION is to try to find and fix all the bugs in your implementation using YOUR own tests, so that when we release the official tests, they pass the first time.***  