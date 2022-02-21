---
layout: default
title: Midterm
nav: assignments
---

## Skeleton Code

Skeleton files for the problems below can be [downloaded here]({{site.baseurl}}/resources/mt-su20.zip).  There is a subfolder for each of the two problems below.

## Midterm

### 1. (14 pts) Inheritance And Class Hierarchies

Billy Bruin wrote a class in  `inh.cpp` that models a college course and its assignment from numeric grades to corresponding letter grades.  Each course object must store the course name (e.g. `"CS104"`) and a map of student names and their numberic grades (`map<string,double>`). The map of grades can be set by calling `setGrades()`.  The objective of this class is to output letter grades via a function `outputGrades()`.  However, to determine letter grades, there are 3 types of classes:

  - **Pass/No Pass**.  In this type of class, a threshold value (e.g. 70) can be supplied and any numberic grade greater than or equal to the threshold will be considered passing (output `P`) and anything below the threshold is not passing (output `NP`).  The threshold can be set via `setPassThreshold()`.

  - **Straight Scale**.  In this type of class, letter grades are assigned according to a **fixed** scale where (`A` >= 90, `B` >= 80, `C` >= 70, `D` >= 60, `F` >= 0). The scale will be stored internally as a `map<string,double>` where the key is the letter grade and the value is the lower-bound on the score needed to get that grade (i.e. `A,90.0`).  `outputGrades()` should just output the key (string) that is provided in the map that correponds to the appropriate lower-bound associated with that key.    

  - **Custom Scale**.  In this type of class, letter grades are assigned according to a **custom** scale that the user can supply in the form of a `map<string,double>` where the key is the letter grade and the value is the lower-bound on the score needed to get that grade (i.e. `A,85.5`, `B,72.0`, `C,65.75`, `D,50.0`, `F,0`).  It is up to the user to call `setScale()` for this type of course. 
  
Currently, the code provided in `inh.cpp` implements these 3 course types in a single `Course` class.  Your task is to alter the code to introduce a class hierarchy (base and derived classes with appropriate hierarchy), such that:

  - Code and data that pertains only to a particular type of course (Pass/NoPass, Straight Scale, Custom Scale) does not exist in the classes corresponding to other types.  

  - Reduce duplication of code and/or data members (i.e. as much reuse as possible) between base and derived classes, subject to the previous goal above about code/data specific to one course only being in that (those) classes.

  - Allow for different types of courses to be stored together in a vector/array, etc. and specifically to allow for iteration over all the course objects to output their grades.  Creation of the objects is allowed to be performed on specific course types.

  - Define appropriate (pure) virtual functions as necessary that correspond to good coding practices defined in class.

  - The main program can be updated in the indicated sections (where you create the 3 courses)

  - Your updated code produces the same output of the original code.

  - **You may define and implement the base and derived classes all in `inh.cpp`**.  

We will score your submission based on its adherence to the above bullets and the level to which it meets those requirements.


### 2. (18 pts) ADTs and STL

#### Overview
In this problem, you will complete a class to model a Piazza-like system of "posts", some of which can be "pinned" and which can be searched quickly to see if they contain a particular term/word. 

#### Classes and Your Task
We have provided a `Post` object that can be used to store the text of the post and, potentially other information of your choice, and act as a single item in a linked list. 

Furthermore, we have implemented a rudimentary `PostList` that provides code to implement a simple linked list of `Post`s.  **You must use this class in the implementation of the `Piazza` class below.**

Your task is to implement the `Piazza` class.  This class **inherits from `PostList`** (you should determine the kind of inheritance). This class implements the notion of a *pinned* post which is a subset of the overall list of posts.  In addition, the user can query how many posts contain a particular word/term.  This query should be performed efficiently (see the runtime requirements in the header file.) 

Complete the `Piazza` class (in `piazza.h` and `piazza.cpp`) by choosing the kind of inheritance, adding data members, specifying any inheritance relationship, implementing the public functions according to the requirements and run-time limits provided in the comments in the header file, and adding any private helper functions you wish. You may add data members to the `Post` struct as you deem useful.

Public operations of the `Post` class include:

  + Adding a Post (via the provided input string).
  + Determining how many posts contain a given (single)word.  **To make your life easier, you may perform case-sensitive searches** so that no extra processing is needed.
  + Retrieving the `i`-th **most recent** overall post (either pinned or non-pinned).
  + Retrieving the `i`-th **most recent pinned** post.

You do not have to support removal/deletion of posts.

You may use `std::vector`, `std::set`, and `std::map`. You may not use `std::list`. If you want a linked-list you will need to write code to manage it yourelf.  (That doesn't mean you should write a list class but can just embed code to manage a linked list...and you may define new structs).

Again, the specifics of each post are listed in the documentation/comments in the header file.  **You must meet these requirements including the run-time requirements listed.**

#### Running and Testing your Code

We have provided a `Makefile` with a `make test` rule that will compile your code and run a few unit tests define in `piazza-tests.cpp`.  You are welcome to add to this file as you see fit.
