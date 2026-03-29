Base this interactive webpage demo on what is already in ../combos-recursion

Build an interactive webpage that adheres to the description below.

Create a demonstration that the user can advance 1 step at a time that shows the operation of a recursive solution to generate all binary combinations.  I'll give my reference solutions approach below, but you should let the user specify:

 - the length of the combinations.
 - Next, Prev, Reset buttons to advance or go back  step in the recursion
 - toggle button to show a panel to the right with the solution code and highlight what line of code is being executed. (format the code as Visual Studio Code would).

Then allow the user to step through the visual of building up each combinations via each recursion. Ideally, you'd show a blank string and how each recursion fills in one more location, trying EACH 0 or 1 as an option then recursing, and upon return tries the next.

Given the c++ code below, 

// user interface
void binCombos(int len)
{
  binCombos("", len);
}

// helper-function
void binCombos(string prefix,
               int len)
{
  if(prefix.length() == len )
    cout << prefix << endl;
  else {
    // recurse
    binCombos(prefix + "0", len);
    // recurse
    binCombos(prefix + "1", len);
  }
}


Updates 1:
- In addition to the stack can you add a graphic above each location in the partial solution show a vertical column of the possible values 0 or 1 that it will take on. As the recursion progresses highlight the value of each recursion . Before a recursion runs or as it ends hide the column for that recursions location

Updates 2:
Can you add a "Play" feature that moves through the "Next" steps at a particular adjustable rate (maybe adjust with a slider) so we can see the whole animation for longer recursions without having to click "Next" So many times. Add a Pause button too. So we can click "Next" once we pause at a particular point.