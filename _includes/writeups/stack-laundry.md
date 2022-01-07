

Consider a gym with gray and black towels which patrons discard into a can and employees come and collect some number of towels to wash from the top of the pile. Given a file whose contents record the sequence in which towels are discarded along with when and how many towels the employee picks up to wash, please output the sequence of towels the employee picks up to wash each time he visits the can (Note: towel discards and employee pick ups can come in any order).

The input file consists of integers separated by spaces.  `0` = black towel, `-1` = gray towel, and any positive number bigger than 0 represents the employee collecting that many towels from the top of the pile.  If there are less towels than the employee tries to pick up, he will just get the available towels.

Sample file contents (e.g. `laundry.in`). There will be no format errors in this file so don't worry about that.

```
0  0  0  -1  2  -1  3
```

Output file contents (e.g. `laundry.out`).  There should be one line per employee pickup of towels.

```
gray black 
gray black black
```

We will run your program as:

`./laundry laundry.in laundry.out` 

and examine the contents of `laundry.out` to check your work.

You must use your `Stack<T>` class to help solve this problem.  

**Your solution should run in O(n) where n is the number of integers in the input file.  Failure to meet this requirement will result in a loss of half of the available points of this problem.**

Ensure your `Makefile` has a rule `laundry` to compile this program and that rule should also be listed under your `all` rule.