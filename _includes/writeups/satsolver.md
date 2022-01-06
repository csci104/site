An important problem in several contexts (computer-aided design tools, theorem provers, etc.) is boolean satisfiability.  It seeks to answer whether there exists an assignment of 0's (false) and 1's (true) to binary variables {x1, x2, ..., xn} that will cause a Boolean expression (AND, OR, NOT) to evaluate to true.  The Boolean expression format we will use is called conjunctive normal form (CNF) and an example is shown below:

`(x1 || x2 || !x4) &&  (x3) && (!x1 || !x2)`

We call each term in parentheses a **clause**.  Notice all clauses are AND'ed together but within each clause is the OR'ing of variables or their negations.  **Thus, for the entire expression to be true, ALL clauses must evaluate to true.**

In this example, the following assignment will cause the expression to evaluate to true:

```
x1 = 0
x2 = 0
x3 = 1
x4 = 0
```

This expression has no assignment that causes it to evaluate to true

`(x1 || x2) && (!x2) && (!x1 || x2)`

The expressions will be given as a text file in a format used by many researches to benchmark their algorithms known as the DIMACs format:

```
c comment here
p cnf num_vars num_clauses
clause 1
clause 2
...
```

The first example we showed above would be represented in the DIMACS format as:

```
c this file mimics the first example above
c assume this file's name is test.cnf
p cnf 4 3
1 2 -4 0
3 0
-1 -2 0
```

Here each variable is represented by it corresponding number (starting at 1) in the clause and negative numbers indicates the variable should be 'NOTed'/inverted (i.e. must be False to make the clause True).  Each clause ends with a 0 just to 
indicate the end of the line (this isn't really necessary but is part of the DIMACS format) and you can just discard it.  Just to reinforce this:  0 is not a variable but an end of clause delimiter.

Your task is to write a program (named `sat_solver.cpp`) that reads in one of these DIMACS CNF expressions from a file (provided as the 1st argument on the command line), use a recursive backtracking search to attempt to find a satisfying assignment of 0's (False)
and 1's (True) such that the expression evaluates to true.  Your program should output (as a file whose name is specified as the 2nd argument on the command line) an assignment of variable values if a solution is found 
(you need only find the first solution and not ALL solutions) or `No solution` if no solution exists.

So running the program (using the test.cnf file shown above)

`$ ./sat_solver test.cnf test.out`

should cause an output file, `test.out`, to be generated containing:

```
1 = 0
2 = 0
3 = 1
4 = 0
```

An expression w/o a solution should generate a file whose contents are simply:

`No solution`

Remember you must use a recursive backtracking search approach to get any credit for this problem.  To that end, backtracking search in this context should simply try to start assigning one variable at a time and seeing if
a solution is found, still possible, or not possible.  To do this, each variable should likely have 3 states:  {Undecided/unassigned, False, True}.  As you make an assignment to a variable you'd want to check its effect on the formula. 
Recall, since all the clauses are AND'ed, EVERY clause must evaluate to true.  When that happens you know you have a solution.  If even one clause evaluates to false, your assignment is not valid and must backtrack.
Some clauses may not have enough information yet to determine true or false (i.e. they are **Undecided**) and thus means the current assignment is okay thus far but requires us to assign additional variables.  
So the easiest implementation approach is to recurse through the variables and try assigning each option (True, False) and if you have to return/backtrack, change the variable back to **undecided**.  Note that both variables can be **undecided** (if they are not assigned yet), as can the value of an entire clause (if no term in the clause evaluates to true after negation, if needed).  The formula is not satisfied until all clauses are TRUE. We have provided an **enumeration** type (`enum TruthVal { UNDEC = -1, ZERO = 0, ONE = 1};`) for undecided, zero, and one that can be used both for variable assignment and the status of clauses, if desired.

We may find a solution that satisfied all the clauses with some variables still being unassigned. This indicates their value does not matter.  In that case, you must NOT output those undecided variables to the output file.

Finally, you **MUST** maintain a map (not an array or list) of each variable to its current value (0, 1, or Undecided).  Start by using `std::map` but once your program works, we strongly encourage you to instead use your `AVLTree<K,V>`. We have provided a typedef:  `typedef std::map<int, TruthVal> VarValueMap;` so that if you write your code using `VarValueMap` as the map type, then you should need only `#include "avlbst.h"` and change that `typedef` from `std::map` to `AVLTree`.  Also, we ask you to return to this problem and use a HashMap implementation from a future homework.  Note: you will need to copy over your `avlbst.h`, `bst.h`, and `print_bst.h` files to your `hw5` folder.

Feel free to generate your own CNF files and post them on Piazza along with the solutions. We provide some larger test files in the `uf20` subdirectory of the `resources/hw5` repo/folder.  These tests are **ALL** satisfiable.  We cannot give a solution to each because so many may exist and we may all get different assignments.  You should use these as test cases ONLY after working with smaller tests (maybe some additional hand-written cases that you create).  

As always, no memory leaks should be present in your program and you **MAY NOT** use global variables.

You should also have a Makefile target `sat_solver` that is run by the `all` target and produces your `sat_solver` executable.