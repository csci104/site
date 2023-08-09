---
layout: asides
toc: true
tasks: true
title: Homework 1 Programming
---

## HW1: Programming Assignment

+ Due: Friday, September 8th, 11:59pm PST
+ To access the written portion of this assignment, click [here](..)
+ Directory name in your github repository for this homework (case sensitive): `hw1`
   - Once you have cloned your `hw-username` repo, create this `hw1` folder underneath it (i.e. `hw-username/hw1`)
   - If your `hw-username` repo has not been created yet, please do your work in a separate folder and you can copy over relevant files before submitting
   - **We will NOT provide a test suite before the due date for this homework**.  You will need to test the coding questions yourself with your own test programs. This should cause you to a.) appreciate the importance of testing, b.) consider the kinds of test cases you should write (i.e. if none of your test cases exercise a particular set of code in your implementation then you probably need to write more tests), c.) What common tasks related to testing would be useful to reuse and why there are testing frameworks like the one we will use in this class, `gtest`. (Don't worry, we'll cover `gtest` in lab soon!) 
   

### Skeleton Code

On many occasions we will want to distribute skeleton code, tests, and other pertinent files. To do this we have made a separate repository, [`resources`](https://github.com/usc-csci104-fall2023/resources), under our class GitHub site. You should clone this repository to your laptop (but only if you have not already done this as part of lab) and do a `git pull` regularly to check for updates.

```
$ git clone git@github.com:usc-csci104-fall2023/resources
```

Again, be sure you don’t clone this repo into your `hw-username` repo but at some higher up point like in a `cs104` folder on your laptop. You can then manually copy (in your OS’s GUI or at the command line) the skeleton files from `resources/hw1` to `hw-username/hw1`.

For example if you are in the folder containing both the `resources` and `hw-username` folders/repos, you could enter the following command at the terminal:

```
$ cp -rf resources/hw1 hw-username/
```

Again be sure to replace `hw-username` with your USC username (e.g. `hw-ttrojan`)

### Using Valgrind

If you were to compile `program` that takes two arguments:

```
$ ./program input.txt output.txt
```

The corresponding Valgrind command would be:

```
$ valgrind --tool=memcheck --leak-check=yes ./program input.txt output.txt
```

Scroll through the output and look for invalid reads, writes, and the heap usage summary at the end. However, please note, that just as a doctor can only diagnose you based on the symptoms or the info you provide, valgrind can only check for errors based on what the test code exercises. If the test code never triggers code to test a function and there are memory leaks or invalid access in that function, valgrind will say no errors occurred. You are only as good as what your tests exercise, so it helps to write tests that will trigger each line of code in your class (this is often referred to as *code coverage*).

### Command Line Arguments

In order to read parameters as command line arguments in C++, you need to use a slightly different syntax for your `main` function:

```c++
int main (int argc, char* argv[]) {
    // Your code here
}
```

When your program is called at the command line, `argc` will then contain the total number of arguments that the program was given, and `argv` will be an array of the arguments the program was passed.

- The argument at `argv[0]` is always the name of your program.
- Consequently, `argv[1]` is the first argument passed to the program.

The operating system will assign the values of `argc` and `argv`, and you can just access them inside your program.

### Problem 1 (Recursion, 15%)

Write a function that takes in a string, and outputs all possible permutations of the input, one per line.  A permutation is a shuffling of the characters.

If the input is `USC`, then the output would be (in any order):

```
USC
UCS
SUC
SCU
CUS
CSU
```

If the input string is length n, then there should be exactly n! output strings.  If the input string has no repeat letters, then there should be no repeat output strings.

If the input is `CSC`, then there will be repeat output (`CCS` shows up twice, once when one `C` is the first character, the other when the other `C` is the first character):

```
CSC
CCS
SCC
SCC
CSC
CCS
```

Here is the function you should implement:

```c++
void permutations(std::string in)
```

You may **not** change the function parameters, but you **can** (and probably should) create a helper function with whatever parameters you like.

While we will only test your `permutations` function, you will probably want to write some `main` code to actually test it.  Your submission should be in a file called `permutations.cpp`, and it should only contain your implementation of the function (don't include your main/testing code).

You may use loops and/or recursion in your implementation (Hint: you probably want to combine the two). You may not use the STL on this problem, other than the `vector` (if you so choose).  Obviously, your solution must not leak memory. **Use `valgrind` to verify correct memory handling and cleanup.**

### Problem 2 (Startup Companies, 35%)
Startups these days are merging so fast, it's hard to keep track of who is in what company. Company A merges with Company B, and Company C merges with Company D, and then the two merged companies merge, and suddenly, employees from companies A and C find themselves being colleagues. This is getting sufficiently difficult to follow that we will have you write a Startup Tracker. 

Here is how this will work. You have n students. Initially, each starts a startup company by himself/herself. Then, companies may merge. When you have a `merge` command, you will be given the numbers of two representative students, one from each company. Then, for each of those two students, you find the "biggest" company they are in, i.e., companies that are not subcompanies of any bigger company; let's call them A and B. Those two companies A and B are then merged into a new company; let's call it C. C will become the parent company of A and B.

Sometimes, companies also split up again. When we call `split`, we will again give you a representative student. Then, you find the biggest company that the student is in - let's call it A. As a result of the split, A should be completely removed, and the two companies that were at some point in the past merged to become A will now be individual companies without a parent again. (If the student is only in their own 1-person company, `split` does nothing.)

You will build a data structure that allows you to process a sequence of merges and splits, and answer queries about whether two students are in the same company.

To illustrate this, consider the following example with 5 students. After each command, we are showing you the structure of the nested companies with braces. The notation `{ {1}, { {2}, {3} } }` means that we have a company with two subcompanies: the first subcompany is just student 1, while the second subcompany again has two subcompanies, one consisting of just student 2, the other consisting of just student 3.

```
merge (0,1)   => { {0}, {1} }, {2}, {3}, {4}
merge (2,3)   => { {0}, {1} }, { {2}, {3} }, {4}
merge (0,3)   => { { {0}, {1} }, { {2}, {3} } }, {4}
split (2)     => { {0}, {1} }, { {2},{3} }, {4}
split (2)     => { {0}, {1} }, {2}, {3}, {4}
merge (2,4)   => { {0}, {1} }, { {2}, {4} }, {3}
split (0)     => {0}, {1}, { {2}, {4} }, {3}
```

A company is captured by the following

```c++
struct Company {
  Company *parent;   // the parent company, or nullptr if it has no parent
  Company *merge1, *merge2;
  /* the subcompanies that were merged to obtain this company, or
     nullptr if this is a 1-student company */

  Company ()
  { parent = nullptr; merge1 = nullptr; merge2 = nullptr; }
  Company (Company *m1, Company *m2)
  { parent = nullptr; merge1 = m1; merge2 = m2; }
};
```

Your task is to implement the following data structure:

```c++
class CompanyTracker {
public:
  CompanyTracker (int n);
  // initializes the tracker with n students and their 1-person companies

  ~CompanyTracker (); // deallocates all dynamically allocated memory

  void merge (int i, int j);
  /* Merges the largest companies containing students i and j,
     according to the rules described above.
     That is, it generates a new Company object which will
     become the parent company of the largest companies currently
     containing students i and j.
     If i and j already belong to the same company (or are the same),
     merge doesn't do anything.
     If either i or j are out of range, merge doesn't do anything. */

  void split (int i);
  /* Splits the largest company that student i belongs to,
     according to the rules described above.
     That is, it deletes that Company object, and makes sure that
     the two subcompanies have no parent afterwards.
     If i's largest company is a 1-person company, split doesn't do anything.
     If i is out of range, split doesn't do anything. */
     
  bool inSameCompany (int i, int j);
  /* Returns whether students i and j are currently in the same company.
     Returns true if i==j.
     Returns false if i or j (or both) is out of range. */
     
private:
  int numCompanies;  // the number of companies you are tracking

  Company** companies; 
  /* an array (allocated once in the constructor)
     to keep pointers to all the 1-person companies.
     Will not contain the merged companies. */
     
  /* Feel free to add private helper functions as you see fit.
     In particular, you may want a function to find the largest company
     that a student i is part of. */
};
```

The signature above is given to you as a file `company.h` in the `resources/hw1` repo.  You can update/pull the `resources` folder to obtain it and then copy it to your own hw1 directory in your own `hw-username` repo.  There, we also give you a bit of skeleton code that you are welcome to use to simplify your life a little bit. You may add **private** helper functions to `CompanyTracker`, but you cannot change the signatures of any of the functions we gave you - otherwise, we cannot test your solution, and that would be bad for your score.  Each of your functions should run in no worse than O(n) time.

You may not use any containers from the STL in this problem, other than the vector (if you so choose).

1. After completing the functions above, you should write a separate program name, `company_test.cpp`, to test your implementation.  Please note that these tests **will** be graded (and hence you should not copy or share them with your classmates).  You should allocate one of your `CompanyTracker` and some `Company` items and make calls to `merge`, `split`, and `inSameCompany` that will exercise the various cases you've coded in the functions.  For example, if you have a case in `split` for when there is only a 1-person company and a separate case for when it has several merged companies, then you should make calls to `split`  that execute both of those cases.  It is important that when you write code, you test it thoroughly, ensuring each line of code in the `CompanyTracker` class is triggered at some point.  You need to think about how you can test whether it worked or failed as well. In this case, calls to `inSameCompany` can help give you visibility as to whether your code worked or failed. 

2. Ensure your solution does not access memory incorrectly or leak memory. **Use `valgrind` to verify correct memory handling and cleanup.**

3. Ensure you do not change the filenames of the skeleton we give you and that your test file is named `company_test.cpp` and submit it with your other files.  Do **NOT** place a `main` function in the class file: `CompanyTracker.cpp` (it should be in your test file: `company_test.cpp`). Your test code will be graded based on the quality and thoroughness of your tests.  Obviously, your own `CompanyTracker` class should pass your own tests.

4. To compile a program of multiple files you must list **ALL** the `.cpp` files in the `g++` command line AND **NEVER** compile a `.h` file on the `g++` command line.  Thus, your compilation commmand would look like: 

```bash
g++ -g -Wall company.cpp company_test.cpp`
```

### Finishing Up

### Completion Checklist

Ensure you add/commit/push all your source code files.

WAIT You aren’t done yet. Complete the last section below to ensure you’ve committed all your code.

### Commit then Re-clone your Repository

Be sure to add, commit, and push your code in your hw1 directory to your `hw-username` repository. Now double-check what you’ve committed, by following the directions below (failure to do so may result in point deductions):

1. In your terminal, `cd` to the folder that has your `resources` and `hw-username`
2. Create a `verify-hw1` directory: `$ mkdir verify-hw1`
3. Go into that directory: `$ cd verify-hw1`
4. Clone your hw_username repo: `$ git clone git@github.com:usc-csci104-fall2023/hw-username.git`
5. Go into your hw1 folder `$ cd hw-username/hw1`
6. Switch over to a docker shell, navigate to the same `verify-hw1/hw-username/hw1` folder.
7. Recompile and rerun your programs and tests to ensure that what you submitted works. You may need to copy over a test-suite folder from the `resources` repo, if one was provided.
