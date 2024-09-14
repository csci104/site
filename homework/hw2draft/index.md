---
layout: asides
toc: true
tasks: true
title: Homework 2 Written
---

# HW2: Written Assignment

+ Due: Friday, September 20th, 11:59pm PST
+ You will submit this homework through Gradescope, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 - More git Questions (5%)

In this problem, suppose we are working with a fictitious repository called `SampleRepo` (Note: this repo doesn’t exist so you can’t try the commands and expect them to work) which has a file `README.md` already committed to it. Let us now measure your understanding of the [file status lifecycle](http://git-scm.com/book/en/Git-Basics-Recording-Changes-to-the-Repository) in git. Please frame your answers in the context of the following lifecycle based on your interaction with the repository as specified below:

![Git File Status Lifecycle](https://bytes.usc.edu/cs104/homework/img/git-file-lifecycle.png)

> figure courtesy of the [Pro Git](http://git-scm.com/book) book by Scott Chacon

Notes:

- Parts (a) through (f) should be done in sequence. In other words, when you get to part (f), you should assume that you already executed the earlier commands (a), (b), …, (e). You must use the terminology specified in the lifecycle shown above, for example the output of `git status` is not accepted as a valid answer.
- For the purposes of this question, you can assume you have full access (i.e. read/write) to the repository.
- Place your answers in a file named `hw2.pdf`.

#### Part (a):

What is the status of `README.md` after performing the following operations:

```
#Change directory to the home directory
cd
#Clone the SampleRepo repository
git clone git@github.com:/SampleRepo.git
#Change directory into the local copy of SampleRepo
cd SampleRepo
```

#### Part (b):

What is the status of `README.md` and `fun_problem.txt` after performing the following operations:

```
#Create a new empty file named fun_problem.txt
touch fun_problem.txt
#List files
ls
#Append a line to the end of README.md
echo "Markdown is easy" >> README.md
```

#### Part (c):

What is the status of `README.md` and `fun_problem.txt` after performing the following operation:

```
git add README.md fun_problem.txt
```

#### Part (d):

What is the status of `README.md` and `fun_problem.txt` after performing the following operations:

```
git commit -m "My opinion on markdown"
echo "Markdown is too easy" >> README.md
echo "So far, so good" >> fun_problem.txt
```

#### Part (e):

What is the status of `README.md` and `fun_problem.txt` after performing the following operations:

```
git add README.md
git checkout -- fun_problem.txt
```

Also, what are the contents of `fun_problem.txt`? Why?

#### Part (f):

What is the status of `README.md` after performing the following operation:

```
echo "Fancy git move" >> README.md
```

### Problem 2 - Makefiles (5%)

For this problem you may use online sources to look up information about `make` and Makefiles, but please cite your sources.

#### Part (a):

Every *action* line in a makefile must start with a:

1. TAB
2. Newline
3. Capital letter
4. Space
5. It doesn’t matter, any character can start an action line

#### Part (b):

Look at the Makefile below and answer the following question. Assume this Makefile is in the current directory, and all required files are available.

```
IDIR=.
CXX=g++
CXXFLAGS=-I$(IDIR) -std=c++11 -ggdb

LDIR =../lib

LIBS=-lm

DEPS = shape.h

OBJ = shape.o shape1.o shape2.o

%.o: %.cpp $(DEPS)
	$(CXX) $(CXXFLAGS) -c  $< -o $@ 

all: shape1 shape2

shape1: shape1.o shape.o
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LIBS)

shape2: shape2.o shape.o
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LIBS)


.PHONY: clean

clean:
	rm -f *.o *~ shape1 shape2 *~
```

Now we run the command

```
make clean
make shape1
```

Which action(s) will get called? What compiler command(s) with what exact parameters will get executed as a result of the action(s)?

#### Part (c):

What is the purpose of a .PHONY rule?

#### Part (d):

What are acceptable names for a makefile? Select all that applies.

1. Makefile.txt
2. Makefile
3. makefile.sh
4. makefile

### Problem 3 (Abstract Data Types, 5%)

For each of the following data storage needs, describe which abstract data types you would suggest using. Natural choices would include `list`, `set`, `map`, `stack`, and `queue` but also any simpler data types that you may have learned about before. 

Try to be specific, e.g., rather than just saying "a list", say "a list of integers" or "a list of structs consisting of a name (string) and a GPA (double)". Also, please give a brief explanation for your choice: we are grading you at least as much on your justification as on the correctness of the answer.  Also, if you give a wrong answer, when you include an explanation, we'll know whether it was a minor error or a major one, and can give you appropriate partial credit.  There may be multiple equally good options, so your justification may get you full credit.

1. a data type that stores the histories of all of the one-person companies from PA1, ordered by their student IDs (an integer from 0 to n-1).
2. a data type that stores all of the students that earned an A grade in CSCI 103.
3. a data type that stores all of the student records in CSCI 104: given a student name, it brings up the student record with that name.
4. a data type that stores all of the students that were in CSCI 103 in Spring 2024. Given a grade, it brings up all of the students that earned that grade.

### Problem 4 (Inheritance Diagram, 5%)

Read the programming assignment carefully, and study the provided skeleton code.  Then, draw an inheritance diagram of all the classes in the skeleton code, as well as all of the classes you plan to create for this assignment.  As best you can, explain the reasoning for why the code was structured this way.  You should explain the following questions, and **at least one other** interesting design decision you noticed:

1. Why do we have an abstract `Product` class?
2. Given there are only two classes inheriting from `SectionParser`, was this a particularly useful application of inheritance?  Hint: think about how this program might be expanded in the future.
3. What purpose does the `DataStore` class serve, and is it related to any concepts you've learned about in lecture?

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)