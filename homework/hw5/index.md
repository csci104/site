---
layout: asides
toc: true
tasks: false
title: Homework 5
nav: homework
hwpath: hw5

---

## {{page.title}}

+ Due: See [homework page]({{site.baseurl}}/homework/index.html)
+ Directory name in your github repository for this homework (case sensitive): `{{page.hwpath}}`

### Skeleton Code
Some skeleton code has been provided for you in the `{{page.hwpath}}` folder and has been pushed to the Github repository [`resources`](https://github.com/{{site.data.main.github_org}}/resources/ ). If you already have this repository locally cloned, just perform a `git pull`.  Otherwise you'll need to clone it.

If no `Makefile` is provided with the skeleton code, you will need to create one yourself.  It should have a target for each of the executables in the programming portion.

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


{% include commit-reclone.md %}
