#include <iostream>
#include <string>
#include "greeter.h"
using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cout << "Usage: " << argv[0] << " <name>" << endl;
        return 1;
    }

    string name = argv[1];
    cout << make_greeting(name) << endl;
    return 0;
}
