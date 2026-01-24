---
layout: asides
toc: true
title: Homework
---


Our automated tests use `gtest` (C++ testing suite).  We may not ALWAYS use the same style of testing suite, and sometimes you may be asked to write tests, but when we do release `gtest` based testing suites, here is how to run them.

Also, just like compiling and debugging, it will require some command line skills.  I think some CS 104 students do not feel comfortable navigating at the command line/terminal (which I hope we can rectify in CS 103 in the future). Basic commands like `cd`, `cp`, `rm`, `pwd`, `mv` etc. should be familiar. With that said, refer to the [CS104 Wiki]({{site.baseurl}}/wiki/linux}}) that goes through the important background for command line navigation. 

Once you have doe that, here are the details for configuring, running, and debugging our grading tests. They use the Google Test Suite and a compilation tool `cmake`. **Please read the entire page to understand all the features**.

### How to Get and Use the Tests

Do a `git pull` in your `resources` repo, which will download a folder like `hw1_tests`, `hw2_tests`, etc.

Copy the `hw1_tests` (or the appropriate numbered) folder from `resources` to your assingment repo (e.g. `hw1-ttrojan`) folder so that hw1_tests sits at the same level as all your source code (`.cpp` and `.h` files).  You can do  this by using `cd` at the terminal to go to your `resources` repo (which we assume sits at the same level as your `hw1-ttrojan` folder/repo.  Then you can type 

```bash
cp -rf hw1_tests ../hw1-ttrojan/
```

(replacing `ttrojan` with your username).

Then, `cd` to the `hw1_tests` folder in your `hw1-ttrojan` folder.

If you are still in the `resources` folder, you would type:

```bash
cd ../hw1-ttrojan/hw1_tests
```

**You must be in the `hw1-ttrojan/hw1_tests` folder and not just `hw1-ttrojan` folder.**

#### Step 1 - Configure the CMake environment and tests
First,  initialize the test suite's CMake build system by running the command:

```bash
cmake .
```

That period/dot is intentional and important. It's not just `cmake`, it is `cmake .`  You only need to run this once (or each time you remove/copy the `hw1_tests` folder).

Note: CMake is a very useful program for compiling C++ code that will generate Makefiles and other scripts

#### Step 2a - Test Each Problem Individually
**If you have written ALL your code for ALL problems in the homework, you can skip down to Step YY**.

Each coding problem has a subfolder of its tests.  If you've written code for just one problem and want to test it, then you'll need to `cd` into that subfolder.

For example:

- Go into the appropriate subfolder:

```bash
cd unrolledlist_tests
```

(So now you are in `hw1-<yourusername>/hw1_tests/unrolledlist_tests`).

- Compile your code by typing:

```bash
make
```

If there are compile errors, go back and fix your code and recompile with `make` until successful.

- Run your code: Do an `ls` in that folder and find the executable that was created. Then run it (maybe the first time to fix functional bugs and then again with `valgrind`).

```bash
./unrolledlist_tests
```

```bash
Running main() from ./googletest/src/gtest_main.cc
[==========] Running 35 tests from 6 test suites.
[----------] Global test environment set-up.
[----------] 5 tests from ListInsertBack
[ RUN      ] ListInsertBack.OneItemAdd
[       OK ] ListInsertBack.OneItemAdd (0 ms)
[ RUN      ] ListInsertBack.ThreeItemAdd
[       OK ] ListInsertBack.ThreeItemAdd (0 ms)
[ RUN      ] ListInsertBack.ARRSIZEPlusOne
[       OK ] ListInsertBack.ARRSIZEPlusOne (0 ms)
[ RUN      ] ListInsertBack.50RandomElements
[       OK ] ListInsertBack.50RandomElements (1 ms)
[ RUN      ] ListInsertBack.5x1000RandomElements
[       OK ] ListInsertBack.5x1000RandomElements (28 ms)
[----------] 5 tests from ListInsertBack (30 ms total)

[----------] 5 tests from ListInsertFront
[ RUN      ] ListInsertFront.OneItemAdd
[       OK ] ListInsertFront.OneItemAdd (0 ms)
[ RUN      ] ListInsertFront.ThreeItemAdd
[       OK ] ListInsertFront.ThreeItemAdd (0 ms)
...
```

**USING VALGRIND**: Sometimes tests fail when you run ctest because of memory leaks, invalid accesses, use of uninitialized variables, etc. valgrind is your go to tool to find those.  So if it seems like your code does produce the correct results, but fails, run it through valgrind.  Go to the specific subfolder for the tests and run something like:

```bash
valgrind --tool=memcheck --leak-check=yes --track-origins=yes ./unrolledlists_tests
```

The items starting with -- are valgrind options telling it to check for specific issues.  After the options, you just put the normal command line with any command line arguments the program requires (e.g. the `llremdup_tests`  requires an input file name like `input.txt`).


#### Step 2b - How to Debug Test Failures

*or: How to Stop Panicking and Start Debugging*

So, some of your tests are failing, which means there's a problem with your code. Don't worry, that's totally normal.

The first thing is to identify the problem and specific test that is failing: ulliststr(hw1), rem_dup (hw1), search_tests (hw2)??  If you are not already in the **specific subfolder** for that problem, `cd` into it as described above in Step 2a (e.g.`cd unrolledlist_tests`, ` cd llremdup_tests`, etc.).  

You should look at the source code of our tests (sometimes split over multiple `.cpp` files like `insert_tests.cpp`, `remove_tests.cpp`, etc.) and find each test case that failed and **really try to understand what each test does (i.e. what input data it sets up, what it calls on your code, and what it expects to get back)**. 

**ADD PRINT STATEMENTS**: If you want to see what your code is doing as the test applies its inputs and checks the results, just add print statements in your code (back up two folder levels in `hw1-<username>`.  
  - Add code at the start of the functions that the test is calling to print the inputs and then additional prints to see what code is executing and what values you are producing. 
  - Recompile your code and the tests by running `make` in the test folder (e.g. in `hw1_tests/unrolledlist_tests`)
  - Rerun the tests as described in step 2a.

**USING GDB**: Alternatively, when you have segfaults or want to use a debugger to more quickly step through your code or see variable values, you can debug a particular test by using the command: `make debug-TEST_NAME` where TEST_NAME is the test name shown in the output. For example, you could 

```bash
cd unrolledlists_tests  # only if not in this folder already
make debug-ListInsertBack.OneItemAdd
```

 `make debug-ListInsertBack.OneItemAdd` would start gdb on that test case and allow you to run, set breakpoints (in our `gtest` suite code), etc.


#### Step 3 - Compile ALL the tests

**This step assumes you have written code for ALL the coding problems and that it compiles.** If not, see below at Step 2a.

Compile the entire test suite by going to the `hw1_tests` folder (if you are in a subtest folder, you may need to go up a level with `cd ..` or if you are in your `hw1-<username>` folder, you may need to go down a level into `cd hw1_tests`) and running:

```bash
make
```

You need to run this anytime you change your code or the test code.

#### Step 4 - Run the tests 

Run ALL the test cases at once with the command.

```bash
ctest
```

`ctest` runs ALL the tests in the test suite.

You should now see a list of tests scrolling by. Hopefully they succeed, but if any fail, see the procedure in Step 2b for how to debug them.  But this is the basic flow:  `cmake .` (just once), `make` (anytime you change your actual code), `ctest` (to rerun the tests). 

#### Step 5: Find your Points

Once your tests are working or you just need to submit due to time, ensure you are in your `hw1_tests` (or appropriate numbered) test folder using `cd`.

Then run:

```bash
make grade
```

It will compile and run the tests one more time and apply the assigned points.

After completion, find and open the `GR1_hw_username.md` file to see a report and your score.

If it is not what you expect, go back to step 2 and 3 to debug.

