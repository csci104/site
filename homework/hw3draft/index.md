---
layout: asides
toc: true
tasks: true
title: Homework 3 Written
---

# HW3: Written Assignment

+ Due: Friday, October 6th, 11:59pm PST
+ You will submit this homework through Blackboard, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 (Abstract Data Types, 10%)

For each of the following data storage needs, describe which abstract data types you would suggest using. Natural choices would include `list`, `set`, `map`, `stack`, and `queue` but also any simpler data types that you may have learned about before. 

Try to be specific, e.g., rather than just saying "a list", say "a list of integers" or "a list of structs consisting of a name (string) and a GPA (double)". Also, please give a brief explanation for your choice: we are grading you at least as much on your justification as on the correctness of the answer.  Also, if you give a wrong answer, when you include an explanation, we'll know whether it was a minor error or a major one, and can give you appropriate partial credit.  There may be multiple equally good options, so your justification may get you full credit.

1. a data type that stores the histories of all of the one-person companies from PA1, ordered by their student IDs (an integer from 0 to n-1).
2. a data type that stores all of the students that earned an A grade in CSCI 103.
3. a data type that stores all of the students in CSCI 104: given a student name, it brings up the student with that name.
4. a data type that stores all of the students that were in CSCI 103 in Spring 2021. Given a grade, it brings up all of the students that earned that grade.

### Problem 2 (A*, 10%)

<div class="showcase">
    <img src="../img/astar.jpg" alt="A-Star" width="320"/>
</div>

You are given the above unweighted graph, and want to find the shortest path from node A to node P, using **A* Search**.  Your algorithm has the following properties:

- It uses Manhattan distance as its heuristic (the h-value)
- If two nodes look equally good, it breaks ties by selecting the node with a smaller heuristic (or, equivalently, the node with the largest distance travelled)
- If two nodes are still tied, it break ties by choosing the node which comes first alphabetically.

For each of the nodes, specify the g-value and h-value when they are discovered.  Then, specify the order in which nodes are explored, stopping once P is explored.

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)

