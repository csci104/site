Build an interactive webpage that adheres to the description below.

Create a demonstration that the user can advance 1 step at a time that shows the operation of a recursive solution to generate all the combinations of a set of characters.  I'll give my reference solutions approach below, but you should let the user specify:
 - the letters
 - the length of the combinations.
 - Next, Prev, Reset buttons to advance or go back  step in the recursion
 - toggle button to show a panel to the right with the solution code and highlight what line of code is being executed. (format the code as Visual Studio Code would).

Then allow the user to step through the visual of building up each combinations via each recursion. Ideally, you'd show a blank array and how each recursion fills in one more location, trying EACH letter as an option then recursing, and upon return tries the next.

Given the c++ code below, 

void allCombosHelper(const vector<char>& letters, int n, string curr)
{
   if(n == curr.size()){
     cout << curr << endl;  
   }
   else {
      for(unsigned int i=0; i < letters.size(); i++){
         // The general pattern is:
         //  - try adding the i-th option (letter in this case)
         //  - recurse with the new 'curr' value
         //  - upon return, remove the i-th option and try the i+1-th
         //
         // Here we do that all in one line since 'curr' is passed by
         // value we can make a temp string with the i-th letter
         // and pass that copy leaving curr unchanged and ready for
         // for the next iteration (i.e. for the i+1-th letter)
       	allCombosHelper(letters, n, curr+letters[i]);  
      }
   }
}
   
// Should generate all n-length combinations of letters
// in the given vector
void allCombos(const vector<char>& letters, int n) 
{
   allCombosHelper(letters, n, "");
}

Updates 1:
- In addition to the stack can you add a graphic showing letter options vertically above and to the left of the partial solutoin string being built by the recursion and then above each letter location in the partial solution show a vertical column of the possible indexes i will take on (i.e. 0 to the k-1 if there are k letters) As the recursion progresses highlight the value of i each recursion is on. Before a recursion runs or as it ends hide the column for that recursions's i values.

Updates 2:
Can you add a "Play" feature that moves through the "Next" steps at a particular adjustable rate (maybe adjust with a slider) so we can see the whole animation for longer recursions without having to click "Next" So many times. Add a Pause button too. So we can click "Next" once we pause at a particular point.