---
layout: asides
toc: true
tasks: true
title: Introduction to Git
---

# Introduction to Git

[Git](http://git-scm.com/) is a distributed source code version control system.
When you place your code under version control, you record the changes you make to your files over time and you can recall the history of each of your file changes at will.

[GitHub](https://github.com/) is a development ecosystem based around git.
In this course, we will be using GitHub to host our lab git repository and help you save versions of your homework.

**If you have not done [Lab 0]({{ site.baseurl }}/labs/lab0) to set up your GitHub account or setup your coding environment, please do so NOW!**


## Creating a GitHub repo and obtaining the example files



### Step 1: Launch your coding environment 

Start your coding environment and get to a terminal where you can enter commands.

### Step 2: Creating a GitHub repo and downloading the example resources

Again, these steps assume that you have already finished all the setup from Lab 0. If you haven't done [lab 0](../lab0/) yet, do it now.

Before we start the process, here are a few reminders about Github repos:

- Never clone a Github repo into (or somewhere under) another repo folder on your filesystem.   For example, if you have the `resources` repo in a folder with that name (i.e. `resources`), then do NOT clone any other repo into the `resources` folder. Instead, go up a level to the parent folder and clone any other repositories you like into that folder, so they are all at the same level. This is why we asked you to create a folder like `cs104-repos`, so that you could clone all your repos there.
- Do not clone repos into a folder that is part of a cloud-based, synchronized folder system (e.g. OneDrive, Dropbox, Google Drive).
- For this class, don't clone your repo using `https` but `ssh`. So, rather than cloning with a command like:  `git clone https://github.com/org/repo`, use `git clone git@github.com:org/repo` (where `org` and `repo` are the organization and repo name, respectively).

#### Step 2.1 Create a GitHub repo for this lab (for practice)

Login to [GitHub](https://github.com){:target="_blank"} and click the green "New" button. Or you can link there [directly](https://github.com/new){:target="_blank"}

- Make sure the "Owner" is set to your GitHub user and **not** any GitHub organizations you might be part of.
- Give the repo the name: `practice-repo`.
- Make the repo private
- Don't add a README, a .gitignore or a license

Click `Create Repository`

When the repo is created GitHub will show the repo "URL" (either HTTPS or SSH). Copy the SSH version to your clipboard (there is a button for that).

#### Step 2.2 Creating an new repo on your development environment and connecting to GitHub

Go to your `cs104-repos` folder:

```bash
cd cs104-repos
```

Type the following commands (**replace the `GHUSERNAME` with your GitHub username and `REPONAME` with the name of your repository**)


```shell
git clone git@github.com:GHUSERNAME/practice-repo.git (this is the thing you copied)
cd practice-repo
echo "# Lab 1 Git Practice" > README.md
git add README.md
git commit -m "first commit"
git branch -M main
git push -u origin main
```

#### Step 2.3 Getting the Resources from the Lab Repository

This lab looks a little different from the rest of the labs you will be doing this semester, as we made you create your own GitHub repository to practice with for this one. Usually, you can just code directly in your local clone of the `resources` repository without having to do any copying, but for the sake of this assignment so everyone can practice pushing, there will be some copying.

**Note: We assume you have your `resources` and `practice-repo` folders at the same level under `cs104-repos`.

In your terminal, change directories from the `practice-repo` to `resources`, and then do a `git pull` to get the latest `lab1` files. If you were in your `practice-repo` folder, you should be able to achieve this with:

```bash
cd ../resources     
git pull
```

(i.e. go up one folder level and then down into `resources`) and do a pull.

You should see something come up about a `lab1` folder.

### Step 2.4 Copying the Files to Your Practice Repo

Now, we will copy the **`lab1` folder** from the `resources` repo over to the practice repository we created. While we could do this with our computer GUI by dragging and dropping the files, let's practice it through the command line!

This is the general command:

```shell
cp /path/of/source/folder /path/of/destination/folder
```

So you should be able to run:

```shell
cp -r lab1 ../practice-repo
```

You may have to change this based on the name of your folders. Modify this command above so it works for you, then within the *destination* folder (the practice repo), type

Then, navigate back to your `practice-repo` and ensure you see the right `lab1` files.

```bash
cd ../practice-repo/lab1
ls
```

Now you should see several lab files for today!  If you get a message such as `no such file or directory`, then you mistyped the command or weren't in the right directory (folder).


### Step 3. Building the  project

#### Step 3.0 For those running on Macs

**Only perform this step if you are running locally on your own Mac.**

You will need to change the Makefile to tell it where homebrew installed `gtest`.  

```make
CXX      = g++
CXXFLAGS = -g -Wall -std=c++17
CPPFLAGS = -I/opt/homebrew/include
LDFLAGS  = -L/opt/homebrew/lib
LDLIBS   = -lgtest -lgtest_main -pthread

all: test

run: test
    ./test

library.o: library.cpp library.hpp
    $(CXX) $(CPPFLAGS) $(CXXFLAGS) -c library.cpp -o library.o

test: test.cpp library.o
    $(CXX) $(CPPFLAGS) $(CXXFLAGS) test.cpp library.o $(LDFLAGS) $(LDLIBS) -o test

.PHONY: clean
clean:
    rm -f *.o test
```

#### Step 3.1 Build and Run The Code

So if you are (and you should be) in the `practice-repo/lab1` folder, run.

```bash
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

### Step 4. Fixing the FAILED test case

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

### Step 5. Committing and pushing your changes

Now that you have finished the work locally, you would also want to push the changes to GitHub.

To do so, go up one level (i.e. change directory) back to the `practice-repo` folder rather than being in your `lab1` subfolder.



```bash
git status
```

The output should look like this:

```
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        lab1/
```

which means that nothing from your `lab1` directory is tracked by git.

To track those files run the following command:

```bash
git add .
```

This command tells git to track all modification you have done to the repo (adding a new file, modifying a file, deleting a file, renaming a file, etc.). You could also specify individual files to track by providing their name instead of `.` (e.g. `git add lab1/library.cpp`).

Now, if you check `git status`, you would see:

```
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   lab1/.vscode/launch.json
        new file:   lab1/.vscode/settings.json
        new file:   lab1/.vscode/tasks.json
        new file:   lab1/Makefile
        new file:   lab1/README.md
        new file:   lab1/library.cpp
        new file:   lab1/library.hpp
        new file:   lab1/library.o
        new file:   lab1/test
        new file:   lab1/test.cpp
```

(you may or may not have the .vscode folder and files, depending on your editor and settings; if you don't see it, no worries! )

All the changes are now ready to be *committed*. You could now run the following command:


```bash
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


```bash
git push
```

Now, if you everything runs successfully, the changes you have made would be synced to GitHub. Go to
the repo page on GitHub via your web browser, and navigate to the repository.

If you refresh and read the `library.cpp` file, you should be able to see the code you have just modified.

However, if you look at the `lab1` directory, you would see the file `test`. That is the binary files created by the `make run` command while building
the project. As a good practice you should **never** push anything generated by a build process. We may deduct
points if you submitted your assignment with those files (unless otherwise specified).

**NOTE: You may not be able to see the `library.o` file on GitHub, that is to be expected
with the homework repository.**

### Step 6. Removing the extra files from your repo

Back to your VSCode terminal, let us learn how to DELETE a file that git is tracking.

To remove the file from the repo, then type the following:

```bash
git rm lab1/test
```

If a `library1.o` exists, we can also remove that.

```bash
git rm lab1/library.o
```

This will remove the two files from the directory and ask git to track the removal.

### Step 7. Prevent accidentally adding files with .gitignore

The `git rm` command only solves the problem temporarily. What if in the future you run `make run` again and
generated the files again? It would be an annoyance to run `git rm` every time you push.

Fortunately, git offers a way to prevent files from being tracked by the `git add` command. To achieve this,
create a file called `.gitignore` (with no extensions) in your `lab1` directory and open it.


**NOTE: a file or directory starting with `.` is hidden by default on most systems. To make your system show
those files, follow these instructions:**

* [Windows](https://support.microsoft.com/en-us/windows/view-hidden-files-and-folders-in-windows-97fbc472-c603-9d90-91d0-1166d1d9f4b5#WindowsVersion=Windows_10),
* [Mac](https://www.pcmag.com/how-to/how-to-access-your-macs-hidden-files)

In the `.gitignore` file add:

```
test
*.o
```

The first line tells git to ignore any file
named `test`. The second line tells git to ignore all files with a .o extension.

Note that since the `.gitignore` file is placed under
the `lab1` directory, the rules would only be enforced
there. In general you would want separate `.gitignore` files
for each of your assignment.


```bash
git add .
git status
```

you would see something like:

```
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   .gitignore
        deleted:    test
```

You could then commit and push the changes to GitHub:


```
git commit -m "removed extra files and added .gitignore"
git push
```

If you now go to the GitHub repo page, you would see that `test` is no longer there.


### Step 8. Modifying a file on GitHub

Finally we'll practice another pull by modifying files on the webiste.

First navigate to the `README.md` file in your `lab1` GitHub repo page using your web browser, and
click the pencil icon.  Then make an edit to the markdown file (any edit will do), and click `Commit Changes`.

**Note in general we do not recommend modifying files directly on GitHub, it is used
here just for demonstration purposes.**

### Step 9. Pulling the change

Now change your directory into `lab1` in your local terminal, and then type:


```bash
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
 lab1/README.md | 2 +-
 1 file changed, 1 insertion(+), 1 deletion(-)
```

Now if you read the `lab1/README.md` file on your local machine, it should
match the one on GitHub!

## Checkoff

Show your TA the contents of your repo including the change you made in the README.md:
  * on Github
  * on your development environment 

The contents should be the same.  

**Once your TA has checked you off, you are done! Go celebrate your `git` expertise.**

## In Closing

There are tons of git cheatsheets all over the web.
Here's [one by Tower](https://www.git-tower.com/blog/git-cheat-sheet/) and [another by Atlassian](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet).
You can use one of these your make your own; git has a bit of a learning curve and at the end of the day comes down to memorizing the most useful commands and what they do.
Don't worry if it takes a little while.



