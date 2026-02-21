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
