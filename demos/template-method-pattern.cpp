#include <iostream>
#include <string>
using namespace std;

// Base class implementing the Template Method pattern
class BowlBuilder {
public:
    // Template method - defines the algorithm structure
    string makeBowl() {
        string bowl = "Bowl with ";
        bowl += chooseBase() + ", ";
        bowl += chooseProtein() + ", ";
        bowl += chooseSauce() + ", and ";
        bowl += chooseDrink();
        return bowl;
    }

    virtual ~BowlBuilder() {}

protected:
    // Protected virtual methods -
    //  steps to be implemented by subclasses
    virtual string chooseBase() = 0;
    virtual string chooseProtein() = 0;
    virtual string chooseSauce() = 0;
    virtual string chooseDrink() { return "Dr Pepper Zero"; };
};

// Derived class - Vegan bowl variant
class VeganBowl : public BowlBuilder {
protected:
    string chooseBase() override {
        return "greens";
    }
    
    string chooseProtein() override {
        return "impossible meat";
    }
    
    string chooseSauce() override {
        return "tzatziki";
    }
    
    string chooseDrink() override {
        return "Water";
    }
};

// Derived class - Traditional bowl variant
class TraditionalBowl : public BowlBuilder {
protected:
    string chooseBase() override {
        return "rice";
    }
    
    string chooseProtein() override {
        return "chicken";
    }
    
    string chooseSauce() override {
        return "pesto";
    }
    
};

int main() {
    VeganBowl veganBowl;
    TraditionalBowl traditionalBowl;
    
    cout << veganBowl.makeBowl() << endl;
    cout << traditionalBowl.makeBowl() << endl;
    
    return 0;
}
