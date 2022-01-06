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

{% include_relative writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw2.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include_relative writeups/{{ part.writeup }} %}

{% endfor %}


{% include commit-reclone.md %}


