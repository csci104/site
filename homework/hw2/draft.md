---
layout: default
title: Homework 2
nav: assignments
---
## HW2

+ Due: Fri. Sep. 18, 2020, 11:59pm (PST)
+ Directory name in your github repository for this homework (case sensitive): `hw2`
   - Once you have cloned your `hw-usc_username` repo, create this `hw2` folder underneath it (i.e. `hw-usc_username/hw2`).
   - If your `hw-usc_username` repo has not been created yet, please do your work in a separate folder and you can copy over relevant files before submitting.
   
### Problem 0: Experimental Runtime Analysis 
This problem will be discussed during our class meetings. You do not need to submit this as part of your programming assignment. We want to give you extra time as this exercise involves
coding and running experiments. It is helpful if you think about this problem before we meet or even try coding this before meeting and start collecting data to discuss.

For this exercise you will implement your own queue using STL vector and STL list. As we discussed the STL queue class is an adaptive container. It is essentially a list, but with the first in first out 
protocol (FIFO), so we can only add the the back of the list and remove from the front of the list. We want to complete the implementation of queue classes that use composition
and have either an STL vector or STL list as the private data and then we want to measure the differences in the operations given each implementation and why this may be occurring.
We will step you through this here. 
   
### Problem 6: Circular Linked List (25%)

For this problem, you will be using your skills with linked lists to create a class that stores a doubly-linked list of ints.  The list will also be circular, meaning that the head and tail of the list link to each other.  The list supports all operations in the List ADT, including insert, remove, get, and set, as well as a simple iterator interface which is explained below. 

A class skeleton has been provided in `circular_list_int.h`.  Copy this header to your homework folder and, in `circular_list_int.cpp`, implement the functions in `CircularListInt` according to their descriptions in the header file.

#### Circular Indicies

Since this class is a circular list, it is meant to store data that will be accessed continuously in a circle, and it would be nice if we could move around the circle just by incrementing the index.  So, indicies past the end of the list should "wrap around" back to the front of the list. For example, if a list has 5 members, index 5 wraps back to element 0, index 6 maps to element 1, and index 10 maps to element 0. This rule applies to `get()`, `set()`, and `remove()`.

The exception to this is when the list has 0 length, and there are no elements at all.  No amount of wrapping would produce a valid index here!  Instead, `get()` should return 0, and `set()` and `remove()` should just return without modifying the list.  

#### What's all this "size_t" business?

You might notice that all functions with parameters for an index accept it as a `size_t`.  You haven't really seen it before, but `size_t` is the the correct type to use for array indicies.  It is defined as a type large enough to hold the size of any object in memory, up to and including the size of your entire PC's memory.  It's also an unsigned type, so it can't hold negative values (there are no negative sizes), and you don't have to worry about handling them.  More then that, it also semantically indicates that a variable is supposed to hold the size of something, not just some random integral quantity.  `size_t`s are used all over the standard library for indices and sizes of collections, so it's best to start getting used to them now.  

You might notice that you get compiler warnings when you try to compare a `size_t` to a regular integer, for example in code like this:

```cpp
std::vector<int> foo;

for(int index = 0; index < foo.size(); ++index)
{
	/* do stuff */
}

```

The issue is that `std::vector::size()` returns an (unsigned) `size_t`, and it's being compared to a (signed) int in the for-loop statement.  Due to how C type conversion rules work, this can lead so strange and unpredictable results like one of the operands being truncated or converted from negative to positive.  The easiest fix is to just delare all variables containing indices and counts as `size_t`s.  Failing that, you can just cast the result of size to an integer to an int, like this: `index < ((int)foo.size())`.  That will work fine as long as your vector doesn't have more than 2<sup>31</sup>-1 items in it, and that won't happen in this class!
