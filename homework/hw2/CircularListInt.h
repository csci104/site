
#ifndef CIRCULAR_LIST_INT_H
#define CIRCULAR_LIST_INT_H

// ----------------------------------------
// CS104 HW2 Problem 1 skeleton header
// ----------------------------------------
#include <memory>

// class to hold a circular list of integers.

// STUDENTS: you may not modify this header except by adding private member 
// variables and functions at the point marked below.
class CircularListInt
{
	// holds data about one item in the list.
	// a circular chain of these constitutes the list.
	struct Item
	{
		int value;

		// links to other items in the circular list.
		std::shared_ptr<Item>  next;
		std::shared_ptr<Item>  prev;

		// default no=argument constructor
		Item():next(nullptr), prev(nullptr) {}

		// default copy constructor
		Item(Item const & other) = default;

		// simple constructor that sets value
		Item(int itemValue): value(itemValue), next(nullptr),prev(nullptr) {}
                ~Item(){} 
	};

	// ------------------------------------------

	// STUDENTS: add additional private members here
	
	// ------------------------------------------

	// number of items in the list
	size_t count = 0;

	// pointer to current head of list (index 0)
	std::shared_ptr<Item> head;

        // slb suggestion
        std::shared_ptr<Item> tail; 

public:

	// standard no-argument constructor
	CircularListInt(): head(nullptr), tail(nullptr){}

	// copy constructor
	CircularListInt(CircularListInt const & other);
	
	// assignment operator
	CircularListInt& operator=(CircularListInt const & other);

	// Destructor. Should delete all data allocated by the list. 
	~CircularListInt();

	// Gets item at an index.
	// If an index is passed that is larger then the number of items in the list, it should "wrap around" back to the first element.
	// If there are no elements in the list, returns 0.
	int get(size_t index) const;

	// get length of list.
	size_t size() const;

	// returns true iff the list is empty.
	bool empty() const;

	// Inserts (a copy of) the given item at the end of list.
	void push_back(int value);

	// Sets the item at the given index to have the given value.
	// If an index is passed that is >= the number of items in the list, it should "wrap around" back to the first element.
	void set(size_t index, int value);

	// Removes the item at the given index from the list.
	// List elements after the removed element are pulled forward, so their indicies decrease by one.
	// If an index is passed that is larger then the number of items in the list, it should "wrap around" back to the first element.
	void remove(size_t index);

};

#endif
