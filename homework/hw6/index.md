---
layout: asides
toc: true
tasks: false
title: Homework 6
nav: homework
hwpath: hw6
github_starter_url: 
---

## {{page.title}}

+ Due: See [homework page]({{site.baseurl}}/homework/index.html)

### Updates

- 2026/04/10 - Written portion is released.


## Written Portion


{% for part in site.data.hws.hw6.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw6.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}

## Submission Files

- **Add, commit and push** your source files including all the `.cpp` and `.h` files and `Makefile`. 

- Do **NOT** add/commit/push `.o` files or executables (things that the compiler can easily generate anytime we need).  If you want to avoid adding files you should not, you can add the lines to your `.gitignore` and then save, add, commit, push the `.gitignore`


Do **NOT** commit/push any test suite folder/files that we provide from the `resources` repo.  When we grade your code, we will move a fresh copy of the `{{page.hwpath}}_tests` folder into your repo, `cd` to that test folder, and run

```bash
cmake .
make grade
```




{% include commit-reclone.md %}

