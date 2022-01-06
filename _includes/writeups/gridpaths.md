Consider an X by Y grid as shown below with the starting point of `0,0`.  Write a program to compute all possible pathways from point `0,0` (lower-left) to point `X,Y` (upper-right) that go through point `x1,y1` (i.e. point `2,3` in the grid below), where `0` <= `x1` <= `X` and `0` <= `y1` <= `Y`.  Furthermore, **you may only go North (up) and East (right).**  

```
^                                           Finish
|   (0,5) - (1,5) - (2,5) - (3,5) - (4,5) - (5,5)
|     |       |       |       |       |       |
y   (0,4) - (1,4) - (2,4) - (3,4) - (4,4) - (5,4)
      |       |       |       |       |       |
    (0,3) - (1,3) -(x1,y1)- (3,3) - (4,3) - (5,3)
      |       |       |       |       |       |
    (0,2) - (1,2) - (2,2) - (3,2) - (4,2) - (5,2)
      |       |       |       |       |       |
    (0,1) - (1,1) - (2,1) - (3,1) - (4,1) - (5,1)
      |       |       |       |       |       |
    (0,0) - (1,0) - (2,0) - (3,0) - (4,0) - (5,0)
    Start                                     ---> x
```

Using your knowledge of counting you should be able to arrive at a formula for the number of possible paths.  However, your program should print out all possible pathways where each path is a sequence of X,Y points.

For example, if the final location was `3,4` and you must go through `2,3`, then the output of your program would be the following sequences (in any order you like).

```
0,0 -> 1,0 -> 2,0 -> 2,1 -> 2,2 -> 2,3 -> 3,3 -> 3,4
0,0 -> 1,0 -> 2,0 -> 2,1 -> 2,2 -> 2,3 -> 2,4 -> 3,4
0,0 -> 1,0 -> 1,1 -> 2,1 -> 2,2 -> 2,3 -> 3,3 -> 3,4
0,0 -> 1,0 -> 1,1 -> 2,1 -> 2,2 -> 2,3 -> 2,4 -> 3,4
0,0 -> 1,0 -> 1,1 -> 1,2 -> 2,2 -> 2,3 -> 3,3 -> 3,4
0,0 -> 1,0 -> 1,1 -> 1,2 -> 2,2 -> 2,3 -> 2,4 -> 3,4
0,0 -> 1,0 -> 1,1 -> 1,2 -> 1,3 -> 2,3 -> 3,3 -> 3,4
0,0 -> 1,0 -> 1,1 -> 1,2 -> 1,3 -> 2,3 -> 2,4 -> 3,4
0,0 -> 0,1 -> 1,1 -> 2,1 -> 2,2 -> 2,3 -> 3,3 -> 3,4
0,0 -> 0,1 -> 1,1 -> 2,1 -> 2,2 -> 2,3 -> 2,4 -> 3,4
0,0 -> 0,1 -> 1,1 -> 1,2 -> 2,2 -> 2,3 -> 3,3 -> 3,4
0,0 -> 0,1 -> 1,1 -> 1,2 -> 2,2 -> 2,3 -> 2,4 -> 3,4
0,0 -> 0,1 -> 1,1 -> 1,2 -> 1,3 -> 2,3 -> 3,3 -> 3,4
0,0 -> 0,1 -> 1,1 -> 1,2 -> 1,3 -> 2,3 -> 2,4 -> 3,4
0,0 -> 0,1 -> 0,2 -> 1,2 -> 2,2 -> 2,3 -> 3,3 -> 3,4
0,0 -> 0,1 -> 0,2 -> 1,2 -> 2,2 -> 2,3 -> 2,4 -> 3,4
0,0 -> 0,1 -> 0,2 -> 1,2 -> 1,3 -> 2,3 -> 3,3 -> 3,4
0,0 -> 0,1 -> 0,2 -> 1,2 -> 1,3 -> 2,3 -> 2,4 -> 3,4
0,0 -> 0,1 -> 0,2 -> 0,3 -> 1,3 -> 2,3 -> 3,3 -> 3,4
0,0 -> 0,1 -> 0,2 -> 0,3 -> 1,3 -> 2,3 -> 2,4 -> 3,4
20 solutions.
```

To compute these paths, we `typedef` a `std::pair<size_t, size_t>` struct as an `XYPair` where the `first` member of the pair is the `x` location and the second is the `y` location.  You must implement the following function:

```c++
vector<vector<XYPair> > gridpaths(const XYPair& inter, const XYPair& final)
```

`inter` is the intermediate `x1,y1` location all paths must go through and `final` is the final location of all paths.  Remember, we assume we start from `0,0`.  The function should compute all paths and return them in a vector.  Each path is itself a vector of `XYPair`s representing the sequence of locations travelled on that path.  Thus, you will return a vector of vectors.

If `final` is `0,0` your should return an empty vector.

#### Requirements and Notes
 - Your solution must use **recursion** and no loops (but this will be the easiest approach anyhow).
 - You may define any helper functions you see fit (though they should not use loops either).  Tip:  having a helper function actually implement the recursive approach and always passing it a reference to a `vector<vector<XYPair>>` created by the outer function is likely the easiest approach to collecting all the paths.  You'll need more arguments than that for the helper, but this is how you can collect all the solution paths in a single vector.
 - We have provided a `main()` that you can use to test your program. It accepts 4 command line arguments being the intermediate x then y location followed by the final x then y location.  `gridpaths 2 3 3 4` would correspond to the example given above. If command line arguments are not provided it will default to `2,3` and `3,4` for the intermediate and final locations.
 - You should also have a Makefile target `gridpaths` that is run by the `all` target and produces your `gridpaths` executable.