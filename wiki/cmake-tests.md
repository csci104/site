We have posted the full test suite for **HW1**. We will do this for some but likely not every assignment since testing is an important skill that we will want you to build for yourself. However, here are the details for configuring, running, and debugging our grading tests. They use the Google Test Suite and a compilation tool `cmake`. **Please read the entire post** to understand all the features.`

#### How to Get and Use the Tests

*   Do a `git pull` in your `resources` repo, which will download a folder `hw1_tests`
    
*   Copy the `hw1_tests` folder from `resources` to your `hw-username/hw1` folder so that `hw1_tests` sits at the same level as all your source code (`.cpp` and `.h` files).
    
*   At the Docker or VM terminal/shell, `cd` to the `hw1_tests` folder in your `hw-username/hw1` folder (again you must be in the `hw-username/hw1/hw1_tests` folder and not just `hw-username/hw1`)
    
*   Initialize the test suite's CMake build system by running `cmake .`  That period/dot is intentional and important. It's **NOT** just `cmake`, it **is** `cmake .`  This initialization should likely only need to be run once, while the next steps will need to be repeated each time you modify your code.
    
    *   _Note: CMake is a very useful program for compiling C++ code that will generate Makefiles and other scripts_
        
*   Next, compile the test suite: `make`
    
*   Run the tests: `ctest`
    
*  You should now see a list of tests scrolling by. Hopefully they succeed, but if any fail, read below for how to debug them.

*   This is the basic flow:
    -  `cmake .` (run only once), 
    - `make`, 
    - `ctest`

`make` and `ctest` should be rerun each time you change your source files in the folder above. Note that `ctest` runs ALL the tests. See below for how to run individual tests to shorten your test/debug cycle.
    

#### How to Debug Test Failures

_or: How to Stop Panicking and Start Debugging_  
  
So, some of your tests are failing, which means there's a problem with your code. Don't worry, that's totally normal.  
  
The first thing you'll want to ask yourself is, which homework problem is the issue occurring on: `label_tests` (hw1), `parse_tests` (hw2), `searcheng-tests` (hw2)? In most HWs there's a different subdirectory for each (sub)problem under the `hw1_tests` folder (though for our HW1 there is only `label_tests`. Go into the appropriate subfolder and you should find an executable for the tests for that problem (e.g. `label_tests`, `parse_tests`, etc.). You **SHOULD** spend time looking at the source code of our tests to get an idea of what is happening in the tests that are failing. You can also run that executable `./label_tests` and you should see output for each test that looks like:

```
Running main() from gtest_main.cc
[==========] Running 19 tests from 7 test cases.
[----------] Global test environment set-up.
[----------] 1 test from LabelList
[ RUN      ] LabelList.Nominal
[       OK ] LabelList.Nominal (0 ms)
[----------] 1 test from LabelList (0 ms total)
```

You can run the tests in `gdb` or `valgrind` directly (or see below for running a single test case in `gdb`:

```
gdb ./label_tests
```

or

```
valgrind --tool=memcheck --leak-check=yes ./label_tests
```

**USING GDB**: Also you can debug a particular test by using the command: `make debug-TEST_NAME` where `TEST_NAME` is the test name shown in the output. For example, `make debug-LabelList.Nominal` would start `gdb` on that test case and allow you to run, set breakpoints, etc.

