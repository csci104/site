---
layout: asides
toc: true
tasks: true
title: Homework 3 Written
---

# HW3: Written Assignment

+ Due: Friday, October 18th, 11:59pm PST
+ You will submit this homework through Gradescope, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ For problem 4, you will primarily be graded on **your work**.  Only putting a final numerical answer will yield very little credit.  Instead, give the formula you used, and explain your answers.  You do **not** need to provide a final numerical answer for any of these problems, but it might help your graders out a bit if you do.
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 (Heaps, 4%)

For the following pen-and-paper exercise, please solve it by hand and only use online visualization tools to verify your work.

For each of the following two arrays that are interpreted as binary (2-ary) "min-heaps", state whether they are in fact correct binary min-heaps or violate a property. If one is a correct min-heap, then show what it looks like after you insert the key "2", and then show it again after you now remove the minimum (after having inserted "2"). You don't have to show the intermediate steps, but if you don't show them and the final answer is wrong, we will not be able to give you a lot of partial credit.

If one of the two heaps we gave you is not a correct binary min-heap, then point out everything that is wrong with it. In that case, you don't need to insert "2" or remove anything.

- [1, 4, 3, 7, 10, 6, 5, 9, 8, 11]
- [1, 6, 3, 9, 7, 4, 5, 8, 10]

Your answer should not be in array form like ours, but instead be drawn as a tree, either for the trees you want us to see, or by annotating the mistakes in the tree(s) we gave you.

### Problem 2 (Runtime, 4%)

In an implementation of Dijkstra's algorithm, suppose that instead of using a Min-Heap, you used something called a **Binomial Queue**.  While you have no idea how such a thing is implemented, you do know it has the following runtimes:

- Insert = &Theta;(1)
- DeleteMin = &Theta;(log n)
- FindMin = &Theta;(log n)
- Update = &Theta;(log n)

Does this change the worst-case runtime of Dijkstra's algorithm?  Thoroughly explain your answer by carefully analyzing the runtime using a Binomial Queue.

### Problem 3 (Counting, 15%)

Answer the following questions.

1. A monkey types a 280-character message on social media, using only the 26 upper-case English letters.  A research assistant is trying to determine if there is any hidden meaning in the message, and tries partitioning the message into 3 segments (the first x letters, the next y letters, and the last 280-x-y letters).  How many ways could the message be partitioned, assuming each segment has at least one letter?
2. How many different strings are there of length 10, made by using 10 of the letters in MISSISSIPPI?
3. How many ways can n+1 distinguishable objects be placed into n indistinguishable boxes, so that no box is empty?
4. There are 10 people in line, and each person is either a Ninja, a Pirate, or an Avenger (no single person is two of these things).  There is no more than 1 Ninja, and there is at least 1 Pirate.  How many possible lines are there?
5. There is a Binary Search Tree with 12 nodes.  Each node has a distinct value between 1 and 12.  The root has value 9, and its left child has value 5.  How many possible Binary Search Trees could this be?  Recall that in a BST, if a node has value x, then all nodes in its left subtree have value <= x, and all nodes in its right subtree have value >= x.

### Problem 4 (Probability, 15%)

Answer the following questions:

1. A family has 5 children, where each child is equally likely to be a boy or a girl.  E is the event where there are at least 3 boys.  F is the event where all children are the same gender.  Are these events independent?
2. A hash table has 10 indices, and 7 pieces of data are placed into it.  Each piece of data is assigned an index, independently of each other, and uniformly at random.  What is the probability that no two pieces of data are assigned the same index?
3. There are n jelly beans in a box of Bertie Bott's jelly beans.  Exactly one is your desired flavor (hot chocolate).  You draw one bean from the box at a time until you find your desired jelly bean, at which point you return all the other beans to the box.  What is the expected number of beans you draw?
4. A *triangle* in an undirected graph is a set of 3 nodes that all have edges to each other.  Let G be a graph with n nodes.  Each of the (n choose 2) possible edges exist with probability p.  What is the expected number of triangles in G?
5. Two hundred kilometers above the coast of Brazil lies the center of the South Atlantic Anomaly (SAA) which is known to be a very hazardous zone of high energetic particles. This region exposes orbiting satellites to much higher-than-usual levels of radiation and can potentially destroy electronics onboard a satellite. Flying through the SAA, an ordinary satellite has a survival rate of 80%. However, if the satellite has radiation-hardened (rad-hard) components, the survival rate is 97%.  Four satellites (A, B, C, D) flew through the SAA and one of them didn't survive. Satellite D was the only one without rad-hard components.  What is the probability that satellite D was the one that didn't survive?

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)
