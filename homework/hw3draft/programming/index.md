---
layout: asides
toc: true
tasks: true
title: Homework 3 Programming
---

# HW3: Programming Assignment

+ Due: Wednesday, October 11th, 11:59pm PST
+ To account for Fall Break, we have shortened the written assignment.  Be warned: the programming assignment is still substantial.  If you would like to work until the normal Friday deadline (ie, through your Fall Break), you will not be penalized, but we also will not be providing many office hours over Fall Break (ie, the real deadline is Friday, October 13th but you'll have trouble getting help during the last two days).
+ To access the written portion of this assignment, click [here](..)
+ Directory name in your github repository for this homework (case sensitive): `hw3`
+ There is no skeleton code for PA3
+ You should provide a `Makefile` to compile your doublet program.  While you should test your heap, you won't submit your testing code, and thus will not need to provide a compilation command for it.
+ Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
+ Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.

### Problem 1 (Build a templated d-ary heap, 35%)

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

In order to build it, you may use internally the `vector<T>` container (you are not required to do so).  You should of course not use the STL `priority_queue` class or `make_heap`, `push`, `pop` algorithms.

In order to guide you to the right solution, think first about the following questions. We strongly recommend that you start your array indexing at 0 (that will make the following calculations easier). In order to figure out the answers, we suggest that you create some examples and find a pattern.

1. If you put a complete d-ary tree in an array, what is the index of the parent of the node at position i?
1. In the same scenario as above, what are the indices of the children of the node at position i?
1. What changes in the heap functions you learned in class when you move to d-ary arrays?

You do not need to submit your answers, these questions are merely to help you formulate your solution.

Lastly, you may break ties however you wish, but you may want to break ties a specific way considering that you will be using your heap in problem 2.  On a related note, we promise to only instantiate your Heap with classes that have operator< defined.

### Problem 2 (A* Search, 40%)

The word game "Doublet" was invented by Lewis Carroll, and is a word transformation puzzle.  Two words of identical length are given.  The objective is to transform the first word into the second word by forming successive words of the same length, changing only one letter at a time.  Here is an example from HEAD to TAIL:

```
HEAD
HEAL
TEAL
TELL
TALL
TAIL
```

The challenge is to do the transformation in the least number of words.

Your source file should be `doublet.cpp`, and the executable should be called `doublet`. It takes three command line parameters.  The first indicates the starting word, the second indicates the ending word, and the third is a file which contains a list of valid words.  So you might run the program as follows:

```
./doublet head tail words.txt
```

Everything should be case-insensitive, so there is no difference if the starting word is `HEad` or `heAD`.

The word file will be formatted as follows:

```
7
head
heAl
hem
Tail
tell
taLL
teal
```

The first row contains a number n, indicating the number of words in the file.  There will be n more rows, each with a single word, each possibly followed by some whitespace.  There may be blank lines at the end of the file.  You may assume the file is formatted properly.  We may give your program very large word files (around 1 million words).

The word file will not contain duplicates, and the start and end word will always be in the word file. But, as mentioned above, there may sometimes be no way to get from the starting word to the ending word.

You will implement the A* search algorithm to quickly find the shortest transformation.  You can think of each word in the word file as a node, and there is an edge between two words of the same length if they differ by exactly one letter.

We encourage that you build the graph explicitly while you read the word list. One hint to keep in mind: if for each word you read, you loop through all words to see if they differ in exactly one letter, your algorithm will be very slow: &Omega;(n<sup>2</sup>). Instead, you are much better off creating all possible words that you can form by replacing one letter at a time, then looking up whether they are actually words (and if so, where they are in your word list). Notice that that may require some more sophisticated data structures. We will definitely give you several test cases with very large word lists, so if you have an &Omega;(n<sup>2</sup>) algorithm for building your graph or for running A* search, you are guaranteed to lose a bunch of points.

When we type `make doublet`, it should produce an executable called `doublet` in your `hw3` folder.

#### Review the A* algorithm

Recall that A* makes the move with smallest f-value. f = g + h where g = distance (number of moves made) from the start state while h is a score produced by a heuristic evaluation of the move.  We will use the following heuristic:

Incorrect Letters: counts the number of letters in the current word which do not match the letter in the same position in the ending word.  So if you are currently at `DATA` and your final word is `SALT`, then your heuristic will evaluate to `3`.

#### Implementation Details

You will need to use your heap from the previous problem to attain the desired runtime.  You may not use the STL priority_queue on this problem.

It is possible to find a node via two different paths, and you'll need to update that node's priority in the heap.  You can do this the fast and clever way described in class, but it is not necessary: instead, you can re-add the node to the Heap with the new priority.  As a consequence, you'll be removing the same node multiple times: make sure you have a way to recognize when you've already removed a certain node before.

To add consistency to your solution, you should break ties in the following manner:

1. Always make the move with smallest f-value.
2. If multiple words have the smallest f-value, choose the one with the smallest h-value (or, equivalently, the largest g-value).
3. If multiple words have the smallest f and h-value, choose the smaller string according to operator<(str1, str2), where str1 and str2 are fully-capitalized versions of the original strings.

To accomplish item 2, you will want to calculate the priority as `f*(n+1)+h`, where n is the length of the word you are transforming.  Since h can never be larger than n, this properly chooses the smallest f-value while breaking ties according to h-value.

To accomplish item 3, you may need to go back to your Heap implementation and alter how you handle ties.

To track how well your algorithm is performing, you should keep track of the number of **expansions**, that is, the number of words your algorithm considers.  Every time you remove the min-value word from your MinHeap, you are considering that word, and you should increment the number of expansions (and don't increment this when you see the same word a second time).  The starting word should increment the number of expansions (from 0 to 1), but the ending word should not.

#### Output

You should output the following two lines **exactly** to cout:

```
<steps>
<expansions>
```

Where `<steps>` is the fewest number of transformations to get from the start word to the end word, and `<expansions>` is the number of expansions your algorithm required to find the solution.

A small `steps` value means you found a good solution.  A small `expansions` value means you found the answer quickly.  While small `expansions` values are good, we asked you to implement your algorithm a *specific* way, so you should get the same value as our tests.

If there is no way to get from the starting word to the ending word, you should instead just print

```
No transformation
<expansions>
```

#### An Example

Starting from `AAAAA`, ending at `BBBBB`, with the following dictionary:

```
AAAAA
AAAAB
AAABB
AABAA
AABBA
AABBB
ABBBA
BAAAA
BBBBA
BBBBB
```

1. Expanding `AAAAA`, we would add `AAAAB`, `AABAA`, and `BAAAA` to the heap.
2. Expanding `AAAAB` (because it comes first according to operator<), we would add `AAABB`.
3. Expanding `AAABB`, we would add `AABBB`.
4. Expanding `AABBB` (because it has the smaller h-value), we would add `AABBA`.
5. Expanding `AABAA` (because it has the smaller f-value), we would re-add (or update) `AABBA`.
6. Expanding `AABBA`, we would add `ABBBA`.
7. Expanding `ABBBA`, we would add `BBBBA`.
8. Expanding `BBBBA`, we would add `BBBBB`.
9. `BBBBB` would be the next expansion, so we're done with a total of 8 expansions (we never searched `BAAAA`).

It would output:

```
5
8
```

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw3`
  - This directory should be in your `hw-username` repository
  - This directory needs its own `README.md` file briefly describing your work
  - `doublet.cpp`, `MinHeap.h`
  - Your `Makefile`

### Commit then Re-clone your Repository

Be sure to add, commit, and push your code in your hw3 directory to your `hw-username` repository. Now double-check what you’ve committed.
