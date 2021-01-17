---
layout: asides
toc: true
tasks: true
title: Homework 1 Programming
---

## HW1: Programming Assignment

+ Due: Friday, February 5th, 11:59pm PST
+ To access the written portion of this assignment, click [here]({{site.url}}/homework/hw1w/)
+ Directory name in your github repository for this homework (case sensitive): `hw1`
   - Do a `git pull` in your `homework-resources` repo.
   - Then copy the `homework-resources/hw1` folder into your `hw-username` repo and use the skeletons provided to start work in that `hw1` folder.
   - **We will NOT provide a test suite before the due date for this homework**.  You will need to test the coding questions yourself with your own test programs. This should cause you to a.) appreciate the importance of testing, b.) consider the kinds of test cases you should write (i.e. if none of your test cases exercise a particular set of code in your implementation then you probably need to write more tests), c.) What common tasks related to testing would be useful to reuse and why there are testing frameworks like the one we will use in this class, `gtest`. 
   

## General Advice

Going forward, we will refer to your homework repository as `hw-username`. 
Note that you would replace the `username` part with your actual USC username, and you can verify this by finding the repository on Github.

### Repository Reminders

1. Never clone one repository inside another.
   If you have a work folder `cs104` and clone your personal repo `hw-username` under it (i.e., `cs104/hw-username`), whenever you want to clone some other repository (such as `resources`), you'll need to do it back up in the `cs104` folder or another location, **not** in the `hw-username` folder.
2. Your repository may not be ready immediately but be sure to create your GitHub account and fill out the GitHub information form linked to at the end of [lab 1]({{ site.baseurl }}/labs/lab1/).

- [ ] Agree that you'll never clone a repository into another.

### Skeleton Code

On many occasions we will want to distribute skeleton code, tests, and other pertinent files.
To do this, we have made a separate repository, [`resources`]({{ site.data.urls.github }}/resources/), under the CSCI 104 Github organization.
You should clone this repository to your laptop and `git pull` regularly to check for updates;
even we sometimes make mistakes, and when we do, we will fix them as quickly as possible, but you'll only get the fixes when you pull.

```shell
git clone {{ site.data.urls.github_ssh }}/resources.git
```

Again, be sure you don't clone this repo into your `hw-username` repo, but at some higher-up point like in a `cs104` folder on your machine.
One way to copy the `hw1` files from resources could be to navigate to the directory containing both repositories and run:

```shell
cp -r resources/hw1/ hw-username/hw1/
```

- [ ] Clone `resources` into your CSCI 104 work directory.
- [ ] Clone your `hw-username` next to it if you haven't already.
- [ ] Copy `resources/hw1/` to `hw-username/hw1/`.

### Using Valgrind

If you were to compile `program` that takes two arguments:

```
$ ./program input.txt output.txt
```

The corresponding Valgrind command would be:

```
$ valgrind --tool=memcheck --leak-check=yes ./program input.txt output.txt
```

For more information on Valgrind, take a look at the [Valgrind wiki page]({{ site.baseurl }}/wiki/valgrind).

### Command Line Arguments

In order to read parameters as command line arguments in C++, you need to use a slightly different syntax for your `main` function:

```c++
int main (int argc, char* argv[]) {
    // Your code here
}
```

When your program is called at the command line, `argc` will then contain the total number of arguments that the program was given, and `argv` will be an array of the arguments the program was passed.

- The argument at `argv[0]` is always the name of your program.
- Consequently, `argv[1]` is the first argument passed to the program.

The operating system will assign the values of `argc` and `argv`, and you can just access them inside your program.

### Problem 1 (Linked Lists, Recursion, 15%)

Write a **recursive** function to split the elements of a sorted (in increasing order), singly-linked lists of integers into two sorted, singly-linked lists, where the first list contains all items with an odd value, and the second list contains all items with an even value.  The original list should not be preserved (see below).  Your function must be recursive - you will get **NO** credit if you use `for`, `while`,  `do while`, or `goto`. If you use helper functions - which you may - then they all must also be recursive.

You should use the following `Node` type:

```c++
struct Node {
    int value;
    Node *next;
};
```

Here is the function you should implement:

```c++
void split (Node*& in, Node*& odds, Node*& evens);
```

These are prototyped in `split.h` for you which you can `#include` to your `split.cpp` and test file.  **You MAY NOT change the definitions provided in this file.**

Empty lists are represented by `nullptr` . You may assume that `odds` and `evens` are both `nullptr` when `split` is called from the main function.

When your split function terminates, `in` should be set to `nullptr` (the original list is not preserved), `odds` should point to the head of a linked list containing all items where `value` is an odd integer, and `evens` should point to the head of a linked list containing all items where `value` is an even integer. Obviously, your solution must not leak memory. **Use `valgrind` to verify correct memory handling and cleanup.**

Hint: by far the easiest way to make this work is to not `delete` or `new` nodes, but just to change the pointers.

While we will only test your `split` function, you will probably want to write some `main` code to actually test it.  To do this, create a file `split_test.cpp` where you will `#include "split.h"` to bring in the prototype and `Node` definition.  Then you can write a `main` that instantiates and fills some linked list cases (up to you to do) and then calls `split` to test its behavior.

 Your submission should be in a file called `split.cpp`, and it should only contain your implementation of the function and **NO `main()`**. 

### Problem 2 (Unrolled Linked List, 35%)
We have provided you an incomplete implementation of an unrolled doubly-linked list in the `homework-resources/hw1` folder.  You can update/pull the `homework-resources` folder to obtain it and then copy it to your own hw1 directory in your own `hw-username` repo. 

#### Understanding an Unrolled Linked List

An unrolled linked list, is a normal linked list (doubly-linked in this case) but each node/item does not store a single data value but an array of values.  The head and tail nodes of the linked list may have arrays that are not fully occupied so we keep `first` and `last` index to indicate where the first actual data item exists in the array (this index is *inclusive*) and the last data item exists (this index is *exclusive* and points to one **beyond** the last value).  These arrays provide better underlying memory performance in most computers (due to caching effects that you'll learn about in CS 356 or EE 457) and can be more space efficient.

<img src="{{ site.url }}/assignments/img/unrolled_linked_list.png" alt="Unrolled Linked List" width="640"/>

In the image above we see each Item struct has a `next` and `prev` pointer as would be typical in a doubly-linked list.  Then, rather than a single value, it will contain an array of a fixed size where multiple items can be placed.  To track which items are used a pair of indices is used of the form: `[first, last)` where `first` is inclusive and is the index of the first used item and `last` is the index 1 beyond the last used index.  This approach allows more natural iteration and allows computing the number of items in the range through simple subtraction (i.e. `last-first`).  As an example, `first=last=0` indicates no items are used and `first=0 and last=10` indicates the 10 elements are occupied (from indices `0..9`).

To track the head `Item`, tail `Item`, and size of the linked list (i.e. number of strings stored in the entire list), the `head_`, `tail_` and `size_` members of the ULListStr class are used, respectively.

The unrolled list we implement will store `string`s.  For the sake of this homework, we will only ask you to implement the ability to add or remove a value from the front or back of the list (and not in the middle of the list). Each of these operations should run in time O(1).  Pushing to the front or back should **NOT require moving any values**.  When pushing to the front, only allocate a new `Item` if the current head `Item` has no room before the `first` Item.  When removing an item, **only deallocate** an `Item` when the number of used values in its array reaches 0.  This means there should not be "empty" nodes in the list...when no more array entries of an `Item` are used, deallocate the `Item`.

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
    - As you implement these member functions **be sure to meet the RUNTIME requirements**.  Failure to do so may lead to **minimal** (less-than half) credit being awarded.
    - To repeat, any comments provided in the skeleton file act as requirements that you must meet.

2. After completing the functions above, you should write a separate program name, `ulliststr_test.cpp`, to test your implementation.  Please note that these tests **will** be graded (and hence you should not copy or share them with your classmates).  You should allocate one of your `ULListStr` items and make calls to `push_back`, `push_front`, `pop_back`, `pop_front`, `back` and `front` that will exercise the various cases you've coded in the functions.  For example, if you have a case in `push_back` for when the list is empty and a separate case for when it has one or more items, then you should make a call to `push_back` when the list is empty and when it has one or more items.  It is important that when you write code, you test it thoroughly, ensuring each line of code in the `ULListStr` class is triggered at some point.  You need to think about how you can test whether it worked or failed as well. In this case, calls to `get`, `size`, and others can help give you visibility as to whether your code worked or failed. 

3. Ensure your solution does not access memory incorrectly or leak memory. **Use `valgrind` to verify correct memory handling and cleanup.**

4. Ensure you do not change the filenames of the skeleton we give you and that your test file is named `ulliststr_test.cpp` and submit it with your other files.  Do **NOT** place a `main` function in the class file: `ulliststr.cpp` (it should be in your test file: `ulliststr_test.cpp`). Your test code will be graded based on the quality and thoroughness of your tests.  Obviously, your own `ULListStr` class should pass your own tests.

5. To compile a program of multiple files you must list **ALL** the `.cpp` files in the `g++` command line AND **NEVER** compile a `.h` file on the `g++` command line.  Thus, your compilation commmand would look like: 

```bash
g++ -g -Wall ulliststr.cpp ulliststr_test.cpp`
```

### Finishing Up
### Completion Checklist

+ Directory name for this homework (case sensitive): `hw1`
    - This directory should be in your `hw-username` repository
    - This directory needs its own `README.md` file briefly describing your work
 + Your completed `split.cpp`, `split.h` implementation
 + Your completed `ulliststr.cpp`, `ulliststr.h`,  and `ulliststr_test.cpp` implementation
 + You can use the [submission link here](http://bytes.usc.edu/codedrop/?course={{site.data.main.slug}}&assignment=hw1&auth=Google).

You can submit your homework [here](http://bits.usc.edu/codedrop/?course=cs104-sp21&assignment=hw1&auth=Google). Please make sure you have read and understood the [submission instructions]({{ site.url }}/assignments/submission-instructions.html).

{% include commit-reclone.md %}
