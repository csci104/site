---
layout: asides
toc: true
tasks: true
title: Before Your First Lab
---

# Before Your First Lab



Before you start out on your 104 journey you're going to have to complete a couple of setup steps.
Make sure you read each section carefully; if you don't, you may find yourself unable to submit assignments.

## Github

If you have not created a Github account yet, follow the instructions in this section.
If you already have a Github account and you wish to use it for this course, you can skip to the next section.

We will be using git extensively this semester in labs and in programming assignments.
Github is a development ecosystem based around git.
In CSCI 104, we will be using Github to host our git repositories and we will take advantage of other GitHub features such as the issue tracker and wiki.

We start by visiting Github's <a href="https://github.com/signup/free">signup page</a>.
You are free to choose your username and does not necessarily need to match your USCNet account.
Your email, however, should be your USC e-mail address.
You will be sent an email to verify your email address.
Do that before proceeding.

- [ ] Create or have a GitHub account

## Register with Curricula

Curricula is our home-grown classroom software suite that we'll be using to handle things like submission, grading, and office hours.
Your next link your USC ID and GitHub account via the <a href="/register/">registration page</a>.

This step is particularly important because it will also kickstart the processes that create your homework repository and add you to the necessary GitHub groups.

- [ ] Register on <a href="/register/">bytes</a>

## Set up a Virtual Machine

We have two options for running the compiler tools that we will use for grading.
While you are welcome to use any editor/IDE to develop your homework code, you must run your code (and any of our tests) in a Linux virtual environment using a Linux VM, Docker, or some similar solution of your creation.

We offer two solutions: a traditional VM and Docker.
**We recommend Docker, as it avoids emulating an entire desktop by giving you easy and low-latency command-line access to all the tools you need**.
Plus, you can use your own local editor to develop and write code.
To set this up, please follow the <a href="https://github.com/csci104/docker" target="_blank">directions in the repository</a>.

Alternatively, you can download and install the Course VM, the instructions for which are available [in the wiki](https://bytes.usc.edu/cs104/installing-course-vm.html). 
This provides a full-featured virtual OS with graphical interface, etc.
It is larger, stores your files on a separate "virtual disk" that is not directly accessible from your computer's host OS, and can sometimes get corrupted, so please push your work to Github often.

- [ ] Install Docker or a virtual machine


