---
layout: asides
toc: true
tasks: true
title: Final Review
---

## Final Review

The final will take place on **Saturday, November 21st, 11 am - 1 pm PST**. More details will be posted on Piazza!

As with the midterm, you won't be tested on any programming tools that you've gone over in lab but not lecture (e.g. gdb, Makefiles). This lab is to help you review, so if there's a topic that's not included here that you really want to go over, let us know! Remember to go back and review lecture slides and weekly group exercises as well.

### Kahoot
We've put together a fun Kahoot to review a variety of topics! To join the game, go to www.kahoot.it and enter the game PIN (which your TAs/CPs will share at the beginning of lab.) To avoid spoiling the fun, we'll post the link with questions & answers after the last lab has completed the Kahoot (ie, on Friday afternoon).

### Checkoff Problems

#### Odd Even Linked List
Rearrange a singly-linked list so that all the odd-indexed nodes come before all the even-indexed nodes. When we say odd and even, we're referring to the **index** of the node, not the value, where the first node is indexed at 1. Here are some examples:

##### Example 1: 
Input: `1->2->3->4->5->NULL`
Output: `1->3->5->2->4->NULL`

In this example, the first, third, and fifth nodes ((1), (3), (5)) should come before the second and fourth nodes ((2) and (4)).

##### Example 2:
Input: `2->1->3->5->6->4->7->NULL`
Output: `2->3->6->7->1->5->4->NULL`

In this example, the first, third, fifth, and seventh nodes ((2), (3), (6), (7)) should come before the second, fourth, and sixth nodes ((1), (5), (4)).

Notes:
+ The relative ordering among the even/odd groups should remain the same, as shown in the examples.
+ Do this in place (i.e. without creating a new list and just copying the values over).
+ This should run in linear time.

- [ ] Implement `oddEvenList(std::shared_ptr<Node> head)`. To get checked off, run `make EvenOddTest` and show that the tests pass! 

#### Number of Leaves
This problem was submitted as an extra credit challenge review problem by Moses Lee! 

Given a binary tree, complete the recursive function `numLeaves`, which returns an integer number of leaves in the tree.

- [ ] Implement `numLeaves(std::shared_ptr<Node> root)`. To get checked off, run `make NumLeavesTest` and show that the tests pass! 
