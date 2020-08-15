#include <iostream>
#include "Circular_List_Int.h"
using namespace std;

int main(){
    CircularListInt test;
    test.push_back(5);
    test.push_back(6);
    test.push_back(7);
    test.set(16, 16);
    CircularListInt test2 = test;
    test.remove(1);

    size_t lsize = 0, limit = test.size();
    
    while (lsize < limit){
         cout << test.get(lsize) << endl;
         lsize++;
    } 

    cout << "printing copy before remove" << endl;
    lsize = 0, limit = test2.size();
    
    while (lsize < limit){
         cout << test2.get(lsize) << endl;
         lsize++;
    } 

    test2 = test;
    cout << "printing copy after remove" << endl;
    lsize = 0, limit = test2.size();
    
    while (lsize < limit){
         cout << test2.get(lsize) << endl;
         lsize++;
    } 

}
