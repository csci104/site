---
layout: asides
toc: true
tasks: false
title: Homework 1
nav: assignments
hwpath: hw1

---

## {{page.title}}

+ Due: See [homework page]({{site.url}}/homework/index.html)
+ Written portion: Submitted on Gradescope
+ Coding portion: (Not ready) - Use Github Classroom [signup link]()
  - Push your code and then run through the verification process listed at the end of this page before the deadline to receive full credit.

### A Few Notes on Repositories

1. Never clone one repo into another.  If you have a folder named `cs104-repos` from your Lab 0 stup and you clone your HW1 repo provided by Github Classroom  under it (i.e. `cs104-repos/hw1-ttrojan`) then whenever you want to clone some other repo, you need to do it back up in the `cs104-repos` folder or other location; NOT in the `hw1-ttrojan` folder.
1. Each coding homework will be started via Github Classroom via a customized startup link (usually listed at the top of the homework).  To `clone` it and then push files to it, you'll need to have setup your SSH keys as described in the Lab 0 writeup on the [Labs Page]({{site.url}}/labs/index.html). If you've followed those steps, used the Github Classroom sign up link (following any directions it indicates) and still cannot access your repository, you can then make a private post on the [class Q&A]({{site.data.urls.piazza}}) or visit TA office hours. In any Q&A post, be sure to include your USC username and github username for reference.


### Skeleton Code

On many occasions we will want to distribute tests and other pertinent files. To do this we have made a separate repository, [`resources`]({{site.data.urls.github}}/resources ), under our class GitHub site.  You should go to your `cs104-repos` clone this repository to your laptop (**but only if you have not already done this as part of lab**) and do a `git pull` regularly to check for updates. 

```
$ git clone git@github.com:{{ site.data.urls.github_org }}/resources
```

Again, be sure you don't clone this repo into some other repo but at some higher up point like in your `cs104` or `cs104-repos` folder on your laptop.  You can then manually copy (in your OS's GUI or at the command line) the skeleton files from `resources/{{page.hwpath}}` to your individual HW repo from Github classroom and add/commit/push the new files.

For example if you are in the folder containing both the `resources` and `hw1-ttrojan` folders/repos, you could enter the following command at the terminal:

```bash
$ cp -rf resources/{{page.hwpath}} hw1-ttrojan/
```

Again be sure to replace `hw-username` with your USC username (e.g. `hw-ttrojan`)

## Written Portion


{% for part in site.data.hws.hw1.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw1.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Submission Files

Ensure you add/commit/push all your source code files, `Makefile`, and written problem files.  Do **NOT** commit/push any test suite folder/files that we provide from any folder other than the `resources/{{page.hwpath}}` repo.

{% include commit-reclone.md %}

