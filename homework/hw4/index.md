---
layout: asides
toc: true
tasks: false
title: Homework 4
nav: homework
hwpath: hw4
github_starter_url: https://classroom.github.com/a/B9Z9ADXr

---

## {{page.title}}

+ Due: See [homework page]({{site.baseurl}}/homework/index.html)
+ Directory name in your github repository for this homework (case sensitive): `{{page.hwpath}}`

### Updates

- 2026/03/05 - Written portion is released



## Written Portion


{% for part in site.data.hws.hw4.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Coding Portion

### Github Classroom URL

**Signup link to create your HW4 repo:** [signup link]({{page.github_starter_url}})


### Reminder: A Few Notes on Repositories

 1. **Never** clone one repo into another.  Clone your new homework repo under (in) the `cs104-repos`.
1. Clone your repo using the `ssh` approach, NOT `https`.
- Clone your repo:
  
  ```bash
  git clone git@github.com:{{ site.data.urls.github_org }}/<your_{{page.hwpath}}_repo>
  ```

- In the VS Code editor, choose `File..Open Folder` and then find and open that folder (i.e. `cs104-repos/<your_{{page.hwpath}}_repo>`)

{% for part in site.data.hws.hw4.programming_parts %}

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

