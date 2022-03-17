
Suppose a company needs to schedule `d` (`needed`) out of `k` (possible) workers (e.g. nurses at a hospital) per day given their availability over an `n` day period.  The company requires exactly `d`  workers (nurses) per day but does not allow any individual to work more than `m` (`maxShifts`) shifts over the `n` day period.  Given `d`, `m`, and the `k` workers' availability for each of the `n` days, write a backtracking search function to schedule the nurses such that exactly `d` work on each of the `n` days and no one works more than `m` shifts.

```c++
typedef unsigned int Worker_T;
typedef std::vector<std::vector<bool>> AvailabilityMatrix;
typedef std::vector<std::vector<Worker_T> > DailySchedule;

bool schedule(
    const AvailabilityMatrix& avail,
    const size_t dailyNeed,
    const size_t maxShifts,
    DailySchedule& sched
);
```

We have provided a "driver"/test program (`sched-driver.cpp`) where you can alter an availability matrix and values for `d` (`dailyNeed`) and `m` (`maxShifts`) and then call your algorithm and print the results. 

Use `sched-driver` to do some sanity tests of your code before moving on to any of the tests from our grading suite.  Note:  To discourage any attempt to hard-code or game the system, the instructor may run additional tests after submission that were not provided, though they will be similar in format and content.  

### Requirements and Assumptions

 - As always you may not change the signautre of the primary function provided.
 - You MAY define helper functions in sched.cpp
 - You must use a recursive approach that follows the general backtracking structure presentedin class.  Failure to use such a recursive approach will lead to a 0 on this part of the assignment.  
 - You MAY use functions from the `algorithm` library such as `std::find` if you desire.

### Hints and Approach

Recall that a backtracking search algorithm is a recursive algorithm that is similar to generating all combinations, but skipping the recursion and moving on to another option if the current option violates any of the constraints.  It is likely easiest to recurse over each place in the schedule (think of it as a 2D matrix with the row being the day and the columns being the `d` workers assigned to work that day).  Each recursive call would be responsible for filling in one of the `n*d` schedule openings, ensuring the constraints or availability and the maximum number of shifts allowed for each worker is met.   If you have already done a lab regarding backtracking search, it would likely be beneficial to look it over. 

