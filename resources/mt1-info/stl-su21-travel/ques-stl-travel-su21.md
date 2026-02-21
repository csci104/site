---
layout: default
title: Midterm 1 Info
nav: Resources
---

# STL and ADTs (10 pts.)

**Complete the skeleton code below.**

In this problem you may only use: `map<K,V>`, `set<K>`, `stack<T>`, and `queue<T>`. **No vector, deque, or list.**

Tommy, the forgetful tourist, enjoys travelling around the country. You will write a class `Tourist`, to help him plan and track his travels. This class will implement 4 primary functions:

- `addPlaceToVisit()`
- `visitNextLocation()`
- `currentLocation()`
- `previousVisit()`

Tommy talks to people who tell him about fun **locations** he should visit. Locations are represented by the name of the place and its x,y coordinates (e.g. latitude and longitude). He adds them to his "places to visit itinerary" via a call to `addPlaceToVisit()` which should quickly check if they are already on his itinerary of places to visit, and if not, store the location. When he's ready to travel to the next location he calls `visitNextLocation()` which chooses a new place to visit, removes it from his places to visit, and updates his current location. By default you can choose any place on his itinerary to go next, but for bonus points, you should ensure that he visits places on his itinerary in order from **west to east** (i.e. `visitNextLocation()` should always give the *west-most (lowest x-value)* unvisited location).

Further, he wants to track where he's visited because he often leaves one of his belongings somewhere he visited and needs to keep going back to previous locations to find his lost belongings. This process is accomplished by (potentially many) calls to `previousVisit()` which should retrace the locations he visited before his current location from **most-to-least recently visited**. To keep things simple, once he finds his item at a location, the next call to `visitNextLocation()` should resume his travels by going to the next *new* place to visit (rather than returning back through the same locations he was just at looking for his items).

As an example, suppose Tommy hears about locations: **B, A, C, A, E, D** and adds them to his places to visit (removing the duplicate A). By making multiple calls to `visitNextLocation` he visits to **A, B, C**, then **D** (let's assume these are in west-to-east order).  At location **D** he realizes he left his USC hat somewhere. By making calls to `previousVisit()` he will retrace his steps to **C** and then **B** at which point he finds his hat. From there a call to `visitNextLocation` would yield the only unvisited location that remains on his places to visit: **E**. But if he arrives at **E** and realizes he also lost his earbuds, a new sequence of calls to `previousVisit()` should yield **D, C, B**, and so on. Thus, when we return to previously visited locations we cannot forget that order but must restore those locations when we start traveling to new locations via calls to `visitNextLocation`.

Any other behavior not specified here is left to your discretion. (You need not add any features we have not specified.) However, you must adhere to the runtime requirements given in the function prototypes in the `Tourist` class declaration.


```c++
#include <iostream>
#include <iomanip>
#include <string>
#include <map>
#include <set>
#include <stack>
#include <queue>
using namespace std;

// struct to store an x,y "geo"-location of a place to visit
struct Location { 
    double x,y;
    string name;    
    Location() : name("Home"), x(0), y(0) {}
    Location(string n, double myx, double myy) :
        name(n), x(myx), y(myy) {}
    bool operator<(const Location rhs) const 
    {
        return x < rhs.x 
            || (x == rhs.x && y < rhs.y) 
            || (x == rhs.x && y == rhs.y && name < rhs.name);
    }    
};
ostream& operator<<(ostream& os, const Location loc)
{
    os << loc.x << "," << loc.y << " " << loc.name;
}

// convenience typedef's for Stack and Queue
typedef stack<Location> Stack; 
typedef queue<Location> Queue; 
// Add more typedef's for sets, maps, lists, etc. if desired.

class Tourist {
public:
    // Default constructor -- should start from 0,0 "Home" location
    // (i.e. that should be your current location)
    Tourist();
    // Adds a location to visit if it does not already exist
    // Returns true if it existed already, false otherwise 
    // Must run in O(log n)
    bool addPlaceToVisit(const Location& loc);
    // Returns the current Location
    // Must run in O(1)
    Location current() const;
    // Returns the new location visited just before the current location
    // if no previous location exists, returns the current location
    // Must run in O(1)
    Location previousVisit();
    // Goes to the next location.  Must run in O(log n)+O(r) 
    // (r is the number of locations revisited 
    //  since the last call to this function)
    Location visitNextLocation();
private:
    // Modify this as needed


};


// Add your implementation
Tourist::Tourist()  
{

}   

// Add your implementation
bool Tourist::addPlaceToVisit(const Location& loc)
{

}

// Add your implementation
Location Tourist::current() const
{

}

// Add your implementation
Location Tourist::previousVisit()
{


}

// Add your implementation
Location Tourist::visitNextLocation()
{

}


// Sample test that mirrors the example in the writeup.
// Again you can get a large majority of credit even if your code
// doesn't pass the tests.  Only debug if you truly have time at
// the end.
int main()
{
    Location places[] = {
        {"B", 2,4},
        {"A", 1,5},
        {"C", 3,3},
        {"A", 1,5},
        {"E", 5,1},
        {"D", 4,2},
    };
    Tourist t1;
    cout << boolalpha;
    for(int i=0; i < 6; i++){
        cout << "Adding: " << places[i] << " " << t1.addPlaceToVisit(places[i]) << ".";
        cout << " Current = " << t1.current() << endl;
    }
    for(int i=0; i < 4; i++){
        t1.visitNextLocation();
        cout << "Visit next location. Current = " << t1.current() << endl;
    }
    for(int i=0; i < 2; i++){
        cout << "Retracing to " << t1.previousVisit() << endl;
    }
    t1.visitNextLocation();
    cout << "Visit next location. Current = " << t1.current() << endl;
    for(int i=0; i < 3; i++){
        cout << "Retracing to " << t1.previousVisit() << endl;
    }
    return 0;
}
```