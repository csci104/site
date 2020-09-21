---
layout: asides
toc: true
tasks: true
title: Midterm Review
---

## Midterm Review

### Introduction

The midterm will take place on **Friday, September 25th, 7-9 PM PDT**. and will cover all material from weeks 1 - 5, up to and including templates and exceptions. More details will be posted on Piazza.

You won't be tested on any programming tools that you've gone over in lab but not lecture (e.g. gdb, Makefiles). This lab is to help you review and will mostly cover problems taken or modified from the sample midterms under the [Resources](https://bytes.usc.edu/cs104/resources) page. If there's a topic you want to skip, or a topic that's not included here that you really want to go over, let us know! As long as this lab is, it is by no means exhaustive, so remember to go back and review lecture slides and weekly group exercises as well.

### Lab Survey

Before jumping into the review, please take a moment to take this survey about your lab experience. We will read the feedback carefully and do our best to implement it!

Link: [Lab Survey](https://forms.gle/6GHFtYEhcv1ohoKt5)

Alright... onto the questions!

### Operator Overloading and `const` Keyword

**[Sample Midterm B](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 1d**: Consider the following function signature. Explain the rationale behind the choice of return value. 
`ostream& operator<< (ostream& o, const LinkedList &ll);`

- [ ] Explain the rationale behind the choice of return value. 

**[Sample Midterm A](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 1a**: Consider the declaration of the following `Map<K,V>` class member function: 
```
template <class K, class V>
V const & Map<K,V>::get(const K& key) const
{ ... }
```
- [ ] Explain what each of the 3 `const` keywords (ordered from left to right) will cause the compiler to check/enforce: 

### Rule of 3

Recall that the rule of 3 is used when we have an object that uses dynamically allocated memory. This rule is a good way to maintain good memory management and ensures that objects are correctly using their own memory and not sharing. This rule consists of 3 functions: Copy Constructor, Destructor, Assignment Operator. If you need to refresh your memory, you can revisit [Lab 3](https://bytes.usc.edu/cs104/labs/lab3/).

#### Conceptual

**[Sample Midterm A](https://bytes.usc.edu/cs104/resources/midterm-a.pdf), Question 1c**: Suppose that you have a class which requires a deep copy. Which functions must you define? (Mark all that apply.)

1. Copy constructor
2. Destructor
3. Assignment operator 


- [ ] Select which functions you must define.

#### Implementing Deep Copy Constructors

**[Sample Midterm B](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 6**: Consider the following code: 
```
class IntArray {
  public: 
    IntArray(const IntArray& other); 
    // other class functions are here, which you don't need to worry about
  private: 
    int* myarray; // data
    int used; // number of elements in the array
    int alloc; // number of allocated indices. Unused indices have garbage values
}; 
class ArrayOfArrays {
  public: 
    ArrayOfArrays(const ArrayOfArrays& other); 
    // other class functions are here, which you don't need to worry about
  private: 
    IntArray** myarray; // an array of IntArray pointers
    int used; // number of arrays in myarray
    int alloc; // number of allocated indices. Unused indices have garbage values
}; 
```
- [ ] Implement deep copy constructors for both `IntArray` and `ArrayOfArrays`. 

### ADTs

Abstract Data type (ADT) is a type (or class) whose behavior is defined by a set of operations.

The definition of ADT only mentions what operations are to be performed but not how these operations will be implemented. It does not specify how data will be organized in memory and what algorithms will be used for implementing the operations. It is called “abstract” because it gives an implementation independent view. The process of providing only the essentials and hiding the details is known as abstraction.

There are 5 main Abstract Data Types that you will need to know (for now): List, Stack, Queue, Map, Set.

- [ ] What are the generic operations supported by lists, stacks, queues, maps, and sets?
- [ ] What are their associated runtimes?

#### Choosing the Right ADT

**[Sample Midterm B](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 2**: For each of these descriptions, indicate what ADT is appropriate to store the following information and show what types would be used for the template arguments (e.g. `map<string, int>` or `list<double>`). If you think that there are multiple equally good options, feel free to justify the choice you make. 

1. Data structure allowing you to find a book's title from its ISBN number (13 characters, mostly digits, but could contain the letter 'X'). 

2. Data structure storing the type of obstacle at each square of a 40 x 40 level of an arcade game. 

3. Waitlist of students who want to enroll in CS104, but couldn't get in yet. 

4. Data structure to store the content of each line of code in a possibly long C++ program. 

5. A data structure that allows you to input an academic semester and find all students who earned an A in CS104 that semester. 

- [ ] Indicate which ADT is appropriate for each of the above scenarios. Remember to justify your answer!

### STL

STL stands for Standard Template Library. The C++ STL is a set of classes that include common data structures like maps, sets, lists, queues, stacks and more. In addition to data structures, STL also has some pre-implemented algorithms, that do things like fill an array with zeros, or sort a vector. 

There are several STL container classes that you'll use in this class and beyond. You can find the names of their member functions, as well as comprehensive examples of how to use them at [C++ Reference](http://www.cplusplus.com/reference/).

#### STL Maps

In the STL map, the following operations are all logarithmic: search, removal and insertion. You'll learn later in the semester how the STL map achieves this logarithimic runtime, but for now, just remember that these operations are ```O(log(n))```.

#### Iterators

To loop through every element in our map in linear time, we can use an iterator. Our code will look something like this: 

```
std::map<std::string, std::string>::iterator it;
for(it = myMap.begin(); it != myMap.end(); ++it)   
{
  std::cout << it->first << std::endl;
  std::cout << it->second << std::endl;
}
```
This for loop will take linear time.

Note that this isn't too different from the for loop you'd write to iterate through an array. Instead of starting at index 0, though, we start at the first element in the map data structure by using the `begin()` function.

STL Iterators also *overload* the operator '++', which moves an iterator to the next element. 

Note that our terminate condition of the for loop is ``` it != myMap.end() ```. myMap.end() points past the last element in your map so that your loop stops at the last element. Conceptually, this is just like in our typical for loops that we use to iterate over lists — we stop when `i == size`, which is the last index of our list + 1;

Incrementing or deferencing `end()` will cause undefined behavior, because it's not pointing at an actual element in your map. 

#### Inserting into a Map

There are two basic ways we can insert into a map. There is `insert()` , which only adds the specified element if the key is not already in the map. If the key does exist, insert() does nothing.

We can also insert using the overloaded `operator[]` to index into the map. Unlike `insert()`, using `operator[]` will overwrite the value if the key exists. 

Here's an example of both ways to insert.

```
myMap.insert(std::make_pair("Key", "Value")); // Inserts the pair
myMap["Key"] = "Overwrites Previous Value"; // Overwrites "Value"
myMap.insert(std::make_pair("Key", "This should do nothing")); // Does nothing, because "Key" was already in the map
``` 

#### Finding Elements in a Map

To find an element, we can use the `find()` function. This returns an iterator pointing to the key-value pair, if found. If it wasn't found, it returns a pointer to `end()`. For example:

```
std::map<std::string, std::string>::iterator it = myMap.find("Key");
if (it != myMap.end()) // we found the element
{
  std::cout << it->first << " has value " << it->second << std::endl; 
}
```

We can also use the `operator[]` to retrieve the element if the key exists. 

```
std::string var = myMap["Key"];
```

If the key does not exist, and we try to access it using `[]`, this will insert a new element into the map with the given key. 

- [ ] What do you think the value would be?

We've learned that we can find elements in a map using 'myMap.find("Key")'.
 
Take a look at the following code snippet (which is relatively commmon, when students first start using maps). Let's say we want to return true if a certain key is in the map.

```
std::map<std::string, std::string>::iterator it;
for(it = myMap.begin(); it != myMap.end(); ++it)   
{
  if (it->first == "myKey") {
    return true;
  }
}

return false;
```

- [ ] Does this code work? What is the runtime? What is the major problem with this approach? What is a better way to solve this problem?

#### Removing Elements in a Map

To remove a single element, we use the `erase()` function. This accepts an iterator or a key as a parameter. 

We can remove like this:

```
myMap.erase (myMap.find("Key")); 
```

`find()` returns an iterator pointing to the object containing "Key". There is undefined behavior if iterator is invalid (i.e. `end()`), so don't call erase unless you know that the key is in the set.

or, we can just do:

```
// This first searches for an object containing "Key", then removes it
myMap.erase ("Key");
```

To remove all elements, use the clear() function.

**NOTE:** Successfully erasing or inserting an item from a map will **change the map's internal structure** and therefore invalidate the iterator pointing to the removed element. In other words, we can't use an iterator that we passed into erase in order to look at the next element.

```
myMap.insert(std::make_pair("K1", "V1"));
myMap.insert(std::make_pair("K2", "V2"));
std::map<std::string, std::string>::iterator it = myMap.find("K1"); // it points to a valid position in myMap
myMap.erase(it);
++it; // !!! UNDEFINED BEHAVIOR !!! it is no longer valid after its element has been removed from myMap
```

#### STL Sets

The STL set class is similar to a map, but we only have keys (no values). Keys are unique, and again, we can use `insert()`, `erase()`, and `find()`. We can also use iterators to walk through all the elements in a set. Again, `find()` is logarithmic, and iterating through the set is linear. Here's a code snippet.

```

// insert into the set
set<string> radioStations;
radioStations.insert("KCRW");
radioStations.insert("KXSC");
string stationName = "KPWR";
radioStations.insert(stationName);

// iterating through the set
for(set<string>::iterator it=radioStations.begin(); it != radioStations.end(); ++it)
{
  // note that we don't have the concept of it->first or it->last, because there are no values, only keys
  cout << "Station: " << *it << endl;
}

stationName = "KPWR";

// find an element
if(radioStations.find(stationName) != radioStations.end()){
  cout<< stationName + " is a radio station!" << endl;
}
else {
  cout<< "Couldn't find this station!" << endl;
}

radioStations.erase("KCRW"); // remove KCRW from the set of names
// if we try to find "KCRW" now, find() will return radioStations.end()

```

#### Using STL Stack to Implement a Game for Young Children
**[Sample Midterm A](https://bytes.usc.edu/cs104/resources/midterm-a.pdf), Question 5**: Imagine that you are writing a simple game for young children to learn to recognize and match shapes. For our purposes, shapes are restricted to squares and circles. Shapes arrive over time and fall on a stack of items.

At each point, the child may press one of two buttons, 'L' and 'R'. 'L' should be the button to press if there is a square on top, and 'R' if there is a circle on top. More precisely, the rules are as follows: 

- If the child presses the correct button ('L' when the top shape is a square, 'R' when it is a circle), the child gets a point, and the top shape disappears. 
- If the child presses the wrong button ('L' when the top shape is a circle, 'R' when it is a square), the chold loses a point (the points could become negative), and no shape disappears. 
- If the child presses a button when the stack is empty, nothing happens. 
- The game starts at 0 points. 
- Items appear at a regular pace, and their appearance has nothing to do with what buttons are pressed. 
- The game may end even when there are still items left. 

You will be given a sequence consisting of the letters 'L', 'R', 'S', 'C' (representing the pressing of the two buttons, and the arrival of the two shapes, respectively), and are to determine from it the final score of the child. We promise that the sequence will only contain only those four letters, and nothing else. 

As an example, for the sequence "SCLLR", the final score will be -1, and there will be a square left in the end. The two presses of the 'L' button are wrong, so each incurs a penalty of 1 point and changes nothing. The press of 'R' is correct, so it earns a point and makes the circle disappear, but the square remains. 

Hint: the use of a stack is strongly recommended. So much that we already enter `#include<stack>` for you. That gives you a templated `stack<T>` class, which provides the functions `void push(T), void pop(), T top()`, and `bool isEmpty()`. You can use this without defining your own stack. 

Insert your code in the following: 

```
#include <stack>
#include <iostream>
using namespace std; 

int main() {
  string s; // the sequence of characters describing the game's events
  int score = 0; 
  cin >> s; 
  // your code goes here
  cout << "The score is " << score << endl; 
  return 0; 
}
```
- [ ] Implement `main`

### Recursion
Past midterms have almost always included problems on linked list recursion. There are many variations of linked list recursion problems you can find online, but here are a couple to get you started.

#### Printing a Singly Linked List

**[Sample Midterm A](https://bytes.usc.edu/cs104/resources/midterm-a.pdf), Question 2**: In this problem, we will work on a singly linked list of integers. The items are of the following type: 

```
struct IntItem { 
  int value; 
  IntItem* next; 
  IntItem (int v, IntItem* n) { value = v, next = n; }
}; 
```
Write a *recursive* function `printLL` to print all items in the linked list in the order in which they appear in the list, on one line. For full credit, you should print an endline after the last number, but you will get most of the credit if you do not print it. Your function *must* be recursive, and it must fit the following definition: `void printLL (IntItem* head)`

- [ ] Implement `void printLL (IntItem* head)`

#### Reversing a Singly Linked List

You are given the head pointer to a linked list. Implement a function that returns a Linked List in the reverse order (e.g. 1->3->5 becomes 5->3->1). You should not declare new items but instead modifying pointers of existing elements.

```
struct Node {
  int val; 
  Node* next; 

  Node(int v) : val(v), next(NULL) {}
  Node() : val(0), next(NULL) {}
}; 

Node* reverse (Node* head) {
  // TODO 
}

// Example usage
int main() {
  Node* head = new Node(1); 
  head->next = new Node(3); 
  head->next->next = new Node(5); 

  Node* new_head = reverse(head); // should get 5->3->1
}
```
- [ ] Implement `Node* reverse (Node* head)`

### Design Problems, Exceptions, Templates, and Inheritance

What should you do when something goes wrong in your functions? In the past, we've done things like returning a special value (like -1), couting an error message, and more.

The best way to handle errors it to use exceptions. Exceptions let the function caller (the code that calls the function) decide how they want to handle the error, and they let you have cleaner code.

``` 
try {
    cout << L->get(3);
}
catch (OutOfBoundsException &e) { 
       cout << "Array Index was out of Bounds" << endl;
    }
// specific treatment when index is out of bounds
catch (exception &e) { 
cout << "General Type of exception" << endl; 
}
```

A try block can have multiple catch blocks for different exceptions. The first catch block that matches the exception will execute first, so more specific exceptions should come before more general exceptions. What would happen if we reversed the order?

- [ ] Understand how to use `throw`, `try`, and `catch` statements.


#### Implementing LimitedList, using Exceptions

Modified from **[Sample Midterm B](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 7**: A `LimitedList` is a modified version of a `List` that has a capacity it should not exceed. Given the below header file, complete the implementation for `LimitedList::insert (int i, const T & item)`. Some of it has already been completed for you. You can assume all other member functions work as expected. You can also assume an exception `CapacityException(int capacity)` has already been written for you. 

```
class LimitedList {
  public: 
    LimitedList(int capacity); 
    /* creates a list fixed to this capacity. It can still grow and shrink with insert/remove, but if an insert would make the size exceed the capacity, it will throw an exception. */

    void set (int i, const string& item); // Exactly the same as standard set
    const string& get (int i) const; // Exactly the same as standard get
    void remove (int i); // Exactly the same as standard remove

    void insert (int i, const string& item) {
      /* almost the same as standard insert, except that if the list is full, it will throw an exception rather than resizing. In the case of the exception being thrown, it will not alter the list. */
      if ( /* TODO - condition to check if exception should be thrown */ ) {
        /* TODO - throw the exception */



      }

      standardInsertHelper (int i, const string& item); 
    }
  
  protected: 
    int find (const string& item) const; 
    /* returns the first location at which item is stored in the list. Returns -1 if the item isn't in the list */

  private: 
    void standardInsertHepler (int i, const string& item); // Exactly the same as standard insert
    int capacity; 
    int size; 
}; 
```

#### Templating LimitedList

What if a user wants to use a `LimitedList` of `int`s? In order to use the same kind of data structure for different data types, we'll have to make a copy of the code, change almost every single mention of `string` to `int`. Doing so creates a lot of code that is repeated unnecsesarily, violating a software engineering principle called [**Don't Repeat Yourself (DRY)**](http://en.wikipedia.org/wiki/Don't_repeat_yourself). 

Through templates, however, we can treat a type as a variable, and use it as the type in class definition. Later, when a user declares a templated object with a particular type, the compiler will substitute in the user-speficied type to generate a version of your implementation with this type.

To write a templated class, you must: 

- Precede the class with ` template <typename T> ` or ` template <class T> `.
- Use T wherever you want to use your generic type
-  Precede the definition of each function with
template ` <typename T> `
- In the scope portion of the class member
function, add `<T>`

Templated functions must have their implementations in header files! This is different from what we normally do, as we typically put our implementations in a .cpp file.

- [ ] Given the above header file for `LimitedList`, modify it to make `LimitedList` a templated class such that the elements in the list are of type `T`. You do not need to modify the implementations of any functions; just rewrite their function signatures if needed. 

#### Implementing a Forgetful Brain
Modified from **[Sample Midterm B](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 7**: In this problem, you will be implementing a data structure for a "forgetful brain". The waya forgetful brain works is as follows: it has a fixed and limited capacity for facts (which for our purposes are just strings). Initially, your brain is empty. As you learn more facts, they are added to the brain. When the brain is full, any newly added fact displaces one that was previously there, meaning that you forget the previous fact. Which fact gets displaced? The one that was used least recently. There are two ways in which your brain can use a fact: (1) Learning a new fact is using it; that is, you remember the things you learned recently. (2) You can deliberately recall a fact. 

As an example, suppose that your brain has a capacity of 3 facts, and you learn A, B, C in order. Then, you recall A, and then you learn D. At this point, B is the least recently used fact, so you forget B in order to learn D. When you learn E, you next forget C, and if you learn F, you forget A. If instead, you recalled A again before learning F, then you would next forget D. The `Brain` class thus looks as follows:

```
class Brain {
  public: 
    Brain (int capacity); 
      // Create a new Brain with the given fixed capacity
    void remember (const string& fact); 
      /* access the fact, i.e., mark it as freshly remembered. 
         We will never ask you to remember a fact that you haven't learned */
    void learn (const string& fact);
      /* add the given fact to the brain, and mark it as freshly remembered.
         If the brain is full, throw out the least recently used fact
         to make room for the newly added fact. */
}; 
```

In order to implement `Brain`, you should use your *templated* `LimitedList<T>` class. 

- [ ] How should you use `LimitedList` to build `Brain`? Inheritance (if so, what type), composition, or other? Why?

- [ ] Give an implementation of the `Brain` class by adding your code in the following piece of code. 

```
class Brain
// relevant code here if you want
{
  public: 
    Brain (int capacity) 
    {

    }
    
    void remember (const string & fact) 
    {

    }

    void learn (const string & fact) 
    {

    }
  
  private: // any data or methods you would like to add
}; 
```

#### Static vs. Dynamic Binding
**[Sample Midterm B](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 1b**:

```
#include <iostream> 
class BaseClass {
  public: 
    virtual ~BaseClass() {}; 
}; 
class SubClass : public BaseClass {}; 
int main() {
  SubClass* s = new BaseClass; 
  delete s; 
  return 0; 
}
```
- [ ] Identify and explain any errors you see in the above code.

