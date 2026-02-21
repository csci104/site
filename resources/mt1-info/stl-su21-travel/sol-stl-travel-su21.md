---
layout: default
title: Midterm 1 Info
nav: Resources
---

# STL and ADTs Solution

**

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

    typedef set<Location> PlacesToVisitSet;
    PlacesToVisitSet toVisit_;
    // Add more data members as necessary...but no vector, deque, list
    Stack visited_;
    Stack retraced_;
};

// Add your implementation
Tourist::Tourist()
{
 visited_.push(Location());
};

// Add your implementation
bool Tourist::addPlaceToVisit(const Location& loc)
{
    PlacesToVisitSet::iterator it = toVisit_.find(loc);
    if(it == toVisit_.end()) {
        toVisit_.insert(loc);
        return false;
    }
    else {
        return true;
    } 
}

// Add your implementation
Location Tourist::current() const
{
    return visited_.top();
}

// Add your implementation
Location Tourist::previousVisit()
{
    // If more than 1 previous location, go to previous but save it
    // so we can retrace our steps
    if(visited_.size() > 1){
        retraced_.push(visited_.top()); // visited.top() = current()
        visited_.pop();
    }
    // If only 1 previous location, leave it (can't go to previous)
    return visited_.top(); // visited.top() = current()


}

// Add your implementation
Location Tourist::visitNextLocation()
{
    // if we were retracing our steps, now add them all back
    while(!retraced_.empty()) {
        visited_.push(retraced_.top()); // top()
        retraced_.pop();
    }
    // get western most location
    PlacesToVisitSet::iterator it = toVisit_.begin();
    visited_.push(*it);
    toVisit_.erase(*it);
    return *it;

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