
#### Hash Table Analysis

You will complete a program that will measure the average time it takes to fill a map (your hashtable with various probing strategies and `std::map`) with varying number of strings and then attempt to find each string from the file in the table/map.

Complete the program `ht-perf` in `ht-perf.cpp` that will be run as follows:

```bash
./ht-perf [input] p alpha reps
```

Where 
  - `p` is the probing strategy to use (1 = LINEAR, 2 = QUADRATIC)
  - `alpha` is the loading factor to pass to the hash table constructor
  - `reps` is the number of repetitions of the test to perform (and average over) for the performance/timing anlaysis


The program current defines two templated test functions, one for your hash table (templated so you can pass in hash tables with various probing strategies or hash functions) and one for `std::map`.  These are **COMPLETE** and should not be altered.  Instead, your **primary task is twofold**:
  - Modify the code to repeat the calls to the doTest functions `reps` number of times and passing in a newly allocated map/hash table each call.
  - Add code to time how long the `reps` calls to the function took to execute and find the average time per call.  See below for an example of how to time a sequence of code.
  - For your hash table tests, also save the statistics of how many probes were performed on the **LAST** call to the test function.

We have written two, complete helper functions. The first is to parse the command line arguments and the second is to parse the words from the input file.  These need not be altered and already called from `main()`.

We will guarantee the following for all input test cases we use on your program:

  - You will never need more than 1685759167 indices in your hash table.
  - All input words will be no longer than 28 legal characters.

#### Timing Your Code

To time your code, you can use the technique shown in the following program:

```c++
#include <iostream>
#include <ctime>

int main() {
    clock_t start;
    double duration;

    /* Preprocessing here that you don't want to time */

    start = clock();

    /* Code to time goes here */

    duration = ( clock() - start ) / (double) CLOCKS_PER_SEC;

    std::cout << duration/r << endl;
}
```

As a short explanation, the `clock()` returns the number of clock ticks from a fixed point in time. By getting a timestamp before and after your code runs and looking at the difference, the duration can be inferred. To relate that value to wall-clock time we can convert to seconds using the constant `CLOCKS_PER_SEC`.

#### Test Cases

We have provide a Python script, `genWords.py` to generate files of random strings.  You can run it on Docker via:

`python3 genWords.py <num-words> <output-filename>`

So `python3 genWords.py 100000 words-1e5.txt` would output 100,000 random strings to the file `words-1e5.txt`.  For testing, we have provided 4 files of size 1E4, 2E4, 4E4, and 8E4.  You can generate your own if you like. **PLEASE DO NOT ADD/COMMIT THESE FILES TO YOUR GIT REPO** as they are large.

#### What to turn in

When you are sure your code is working (try to test it on small samples), run the experiments described below and submit the results in a file `hash-analysis.txt`.  That file should contain:

1. A table showing your performance for average runtime for a loading factor of 0.5 and 10 repetitions (for averaging purposes)

```
            Hash Table (Linear) | std::map
1E4 words
2E4 words
4E4 words
8E4 words
```

2. A table comparing different probing schemes for various loading factors using the 8E4 words input case. While we should generally not put the loading factor above 0.5 for quadratic probing, you can try it at higher values for this exercise. If it crashes you can try to generate a different input file.  Make a table for average time and also for number of probes.

```
Resize Loading Factor   | Hash Table Avg. Time (Linear) | Hash Table Avg. Time (Quadratic) | 
0.2
0.4
0.5
0.6
0.8
```

```
Resize Loading Factor   | Hash Table Num. of Probes (Linear) | Hash Table Num. of Probes (Quadratic) | 
0.2
0.4
0.5
0.6
0.8
```

3. Explain why you think the results turned out the way they did, and whether you were surprised by them.  What aspects were suprising or unexpected.


NOTE 1: You may find that linear and quadratic probing perform roughly the same in terms of time but quadratic probing performs many less probes.  In CS 356 you will see that due to caching and other hardware techniques time is not necessarily linearly related with the number of operations that must be performed.  Suppose we asked you to buy 50 items at the grocery store but I ordered them randomly vs. listed them in the order you would find them as you go up and down each successive aisle.  You got the same number of items but having them in successive order allows for faster access.  Linear access in computer memory is extremely fast while taking larger jumps to new memory locations is slower, even for the same number of accesses.

NOTE 2: This portion of the assignment will be graded with human eyes, so you just need to make sure you record and report the data accurately for your implementation and system on which you are running. 