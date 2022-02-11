---
layout: asides
toc: true
tasks: false
title: Homework 3
nav: assignments
hwpath: hw3

---

## {{page.title}}

+ Due: See [homework page]({{site.baseurl}}/homework/index.html)
+ Directory name in your github repository for this homework (case sensitive): `{{page.hwpath}}`

### Skeleton Code
Some skeleton code has been provided for you in the `{{page.hwpath}}` folder and has been pushed to the Github repository [`resources`](https://github.com/{{site.data.main.github_org}}/resources/ ). If you already have this repository locally cloned, just perform a `git pull`.  Otherwise you'll need to clone it.


## Written Portion


{% for part in site.data.hws.hw3.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw3.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}

## Checkpoint

For checkpoint credit, commit and push your `hw-username` repo with a `{{page.hwpath}}` subfolder that contains:

  - Your `Makefile` and **all necessary source code files** so that running `make llrec-test` will compile and create a working executable: `llrec-test` that we can test.  Failure to compile will result in 0 credit for your checkpoint.  There should also be no memory/Valgrind errors of any kind when we run your test on any valid input file. It is fine to push input test files if you like, though we will not grade them.

## Submission Files

Ensure you add/commit/push all your source code files, `Makefile`, and written problem files.  Do **NOT** add push any test suite folder/files that we provide from the `resources` repo.

{% include commit-reclone.md %}

