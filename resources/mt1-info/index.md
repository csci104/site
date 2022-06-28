---
layout: default
title: Midterm 1 Info
nav: Resources
---

## MT1 Info

### Overview and Process

The test will be **IN PERSON**

- Time/Date: **{{site.data.schedule.exams[0].time}}**
  - The test will be set for **1 hour, 50 minutes**
  - If you have USC approved accommodations, please confirm with me via email and we will make preparations for your approved time.  
- Location: **SAL 126** 
  - If you have **1.5x time accommodations** contact your professor for room details.
  - If you have **2x or 1.5x (with other) accommodations** you should schedule your exam at the OSAS offices **for the day of the exam**

- The test will be taken on a combination of paper (for problems requiring diagrams, tracing, or runtime) and Gradescope.  Gradescope can be accessed by logging into our Blackboard section, choose Assignments, and click on the Gradescope link. You will then find a **MT - Coding** assignment (once the exam begins) where you will be able to find, textboxes for some answers to certain questions and links to skeleton files and upload your completed files.  For coding questions, you will write code on your laptop and then uploading the `.cpp` file.  Skeleton files will be linked directly from Gradescope and you can download them, edit them, and upload your final code.  You can write your code in any editor and even try to compile and run if you like, but we are not expecting you do that and it will take away time from coding the other problems. We will **visually** grade your code and be fairly lenient with **small** syntax errors (e.g. a missing semicolon).  No automated tests will be provided since we don't expect you to compile and run your code.
- You will be given a paper exam that includes all questions and has room for the written answers
- The exam is **Closed book, Closed notes, Closed Internet (search/reference)**. You may use your mind, an editor and/or compiler, and blank scratch paper but nothing else. No referencing your labs, homeworks, etc.
- You are allowed 1 **8.5x11 handwritten (front and back) cheatsheet**. No **printed** cheat sheets.  No **single-sided, taped** pages to form a double-sided sheet.  You will be asked to turn your cheatsheet in when you are done with the exam (so if you want it for posterity, make a copy beforehand).

### Topics and Style

The midterm will include a mix of anlaysis and coding problems. Most analysis questions will have room for you to write your answer directly on the paper exam. For coding problems you must **upload** completed `.cpp` files.

#### Unit 2a-2f - Review of CS 103 and CS 170
 - Memory allocation (when to use dynamic allocation)
 - Scope and lifetime of variables
 - Pointers, references
 - Classes (access modifiers), construction, destructions, initialization lists, use of `const` )
 - Operator overloading
 - Runtime (you'll probably want your basic series formulas on your cheat sheet)
 - Linked lists
 - Copy Constructors / Assignment Operators / Rule of 3.

#### Unit 3 - Recursion
 - Simple recursion
 - Tracing of recursive functions
 - Understanding order of execution (head vs. tail recursion)
 - Linked list recursion

#### Unit 4 - ADTS
 - List, Set, Map, Priority Queue, Queue, Stack
 - When to use each given a problem description

#### Unit 5 - STL
 - Iterators and their use
 - `std::map` usage and runtime of its operations
 - `std::set` usage and runtime of its operations

#### Unit 6 - Inheritance and Polymorphism
 - Order or construction/destruction of parent/child classes
 - Public, private, protected members
 - Public, private, protected inheritance
 - Inheritance vs. Composition relationships (`is-a` vs. `has-a`)
 - `virtual` functions (static vs. dynamic binding)
 - Abstract classes and **pure** virtual functions
 - Tracing of polymorphic code execution
 - Class hierarchy and design

#### Unit 7 - Queues and Stack
 - Implementaiton options and their effeciency
 - Applications of queues and stacks

#### Unit 8 - Templates
 - Templated classes and functions
 - Inheritance and templates
 - Function objects ("functors")

#### Unit 9 - PQ and Heaps
 - Tree representations and storage
 - Full, complete, and balanced tree definitions
 - Implementation of a priority queue
 - Heap implementation and operations (push, pop, top) and runtime
 - `build-heap` (`make-heap`) algorithm and runtime

#### Unit 10 - Graphs and Graph Algorithms
 - Graph representation (adjacency list vs. matrix, directed vs. undirected, etc.)
 - Dijkstra's algorithm
 - A* algorithm

#### Unit 11 - Tree and Graph Traversals
 - Depth-first search
 - In-, pre-, post-order tree traversals
 - Breadth-first search


### Practice Materials

#### Sample Midterms

 - [Sample Midterm]({{site.baseurl}}/resources/midterm-b.pdf) - [Solutions]({{site.baseurl}}/resources/midterm-b-sol.pdf)
    - Copy construction, operator overloading are not a major focus of CS104 but were in previous years.
 - [Sample Midterm 2]({{site.baseurl}}/resources/midterm-c.pdf) (partial solutions)
   - [Q1 Solution]({{site.baseurl}}/resources/midterm-c-q1sol.png)
   - [Q2 and Q3 Solution]({{site.baseurl}}/resources/midterm-c-q2q3sol.pdf)
 - [Summer 2020 Midterm (Programming)]({{site.baseurl}}/resources/mt-su20.html) (no solutions)
 - [Summer 2021 Midterm (Hybrid)]({{site.baseurl}}/resources/mt-su21.pdf)
   - [Skeleton Code]({{site.baseurl}}/resources/mt-su21-code.zip)
   - [Solutions]({{site.baseurl}}/resources/mt-su21-sol.pdf)
 
#### Practice Quizzes

 - [ADTs]({{site.baseurl}}/resources/quiz-adts.pdf) - [Solutions]({{site.baseurl}}/resources/quiz-adts-sol.html)
 - [Streams and Simple Recursion]({{site.baseurl}}/resources/quiz-streams-recursion.pdf) - [Solutions]({{site.baseurl}}/resources/quiz-streams-recursion-sol.cpp)
 - [Runtime and Recursion]({{site.baseurl}}/resources/quiz-runtime.pdf) - [No Solutions]
 - [Linked Lists and Recursion]({{site.baseurl}}/resources/quiz-list-recursion.pdf) - [Solutions]({{site.baseurl}}/resources/quiz-list-recursion-sol.cpp)
 - [Build-heap]({{site.baseurl}}/resources/quiz-build-heap.pdf) - [Solutions]({{site.baseurl}}/resources/quiz-build-heap-sol.pdf)