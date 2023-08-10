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
  + Ensure that all assignment files are in the correct directory with the proper names, as specified on the assignment page and are pushed to Github.  Failure to submit a necessary file will lead to a 0 on that problem or at the least a **-10 point** deduction per missing file. 
  + Make sure your code compiles with no warnings and no errors, and throws no exceptions. Unless specified otherwise, we will compile your code with the parameters `g++ -g -Wall -std=c++11`, so your code should compile with those setting.  If your code has warnings, a **deduction of up to 4 points** may be applied to the problem!  
  + If there are any specific actions and/or commands necessary to compile or run your code, or to access any required documentation for your assignment, include instructions in your `README.md` file.
  + Your grader will grade the assignment in the course VM/Docker. Hence, your grader will use the same compiler as you will in the course VM/Docker.
  + Ensure no `valgrind` errors exist.  `valgrind` errors will result in a **deduction of up to 4 points** per programming problem.

  


#### Acceptable Document Formats
In many assignments, you will be required to submit documentation and/or textual answers. Your documentation should be in the base directory of the assignment.

The following document formats are accepted:

  + Plain text
  + Markdown
  + PDF
  
No other formats are accepted unless explicitly stated. These include, but are not limited to, Microsoft Word documents (e.g. `.doc`, `.docx`) and Rich Text Format (RTF) files.

### Step 2. Push your commits to GitHub
After you have verified that your assignment is ready to be submitted, push your source code and all relevant files. Do not push binary files or "garbage" files. (Use the `.gitignore` file to make this as easy as possible on yourself as well as `make clean` to delete any object files or executables). You should NOT add/commit/push any of the test suite folders (and files) that may be released before the submission deadline (e.g. `hw1_tests`).  This can easily happen if you use `git add .`. Instead, we recommend adding specific files (e.g. `git add file1.h file1.cpp file2.h file2.cpp Makefile`) or using specific wildcards: `git add *.h *.cpp Makefile` (which will leave out anything in a subfolder).  If you do happen to add/commit/push a test suite, you can remove it by running `git rm -rf hw1_tests` followed by `git commit -m "Removed tests"` followed by `git push`.  

Run `git status` on your repository and make sure that there are no files listed as:

  + Changes to be committed,
  + Changes not staged for commit, or
  + Untracked files

A `git status` on your master branch must return:
    
```
# On branch master
nothing to commit, working directory clean
```

If files that you do not want to push (i.e. `hw1_tests` or other object files ) appear in the untracked list, add that folder/filename(s) to your `.gitignore`.  (Note: you must add/commit/push you `.gitignore` like any other file).

### Step 3. Verify your commit **before** the Deadline

Before the deadline and after pushing your submission to GitHub, you **must** ( **MUST** ) follow the verification steps listed at the end of each assignment page to clone your repo to a separate folder and follow the process you list in your own `README.md` to ensure your code compiles and works as you expect. We cannot emphasize enough how many bugs you will discover (and how many points you can avoid losing) by doing this simple 5-minute step.

Our reference grading environment is the Virtual Machine we provide for the course. You should test your code on the VM to ensure that it works properly in the environment we will test it in.

### Step 4. Fill out the Homework Submission Form
The submission form is available for each respective assignment on the [assignments page]({{ site.url }}/assignments/index.html). Make sure you are using the proper link. To complete the form, you will need to get the (long) SHA from your commit. 

It is easiest to obtain that SHA by executing the `git log` command on your terminal and select/copy the SHA that is listed for the (likely latest) commit that you just pushed.  You can then paste that SHA into our form.

You can also obtain the SHA from your repository's commit page on github.com as shown in the following screenshot:

![SHA of latest commit]({{site.baseurl}}/homework/img/github_commit-sha.png)

Make sure to use the **long** SHA (about 20+ digits/letters), not the short one (less than 10 digits)! If you use the short SHA, the submission script may work, but the actual scraping script in the background likely will not. This will make it appear as though you hadn't submitted the assignment, which would be pretty bad.

When you submit your assignments, make sure to click on the "Check My Submission" button. Our script will perform a few quick checks to make sure your submission is valid. For instance, it will alert you to (some) missing files, and might also catch some compilation errors. (Of course, it cannot read your `README.txt`, so if compilation requires special instructions, it will not follow those.) You can resubmit as often as you want -- we will grade the submission with the most recently submitted SHA.

### Late Submissions
Provided you have grace days, you can make a late submission even if you previously submitted on time. The late submission will then replace the on-time submission. After completing your (late) assignment, follow steps 1-4 from above. When you get to step 4, before you can successfully submit your homework, you will be prompted to confirm your late submission. Doing so will use a late day (unless you have already made other arrangements with your professor).  If you have no late days remaining, then you will get a 0 for the assignment. No exceptions will be made to this policy except for University approved medical reasons. Interviews, conferences, or other trips are not valid reasons to obtain an extension.


### Submission FAQs
#### Q1. How do I check out a specific commit?
If you want to check out a specific version of your code, such as the commit used in grading your assignment, you first need to locate the SHA of that commit. As an example, to check out commit `d8da410b19cf0a9f5a3003120204a114b8496942` from ttrojan's repository, you would use:

1. Go to your top level `cs104` folder of home folder (such as `cd ~`)
1. Delete your old `verify` folder if it exists: `$ rm -rf verify`
1. Create a `verify` directory: `$ mkdir verify`
1. Go into that directory: `$ cd verify`
1. Clone your `hw-ttrojan` repo: `$ git clone git@github.com:{{site.data.urls.github_org}}/hw-ttrojan.git`
1. Go into the appropriate `hw` folder `$ cd hw-ttrojan/hw1`
1. Checkout your paritcular commit:  `$ git checkout d8da410b19cf0a9f5a3003120204a114b8496942`
1. Recompile and rerun your programs and tests to ensure that what you submitted works.
 

This creates a new directory with the specific version of your code. While there are ways to make edits to this version and then merge those edits suitably, we recommend a more pedestrian version (unless you are a git expert, in which case feel free to do what you want - just don't expect us to be able to fix things if you really screw them up). We recommend that you carefully go through your edits and your old version, and copy whatever you wanted to recover from the old version **into** the version that is in the most recent state. Once you've produced the new version you want, commit it, and simply delete the `verify` directory you created.
