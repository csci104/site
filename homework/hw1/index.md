---
layout: asides
toc: true
tasks: false
title: Homework 1
nav: assignments
hwpath: hw1

---

## {{page.title}}

+ Due: See [assignments page]({{site.url}}/homework/index.html)
+ Directory name in your github repository for this homework (case sensitive): `{{page.hwpath}}`
   - Once you have cloned your `hw-username` repo, create this `{{page.hwpath}}` folder underneath it (i.e. `hw-username/{{page.hwpath}}`)
   - If your `hw-username` repo has not been created yet, please do your work in a separate folder and you can copy over relevant files before submitting

## Written Portion

### A Few Notes on Repositories

1. Never clone one repo into another.  If you have a folder `cs104` on your VM, Docker, or laptop (wherever you created your Github keys from Lab 1) and you clone your personal repo `hw-username` under it (i.e. `cs104/hw-username`) then whenever you want to clone some other repo, you need to do it back up in the `cs104` folder or other location, NOT in the `hw-username` folder.
1. Your repos may not be ready immediately but be sure to create your GitHub account described in Lab 0 on the [Labs Page]({{site.url}}/labs/index.html). If you've followed those steps and still cannot access your repository, you can then make a private post on the [class Q&A]({{site.data.urls.piazza}}) to let your instructors know that your repository needs to be created.  Be sure to include your USC username and github username for reference.

### Skeleton Code

On many occasions we will want to distribute skeleton code, tests, and other pertinent files. To do this we have made a separate repository, [`resources`]({{site.data.urls.github}}/resources ), under our class GitHub site.  You should clone this repository to your laptop and do a `git pull` regularly to check for updates. 

```
$ git clone git@github.com:{{ site.data.main.github_org }}/resources
```

Again, be sure you don't clone this repo into your `hw-username` repo but at some higher up point like in a `cs104` folder on your laptop.  You can then manually copy (in your OS's GUI or at the command line) the skeleton files from `resources/{{page.hwpath}}` to `hw-username/{{page.hwpath}}`.

For example if you are in the folder containing both the `resources` and `hw-username` folders/repos, you could enter the following command at the terminal:

```bash
$ cp -rf resources/{{page.hwpath}} hw-username/
```

Again be sure to replace `hw-username` with your USC username (e.g. `hw-ttrojan`)

{% for part in site.data.hws.hw1.written_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


## Programming Portion

{% for part in site.data.hws.hw1.programming_parts %}

### Problem {{ part.number }} - {{ part.title }} ({{part.points}}%)

{% include writeups/{{ part.writeup }} %}

{% endfor %}


{% include commit-reclone.md %}

