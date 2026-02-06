---
layout: asides
toc: true
tasks: false
title: Homework 2
nav: assignments
hwpath: hw2
github_starter_url: https://classroom.github.com/a/yVnHKlcX
---

## {{page.title}}

+ Due: See [homework page]({{site.url}}/homework/index.html)
+ Written portion: Submitted on Gradescope
+ Coding portion: Use Github Classroom link given at the start of the Coding portion of this page. 
+ Posted:
  - [Video](https://ee.usc.edu/~redekopp/Streaming/cs104/Sp26/design-patterns-polymorphism.mp4) -  **Polymorphism and Design Patterns**: Common polymorphic approaches to software design.  Background knowledge that we will refer to in this homework.
  - [Video](https://ee.usc.edu/~redekopp/Streaming/cs104/Sp26/websearch-intro.mp4) -  **Homework Walkthrough**: Tour of the code and help for the inheritance diagram for this homework.
  
### Updates

- 2026/01/30 - Written portion released; Coding portion to be released soon.  Note: Q4 on the written portion refers to the coding problem skeleton code. We will release that very soon, but forego that problem for now.
- 2026/02/03 - Coding portion released;  It's a large code base.  A good amount of time is required to read and understand the code provided. This is a learning outcome of this assignment.  Then you will add in components to complete the design.

## Written Portion


{% for part in site.data.hws.hw2.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Coding Portion

### Github Classroom URL

**Note:** The coding portion has NOT been release. The link below is invalid.

**Signup link to create your HW2 repo:** [signup link]({{page.github_starter_url}})


### Reminder: A Few Notes on Repositories

 1. **Never** clone one repo into another.  Clone your new homework repo under (in) the `cs104-repos`.
1. Clone your repo using the `ssh` approach, NOT `https`.
- Clone your repo:
  
  ```bash
  git clone git@github.com:{{ site.data.urls.github_org }}/<your_{{page.hwpath}}_repo>
  ```

- In the VS Code editor, choose `File..Open Folder` and then find and open that folder (i.e. `cs104-repos/<your_{{page.hwpath}}_repo>`)



---

{% for part in site.data.hws.hw2.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Submission Files

- **Add, commit and push** your source files including all the `.cpp` and `.h` files and `Makefile`. 

- Do **NOT** add/commit/push `.o` files or executables (things that the compiler can easily generate anytime we need).  If you want to avoid adding files you should not, you can add the following lines to your `.gitignore` and then save, add, commit, push the `.gitignore`

```
<any previous contents>
*.o
websearch
```

Do **NOT** commit/push any test suite folder/files that we provide from the `resources` repo.  When we grade your code, we will move a fresh copy of the `{{page.hwpath}}_tests` folder into your repo, `cd` to that test folder, and run

```
cmake .
make grade
```

Your code must pass the tests to receive credit. You can essentially do this step yourself to ensure you pushed all the files and correct versions of those files by following the instructions below.


{% include commit-reclone.md %}

