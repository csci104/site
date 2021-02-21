---
layout: asides
toc: true
tasks: true
title: Homework 3 Programming
---

# HW3: Programming Assignment

+ Due: Friday, March 12th, 11:59pm PST
+ To access the written portion of this assignment, click [here](..)
+ Directory name in your github repository for this homework (case sensitive): `hw3`
+ Do a `git pull` in your `resources` repo.
+ Then copy the `resources/hw3` folder into your `hw-username` repo and use the skeletons provided to start work in that `hw3` folder.
+ You should provide a `Makefile` to compile your coloring program.  While you should test your heap, you won't submit your testing code, and thus will not need to provide a compilation command for it.
+ Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
+ Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.

### Problem 1 (Recursion and Backtracking - Graph Coloring, 35%)

Create a program in `coloring.cpp` (no skeleton code provided) to 4-color a map using recursion and backtracking.  Typing `make` should create an executable `coloring` which solves the following problem.

The input file (whose name will be passed at the command line) will have three parameters on the first line: how many "countries" there are in the map, the number of rows in the map, and the number of columns in the map. The map will never be bigger than 80 by 80 characters, and will contain at most 15 countries. The countries are denoted by characters 'A', 'B', ... up to the letter for the highest country number. Here is an example of what the input might look like:

```
5 6 13 
AAAAAACCCCCCC
AAAAAACCCCCCD
BBBAAACCCCCDD
BBAAAACCEEDDD
BBBBBACDEEEDD
BBBBBBDDDDDDD
```

Each country will always be contiguous; in other words, you can always walk from any point in a country to any other just going horizontally or vertically. We will say that two countries share a border if at least one square of one country is horizontally or vertically adjacent to at least one square of the other. In the example above, A shares a border with B and C, and D shares a border with B and C and E, and C and E also share a border. A and D do not share a border, and neither do B and C, because they only touch diagonally.

A map is properly colored if each country is assigned a color, and no two countries which share a border have the same color. (Otherwise, you couldn't tell apart where one starts and the other ends.) Of course, one can always color a map by giving each country its own color, but we want to reuse colors as much as possible, in the sense that the total number of distinct colors is minimized. For instance, in the example above, we could make A and D cardinal, B and C gold, and E green, minimizing the total number of colors to 3.

The famous [Four-Color Theorem](http://en.wikipedia.org/wiki/Four_color_theorem) guarantees that there is always a way to color any map with just 4 colors. You are to write a program that actually **finds** such a coloring. Unless you were going to read thousands of pages of math proofs to understand how to do this differently, we strongly recommend using recursion and backtracking to solve this problem. While backtracking is slow, our guarantee that you have at most 15 countries (and only 4 colors) means that you only need to check at most about a billion cases, and backtracking will truncate this significantly. So it should run fast enough if you are careful.

The output should be a valid coloring that outputs the color assigned to each country, one per line. For the example coloring we gave for the input above, you would output (numbering the colors 1, 2, 3, 4):

```
A 1
B 2
C 2
D 1
E 3
```

Of course, there are many other colorings. You are welcome to output any one you like, or multiple solutions if you prefer. 

In case you want more non-trivial test cases, here are a few. (If your solution does not use Backtracking, there is a decent chance it will fail on one or both of these inputs.)

#### Example 1

```
6 4 8 
FFFFFFFF
FEEEDDDF
FAABBCCF
FFFFFFFF
```

Here is a valid output for this input:

```
A 1
B 2
C 3
D 1
E 3
F 4
```

#### Example 2 (Larger)

```
6 10 15 
FFFFFFFFFFFFFFF
FFFFFFFFFFFFFFF
FFEEEDDDDDDDDFF
FFEEEDDDDDDDDFF
FFEEEDDDDDDDDFF
FFAABBBBBBCCCFF
FFAABBBBBBCCCFF
FFAABBBBBBCCCFF
FFFFFFFFFFFFFFF
FFFFFFFFFFFFFFF
```

Valid output:

```
A 1
B 2
C 3
D 1
E 3
F 4
```

Feel free to generate your own map files and post them on Piazza along with the possible valid color assignments.

### Problem 2 (Build a templated d-ary heap, 35%)

Build your own d-ary `MinHeap` class in `MinHeap.h` with the interface given below.  You learned in class how to build a binary `MinHeap`, where each node had 2 children.  For a d-ary `MinHeap`, each node will have d children.

```
  template <class T>
  class MinHeap {
     public:
       MinHeap (int d);
       /* Constructor that builds a d-ary Min Heap
          This should work for any d >= 2,
          but doesn't have to do anything for smaller d.*/

       ~MinHeap ();

       void add (T item, int priority);
         /* adds the item to the heap, with the given priority. */

       const T & peek () const;
         /* returns the element with smallest priority.  
			Break ties however you wish.  
			Throws an exception if the heap is empty. */

       void remove ();
         /* removes the element with smallest priority.
			Break ties however you wish.
            Throws an exception if the heap is empty. */

       bool isEmpty ();
         /* returns true iff there are no elements on the heap. */

   private:
      // whatever you need to naturally store things.
      // You may also add helper functions here.
  };
```

In order to build it, you may use internally the vector<T> container (you are not required to do so).  You should of course not use the STL `priority_queue` class or `make_heap`, `push`, `pop` algorithms.

In order to guide you to the right solution, think first about the following questions. We strongly recommend that you start your array indexing at 0 (that will make the following calculations easier). In order to figure out the answers, we suggest that you create some examples and find a pattern.

1. If you put a complete d-ary tree in an array, what is the index of the parent of the node at position i?
1. In the same scenario as above, what are the indices of the children of the node at position i?
1. What changes in the heap functions you learned in class when you move to d-ary arrays?

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw3`
  - This directory should be in your `hw-username` repository
  - This directory needs its own `README.md` file briefly describing your work
  - `coloring.cpp`, `MinHeap.h`
  - Your `Makefile`
 + You can use the [submission link here](http://bytes.usc.edu/codedrop/?course={{site.data.main.slug}}&assignment=hw3&auth=Google).

You can submit your homework [here](http://bits.usc.edu/codedrop/?course=cs104-sp21&assignment=hw3&auth=Google). Please make sure you have read and understood the [submission instructions]({{ site.url }}/assignments/submission-instructions.html).

#### 
