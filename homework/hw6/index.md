---
layout: asides
toc: true
tasks: false
title: Homework 6
nav: homework
hwpath: hw6

---

## {{page.title}}

+ Due: See [homework page]({{site.baseurl}}/homework/index.html)
+ Directory name in your github repository for this homework (case sensitive): `{{page.hwpath}}`

### Skeleton Code
Some skeleton code has been provided for you in the `{{page.hwpath}}` folder and has been pushed to the Github repository [`resources`](https://github.com/{{site.data.main.github_org}}/resources/ ). If you already have this repository locally cloned, just perform a `git pull`.  Otherwise you'll need to clone it.


## Written Portion


{% for part in site.data.hws.hw5.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw5.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}

## Checkpoint

For checkpoint credit, submit your working code for the **Hash Table** problem. Ensure you add/commit/push your `hw-username` repo with a `{{page.hwpath}}` subfolder that contains:

  - `wordle.h`, `wordle.cpp` (it's fine to include your other **source** files like `wordle-driver.cpp`, `Makefile`, and `sched` files)
  - **THEN** you must submit your SHA on our Submit page linked from the [Homework Page]({{site.baseurl}}/homeworks/).


We will use `hw6_tests/wordle-tests/wordle-tests` for the checkpoint.  They must compile, run, and pass all tests with no `valgrind` or other memory errors.  Failure to pass even one test or having 1 valgrind error will result in 0 credit for the checkpoint.  It is fine to push other source files or input test files if you like, though we will not grade them.


## Submission Files

Ensure you add/commit/push all your source code files, `Makefile`, and written problem files.  Do **NOT** commit/push any test suite folder/files that we provide from any folder other than the `resources/{{page.hwpath}}` repo.  Then submit your SHA on our submission site.  

Please note we may run additional instructor tests for the coding problems that will affect your grade.  They will be similar in style to the provided test suite, but we do so to ensure you do not hard-code solutions to specific tests.

{% include commit-reclone.md %}
