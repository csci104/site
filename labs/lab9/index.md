---
layout: asides
toc: true
tasks: true
title: Recursive Backtracking
---

## Recursive Backtracking

### 1 - Recursive Backtracking
You should be familiar with some of the uses of recursion at this point. We typically use recursion to split a problem into one or a small number of simple, repeatable steps. One popular way to implement a recursive search is to search one step at a time until you hit a dead end (or impossible situation) or find a solution. If you've successfully found a solution, you're done. If your recursive call returns unsuccessful, remove that value from the list of potential solutions and continue to search until you've exhausted all possibilities.

Recursive backtracking is a ordered for searching a **solution space**. Worst case time complexity wise it's often on par with a brute-force search - but in reality it's much faster. This is because in backtracking when we reach an arrangement where no possible solutions could exist with the current selection (a **dead end**) we forget about testing further options down this path and **backtrack** - undo the last setting and try something else.

Recursive Backtracing solutions often look like this:

1. `solve()` function : performs whatever necessary setup and calls the helper
2. `recursive_helper()` function : iterates over posibilities in some **sub domain**.
	+ In N-Queens, this domain is a row. After checking if an option `is_valid()`, `recursive_helper()` calls itself on the next row after to test each option. It returns true if it has reached the end OR if its child call returns true. It returns false otherwise to tell the caller it has reached a dead end. If a child call returns false, undo whatever option was tested.
3. `is_valid()` function : Tells you whether or not an option is viable for a specific arrangement.

### 1.1 - Example: N-Queens

Here's a quick review of the N Queens problem if you are unfamiliar with it:
+ You want to arrange 8 queens on an 8x8 chessboard such that each queen is unable to capture any other queens. Now, this can be trivial on a regular-sized chessboard, but what if you wanted to place 100 queens on a 100x100 chessboard? It quickly becomes more complicated.

Let's take a look at an example. Consider a 4x4 chessboard for simplicity.

Notice that in the second step, after we see that the second queen cannot be placed at grid (0,1), we need to undo the placement (clear it to 0) before we move on to try the next position. If we do not undo the move, then all subsequent placements on this row will always fail because we will always see a queen at (0,1).

```
1 0 0 0
0 0 0 0
0 0 0 0
0 0 0 0 PASS

1 0 0 0
1 0 0 0
0 0 0 0
0 0 0 0 FAIL

1 0 0 0
0 1 0 0
0 0 0 0
0 0 0 0 FAIL

1 0 0 0
0 0 1 0
0 0 0 0
0 0 0 0 PASS

1 0 0 0
0 0 1 0
1 0 0 0
0 0 0 0 FAIL

1 0 0 0
0 0 1 0
0 1 0 0
0 0 0 0 FAIL

1 0 0 0
0 0 1 0
0 0 1 0
0 0 0 0 FAIL

1 0 0 0
0 0 1 0
0 0 0 1
0 0 0 0 FAIL (entire row fails)

1 0 0 0
0 0 0 1
0 0 0 0
0 0 0 0 PASS

etc.
```

The first correct solution we will hit is 1, 3, 0, 2.


### 2 - Sudoku

[Sudoku](http://www.websudoku.com/) is a popular puzzle game involving a 9x9 grid and the numbers 1-9. The goal of the game is to fill board such that each row, column, and 3x3 box have the numbers 1-9 with no repeats. We will be programming a sudoku solver for lab.

Sudoku boards always start with some numbers in place, but mostly 0's which represent squares we need to solve for.

In `sudoku.cpp`, you will find some functions to get you started. Your task is to implement `solveHelper()` called by `solve()`. You may change the parameters as you like. We suggest taking in the row and column of the grid space you're trying to solve.

The basic strategy is as follows:

Start in the top left corner (0, 0) and work your way down to the bottom right corner (8, 8). At each point, check if the block needs to be solved. If the block's value is 0, then it needs to be solved. After you have found a valid number to put in the block, try solving the next one in sequence. Continue until you have solved the puzzle or cannot find a number that will fit in the block.

In this problem, the sub-domain that each `solveHelper()` iterates over is a individual cell. The options are int's 1-9, inclusive.

Compile with `make`, run with `./sudoku`. The first two puzzles should yield a valid configuration, and the last one SHOULD fail!

- [ ] Implement `solveHelper()`. Remember to show a TA/CP to get checked off!