---
layout: asides
toc: true
tasks: true
title: Introduction to Git
---

# Introduction to Git

[Git](http://git-scm.com/) is a distributed source code version control system. 
When you place your code under version control, you record the changes you make to your files over time and you can recall the history of each of your file changes at will.
We will be using git extensively this semester in homework assignments.

[GitHub](https://github.com/) is a development ecosystem based around git.
In this course, we will be using GitHub to host our git repositories and we will take advantage of other GitHub features such as the issue tracker and wiki.

**If you have not done [Lab 0]({{ site.baseurl }}/labs/lab0) to set up your GitHub account or install Docker or a VM, please do so now.**

**Important**: in order to complete this lab, make sure you are using the correct terminal.
If you are using Docker to compile and test, you should **not** be using the `manage shell` to run `git` commands.
Instead, you should be using the native you open on your operating system (Terminal on macOS, git bash or CMD on Windows).

If you are using the VM, you should use the Terminal inside the VM.


## Cloning the `resource` and `hw-username` repositories

### Changing the working directory

Open your **native terminal**:

* If you are using the Course VM, press `Ctrl+Alt+T` inside the VM.
* On Windows, press `Win + R` and then enter `powershell`.
* On Mac, press `Command + Space` and then search for terminal.

Once you have opened up your terminal, you need to change the terminal's [**working directory**](https://en.wikipedia.org/wiki/Working_directory) to the working directory you [assigned to Docker during setup](https://github.com/csci104/docker#step-5-set-your-working-directory).

If you are working on the course VM, you may use any directory you like on the VM (e.g. `~/csci104`).

In my case, it is `C:\Users\rin\Documents\csci104\home` (yours might be different, depending on how you configured your docker), therefore I type:

```shell
cd C:\Users\rin\Documents\csci104\home
```

where `cd` stands for "**c**hange **d**irectory".

**Note: You need double quotes around the path if your path contains space, e.g. `cd "C:\My Documents\Home"`**

If you have forgotten which path you have assigned to Docker, you could check it by typing:

```shell
ch list
```

And you will see an output that looks like:

```
Name:   csci104
        Image:  usccsci104/docker:20.04
        Volume: C:\Users\rin\Documents\csci104\home:/work
        SecOpt: seccomp:unconfined
        CapAdd: SYS_PTRACE
        Port:   :2222
```

The path after `Volume: ` (excluding `:/work`) is what you are looking for.

### Performing the clone

This step assumes that you have already finished the git, GitHub, and SSH key setup from Lab 0.

Once you are inside the correct working directory, type the following commands (**replace the `username` in `hw-username` with your actual USC Net Id**):

```shell
git clone git@github.com:usc-csci104-spring2022/hw-username.git
git clone git@github.com:usc-csci104-spring2022/resources.git
```

If you see the following dialog in your command line, type `yes` and press `enter`.
It's basically asking if you want to trust `github.com` as an SSH server.

```
The authenticity of host 'github.com (192.30.255.112)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?
```

After every clone command, you should see something like this (exact output might be different):

```
remote: Counting objects: 4, done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (4/4), done.
Checking connectivity... done.
```

## Running the Example Project

We have provided an `example` project to test whether you have the correct environment setup to compile our homeworks. Make sure you follow the steps below and the output on your terminal matches the ones on this page.

### Copy the `example` dirctory to your `hw-username` directory

For every assignment from this class, we would provide the skeleton code of the assignment inside the `resources` repository. When you start doing your assignment, you have to copy the skeleton code to your `hw-username` directory and do your work there. The `resources` repository is read-only and you would not be able to push to it.

If you are using Docker, type the following commands in your native terminal:

```
ch start csci104
ch shell csci104
```

To copy the directory, first make sure you are in the correct working directory (where you put the `hw-username` and `resources` repo clones), then type:

```
cp -r resources/example hw-username/example
```

where `cp` stands for "copy" and the `-r` standard for "recursive" which allows the command to copy directories.

### Building the example project

Now, go into your `hw-username/example` directory by typing:

```
cd hw-username/example
```

Then, run the following command:

```
make run
```

If the build is successful, you should see something like this:

```
Running main() from /build/googletest-j5yxiC/googletest-1.10.0/googletest/src/gtest_main.cc
[==========] Running 3 tests from 2 test suites.
[----------] Global test environment set-up.
[----------] 2 tests from SimpleReturnTest
[ RUN      ] SimpleReturnTest.Returns42
[       OK ] SimpleReturnTest.Returns42 (0 ms)
[ RUN      ] SimpleReturnTest.Returns37
test.cpp:12: Failure
Expected equality of these values:
  returns_37()
    Which is: 36
  37
[  FAILED  ] SimpleReturnTest.Returns37 (0 ms)
[----------] 2 tests from SimpleReturnTest (0 ms total)

[----------] 1 test from SummationTest
[ RUN      ] SummationTest.SumsAreEqual
[       OK ] SummationTest.SumsAreEqual (0 ms)
[----------] 1 test from SummationTest (0 ms total)

[----------] Global test environment tear-down
[==========] 3 tests from 2 test suites ran. (0 ms total)
[  PASSED  ] 2 tests.
[  FAILED  ] 1 test, listed below:
[  FAILED  ] SimpleReturnTest.Returns37

 1 FAILED TEST
make: *** [Makefile:8: run] Error 1
```

You **don't** have to worry about the red `[FAILED]` message as long as it shows up (it is intentional), 
but in case it does not show up, please ask for help from your lab instructor.

### Fixing the FAILED test case

What you have just seen above is an example of an automated test. We run automated tests to grade your
assignments, and you will learn more about them in later labs. For now, you could just think of them
as programs that feeds some input into your assignment code and test whether they produce the correct
output.

Obviously, it is not good to have a FAILED test case! (You would lose points in an actual assignment if your
program fail our test cases) So let's fix it!

Open `library.cpp` and look at the function `int returns_37()`. As you can see it returns `36` instead of
the suggested `37`. If you look at the FAILED test case carefully you would see:

```
Expected equality of these values:
  returns_37()
    Which is: 36
  37
```

which points to exactly the same issue.

Therefore, change the return value to `37` and run `make run` again. This time every test should pass.

### Committing and pushing to your homework repository

Now that you have finished the work locally, you would also want to push the changes to GitHub.

To do so, open your **native** terminal (or the VM terminal is you are using the course VM) and change
the working directory to `hw-username`. Then type

```
git status
```

The output should look like this:

```
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        example/
```

which means that nothing from your `example` directory is tracked by git.

To track those files run the following command:

```
git add .
```

This command tells git to track all modification you have done to the repo (adding a new file, modifying a file, deleting a file, renaming a file, etc.). You could also specify
individual files to track by providing their name instead of `.` (e.g. `git add library.cpp`).

Now, if you check `git status`, you would see:

```
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   example/.vscode/launch.json
        new file:   example/.vscode/settings.json
        new file:   example/.vscode/tasks.json
        new file:   example/Makefile
        new file:   example/README.md
        new file:   example/library.cpp
        new file:   example/library.hpp
        new file:   example/library.o
        new file:   example/test
        new file:   example/test.cpp
```

All the changes are now ready to be *committed*. You could now run the following command:

```
git commit -m "fixed the example"
```

This tells git to create a snapshot of the repository that reflects the changes you just asked it to track.
The snapshot is called a **commit**. Each commit must have a message, as specified by the `-m` option. It can be anything,
but it's a good practice to keep it informative of what changes you have made.


Now, if you type `git status`, you would see:

```
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working directory clean
```

This tells that your local repo has one commit that the remote does not have. To
upload the commit, simply type:

```
git push
```

Now, if you everything runs successfully, the changes you have made would be synced to GitHub. Go to
the repo page on GitHub (it should be at https://github.com/usc-csci104-spring2022/hw-username, with `username`
replaced with your actual Net ID), and navigate to `example`, you should see the following files:

<img src="assets/github-example-first-commit.png" width="80%">

If you read the `library.cpp` file, you should be able to see the code you have just modified.

However, if you look at the `example` directory (in the image above), you would see two files
named `libary.o` and `test`. Those are the binary files created by the `make run` command while building
the project. As a good practice you should never push anything generated by a build process. We would deduct
points if you submitted your assignment with those files (unless otherwise specified).

### Removing the extra files from your repo

To tell git to remove those files from the repo, first go back to your native terminal and change directory
to `hw-username/example`. Then type the following:

```
git rm libary.o test
```

This will remove the two files from the directory and ask git to track the removal.

### Prevent accidentally adding files with .gitignore

The `git rm` command only solves the problem temporarily. What if in the future you run `make run` again and
generated the files again? It would be an annoyance to run `git rm` every time you push.

Fortunately, git offers a way to prevent files from being tracked by the `git add` command. To achieve this,
create a file called `.gitignore` (with no extensions) in your `hw-username/example` directory, and open it in a text editor.

**NOTE: a file or directory starting with `.` is hidden by default on most systems. To make your system show
those files, follow these instructions:**

* [Windows](https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5#WindowsVersion=Windows_10), 
* [Mac](https://www.pcmag.com/how-to/how-to-access-your-macs-hidden-files)

Once you are inside the text editor, add the following lines:

```
*.o
test
```

The first line tells git to ignore any files ending with
`.o`, and the second line tells git to ignore any file
named `test`.

Note that since the `.gitignore` file is placed under
the `example` directory, the rules would only be enforced
there. In general you would want separate `.gitignore` files
for each of your assignment.

Now, if you type 

```
git add .
git status
```

you would see something like:

```
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitignore
        deleted:    library.o
        deleted:    test
```

You could then commit and push the changes to GitHub:

```
git commit -m "removed extra files and added .gitignore"
git push
```

If you now go to the GitHub repo page, you would see that `test`
and `library.o` are no longer there.


## Pulling changes from GitHub

Sometimes would like to download changes from the remote repo because
someone else (or even you from another machine) modified the remote repo.
This is the case when we release the skeleton code in the `resources` repo
for a new assignment and you would like to download it.

This won't happen until assignment 1 of course, so let's do this to your `hw-username`
repo instead.

### Modifying a file on GitHub

First navigate to the `example/README.md` file in your `hw-username` GitHub repo page, and
click the pencil icon (see the image below):

<img src="assets/github-edit-pencil.png" width="80%" />

Then make an edit to the markdown file (any edit will do), and click `Commit Changes`:

<img src="assets/github-edit-submit.png" width="80%" />

**Note in general we do not recommend modifying files directly on GitHub, it is used
here just for demonstration purposes**

### Pulling the change

Now change your directory into `hw-username` in your local terminal, and then type:

```
git pull
```

The output should look like this:

```
remote: Enumerating objects: 7, done.
remote: Counting objects: 100% (7/7), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 1), reused 0 (delta 0), pack-reused 0
Unpacking objects: 100% (4/4), 742 bytes | 32.00 KiB/s, done.
From github.com:ph3rin/hw-demo
   dcdcc61..eb57bef  main       -> origin/main
Updating dcdcc61..eb57bef
Fast-forward
 example/README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Now if you read the `hw-username/example/README.md` file on your local machine, it should
match the one on GitHub.

## In Closing

There are tons of git cheatsheets all over the web.
Here's [one by Tower](https://www.git-tower.com/blog/git-cheat-sheet/) and [another by Atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet).
You can use one of these your make your own; git has a bit of a learning curve and at the end of the day comes down to memorizing the most useful commands and what they do.
Don't worry if it takes a little while.

As for this class, the main repositories you will interact with are as follows:

- `hw-username`, with your USC username instead of "username", will be your homework repository.
  You will write and submit your code for assignments from that repository.
  Once you register with Curricula, which you will have already done by now, your repository will be created.
- `resources` will contain any skeleton code, tests, or other files you will need for homework and labs.
  Keep this repository up to date so you're always working with our most recent changes.

Both of these are accessible from the [course Github page]({{ site.data.urls.github }}).
If you've registered with Curricula and do not have access to these, please contact the course staff.
Otherwise, **go ahead and clone both repositories** and check out their current contents.
You'll probably want them adjacent in a 104-specific directory; `/work` is fine in Docker, maybe `~/cs104` or `~/Desktop/cs104` in the VM.
Whatever you do, **do not clone one inside the other**, as this will cause problems. 

- [ ] Clone my homework repository wherever I keep 104 stuff.
- [ ] Clone `resources` in the same directory.
- [ ] Congratulate yourself.
      This is the longest damn lab ever.




