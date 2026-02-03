# Solution: Shape Game (Stacks and Coding)

## Problem Summary
Children play a shape-matching game where:
- Shapes (S=square, C=circle) fall onto a pile
- Children press buttons (L=left for square, R=right for circle)
- Correct button press: +1 point, shape disappears
- Wrong button press: -1 point, shape stays
- Empty pile button press: no effect

Given a sequence of events (S, C, L, R), calculate the final score.

## Solution

```cpp
#include <iostream>
#include <stack>
using namespace std;

int main ()
{
    string s; // the sequence of characters describing the game's events
    int score = 0;
    cin >> s;
    
    // Use a stack to keep track of the pile of shapes
    stack<char> shapes;
    
    // Process each event in the sequence
    for (int i = 0; i < s.length(); i++) {
        char event = s[i];
        
        if (event == 'S' || event == 'C') {
            // A shape arrives - push it onto the stack
            shapes.push(event);
        }
        else if (event == 'L') {
            // Child presses L button (expecting a square)
            if (!shapes.empty()) {
                if (shapes.top() == 'S') {
                    // Correct! Square on top
                    score++;
                    shapes.pop();
                }
                else {
                    // Wrong! Circle on top
                    score--;
                }
            }
            // If empty, nothing happens
        }
        else if (event == 'R') {
            // Child presses R button (expecting a circle)
            if (!shapes.empty()) {
                if (shapes.top() == 'C') {
                    // Correct! Circle on top
                    score++;
                    shapes.pop();
                }
                else {
                    // Wrong! Square on top
                    score--;
                }
            }
            // If empty, nothing happens
        }
    }
    
    cout << "The score is " << score << endl;
    return 0;
}
```

## Explanation

The solution uses a **stack** data structure because:
1. Shapes pile up (most recent on top)
2. We only interact with the top shape
3. Stack provides LIFO (Last In, First Out) behavior

### Algorithm Steps:
1. Create an empty stack to hold shapes
2. For each event in the sequence:
   - **'S' or 'C'**: Push the shape onto the stack
   - **'L' (left button)**:
     - If stack is empty: do nothing
     - If top is 'S' (square): correct! Add 1 point, remove shape
     - If top is 'C' (circle): wrong! Subtract 1 point, keep shape
   - **'R' (right button)**:
     - If stack is empty: do nothing
     - If top is 'C' (circle): correct! Add 1 point, remove shape
     - If top is 'S' (square): wrong! Subtract 1 point, keep shape
3. Output final score

## Example Trace

For sequence `"SCLLR"`:

| Event | Stack State | Action | Score |
|-------|-------------|--------|-------|
| Start | empty | - | 0 |
| S | [S] | Push square | 0 |
| C | [S, C] | Push circle | 0 |
| L | [S, C] | Wrong! Top is C, expected S | -1 |
| L | [S, C] | Wrong! Top is C, expected S | -2 |
| R | [S] | Correct! Top is C, remove it | -1 |
| End | [S] | - | **-1** |

Final score: **-1** ✓

## Time Complexity
O(n) where n is the length of the input sequence - we process each character once.

## Space Complexity
O(n) worst case if all events are shapes and no buttons are pressed, the stack could hold all shapes.
