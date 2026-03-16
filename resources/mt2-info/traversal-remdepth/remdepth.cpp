// For this problem you may put ALL your code in this one file
// (implementation of remDepth() and helpers, and the optional main())
#include <iostream>
#include <cstdlib>
using namespace std;

// You may NOT change this struct definition
struct Node {
    int val;
    Node *left, *right;
    // Constructor for convenience
    Node(int v, Node* lt = NULL, Node* rt = NULL) :
        val(v), left(lt), right(rt)
    {}
};

// You may NOT change this function prototype
Node* remDepth(Node* root, int depth);

// You may add any prototypes of helper functions here


// Now implement the remDepth function and any necessary helpers







// -------- TEST CODE - DON'T CHANGE CODE BELOW THIS POINT ------

// Do not change this
#ifndef CS104_TEST

template <typename T>
void checkEqual(const T& exp, const T& act, const string& msg)
{
    if(exp != act){
        cout << "Equal check: " << msg << "\nExpected: " << exp << " Actual: " << act << endl;
    }
}
template <typename T>
void checkNotEqual(const T& exp, const T& act, const string& msg)
{
    if(exp == act){
        cout << "Not equal check: " << msg << "\nExpected: " << exp << " Actual: " << act << endl;
    }
}

// This is a simple test of your code on 1 tree as a sanity check .
int main( )
{
    const size_t t1Size = 9;
    Node* t1[9];
    for(size_t i = 0; i < t1Size; i++)
    {
        t1[i] = new Node(i);
    }
    // Make the tree
    Node* root1 = t1[5];
    t1[5]->left = t1[1]; t1[5]->right = t1[6];
    t1[1]->left = t1[0]; t1[1]->right = t1[4];
    t1[4]->left = t1[3];
    t1[3]->left = t1[2];
    t1[6]->left = t1[7];
    t1[7]->left = t1[8];


    // Call your function
    root1 = remDepth(root1, 3);

    // Check the structure
    checkEqual(t1[5], root1, "Root pointer is node 5.");
    checkEqual(t1[1], root1->left, "Left child of root is node 1.");
    checkEqual(t1[6], root1->right, "Right child of root is node 6.");
    checkEqual(t1[0], t1[1]->left, "Left child of node 1 is node 0.");
    checkEqual(t1[4], t1[1]->right, "Right child of node 1 is node 4.");
    checkEqual(t1[7], t1[6]->left, "Left child of node 6 is node 7.");
    checkEqual((Node*)nullptr, t1[6]->right, "Right child of node 6 is null.");
    checkEqual((Node*)nullptr, t1[0]->left, "Left child of node 0 is null.");
    checkEqual((Node*)nullptr, t1[0]->right, "Right child of node 0 is null.");
    checkEqual((Node*)nullptr, t1[4]->left, "Left child of node 4 is null.");
    checkEqual((Node*)nullptr, t1[4]->right, "Right child of node 4 is null.");
    checkEqual((Node*)nullptr, t1[7]->left, "Left child of node 7 is null.");
    checkEqual((Node*)nullptr, t1[7]->right, "Right child of node 7 is null.");
    checkEqual(5, t1[5]->val, "Node 5 value is 5.");
    checkEqual(1, t1[1]->val, "Node 1 value is 1.");
    checkEqual(6, t1[6]->val, "Node 6 value is 6.");
    checkEqual(0, t1[0]->val, "Node 0 value is 0.");
    checkEqual(4, t1[4]->val, "Node 4 value is 4.");
    checkEqual(7, t1[7]->val, "Node 7 value is 7.");
    
    // This should delete all remaining nodes, freeing memory
    root1 = remDepth(root1, 0);
    checkEqual((Node*)nullptr, root1, "Root should be nullptr");    
    return 0;
}


#endif
