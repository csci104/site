---
layout: asides
toc: true
tasks: true
title: Getting Started
---

# Getting Started



Before you start out on your 104 journey you're going to have to complete a couple of setup steps.
Make sure you read each section carefully; if you don't, you may find yourself unable to submit assignments.


## Register with Github

If you have not created a Github account yet, follow the instructions in this section.
If you already have a Github account and you wish to use it for this course, you can skip to the next section.

We will be using git extensively this semester in labs and in programming assignments.
Github is a development ecosystem based around git.
In CSCI 104, we will be using Github to host our git repositories and we will take advantage of other GitHub features such as the issue tracker and wiki.

We start by visiting Github's <a href="https://github.com/signup/free" target="_blank">signup page</a>.
You are free to choose your username; it does not necessarily need to match your USC username.
Likewise, you are welcome to any email, just **remember which email you use as you will need it later**.
You will be sent an email to verify your email address.
Do that before proceeding.

- [ ] Create or have a GitHub account


## Register with Curricula

Curricula is our home-grown classroom software suite that we'll be using to handle things like submission, grading, and office hours.
Your next link your USC ID and GitHub account via the <a href="{{ site.baseurl }}/account/register/" target="_blank">registration page</a>.

This step is particularly important because it will also kickstart the processes that create your homework repository and add you to the necessary GitHub groups.

- [ ] Register with Curricula Web


## Install Git

You can skip this section if you have git installed or are using the VM, which has git installed.

In order to actually install the git command line tools, go to the [git website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and follow the instructions for your operating system.

### Special Notes for Windows

If you are using Windows, we recommend installing git bash, which will be provided as an option in the installer.
Git bash is a separate shell that provides access to git as well as other command line utilities.
If you have more experience with git or other command line tools, installing git and the other unix commands directly to your CMD is a pretty convenient option.


## Virtual Machine

We have two options for running the compiler tools that we will use for grading.
While you are welcome to use any editor/IDE to develop your homework code, you must run your code (and any of our tests) in a Linux virtual environment using a Linux VM, Docker, or some similar solution of your creation.

We offer two solutions: a traditional VM and Docker.
**We recommend Docker, as it avoids emulating an entire desktop by giving you easy and low-latency command-line access to all the tools you need**.
Plus, you can use your own local editor to develop and write code.
To set this up, please follow the <a href="https://github.com/csci104/docker" target="_blank">directions in the repository</a>.

Alternatively, you can download and install the Course VM, the instructions for which are available [in the wiki]({{ site.baseurl }}/wiki/vm/). 
This provides a full-featured virtual OS with graphical interface, etc.
It is larger, stores your files on a separate "virtual disk" that is not directly accessible from your computer's host OS, and can sometimes get corrupted, so please push your work to Github often.

- [ ] Install Docker or a virtual machine.

If you want more information on how Docker works and how to use it, you can read the <a href="https://github.com/csci104/docker/wiki/Usage">additional guide</a>.

- [ ] Read the additional guide or promise you know what you're doing.


## Configuring an SSH Key

One of the main features of using a distributed version control system such as git is having a complete backup of your code and its history.
Git uses the [Secure Shell](http://en.wikipedia.org/wiki/Secure_Shell) protocol (SSH) when contacting remote servers.
To facilitate this communication, you need to generate a pair of encryption keys: one public and the other private.
In this step, we will generate the set of keys required to use SSH.
This will be done manually through the command line.

**Important**: where you run the following instructions will depend on whether you're using Docker or the VM.
**If you are using Docker, you must open a terminal on your normal operating system**.
If you're on Windows, installing Git should either give you Git Bash or access to unix commands in CMD.
**If you are using the VM, you have to open Terminal inside the virtual desktop**.

- [ ] Open the correct terminal based on the instructions above.

**Note**: you will be copying and pasting several commands in this lab.
If you are using the VM, you can use `ctrl + shift + c` to copy from Terminal and `ctrl + shift + v` to paste into Terminal.
You can also right-click in Terminal and choose Copy/Paste.
If you're using Docker, copy and paste should work how it normally does on your operating system.

Use the following command to generate an SSH key, **replacing `ttrojan@usc.edu` with the email associated with your Github account**:

```shell
ssh-keygen -t rsa -b 2048 -C "ttrojan@usc.edu"
```

- [ ] Generate an SSH key using the email associated with your GitHub account

When prompted for a location to save the key, use whatever the default is.
The path may look slightly different than the one below, but that's fine.

```
Generating public/private rsa key pair.
Enter file in which to save the key (/home/cs104/.ssh/id_rsa):
```

After that, you will be prompted for a passphrase to secure your private key.
It is a good idea to secure your key with a passphrase, though **it is optional**.
Note that your password will not show up in terminal as you type it.
When you are done typing your password (don't enter anything if you do not wish to set a passphrase), press `enter`.
You will be prompted to verify your passphrase.
Re-enter your passphrase (or nothing if you did not set one) and press `enter`.

Upon success, you should receive confirmation that your key was generated.
It will most likely look something like this:

```
Your identification has been saved in /home/cs104/.ssh/id_rsa.
Your public key has been saved in /home/cs104/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:vC+4OG2u1PIeE0OKX9jiFFHuLnkYCBSsvIW8ybD873H ttrojan@usc.edu
The key's randomart image is:
+---[RSA 2048]----+
|   ++o.          |
|    S+.o *.*     |
|   +.X. o        |
|    0. o +       |
|   ..o  E .      |
|  .=S. . + .0    |
| .*=* ...        |
|.+.=o*. ..  *o*  |
| .++*oo. ..      |
+----[SHA256]-----+
```

- [ ] Save the key to the default location


## Git Configuration

The next step is to configure your git profile in your development environment.
This is important because your profile information is used to annotate your contributions to a repository/project.
It may not seem like a big deal when you are the only one committing to a repository.
However, it's a good habit to build since in a group setting, this information will help track what changes you made and how much you've contributed.

You only need to do this configuration once for any machine or virtual machine you want to develop on.
We'll be setting the following fields:

- Full name
- Email associated with GitHub
- Editor for commit messages, e.g. `nano`, `vi`, `emacs`, `notepad`
- Git message colors (make it pretty-er)
- Newline handling ([why is this a problem?](http://en.wikipedia.org/wiki/Newline#Common_problems)

To get started, have a Docker shell or VM terminal open.

### Personal Information

Please use your actual first and last name when configuring your git `user.name`.
For your email, you should **use the email address you've associated with your Github account**.
Configure your information as follows, replacing the example name and email with your own:

```shell
git config --global user.name "Tommy Trojan"
git config --global user.email "ttrojan@usc.edu"
```

- [ ] Configure your `user.name` and `user.email`

### Git CLI

By default, git does not color its output.
Pretty printing git messages makes it easy read the output and take proper actions.
You can enable colors for interactive use with:

```shell
git config --global color.ui auto
```

### Git Editor

When committing code in git, the system requires a commit message.
If a message is not provided via the shell, git will launch the operating system's default text editor prompting you for a message.
You can customize this action by setting what command you want to invoke to open a text editor, for example:

- `nano` is a simple and easy-to-use shell text editor
- `emacs`, `vi`, and `vim` have a steeper learning curve but offer more utility
- `subl -n -w` will open Sublime if you have that installed (won't work on Docker)
- `gedit` will open the default Ubuntu text editor (also doesn't work on Docker)

Choose one of them (`nano` is likely the easiest) and run the following command:

```shell
git config --global core.editor "nano"
```

- [ ] Set your git editor to the text editor command of your choice

### Miscellaneous Settings

Operating systems implement new lines differently.
Here you will configure git to automatically normalize the line feed to properly match the platform:

```shell
git config --global core.autocrlf input
```

- [ ] Set the line feed normalization to `input`

Since Git 2.0, Git has updated its default push settings.
To avoid getting a warning when you push (we will explain what push means soon), apply the following setting:

```shell
git config --global push.default simple
```

- [ ] Set the push strategy to `simple`

You can double check your settings using the following command:

```shell
git config --list
```

- [ ] Check that all settings have been set properly


## Github Profile

You need to update your profile to include your name and SSH public key.
There are also some optional settings you can change such as your profile picture and email notifications.

In your [profile settings](https://github.com/settings/profile):

- Put your **real name** in the name field.
  This is to ensure the TAs & CPs know who you are regardless of your username.
- Optionally, change your [profile image](http://gravatar.com/)

In your [SSH key settings](https://github.com/settings/ssh):

- Click `Add SSH Key`.
- Provide a name for the key, such as "CS104 VM Key" or "MacBook Key".
- Display the contents of your `id_rsa.pub` file by running `cat ~/.ssh/id_rsa.pub` in your Docker shell or VM terminal.
- Copy the contents of your `id_rsa.pub` file and paste them into the key field.
  Make sure you copy the entire contents of the `id_rsa.pub` file.
  It should start with `ssh-rsa` and end with your email address.
- Click `Add Key`.

In your [notification settings](https://github.com/settings/notifications), apply the following settings:

- In your notification settings
    - Automatically watch repositories: ON
    - Participating: Email ON, Web ON
    - Watching: Email OFF, Web ON
- In your email notification settings:
    - Comments on Issues and Pull Requests: ON
    - Pull Request reviews: ON
    - Pull Request pushes: ON
    - Include your own updates: OFF

Homework grade reports are released through GitHub, and using the above settings will ensure that you receive email notifications when your grade report is available.

- [ ] Set your profile name to your real name
- [ ] Upload your SSH key by adding the contents of your `id_rsa.pub`
- [ ] Enable Github and Github email notifications




