---
layout: asides
toc: true
title: Submission Instructions
nav: homework
---

## Submission Instructions

### Step 1. Prepare Your Code for Submission

  + Create a `README.md` in the directory for each assignment.
  + Suppress all debug messages (remove any `cout`/`cerr` statements or other debug output).
  + Ensure that all assignment files are in the correct directory with the proper names, as specified on the assignment page and are pushed to Github.  Failure to submit a necessary file will lead to your code failing all or part of the test suite. 
  + Make sure your code compiles with no warnings and no errors, and throws no exceptions. Unless specified otherwise, we will compile your code with the parameters `g++ -g -Wall -std=c++11`, so your code should compile with those setting.  If your code has warnings, a **deduction of up to 4 points** may be applied to the problem!  
  + If there are any specific actions and/or commands necessary to compile or run your code, or to access any required documentation for your assignment, include instructions in your `README.md` file.
  + Ensure no `valgrind` errors exist.  `valgrind` errors will result in a **deduction of up to 0.5 points** per failed test.

  
#### Acceptable Document Formats
In many assignments, you will be required to submit documentation and/or textual answers. Your documentation should be in the base directory of the assignment.

The following document formats are accepted:

  + Plain text
  + PDF
  
No other formats are accepted unless explicitly stated. These include, but are not limited to, Microsoft Word documents (e.g. `.doc`, `.docx`) and Rich Text Format (RTF) files.

### Step 2. Push your commits to GitHub
After you have verified that your assignment is ready to be submitted, submit by pushing your source code and all relevant files. Do not push binary files or "garbage" files. (Use the `.gitignore` file to make this as easy as possible on yourself as well as `make clean` to delete any object files or executables). You should NOT add/commit/push any of the test suite folders (and files) that may be released before the submission deadline (e.g. `hw1_tests`).  This can easily happen if you use `git add .`. Instead, we recommend adding specific files (e.g. `git add file1.h file1.cpp file2.h file2.cpp Makefile`) or using specific wildcards: `git add *.h *.cpp Makefile` (which will leave out anything in a subfolder).  If you do happen to add/commit/push a test suite, you can remove it by running `git rm -rf hw1_tests` followed by `git commit -m "Removed tests"` followed by `git push`.  

Run `git status` on your repository and make sure that there are no files listed as:

  + Changes to be committed,
  + Changes not staged for commit, or
  + Untracked files

A `git status` on your master branch must return:
    
```
# On branch main
nothing to commit, working directory clean
```

If files that you do not want to push (i.e. `hw1_tests` or other object files ) appear in the untracked list, add that folder/filename(s) to your `.gitignore`.  (Note: you must add/commit/push your `.gitignore` like any other file).

If you need the full hash of your current commit, first make sure `git status` outputs as above, then run:

```shell
git log|head -n 1
```

This will output something like:
```shell
commit 36448c9f45d1c4de770ce4c65a6db1fb964714d8
``` 

The long string of hexadecimal digits is your hash. Copy it to your clipboard if you need the SHA for Step 4.

### Step 3. Verify your commit **before** the Deadline

Before the deadline and after pushing your submission to GitHub, you **must** ( **MUST** ) follow the verification steps listed at the end of each assignment page to clone your repo to a separate folder (or check your GitHub Actions output) and follow the process you list in your own `README.md` to ensure your code compiles and works as you expect. We cannot emphasize enough how many bugs you will discover (and how many points you can avoid losing) by doing this simple 5-minute step.

### Step 4. Submit the hash to the Submit SHA form on the homepage

You can resubmit as often as you want -- we will grade your latest submission/push by default.

If you want an earlier commit to be graded, please submit the SHA of the commit to the Submit SHA form on the homepage before the late deadline.

If we already graded a different commit and you didn't submit the correct SHA in-time, we won't regrade with the other commit.

### Late Submissions

As outlined on the top-level [homework](../) page, late submissions are accepted for the first two days after the due date. After that, the assignment will close and no further submissions are allowed.

No exceptions will be made to this policy except for University approved medical reasons. Interviews, conferences, or other trips are not valid reasons to obtain an extension.


### Submission FAQs
#### Q1. How do I check out a specific commit?
If you want to check out a specific version of your code, such as the commit used in grading your assignment, you first need to locate the SHA of that commit. As an example, to check out commit `d8da410b19cf0a9f5a3003120204a114b8496942` from ttrojan's repository, you would use:

1. Go to your top level `cs104` folder of home folder (such as `cd ~`)
1. Delete your old `verify` folder if it exists: `$ rm -rf verify`
1. Create a `verify` directory: `$ mkdir verify`
1. Go into that directory: `$ cd verify`
1. Clone your `hw1` repo: `$ git clone git@github.com:GHUSERNAME/hw1.git`
1. Go into the appropriate `hw1` folder `$ cd hw1`
1. Checkout your paritcular commit:  `$ git checkout d8da410b19cf0a9f5a3003120204a114b8496942`
1. Recompile and rerun your programs and tests to ensure that what you submitted works. If tests were provided you'll need to copy or extract the tests into this folder.
 
This creates a new directory with the specific version of your code. While there are ways to make edits to this version and then merge those edits suitably, we recommend a more pedestrian version (unless you are a git expert, in which case feel free to do what you want - just don't expect us to be able to fix things if you really screw them up). We recommend that you delete the `verify` folder and go back to your main development repo to make any changes. Once that is working, repeat the above process with a the new ha 
You should do this in either the root-level of the Codio assignment for the homework, or inside a private Codio project to verify that your assignment works on Codio.
