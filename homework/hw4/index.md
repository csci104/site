---
layout: asides
toc: true
tasks: true
title: Heaps and Templates
---

# Heaps and Templates


- Assigned: October 04, 2020 PST
- Due: October 23, 2020 at 23:59 PST
- Directory name in your github repository for this homework (case sensitive): `hw4`
   - Skeleton code for this assignment is available in [`resources/hw4/`]({{ site.data.urls.github }}/resources/).
   - Once you have cloned your `hw-username` repo, copy the `hw4/` directory into it from `resources`.




## 1. QuickSort (25%)

In this problem, you will write your own templated implementation of the QuickSort algorithm that works with any class `T`.
This implementation will use the **median of 3** to calculate a pivot.
To use the median of 3 method select the first, the middle, and the last element, calculate the median or middle element between these three elements, and use that as the pivot. 

The implementation of QuickSort will be entirely in the file `quicksort/quicksort.h`.
We have provided skeleton code for the bare minimum that should be implemented in resources.
The function`quicksort()` function should take a `vector<>` as input and a comparator object (i.e., functor) that has an `operator()` defined for it.

```c++
template<class T, class TComparator>
void quicksort(std::vector<T>& vec, TComparator c);
```

Passing the comparator as an arguments allows the function to use different sorting criterion by passing in a different `Comparator` objects.
If the `std::less` comparator is passed to the function, then this should sort integers in non-decreasing order.
We have provided starter testing code in `quicksort_test.cpp` that creates a random vector of integers and sorts them in non-decreasing order.
You should test your code with different data and 2 functors.

To do so as shown in the sample starting code, initialize a vector with data and call the `quicksort()` function with the appropriate comparators to produce different orderings of the data based on the functors.
You may use recursive helper functions as needed. 

- [ ] Complete your implementation in `quicksort.h`
- [ ] Test your code using different data types and comparators in `quicksort_test.cpp`.
      Only `quicksort.h` will be graded.


## 2. D-ary Heap (35%)

In this problem you will develop a d-ary `Heap` class whose definition is provided in `heap/heap.h` in resources and given below.
Recall that in a binary heap each node has at most 2 children whereas in a d-ary heap, each node will have at most `d` children.
Rather than specifying a specific type of heap (min- or max-heap), the heap will accept a priority comparator object, `TComparator`, in its constructor.
If the comparator object functor implements a **less-than**, then the heap will be a min-heap.
If the comparator object functor implements a **greater-than**, then the heap will be a max-heap.

For reference if the type `T` has a `<` operator, then C++ defines a `less` functor which will compare the type `T` items using the `operator<()`.
Similarly there is also a `greater` functor already defined by C++ that will compare using the `operator>()`.
They are defined in the `functional` header, which can be included via `#include <functional>`.
Since this is a templated heap, it is necessary for you to complete your implementation in `heap.h`. 

### Details

- You may use the STL `vector<T>` container if you wish.
  You should **not** use the STL `std::priority_queue` class or `std::make_heap`, `std::push_heap`, etc. algorithms.
  You may add private functions and data members.
- In implementing `heapify()`, recall the child node that would be selected to swap with the parent.
  However, if their is a tie between child nodes, choose the left-most child node.
- Notice that we can provide a default template type for `TComparator` so that the developer doesn't have to specify it if `std::less` is sufficient.
  Using this default will still require that `operator<` is available for type `T`.
- Notice the constructor also provides a **default** value for the comparator, which is a default-constructed `TComparator`.
  Default parameter values will be used if the client does not supply them.
  Also if a default parameter is used then all parameters after it must also have default values (i.e. default parameters must be at the end of the declaration).
  
### Default Arguments

When using default values for signature parameters, you only supply the default value in the declaration of the function.
**When you define the function (i.e. write the implementation below) you would not specify the default value again** but just leave the argument types/names.
For example, when implementing the constructor, you simply omit the default:

```c++
template<class T, class TComparator>
Heap<T, TComparator>::Heap(int m, TComparator comparator) { ... }
```

With these defaults in place, the client that wants a **min-heap** with a type that has a **less-than operator** need only write:

```c++
// std::less<string> is used as the default template type for TComparator and
// std::less<string>() (i.e. the default constructor) will be the comparator
// object comparator object created by the constructor:
Heap<std::string> heap(2);  
```

The client that uses some custom method of comparison so that they can implement a max-heap or some other alternative using a custom comparator can write:

```c++
// Arguments may be passed to the constructor of the comparator here:
CustomObjectComparator c(...);

// The heap is instantiated with the existing comparator:
Heap<CustomObject, CustomObjectComparator> heap(2, c);
```

### D-ary Heaps

It's up to you to implement a representation of your within the member `std::vector`.
We strongly recommend that you start your array indexing at 0 (that will make the following calculations easier).
We suggest that you create some examples and find a pattern.
Please consider the answers to the following questions before beginning your implementation:

1. If a complete d-ary tree in a vector, what is the index of the parent of the node at position `i`?
1. In the same scenario as above, what are the indices of the children of the node at position `i`?

We have provided starter testing code in `heapsort_test.cpp` that creates a random vector of integers and sorts them in non-decreasing order using your heap.
You should test your heap with different data and functors.

- [ ] Complete your implementation in `heap.h`
- [ ] Test your code using different data types and comparators in `heapsort_test.cpp`.
      Only `heap.h` will be graded.


## 3. Restricted Hypercube Exploration (40%)

Suppose you're given a string of `n`-bits (`0` or `1`) with the task of transforming it into a string of all `1`s.
However, each move in your transformation is restricted to flipping exactly one bit, and your secondary goal is to reach all `1`s in the fewest flips possible.

You can envision the network of possible transformations as an `n`-hypercube where the nodes are the `n`-bit strings and there exists an edge between two nodes if and only if their bit strings differ by exactly one bit.
The you would begin at the node corresponding to the string you're given, and you have to find a way to the destination node, an `n`-bit string of all 1's, using the minimum number of moves possible.

Here is an example of where the player begins at a start node, `10100`, and must exit at the goal node, `11111`.
The player can only move to adjacent nodes, that is, nodes whose bit labels differ by exactly one bit:

```
10100
00100
01100
01101
11101
11111
```

As you may have noticed, this is not so challenging if all of the nodes in the `n`-hypercube are available.
The player could just go through the initial node label from left to right and flip a single bit until the all ones node label appears.
Therefore, you will be given a file with a set of permissible nodes: you must move from the start node to the end node using only the permissible nodes.

The permissible nodes file will be formatted as follows.
Here is an example in a file named `permitted.txt`:

```
10
00000
11111
00111
10101
10100
01101
00100
11101
01010
01100
11001
```

The first row contains a number `r` indicating the number of nodes in the file.
The remaining `r` rows in the file will contain a valid `n`-hypercube node.
We will only run your program on inputs where the start node and the goal node are in the file, and there are no duplicates.
You may assume the file is formatted properly, and that every permissible node has the same number of characters.
We may give your program many nodes (around 1 million nodes on a 20-hypercube).

Restricting the permissible set of nodes introduces two challenges.
First there may be no valid path from the start node to the goal node.
Second, your player must traverse the path from the start node to the goal node of the shortest length.

We have provided started code in `hypercube.h` and `hypercube.cpp` in resources.
The program in `main.cpp` takes two command line parameters.
The first indicates the starting node, and the second is a file which contains a list of permissible nodes.
If the code is compiled and the executable called `main`, to run your program on the example above the call would be as follows:

```shell
./main permitted.txt 10100
```

The permissible nodes file may have any name.
The program in `main.cpp` will print out the path from the starting node to the ending node, one label per line and the last line printed will be the number of expansions as below:

```
starting node
node 1
node 2
...
destination node
number expansions
```

If there is no path in the `n`-hypercube from the starting node to the goal node through the permissible set of nodes, the program will output `no path` and then the number of expansions:

```
no path
number of expansions
```

The provided `main.cpp` does not need to be altered.
You must write the function `HyperCube::read` to take a file stream to the permissible nodes file and save the set of strings of the permissible node labels in the hypercube.
You must also implement the function `HyperCube::search` that given the starting node label string applies the A* algorithm to search for a path to the ending node labeled all `1`s.

In the starter code in resources we have instantiated the priority queue and results vector of strings for you to use as well as given you guiding comments.
You will need to add node labels on the path to the results vector.
You may add any private functions or data members that you would like.
We have provided for you a node `struct` and a comparator `struct` for the nodes that you must complete within `hypercube.h`. 

### Expansions

**Expansions** are the number of nodes that your algorithms considers on the path from the start node to the goal node whether it is included in the final path output or not.
Since you will be using a `std::priority_queue` to solve this problem, every time a **new** node is removed from the `std::priority_queue`, the number of expansions should be incremented.
See the [Updating Nodes](#updating-nodes) section for what counts as a new node.
The lower bound on the number of expansions is the length of the path from the starting node to the goal node.
The goal node should not count as an expansion, but the start node should.

A small number of expansions means your algorithm runs quickly.
As the A* algorithm specifics and all tie-breakers, are fully specified below, there is a single unique correct number of expansions for any input.
Having too few expansions means there is an error in your algorithm.

### The A* Algorithm

Using `std::priority_queue`, implement the A* algorithm in order to help the player exit the hypercube.
Recall that A* makes the move with smallest `f`-value, and that `f = g + h` where:
 
- `g` is the length of the path from the start node to the current node and
- `h` is the heuristic approximation of the distance from the current node to the goal node.

Our heuristic will be the number of incorrect bits in our current string, i.e. the number of bits that are not 1.
For example, if the player is in node `01000`, the heuristic will evaluate to `4` (why is this a reasonable heuristic for the A* algorithm?).
To add consistency to solutions (and to ensure you get the correct number of expansions), please break ties in the following manner:

1. Always make the move with smallest `f`-value.
2. If multiple words have the smallest `f`-value, choose the one with the smallest `h`-value.
3. If multiple words have the smallest `f`-value and `h`-value, choose the node that has the smallest value in binary.
   For example, if the nodes `00100` and `00010` both had the same `f`-value and `h`-value, then choose the node `00010` since it is smaller in binary.

The `std::priority_queue` allows you to provide a comparator (such as the one described above) that specifies how the heap is organized.
Your algorithm should run in `O(m log m)` time where `m` is the number of nodes in the `std::priority_queue`.

### Updating Nodes

The STL `std::priority_queue` does not have a function that updates priority for a given item, but A* presumes you have such a function.
Here is how you can still write A*:

1. Whenever you find a new path to an unexplored bit string, add the bit string with the new priority to the `std::priority_queue`.
   **This means you may have multiple elements in your std::priority_queue referencing the same bit string**.
2. Whenever you remove a node from the `std::priority_queue`, check to see if you have already explored the node.
   If you have, discard the node without re-exploring it, and do not increment your expansions.
   How can your algorithm keep track of nodes that have already been explored?

### Implementation

- [ ] Complete your implementation in `hypercube.h` and `hypercube.cpp`.
      We have provided a command line interface in `main.cpp` as well as sample permissible node files with corresponding output files for you for testing.




## Submitting

Once you've finished, check that all of the code you're submitting is consistently formatted.
The `README.md` in your homework repository provides instructions for using `clang-format` to do so automatically.
You can then submit your code on the [Curricula submission page]({{ site.baseurl }}/submit/assignment/hw4).
Be sure to carefully read and follow the instructions there.

- [ ] Format your code using `clang-format`.
- [ ] Submit your code.
