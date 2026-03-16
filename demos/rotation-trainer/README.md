Make a trainer similar to the avl-trainer and heap-trainer, but this is related to how to code left and right rotations in a BST (especially an AVL tree).

The source code I'm working off of is:


#include <iostream>
using namespace std;

struct Node {
    int key;
    Node* left;
    Node* right;
    Node* parent;
    Node(int k, Node* p = nullptr, Node* lc = nullptr, Node* rc = nullptr) :
     key(k), left(lc), right(rc), parent(p) {}

};

int whichChild(Node* n) {
    if(n->parent == nullptr) { return 0; } // has no parent
    else if(n->parent->left == n) { return -1; } // is left child
    else { return 1; } // is right child
}

void rotateRight(Node* n) {
    Node* p = n->parent;
    Node* lc = n->left;
    Node* rlc = lc->right;

    if(p != nullptr) {
        if(whichChild(n) == -1) {
            p->left = lc;
        } else {
            p->right = lc;
        }
    }
    lc->parent = p;

    lc->right = n;
    n->parent = lc;

    n->left = lrc;
    if(lrc != nullptr) {
        lrc->parent = n;
    }
}

void rotateLeft(Node* n) {
    Node* p = n->parent;
    Node* rc = n->right;
    Node* rlc = rc->left;

    if(p != nullptr) {
        if(whichChild(n) == -1) {
            p->left = rc;
        } else {
            p->right = rc;
        }
    }
    rc->parent = p;

    rc->left = n;
    n->parent = rc;

    n->right = rlc;
    if(rlc != nullptr) {
        rlc->parent = n;
    }
}



What I want you to do is let them click a:
* Left rotate button
* Right rotate button

Show a node n and child (lc or rc) and then randomly decide if:
- n has a parent, and if so is it a left child or right child of p
- lc has a right child (lrc or rlc)
- n has the other child (not involved in the rotation)
- lc (or rc) has a left child (or rc has a right child)

Then given the node, show the lines of code of hte solution (and some additional `if` checks whether certain parents, or children are null) in random order on the right and make them drag in each line to a valid ordering. When they click submit, verify if that particular ordering of code will correctly work or may segfault or does not produce the correctly rotated tree.  Show an error and maybe a description of what is wrong. Again each line should be able to be dragged over to an area (likely in the middle) to build a code sequence that you'll check for corectness when they click submit.

Don't require them to use all lines and remember to add additional (unnecessary) `if` statement to check pointers that we know exist (like for a rightRotate that lc exists on n)

CAn you not put the if check and the body together but keep those as separate lines and when I drag it allow me to drag it into the if statement or after

the tree graphic (child and parent edges don't render right and connect the nodes.) The way you rendered the tree in the avl-trainer was great, can you use that.

The parent connection is still looks wrong. It's right on top of the node (so no edge appears).

Also, for the coding, can you model the if statements like Scratch or block-based programming does where the code for the if statemnt is shown and then empty brackets {} are part of that draggable if condition, but then you have to drag a line of code into the {}? Yea, really try to model it after scratch programming blocks.