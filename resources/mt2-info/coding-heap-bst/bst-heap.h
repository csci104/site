#ifndef BST_H
#define BST_H

#include <iostream>
#include <exception>
#include <cstdlib>
#include <utility>

template <typename Key>
class Node {
public:
    Node(const Key& key, Node<Key>* parent);
    const Key& getKey() const { return key_; }
    Key key_;
    Node<Key>* parent_;
    Node<Key>* left_;
    Node<Key>* right_;
};

/**
* Explicit constructor for a node.
*/
template<typename Key>
Node<Key>::Node(const Key& key, Node<Key>* parent) :
    key_(key),
    parent_(parent),
    left_(NULL),
    right_(NULL)
{ }

/**
* A templated unbalanced binary search tree.
*/
template <typename Key>
class BST {
public:
    BST() { root_ = nullptr; }
    ~BST() { clear(); }
    // Inserts a new key into the BST
    void insert(const Key& key);
    // Removes the node with the given key from the BST
    void remove(const Key& key);
    // deletes all nodes from the BST.
    void clear(); 
    // returns true if the BST is empty
    bool empty() const { return root_ == nullptr; }
    
protected:
    // Helper function - returns a pointer to the node with
    // the given key OR nullptr if the key doesn't exist
    Node<Key>* internalFind(const Key& k) const;
    // Finds the successor of the given node
    Node<Key>* successor(Node<Key>* current) const;
protected:
    Node<Key>* root_;
};

// -------------------------------------------------------------
//  Assume the BST class above was implemented correctly.
//  Now complete the implementation of the Heap class
// -------------------------------------------------------------
template <typename Key>
class Heap /* your choice */
{
public:
    Heap();
    ~Heap();
    void push(const Key& newKey);
    void pop();
    const Key& top() const;   // throws std::out_of_range if empty
    bool empty() const;
private:
    // add any data members as necessary
};


template<typename Key>
Heap<Key>::Heap()  // add code below as necessary

{
    
}

template<typename Key>
Heap<Key>::~Heap()  // add code below as necessary
{
     
}

// Add implementations for the remaining member functions


#endif
