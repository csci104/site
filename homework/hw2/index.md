---
layout: asides
toc: true
tasks: false
title: Homework 2
nav: assignments
hwpath: hw2

---

## {{page.hwpath}}

+ Due: See [assignments page]({{site.url}}/assignments/index.html)
+ Directory name in your github repository for this homework (case sensitive): `{{page.hwpath}}`

### Skeleton Code
Some skeleton code has been provided for you in the `{{page.hwpath}}` folder and has been pushed to the Github repository [`resources`](https://github.com/{{site.data.main.github_org}}/resources/ ). If you already have this repository locally cloned, just perform a `git pull`.  Otherwise you'll need to clone it.


## Written Portion


{% for part in site.data.hws.hw2.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw2.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}

## Checkpoint

For checkpoint credit, commit and push your `hw-username` repo with a `hw1` subfolder that contains:

- Your solution to question 4 (ADTs). You may revise your answer in your final submission but need to show your answers and provide appropriate justification.
- Your solution to question 5 (Class Organization).  This will ensure you have read and started to consider your class design and approach to the web search programming problem.
- a version of `md_parser.h/cpp` that can pass the `mdparser-tests` tests in `mdparser-tests.cpp`.  To attempt to compile and run the `mdparser-tests` tests, type `make parse-test` at the command line which will both compile AND run the tests (if the compilation succeeded). 


{% include commit-reclone.md %}

