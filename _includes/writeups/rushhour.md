
#### Overview

In this application you will use the A\* algorithm to "efficiently" solve a puzzle game where **vehicles** in a square 2D grid (aka the **board**) must be **moved** (by sliding) to allow a certain vehicle (vehicle `a` in our program) to **escape** off the right side of the board by moving right along its given row.  To start, a **Board** (i.e. the 2D grid) that shows the initial layout of vehicles (each identified by a character `a`, `b`, `c` and so on...) will be provided and read in by the program.  We guarantee vehicle `a` is always facing horizontally and is the vehicle we want to help **escape** by moving off the right side of the board. Vehicle `a` may start in any row.  Other vehicles must be slid horizontally and vertically in the board to allow vehicle `a` to escape.  Most of the examples we give will be a 6x6 board to match the classic game, but your program should work for LARGER board sizes.  

**If you are unfamiliar with the game, an online version is available to try (with ads...sorry) [at this site](https://www.playit-online.com/puzzle-onlinegames/rush-hour/)**.

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

Here we see the **escape** vehicle `a` positioned horizontally in row 2. Where `a` is located in the escape row (i.e. in which columns it is located) may vary. For consistency, we will number the rows and columns from 0, starting at the upper left corner. 

**Each vehicle will be of length 2 or more** and be positioned HORIZONTALLY or VERTICALLY. The user can then choose the vehicle to slide by entering its letter **identifier** as well as a **postive or negative** amount of positions to move.  We will use the covention that **positive** amounts mean **right** or **down** for horizontal and vertical vehicles, respectively, while **negative** amounts mean **left** or **up** for horizontal and vertical vehicles, respectively.

For the example above, the game can be won by moving `c` by an amount -2 (2 to the left), `b` by an amount 3 (3 down), and then `d` by an amount 1 (1 down) as shown below.  Note: there are other potential combinations to win, but the optimal solution can be done in 3 moves.

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

Note the game ends as soon as `a` has an open path to its right to escape.

#### Review the A* algorithm
Recall that A* chooses the move with smallest f-value to explore next.  Note:  `f = g + h` where `g = distance (number of moves made)` from the start state while `h` is a score produced by a heuristic evaluation of the move.  Please take some time to review the algorithm presented in class (slides, notes, etc.).  We will use the following heuristics:

- **Brute-force**: Returns h=0...this causes A* to degenerate to a Breadth-first search

- **Direct blocking vehicles**: Counts the number of vehicles to the right of the escape vehicle in its row (i.e. number of vehicles directly blocking its escape).

```
Ex.             Ex.         
   ee.c..        .ddee.    
   ...c..        .ffc..    
-> aabc..        ..bc..    
   ..b...     -> aabc.g     
   ..b...        ..b..g     
   .ddd..        ......     

   h = 2         h = 3
```

*Note:* the `->` is not printed or part of the input but just shown on this writeup to highlight the escape row.

In the first example (above and to the left), h=2 because `b` and `c` are in `a`'s row and blocking it from escape.  In the next example, `b`, `c`, and `g` are in `a`'s row and blocking it.

- **Indirect blocking vehicles**: (Read this carefully a few times) Counts the **direct** blocking vehicles (defined just above) **AND** what we define as  **indirect** blocking vehicles.  At a high level, an **indirect blocking vehicle** is one that blocks a **direct blocking vehicle** from making a **necessary** move to clear the escape row.  To compute **indirect blocking** vehicles, you will need to iterate through each **direct** blocking vehicle and check the following:

For a vehicle to qualify as an indirect blocking vehicle it must satisfy this criterion:

  - Be above or below a *direct blocking vehicle* that has **ONLY 1** viable path to clear the escape row and is being blocked by this vehicle (i.e. the *direct blocking* vehicle's length precludes it from clearing the escape row in one direction and the *indirect blocking* vehicle is blocking its ability to clear the escape row in the other direction). 

This implies that if a *direct blocking vehicle* can move up or down to clear the escape row, then by definition there cannot be an *indirect blocking vehicle* associated with that *direct blocking vehicle*. Furthermore if the *direct* blocked vehicle has the option to move BOTH up OR down to clear the escape path but is blocked by vehicles in both directions, then we do **NOT** consider those as *indirect* blocking vehicles since it does not have **ONLY 1** viable path to clear the escape row.  This somewhat counterintuitve choice to **not** count those vehicles above and below the *direct* blocked vehicle is explained later in more detail and pertains to the requirements of the heuristics we use in order for A* to produe an **optimal** solution.  Let's look at some examples to illustrate what vehicles should be counted in this heuristic and which should not.  

In the following examples, the direct blocking vehicles can move out of the way without requiring another vehicle to move. 

```
Ex. 1         Ex. 2         
   ...ee.        ..d...       
   ......        ..d...       
-> aabc..        ..b...       
   ..bc..     -> aabc..      
   ..d...        ...c..       
   ..d...        ...ee.      
    
   h = 2         h = 2
```

In example 1, `b` can move up while `c` can move down to clear the escape row. Thus, **neither** `d` **nor** `e` are *indirect* blocking vehicles.

```
Ex. 3         Ex. 4        
   ee.c..        .ddee.    
   ...c..        .ffc..    
-> aabc..        ..bc..    
   ..b...     -> aabc..     
   ..b...        ..b...     
   .ddd..        ....gg     

   h = 3         h = 5
```

In example 3, `b` nor `c` can move up to clear the escape row because of thier length. Their only viable option to clear the escape row is to move down, but `d` is blocking those moves.  Thus, we add `d` to our heuristic score to obtain **h=3** (notice we should only count `d` once since a single move may be sufficient to clear the path for `b` and `c`).  

In example 4, neither `b` nor `c` can move down to clear the escape row due to their length, thus, they must move up, but `d` and `f` MUST move to allow `b` to clear the escape route.  Thus, we count them in our heuristic.  `e` is blocking `c` and so we count it as well to obtain a heuristic score of **h=5**.

The tougher case for our heuristic to count correctly arises when a *direct blocking vehicle* is blocked in both the up and down directions by another vehicle.  We will **NOT** define one or the other as an *indirect* blocking vehicle BECAUSE **it is not immediately obvious which one should be moved**.  For reasons you will learn if/when you take CS 360 (AI), heuristics must **underestimate** the number of moves to a solution if A* is to *guarantee* an optimal solution. When only a *single* vehicle above or below (but not both) is blocking a direct blocking vehicle, it is clear the vehicle MUST be moved and would not be an overestimate of the number of moves required to solve the puzzle. However, when a **direct** blocking vehicle has a vehicle above AND below that precludes it from clearing the escape row, which one to move may not be obvious and, if we choose wrong, can lead to an overestimate, thus nullifying the guarantee of an optimal solution.   So, in these scenarios, we will not count EITHER of the vehicles above or below in our heuristic. (If one of those vehicles is the only vehicle blocking some **other direct** blocking vehicle from clearing the escape row, we may count it when we process that **other direct** blocking vehicle).


```
Ex. 5          Ex. 6         Ex. 7
   .ee...        .ddee.        .ee.gg
   ...c..        ...c..        ..bc.d
-> aabc..     -> aabc..     -> aabc.d
   ..bc..        ..b...        ...c.h
   ..b...        ..ff..        ..fffh
   .dd...        ....gg        ......

   h = 3         h = 2         h = 4
```

In example 5, we notice `b` is blocked in the up direction by `e` and in the down direction by `d`.  However, `d` still meets the criteria of an **indirect** blocking vehicle because `b`'s length would never allow it to clear the escape row by moving up in the first place. Thus, `e` should not influence `b` from identifying `d` as the ONLY blocking vehicle.  Thus, the heuristic score is 3 (`d` and the **two direct blocking vehicles**).

In example 6, `b`'s length does NOT preclude it from moving up or down to clear the escape row, but it is blocked in the up and down direction (by `d` and `f`) so we count neither `d` nor `f`.  Similarly, `c` could potentially clear the escape row in either direction, but is also blocked in both directions by `e` and `f`.  So we do not count either of those. Thus, the final heuristic score is 2 (the count of the **direct** blocking vehicls, `b` and `c`). 

In example 7, `b`'s length does NOT preclude it from moving up or down to clear the escape row, but it is blocked in the up and down direction (by `e` and `f`) so we count neither `e` nor `f`.  When `c` is examined, we see that it cannot move up because of its length and `f` is blocking it in the downward direction, so `f` does meet the criteria for an **indirect blocking** vehicle and is thus counted (even though it wasn't counted when `b` is processed).  When `d` is processed, we find that it is not too long to move up or down to clear the escape row, but it is also blocked in both the up and down direction (by `g` and `h`) and thus we do count neither `g` nor `h`.  This leads to the heuristic value of 4 (`f` and the **three direct blocking** vehicles). 

One last note:  We could devise a way to count which vehicle to choose to move when a direct vehicles is block above and below, but heuristics should be **fast** to compute and solving which vehicle to choose to move is akin to solving the whole problem.  Thus, we use our simplified approach.

#### Code overview

We have placed skeleton code in the `resources/{{page.hwpath}}` folder.

1. `Board` class - Implements the basic functionality of the game and stores the state of veicles and grid.  It provides the basic operations to move a vehicle, print the board, check if the game is solved, etc.  Essentially, this class has all the basic functionality for writing a program to play the game manually (without any cheat/AI) and will provide some abilities for the cheat/AI.
1. `Move` class - Used as the primary data object that the A* search algorithm uses in its open- and closed-lists. Represents a possible move storing a board (with its vehicle configuration), the g and h scores of the move, a pointer to its parent move in the search tree, and the vehicle and move amount pair that led from the parent move to this move.

1. `Heap<T>` class - Your heap class from the earlier part of the HW. It will be used for the open list of your A* search algorithm.  **In this application you should choose m=2**. **You must use the heap you wrote in the previous problem.**  

1. `Solver` class - A class to implement the A* search algorithm and store the solution and statistics that the client can then retrieve after running the A* algorithm.

1. `Heur` (Heuristic Base & Derived classes - A polymorphic interface to compute the heuristic score for a Board as well as the three derived implementations (BFS, Direct, and Indirect).

1. `Stack<T>` class - You will need to use your Stack class from the prior problem to implement some feature of this gameplay. Look for where it would be most appropriately used.

1. Main Application (`rh.cpp`) - Implements the basic gameplay loop and processes commands entered by the user.

#### Class Notes

You should not change the interface of any member functions unless otherwise specified.  You may add other helper member functions as you deem useful.

1. **Board class**: Please refer to the comments and documentation in `board.h` which serves as requirements along with this document.

    - You may not alter the public interface of the `Board` class but may add data members and private helpers. Some public member functions need to be completed.
    - The `isLegalMove()`, `move()`, and `solved()` functions are "complete" and working (though you may update, as necessary).     
    - You will need to implement the `potentialMoves()`.  A move is a pair of the vehicle identifier and the amount to move that vehicle (positive or negative). This function should determine all the vehicles that can move and all the different amounts they can move (positive or negative) with one potential move per combination of vehicle and movement amount.  For the board below the potential moves would be:
    
    `(a,1) (c,-1) (c,-2) (d,-1) (d,-2) (d,1) (d,2)`

  ```
  ...b..
  ...b..
  aa.b.d
  ..cccd
  ......
  ......
  ```    
  - You will need to implement an `operator<()` to compare `this` board and another.  This will allow you to use `Board`s as keys in a set or map to determine uniqueness. How you decide to compare boards is your choice though you can consider converting the boards to some kind of string and utilize its comparison operators.  
  - We have proivded `operator<<` (`ostream` operator) to output the board to any ostream in a 2D text format. 
  - You will need to complete an `undoLastMove()` function to restore the previous state of the `Board`. Follow the documentation in the `board.h` header file.
  - Other functions which you can see in the provided code.
    
2. **Move class**
    - Each state in the A* search requires a Board configuration but also some additional metadata.  This struct specifies this metadata.  Since a `struct` is public by default, you can just access the data members from other code entities.  But it would likely help to make some constructors and possibly a destructor.  Feel free to add/change any constructors or other member functions you deem necessary.  
    - We have also setup two functors at the bottom of this file which you need to complete.  One will be used by the open-list (heap) to compare two PuzzleMove's and determine which has the smallest f-score.  Important:  To ensure we get the same answers we need to break ties in a consistent manner.  **You must follow these rules**:
      + If move1 has a smaller f-score than move2, we consider move1 < move2 to be true
      + If move1 and move2 have equal f-scores but move1 has a smaller h-score, then we consider move1 < move2 to be true
      + If move1 and move2 have equal f-scores and equal h-scores and move1's *Board* is less-than move2's *Board*, we consider move1 < move2 to be true   

    The other functor is used to determine the uniqueness of two PuzzleMove's based on their boards. This will be used for the closed set so that we don't enter a duplicate move.  This functor should simply compare the the first Move's board to the second's by calling the Board class' `operator<()` and return the result.
    
3. **Heuristic derived classes**
    - So that the A* algorithm can easily use different heuristics we setup a polymorphic base class Heuristic with a pure virtual function 
    
    `size_t compute(const Board& b)`
    
    This function should compute and return a heuristic score for the given board.  But how it computes this will be up to the derived class.  We have defined 3 heuristics described above.  Implement each derived class and its `compute()` function according to the descriptions above.  It will likely be **much easier** to define some helper functions to do subtasks as you compute the heuristic score (like finding a vehicle up or down, etc.).
    
4. **Solver class**
    - This class just implements the A\* search algorithm in the `run()`.  It can be initialized with a given heuristic to be used.  It also maintains a copy of the starting board (the current configuration from which the user asked for the cheat and from which we start our A\* search), an appropriate data structure (your choice) to store the solution (i.e. the sequence of moves that are needed to solve the game), and the number of expansions the search algorithm took. An expansion is simply a PuzzleMove that is entered into the open-list.  It roughly estimates the amount of work the algorithm performs.

    At a high level your A\* search algorithm will take the initial board provided, make a PuzzleMove out of it and enter it into the open list and the closed list (so we never duplicate it again).  It will then start the process of dequeuing items from the open-list (i.e. a heap) one at a time, possibly generating new moves (expansions) and, if they aren't already in the closed-list, entering them into the open-list and closed-list (so we never duplicate them again).  To get these potential new moves, you will take the board from the move you just dequeued from the top of the open-list (heap) and call `potentialMoves()`.  This will return new "successor" boards around which you can construct new `Move`s, scoring them, setting up its previous/parent pointer, etc. and then possibly adding them to the open-list.

    Think carefully about when you are ready to delete a `Move`.  Once the solution board has been found, you need to walk the move sequence back up to the initial board, collecting which vehicles (and amounts) were moved at each step.  Don't delete `Move`s too early.  Finally, when it is time to delete moves, think carefully where they might exist (are they all in a single data structure, spread over multiple data structures, etc.).   Wherever they are make sure you delete them all to avoid memory leaks.

    You should be able to just implement the member functions specified in the header file.  Note:  we have `typedef`'d something we call a `MoveSet`.  Use this type to create your closed-list (i.e. your closed-list will be a C++ set of PuzzleMove's but using the Board comparator functor to determine uniqueness). If you haven't seen a typedef before it is just an alias for a type (do some research on your own to see more examples).  We usually use them to shorten long typenames to something more readable for the user.  So in this case `MoveSet` is simply replaced with `std::set<Move*, MoveBoardComp>`.  Also note that when you instantiate a PuzzleMoveSet you'll need to pass in an instance of your PuzzleMoveBoardComp object that the set will use as the comparator.  

    If no solution exists, `solution()` should return an empty list
    
    To debug your `run()` function, it may help to add `cout` commands to print a note when you dequeue a `Move` from the PQ (printing out its relevant info) and then add `cout`s to print each successor `Move` that you generate and their relevant info.  Then when you run a program you can see what your code is doing and compare it to what you know it should do (tracking it on paper, etc.).

5. **Main Application** 
    - The main application is written in `rh.cpp` and is **COMPLETE**.  We accept two command line arguments:
      - `input-board-file` the text file containing the 2D board (we have provided several example boards in the `boards/` subfolder that you can use as input)
      - `heur` selection value (0=BFS, 1=Direct, 2=Indirect)
    - The menu is printed on each turn.  The input options are:
      - A move given by the vehicle ID and an amount (negative amounts mean up/left while positive amounts mean down/right). An example is `c -1`.
      - `?` to run the A* algorithm to find an optimal solution and display it to the user.
      - `Q` to quit the game
      - `Z` to undo the previous move (and pressing `Z` again will undo the move before that, if it exists)



#### Other Requirements and Tips

1. You should have no memory leaks or invalid reads/writes as checked for in Valgrind.
1. Your A* search must be implemented correctly and return a shortest solution sequence.  There **MAY BE MANY POTENTIAL SHORTEST SOLUTIONS**. Any that you return is fine. Our tests will simply ensure the solution ties for the shortest and that the solution moves lead to a solved board.  
1. You shall ensure your open-list (heap) compares Moves based on the algorithm for breaking ties listed above **and uses m=2**.
1. While for this particular problem it is technically fine to stop when you see the solution board/move being *added* to the openList, let us follow the general A* algorithm and stop only when we *remove/dequeue* it from the openList.

#### Memory Allocation and Ownership
A big learning goal of this project is to exercise your skill at managing memory appropriately.  An important concept is memory ownership.  It is fine for several "client" objects to each have a pointer to a dynamically allocated object (effectively sharing it).  But one client object must be the **owner** of that dynamic memory and thus be responsible for deallocating it when no longer needed (i.e. deleting it in its destructor).  Other client objects may have a pointer but when they are deallocated, they do NOT in turn deallocate what the pointer is pointing to.  In that case, we'd say the object does NOT *own* the object being pointed to.  

Take care that you only have one "owner" so that you don't try to deallocate the same memory twice which will lead to a segfault and/or other memory errors.  In addition, take care that an owning object does not mix pointers to dynamically-allocated objects and objects that live on the stack.  Since your code is unable to distinguish pointers to heap-based objects vs. stack-based objects, you generally must ensure that you only have pointers to dynamically allocated objects if you are going to delete them. 

Also try to use good encapsulation where the owning object will delete the memory it owns in its destructor and not make some external code do it.  

#### Sample Executions
You may use the sample executions below to try out your program.

**Sample 1 - `inboard0.in` (Indirect heuristic)**

If we ran this command line:

```bash
./rh boards/inboard0.in 2
```

And then we entered `?`, followed by `Z`, followed by `Q`, we would see this:

```bash
...b..
...bee
aa.b.d
.....d
...c..
...c..
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : ?
No Solution exists!

...b..
...bee
aa.b.d
.....d
...c..
...c..
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : Z
No move to undo

...b..
...bee
aa.b.d
.....d
...c..
...c..
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : Q
Don't give up that easily!
```

**Sample 2 - `inboard1.in` (Indirect heuristic)**

Running on this input:

```bash
./rh boards/inboard1.in 2
```

And then entering `?` should yield the solution shown, which we can then enter as moves to solve the game.

```
...b..
...b..
aa.b.d
..cccd
......
......
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : ?
Solution found with expansions: 19
d 2
c -2
b 3

...b..
...b..
aa.b.d
..cccd
......
......
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : d 2

...b..
...b..
aa.b..
..ccc.
.....d
.....d
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : c -2

...b..
...b..
aa.b..
ccc...
.....d
.....d
Enter a vehicle and move amount (+ = dn/rt, - = up/lt), 'Q', '?', or 'Z' : b 3

......
......
aa....
cccb..
...b.d
...b.d
You win!
```

Note: For `boards/inboard1.in` a **BFS** heuristic (0) yields **72** expansions and a **direct** heuristic (1) yields **30**.  The **indirect** heuristic (2) yields **19** expansions.  Again, there may be some variation on this number based on how you implemented your Board `operator<` (i.e. how ties are broken).

#### Testing

You can crowd source the output of your A* solutions on various boards and how many expansions were required.  But for the basic boards it should be easy enough to verify the solution.

#### More Background

A video overview of some of the relevant object/class relationships and how the A* algorithm works **[is available here](https://ee.usc.edu/~redekopp/Streaming/cs104/20221/cs104-sp22-hw3-rh-expl/cs104-sp22-hw3-rh-expl.html)**.