---
layout: asides
toc: true
tasks: true
title: Homework 3 Programming
---

# HW3: Programming Assignment

+ Due: Friday, November 1st, 11:59pm PST
+ To access the written portion of this assignment, click [here](..)
+ The GitHub Classroom link to access this assignment is: [here](https://classroom.github.com/a/s__fpPn7)

    - There is no skeleton code for PA3 other than the given `Makefile`. There should be no need to modify it since you won't need to provide a compilation command for MinHeap.h
    - Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
<!-- + Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of. -->

### Problem 1 (Build a templated d-ary heap, 20%)

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

In order to build it, you may use internally the `vector<T>` container (you are not required to do so). You should of course not use the STL `priority_queue` class or `make_heap`, `push`, `pop` algorithms. **You also cannot use any STL map**.

In order to guide you to the right solution, think first about the following questions. We strongly recommend that you start your array indexing at 0 (that will make the following calculations easier). In order to figure out the answers, we suggest that you create some examples and find a pattern.

1. If you put a complete d-ary tree in an array, what is the index of the parent of the node at position i?
1. In the same scenario as above, what are the indices of the children of the node at position i?
1. What changes in the heap functions you learned in class when you move to d-ary arrays?

You do not need to submit your answers, these questions are merely to help you formulate your solution.

Lastly, you may break ties however you wish, but you may want to break ties a specific way considering that you will be using your heap in problem 2.  On a related note, we promise to only instantiate your Heap with classes that have operator< defined.

### Test your Program with our Test Suite

We provided a test suite that you can run locally or via GitHub Actions. To set this up locally, run the following on docker:
```
cd pa3-username
tar xvf hw3_tests.tar.gz
cd hw3_tests

# This command won't work until doublet.cpp exists (it can be blank for now)
cmake .
```
Now every time you want to test your program, do the following in `hw3_tests` depending on your preference:
```
make heap_tests

# Option 1 (please use the other two options to use Valgrind)
./heap_tests/heap_tests

# Option 2 (Just outputs pass/fail)
ctest

# Option 3 (Option 2 but with failure info)
ctest --output-on-failure
```
Once everything works, run the following in `hw3_tests` to run the auto-grader, which will auto-deduct for things like Valgrind errors, compiler warnings, and runtime issues (this is what GitHub Actions uses):
```
make grade
```

### Problem 2 (A* Search, 42%)

The word game "Doublet" was invented by Lewis Carroll, and is a word transformation puzzle.  Two words of identical length are given.  The objective is to transform the first word into the second word by forming successive valid words of the same length, changing only one letter at a time.  The list of valid words will be provided to you.  Here is an example from HEAD to TAIL:

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

### Test your Doublet Program

Now every time you want to test your program, do the following in `hw3_tests` depending on your preference:
```
make

# Option 1 (please use the other two options to use Valgrind)
./doublet_tests/doublet_tests

# Option 2 (Just outputs pass/fail)
ctest

# Option 3 (Option 2 but with failure info)
ctest --output-on-failure
```
Once everything works, run the following in `hw3_tests` to run the auto-grader, which will auto-deduct for test cases, Valgrind errors, compiler warnings, and runtime issues (this is what GitHub Actions uses):
```
make grade
```

### Finishing Up

### Completion Checklist

Use `git status` in the `pa3-username` directory to make sure that there are no modified source code files that need to be submitted. If there are, use `git add` and `git commit` to commit those changes. Then use `git push` to push those changes to Github.

Files to push:

- `doublet.cpp`, `MinHeap.h`
- Your `Makefile`, make sure it will create a `doublet` exe file in the hw3 direcotry (same as where Makefile should be). You shouldn't need to worry about this unless you modified your `Makefile`.
- If you have files you don't want to push (like garbage .o files), you can edit the `.gitignore` file and push that instead.

Ensure you add/commit/push all your source code files to your `pa3-username` repository.

WAIT! You aren’t done yet. Complete the sections below to ensure you’ve committed all your code.

### GitHub Actions Summary

+ Make sure to check the Actions summary of your latest commit and that it matches your expectations based on what you saw on your local machine.
+ Make sure there are no compilation errors and warnings, along with no Valgrind errors.
+ By default, we will grade your latest commit (unless it's after the late deadline) so if you are satisfied with your Actions report, you are done! If you want an earlier commit to be graded, you must fill out the `Homework Submit SHA Form` form found on the [home page](https://bytes.usc.edu/cs104/) before the late deadline.
+ **WARNING:** While a green checkmark is better than a red X, it may not mean that your program had no issues. Please check the Actions summary as mentioned earlier!
  - A common issue for failure is that the file name capitalization doesn't match exactly what we said to do. This also includes the capitalization in Makefile and any #includes in your code.

### Commit then Re-clone your Repository (Optional)

If you want extra peace of mind on your submission or GitHub Actions isn't working for some reason, try doing the following:

1. In your terminal, `cd` to the folder that has your `resources` and `pa3-username` (i.e. `csci104`)
2. Create a `verify-hw3` directory: `$ mkdir verify-hw3`
3. Go into that directory: `$ cd verify-hw3`
4. Clone your hw_username repo: `$ git clone git@github.com:usc-csci104-fall2024/pa3-username.git`
5. Go into your hw3 folder `$ cd pa3-username`
6. Switch over to a docker shell, navigate to the same `verify-hw3/pa3-username` folder.
7. Recompile and rerun your programs and tests to ensure that what you submitted works.
