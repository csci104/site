#include <iostream>
#include "classifier.h"

using namespace std;

class Fruit : public Record {
public:
    Fruit(string_set features) : _features(features) {}
    string_set features() const { return this->_features; }
private:
    const string_set _features;
};


int main() {
    Classifier<Fruit> classifier({"banana", "orange", "other"}, {"long", "sweet", "yellow"});
    return 0;
}
