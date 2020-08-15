#include <memory>
#include "Circular_List_Int.h"

// class to hold a circular list of integers.


CircularListInt::CircularListInt(CircularListInt const & other){
         size_t i = 0, limit = other.size();
         while(i < limit){
	    this->push_back(other.get(i));
            i++;
         }
}
	
	// assignment operator
CircularListInt& CircularListInt::operator=(CircularListInt const & other){
         if (this == &other) return *this; //check for self-assignment
         while (!this->empty()) this->remove(0); //deallocate old memory
         size_t i = 0, limit = other.size(); //make new copy
         while(i < limit){
	    this->push_back(other.get(i));
            i++;
         }

         return *this;   
}

	// Destructor. Should delete all data allocated by the list. 
CircularListInt::~CircularListInt(){
    while(!this->empty()){
         this->remove(0);
    }

}

	// Gets item at an index.
	// If an index is passed that is larger then the number of items in the list, it should "wrap around" back to the first element.
	// If there are no elements in the list, returns -1.
int CircularListInt::get(size_t index) const {
      if (count == 0) return -1;
      size_t i = 0;
      std::shared_ptr<Item> temp = head;
      while (i < index) {
             temp = temp->next;
             i++;
       }
       return temp->value;
}

	// get length of list.
size_t CircularListInt::size() const {
       return count;
}

	// returns true iff the list is empty.
bool CircularListInt::empty() const {
	return (count == 0);
}

	// Inserts (a copy of) the given item at the end of list.
void CircularListInt::push_back(int value) {
        if (count == 0){
           head = std::make_shared<Item>(value);
           tail = head;
           head->next = head;
           head->prev = head;
        } else {

           std::shared_ptr<Item> tmp = tail;
           tail = std::make_shared<Item>(value);
           tail->next = head;
           tail->prev = tmp;
           tmp->next = tail;
           head->prev = tail;
        }
        count++;
}

	// Sets the item at the given index to have the given value.
	// If an index is passed that is >= the number of items in the list, it should "wrap around" back to the first element.
void CircularListInt::set(size_t index, int value){
        if (count == 0) return;
        size_t i = 0;
        std::shared_ptr<Item> temp = head;
        while (i < index) {
             temp = temp->next;
             i++;
        }
        temp->value = value;
}

	// Removes the item at the given index from the list.
	// List elements after the removed element are pulled forward, so their indicies decrease by one.
	// If an index is passed that is larger then the number of items in the list, it should "wrap around" back to the first element.
void CircularListInt::remove(size_t index){
        if (count == 0) return;
        if (count == 1) {
           head->next.reset();
           tail->next.reset();
           head->prev.reset();
           tail->prev.reset();
           head.reset();
           tail.reset();
           count--;
           return;
        }
        size_t i = 0;
        std::shared_ptr<Item> temp = head;
        while (i < index) {
             temp = temp->next;
             i++;
        }
        std::shared_ptr<Item> prev = temp->prev;
        std::shared_ptr<Item> next = temp->next;
        prev->next = next;
        next->prev = prev;
        if (temp == head) head = next;
        if (temp == tail) tail = prev;
        count--;
}
