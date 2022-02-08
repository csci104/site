
#### Overview

In this application you will use the A\* algorithm to "efficiently" solve a puzzle game where **vehicles** in a square 2D grid (aka the **board**) must be **moved** (by sliding) to allow a certain vehicle to **escape** off the right side of the board.  To start, a **Board** (i.e. the 2D grid) that shows the initial layout of vehicles (each identified by a character `a`, `b`, `c` and so on...) will be provided and read in by the program.  Vehicle `a` is always facing horizontally and is the vehicle we want to help **escape** by moving off the right side of the board. Vehicle `a` will always start in row 2 (counting from 0) though that need not be a requirement.  Other vehicles must be slid horizontallyl and vertically in the board to allow vehicle `a` to escape.  

We've provided a majority of the code to allow the user to play a text-based version of this game on their own.  Your task is to add the ability for the user to:
  - Ask for a cheat where your program will use A* to find a shortest sequence of moves that will solve the puzzle and display those moves to the user for their consideration.  The user can then key these in or go their own route, asking again later for another cheat sequence based on their updated board state. 
  - Undo the moves already entered if the user realizes those moves were not useful and have the state of the board be restored to its previous value(s) before the move(s) were made. 

#### Commands and GamePlay

A sample starting board might look be the following: 

```
...b..
...b..
aa.b.d
..cccd
......
......
```

Here we see the **escape** vehicle `a` positioned horizontally in row 2, as it always will be for our game boards. Where `a` is located in row 2 (i.e. in which columns it is located) may vary. For consistency, we will number the rows and columns from 0, starting at the upper left corner. 

**Each vehicle will be of length 2 or more** and be positioned HORIZONTALLY or VERTICALLY. The user can then choose the vehicle to slide by entering its letter **identifier** as well as a **postive or negative** amount of positions to move.  We will use the covention that **positive** amounts mean **right** or **down** for horizontal and vertical vehicles, respectively, while **negative** amounts mean **left** or **up** for horizontal and vertical vehicles, respectively.

The game can be won by moving `c` by an amount -2 (2 to the left), `b` by an amount 3 (3 down), and then `d` by an amount 1 (1 down) as shown below.  Note: there are other potential combinations to win, but the optimal solution can be done in 3 moves.

```
...b..
...b..
aa.b.d
..cccd
......
......
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : c -2

...b..
...b..
aa.b.d
ccc..d
......
......
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : b 3

......
......
aa...d
cccb.d
...b..
...b..
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : d 1
You win!

......
......
aa....
cccb.d
...b.d
...b..
You win!
```

- What to do if no solution exists?
- What to do if no move to undo?









#### Review the A* algorithm
Recall that A* chooses the move with smallest f-value to explore next.  Note:  `f = g + h` where `g = distance (number of moves made)` from the start state while `h` is a score produced by a heuristic evaluation of the move.  Please take some time to review the algorithm presented in class (slides, notes, etc.).  We will use the following heuristics:

1. **Brute-force**: Returns h=0...this causes A* to degenerate to a Breadth-first search

1. **Direct blocking vehicles**: Counts the number of vehicles to the right of the escape vehicle (i.e. that are blocking its escape).

1. **Single, Indirect-1 blocking vehicles**: (Read this carefully a few times) Counts the **direct** blocking vehicles (defined just above) and the **single "1-away" indirect** blocking vehicles.  A "1-away" indirect blocking vehicle is defined as a vehicle which, if deleted from the board (i.e. just plucked out), would allow a **direct** blocking vehicle to slide out of the way of the escape vehicle, *when no other path for the direct blocking vehicle to slide out of the way exists in the other direction*. Put another way, these are the vehicles above or below the direct blocking vehicles that prevent them from moving out of the way of the escape vehicle.  For reasons you will learn if/when you take CS 360 (AI), heuristics must **underestimate** the number of moves to a solution if A* is to guarantee an optimal solution. When only a single vehicle above or below (but not both) a direct blocking vehicle, it is clear this vehicle MUST be moved and would not be an overestimate of the number of moves required to solve the puzzle. However, when a **direct** blocking vehicle has two **"1-away" indirect** blocking vehicles, one above and one below, which one to move may not be obvious and, if we choose wrong, can lead to an overestimate, thus nullifying the guarantee of an optimal solution. Thus, when a direct blocking vehicle does not have just a **single "1-away" indirect** blocking vheicle but has two, we will not count either of those two and only count that direct blocking vehicle.

```
Ex 1.         Ex 2.         Ex 3.
...ee.        ..d...        ..ff..
......        ..d...        ...gg.
aabc..        ..b...        aabcde
..bc..        aabc..        ..bcde
..d...        ...c..        ..b..i
..d...        ...ee.        .kk..i
```

 - **Ex 3:**  `b`, `c`, `d`, and `e` are all direct blocking vehicles (so h=4 at minimum). Now we try to consider 1-away indirect blocking vehicles. 
   - `b` is blocked by `f` and `k` so we might think this is the case where we have an indirect "1-away" blocking vehicle both above and below `b` (in which case we would not count it). However, it is clear `b` can never legally move up to clear the way for the escape vehicle and, instead, must slide down.  Thus it only has **1** "1-away" indirect blocking vehicle, `k` so we add it to our count (now h=5).  
   - `c` can slide down to clear the escape so it has NO **indirect "1-away"** blocking vehicles.  We move on (h is still 5).
   - `d` has a **indirect 1-away** blocking vehicle both above and below it (`g` and `i`) so we don't count them (to ensure an underestimate) and only `d` as a direct blocking vehicle. So we move on (h is still 5).
   - `e`
     Neither `d` (for `b`) nor `e` (for `c`) are **indirect 1-away** blocking vehicles since both `b` and `c` can slide out of the way in the opposite direction of `d` and `e`, respectively.  So, here `h=2` would be the result from both the **Direct** and **Single, Indirect "1-away"** heuristics.

 - **Ex 1 and Ex2:**  `b` and `c` are direct blocking vehicles (so h=2 at minimum). Now we try to consider 1-away indirect blocking vehicles.  Neither `d` (for `b`) nor `e` (for `c`) are **indirect 1-away** blocking vehicles since both `b` and `c` can slide out of the way in the opposite direction of `d` and `e`, respectively.  So, here `h=2` would be the result from both the **Direct** and **Single, Indirect "1-away"** heuristics.






Solution state for a 2x2, 3x3, and 4x4 board:

```
+--+--+
|  | 1|
+--+--+
| 2| 3|
+--+--+

+--+--+--+
|  | 1| 2|
+--+--+--+
| 3| 4| 5|
+--+--+--+
| 6| 7| 8|
+--+--+--+

+--+--+--+--+
|  | 1| 2| 3|
+--+--+--+--+
| 4| 5| 6| 7|
+--+--+--+--+
| 8| 9|10|11|
+--+--+--+--+
|12|13|14|15|
+--+--+--+--+
```


#### Get the code

We have placed skeleton code in the `resources/{{page.hwpath}}` folder.

1. `Board` class - Implements the basic functionality of the game and stores the state of veicles and grid.  It provides the basic operations to move a vehicle, print the board, check if the game is solved, etc.  Essentially, this class has all the basic functionality for writing a program to play the game manually (without any cheat/AI) and will provide some abilities for the cheat/AI.
1. `Move` class - Used as the primary data object that the A* search algorithm uses in its open- and closed-lis. Stores a board, the g and h scores, a pointer to its parent move in the search tree, and the tile value that was slid to arrive at this move.
1. `Heap<T>` class - Your heap class from the earlier part of the HW. It will be used for the open list of your A* search algorithm.  **In this application you should choose m=2**. **You must use the heap you wrote in the previous problem.**  
1. `Solver` class - A class wrapper to implement the A* search algorithm and store the solution and statistics.
1. `Heur` (Heuristic Base & Derived classes - A polymorphic interface to compute the heuristic score for a Board.
1. Main Application (`rh.cpp`) - Implements the basic gameplay loop and processes commands entered by the user.

#### Class Notes

You should not change the interface of any member functions unless otherwise specified.  You may add other helper member functions as you deem useful.

1. **Board class** 
    - You may not alter the public interface of the `Board` class but may add data members and private helpers. Some public member functions need to be completed.
    - The `isLegalMove()`, `move()`, and `solved()` functions are "complete" and working (though you may update, as necessary).     
    - You will need to implement the `potentialMoves()`.  A move is a pair of the vehicle identifier and the amount to move that vehicle. This function  should determine all the vehicles that can move and all the different amounts they can move (positive or negative) with one potential move per combination of vehicle and movement amount.   
    - You will need to implement an `operator<()` to compare `this` board and another.  This will allow you to use `Board`s as keys in a set or map to determine uniqueness. How you decide to compare boards is your choice though you can consider converting the boards to some kind of string and utilize its comparison operators.  
    - We have proivded `operator<<` (`ostream` operator) to output the board to any ostream in a 2D text format. 
    - You will need to complete an `undoLastMove()` function to restore the previous state of the `Board`
    - Other functions which you can see in the provided code.
    
1. **Move class**
    - Each state in the A* search requires a Board configuration but also some additional metadata.  This struct specifies this metadata.  Since a `struct` is public by default, you can just access the data members from other code entities.  But it would likely help to make some constructors and possibly a destructor.  Feel free to add/change any constructors or other member functions you deem necessary.  
    - We have also setup two functors at the bottom of this file which you need to complete.  One will be used by the open-list (heap) to compare two PuzzleMove's and determine which has the smallest f-score.  Important:  To ensure we get the same answers we need to break ties in a consistent manner.  **You must follow these rules**:
      + If move1 has a smaller f-score than move2 we consider move1 < move2 to be true
      + If move1 and move2 have equal f-scores but move1 has a smaller h-score then we consider move1 < move2 to be true
      + If move1 and move2 have equal f-scores and equal h-scores and move1's Board is less-than move2's Board, we consider move1 < move2 to be true   

    The other functor is used to determine the uniqueness of two PuzzleMove's based on their boards. This will be used for the closed set so that we don't enter a duplicate move.  This functor should simply compare the the first Move's board to the second's by calling the Board class' `operator<()` and return the result.
    
1. **Heuristic derived classes**
    - So that the A* algorithm can easily use different heuristics we setup a polymorphic base class PuzzleHeuristic with a pure virtual function 
    
    `int compute(const Board& b)`
    
    This function should compute and return a heuristic score for the given board.  But how it computes this will be up to the derived class.  We have defined 3 heuristics described above.  Implement each derived class and its `compute()` function according to the descriptions above.
    
1. **Solver class**
    - This class just implements the A\* search algorithm in the `run()`.  It can be initialized with a given heuristic to be used.  It also maintains a copy of the starting board (the current configuration from which the user asked for the cheat and from which we start our A\* search), a deque to store the solution (i.e. which tiles to move and in what order to solve the board), and the number of expansions the search algorithm took. An expansion is simply a PuzzleMove that is entered into the open-list.

    At a high level your A\* search algorithm will take the initial board provided, make a PuzzleMove out of it and enter it into the open list and the closed list (so we never duplicate it again).  It will then start the process of dequeuing items from the open-list (i.e. a heap) one at a time, possibly generating new moves (expansions) and, if they aren't already in the closed-list, entering them into the open-list and closed-list (so we never duplicate them again).  To get these potential new moves, you will take the board from the move you just dequeued from the top of the open-list (heap) and call `potentialMoves()`.  This will return new "successor" boards around which you can construct new PuzzleMoves,  scoring them, setting up its previous/parent pointer, etc. and then possibly adding them to the open-list.

    Think carefully about when you are ready to delete a PuzzleMove.  Once the solution board has been found, you need to walk the move sequence back up to the initial board, collecting which tile was moved at each step.  Don't delete moves too early.  Finally, when it is time to delete moves, think carefully where they might exist (are they all in a single data structure, spread over multiple data structures, etc.).   Wherever they are make sure you delete them all to avoid memory leaks.

    You should be able to just implement the member functions specified in the header file.  Note:  we have `typedef`'d something we call a `PuzzleMoveSet`.  Use this type to create your closed-list (i.e. your closed-list will be a C++ set of PuzzleMove's but using the Board comparator functor to determine uniqueness). If you haven't seen a typedef before it is just an alias for a type (do some research on your own to see more examples).  We usually use them to shorten long typenames to something more readable for the user.  So in this case `PuzzleMoveSet` is simply replaced with `std::set<PuzzleMove*, PuzzleMoveBoardComp>`.  Also note that when you instantiate a PuzzleMoveSet you'll need to pass in an instance of your PuzzleMoveBoardComp object that the set will use as the comparator.  
    
1. **Main Application** 
    - We have started this for you in `puzzle.cpp`.  You should implement the initial setup and processing of command line arguments and then your gameplay loop (taking turns in a loop until the board is solved).  Please be sure your gameplay meets the requirements below.  When the user asks for a cheat with the cheat code you should create a PuzzleSolver and run the A* algorithm and display the solution, etc. At this point the user can choose to try the sequence (moving one tile at a time) or go their own route.

#### Functional Requirements

1. Your program shall accept 4 arguments from the command line
  - `n`, the size of the board which is the size of 1 dimension (i.e. n=2, n=3, etc.)
  - `initMoves` number of moves to be used to scramble the original board (creating a random board may lead to an unsolvable board, thus we just start with a solved board and scramble it with a given number of moves)
  - `seed` value for the random number generator
  - `heur` selection value (0=BFS, 1=TilesOutOfPlace, 2=Manhattan Distance)
1. Your program shall allow the user to play the game in turns, where a turn is defined as displaying the board, querying the user for which tile **value** (not location) should be moved, or `-1` to ask for a cheat sequence, or `0` to quit
   1. If the user enters a valid tile number then move the tile and go on to the next turn.  If the move is invalid, the provided code will catch the error and **throw an exception**.  You **MUST** catch the exception and print out the message returned by the *what()* function and then continue.
   1. If the user enters 0, cleanup and quit the program
   1. If the user enters -1, run the A* algorithm, and displaying the solution sequence and statistics, then go on to the next turn
1. Turns should continue until the board is solved at which point your program should automatically print out the solved board, perform any cleanup, and exit.
1. You shall display the board using the 2 dimensional format used above (each cell is 2 characters wide...implicitly limiting us to a 10x10 board.)  Use the `Board::printRowBanner()` to help print the top, bottom, and separator lines between the tiles.  **Important: You must output the board in the format shown in the examples below or you will fail our grading tests.**
1. A solved board has the blank tile in the upper left corner and then ascending tile values in row-major order.
1. The cheat code is -1.
1. Upon receiving the cheat code from the user, you shall find a shortest sequence of tile values to move to achieve the solved board. You shall implement an A* search using the heuristic specified from the command line argument.
1. You shall track the number of `expansions` (potential PuzzleMoves entered into the open list) and display it with the solution
1. You shall display your solution in order of the necessary moves on a single line in the form where the last move (moveM below) is the one that solves the board.  **Important:  Failure to follow this EXACT format will lead you to fail our grading tests!**

```
Try this sequence: 
move1 move2 ... moveM
(Expansions = numExpansions)
```

#### Other Requirements and Tips

1. You should have no memory leaks or invalid reads/writes as checked for in Valgrind.
1. Your A* search must be implemented correctly and return a shortest solution sequence 
1. You shall ensure your open-list (heap) compares expansions based on the algorithm for breaking ties listed above **and uses m=2**.
1. When counting expansions, we do not consider the starting state as an expansion.  Expansions are those generated through a call to `potentialMoves()`.
1. While for this particular problem it is technically fine to stop when you see the solution board/move being *added* to the openList, let us follow the general A* algorithm and stop only when we *remove/dequeue* it from the openList.

#### Memory Allocation and Ownership
A big educational goal of this project is to exercise your skill at managing memory appropriately.  To that end we will not use (nor are you allowed to use) vectors and deques in our Board class, but will instead use raw C/C++ dynamically allocated arrays.

An important concept is memory ownership.  It is fine for several "client" objects to each have a pointer to a dynamically allocated object (effectively sharing it).  But one client object must be the **owner** of that dynamic memory and thus be responsible for deallocating it when no longer needed (i.e. deleting it in its destructor).  Other client objects may have a pointer but when they are deallocated, they do NOT in turn deallocate what the pointer is point to.  In that case, we'd say the object does NOT *own* what the pointer is point to.  

Take care that you only have one owner so that you don't try to deallocate the same memory twice.  In addition, take care that an owning object does not mix pointers to dynamically-allocated objects and objects that live on the stack.  Since an owning object needs to deallocate heap-based objects and your code is unable to distinguish pointers to heap-based objects vs. stack-based objects, you generally must ensure that you only have pointers to heap-based objects. 

Also try to use good encapsulation where the owning object will delete the memory it owns in its destructor and not make some external code do it.  Finally, be sure to make deep-copies where needed.

#### Sample Executions
You may use the sample executions below to try out your program.

**Sample 1a (Tiles-Out-Of-Place)**
`./puzzle 3 70 1711 1`

```
+--+--+--+
| 4| 2|  |
+--+--+--+
| 1| 7| 5|
+--+--+--+
| 3| 6| 8|
+--+--+--+

Enter tile number to move or -1 for a cheat: -1
Try this sequence:
2 4 1 3 6 7 4 1
(Expansions = 18)

+--+--+--+
| 4| 2|  |
+--+--+--+
| 1| 7| 5|
+--+--+--+
| 3| 6| 8|
+--+--+--+
```

**Sample 1b (Manhattan Heuristic)**
` ./puzzle 3 70 1711 2`

```
+--+--+--+
| 4| 2|  |
+--+--+--+
| 1| 7| 5|
+--+--+--+
| 3| 6| 8|
+--+--+--+

Enter tile number to move or -1 for a cheat: -1
Try this sequence:
2 4 1 3 6 7 4 1
(Expansions = 15)

+--+--+--+
| 4| 2|  |
+--+--+--+
| 1| 7| 5|
+--+--+--+
| 3| 6| 8|
+--+--+--+
```

**Sample 1c (BFS)**
`./puzzle 3 70 1711 0`

```
./puzzle 3 70 1711 0
+--+--+--+
| 4| 2|  |
+--+--+--+
| 1| 7| 5|
+--+--+--+
| 3| 6| 8|
+--+--+--+

Enter tile number to move or -1 for a cheat: -1
Try this sequence: 
2 4 1 3 6 7 4 1 
(Expansions = 273)

+--+--+--+
| 4| 2|  |
+--+--+--+
| 1| 7| 5|
+--+--+--+
| 3| 6| 8|
+--+--+--+

Enter tile number to move or -1 for a cheat: 
```

**Sample 2a (Tiles-Out-Of-Place)**
`./puzzle 4 30 1537 1`

```
+--+--+--+--+
| 4| 1| 2| 3|
+--+--+--+--+
| 8| 5| 7|10|
+--+--+--+--+
| 9|13| 6|11|
+--+--+--+--+
|12|14|15|  |
+--+--+--+--+

Enter tile number to move or -1 for a cheat: -1
Try this sequence:
11 10 7 6 10 11 15 14 13 9 8 4
(Expansions = 103)

+--+--+--+--+
| 4| 1| 2| 3|
+--+--+--+--+
| 8| 5| 7|10|
+--+--+--+--+
| 9|13| 6|11|
+--+--+--+--+
|12|14|15|  |
+--+--+--+--+
```

**Sample 2b (Manhattan Heuristic)**
`./puzzle 4 30 1537 2`

```
+--+--+--+--+
| 4| 1| 2| 3|
+--+--+--+--+
| 8| 5| 7|10|
+--+--+--+--+
| 9|13| 6|11|
+--+--+--+--+
|12|14|15|  |
+--+--+--+--+

Enter tile number to move or -1 for a cheat: -1
Try this sequence:
11 10 7 6 10 11 15 14 13 9 8 4
(Expansions = 54)

+--+--+--+--+
| 4| 1| 2| 3|
+--+--+--+--+
| 8| 5| 7|10|
+--+--+--+--+
| 9|13| 6|11|
+--+--+--+--+
|12|14|15|  |
+--+--+--+--+
```
**Sample 2c (BFS Heuristic)**
`./puzzle 4 30 1537 0`

```
+--+--+--+--+
| 4| 1| 2| 3|
+--+--+--+--+
| 8| 5| 7|10|
+--+--+--+--+
| 9|13| 6|11|
+--+--+--+--+
|12|14|15|  |
+--+--+--+--+

Enter tile number to move or -1 for a cheat: -1
Try this sequence:
11 10 7 6 10 11 15 14 13 9 8 4
(Expansions = 18544)

+--+--+--+--+
| 4| 1| 2| 3|
+--+--+--+--+
| 8| 5| 7|10|
+--+--+--+--+
| 9|13| 6|11|
+--+--+--+--+
|12|14|15|  |
+--+--+--+--+
```

###Problem 5 (Runtime Comparisons 5%)

In this problem we will analyze the effectiveness of different heuristics. For each problem, you should use a board of size `4` (4x4) and `1711` as your `seed` value.   Using each heuristic in turn, run your program with increasing number of initial moves. Start with 20 and work up in increments of 20 until you reach 100 (i.e. 20,40,60,80,100) and then continue in increments of 50 (150, 200, 250, 300, etc.).  Keep re-running your program with increasing values of initial moves UNTIL the time it takes to get the cheat solution is 30 seconds or more (you can Ctrl-C to quit your program if you don't get the cheat in 30 seconds and then move on to the next heuristic).  For successful cheats (i.e. found in under 30 seconds), record the number of expansions required to find the solution.  


1. In under 30 seconds, which initial move values and how many expansions did each solution require using BFS?  Likely (depending on your machine) we would expect only around 40 initMoves to be able to be calculated for BFS in 30 seconds.
1. In under 30 seconds, which initial move values and how many expansions did each solution require using Tiles-Out-of-Place? Likely (depending on your machine) we would expect around 100 initMoves to be able to be calculated for this heuristic in 30 seconds.
1. In under 30 seconds, which initial move values and how many expansions did each solution require using Manhattan Distance? Likely (depending on your machine) we would expect around 300 initMoves to be able to be calculated for heuristic in 30 seconds.

Submit your answers in a text file named `perf.txt` in a nice table format show the number of expansions as the value of each cell if the run took under 30 seconds.  Once it took more than 30 seconds leave the rest of the entries in the column blank.


Table summarizing the number of expansions for different heuristics and initial moves.

```
initMoves    BFS     TilesOutOfPlace     Manhattan
20
40
60
80
100
150
200
...
```