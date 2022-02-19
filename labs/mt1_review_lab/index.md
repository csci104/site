---
layout: asides
toc: true
tasks: true
title: Midterm Review
---

## Midterm Review

### Introduction
This lab is just for midterm review, so **there is no checkoff for this lab.**

The midterm will take place on **Friday, October 1st from 7:00-8:50pm** (see [this piazza post](https://piazza.com/class/ksgo211u37k10l?cid=861) for more details). It will cover everything up to Dijkstra and A*.

You won't be tested on any programming tools that you've gone over in lab but not lecture (e.g. gdb, Makefiles). This lab is to help you review and will mostly cover problems taken or modified from the sample midterms and quizzes under the [Resources](https://bytes.usc.edu/cs104/resources) page, as well as labs from previous semesters. If there's a topic you want to skip, or a topic that's not included here that you really want to go over, let us know! As long as this lab is, it is by no means exhaustive, so remember to go back and review lecture slides as well.

### Runtime

**[Runtime and Recursion Quiz](https://bytes.usc.edu/cs104/resources/quiz-runtime.pdf)**: 
```c++
bool ispowertwo(double x){
  if (x == 1) return true;
  if (x < 1) return false;
  if (x > 1) return ispowertwo(x/2);
}
void function1(int x){
  if (ispowertwo(x)){
    for (int i = 0; i < x ; i++)
      cout << i << endl;
  } else {
    cout << x << endl;
  }
}
void function2(int x){
  if (!(x & (x-1))){ /*condition is true if and only if x is a power of 2. Checks using bitwise and */
    for (int i = 0; i < x ; i++)
      cout << i << endl;
  } else {
    cout << x << endl;
  }
}
void function3(int n){
  for (int i = 1; i <= n; i++){
    function1(i);
  }
}
void function4(int n){
  for (int i = 1; i <= n; i++){
    function2(i);
  }
}
```

- [ ] What is the worst case runtime analysis of `function3`?
- [ ] What is the worst case runtime analysis of `function4`?

### Recursion

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
- [ ] Implement `Node* reverse (Node* head)`.

### ADTs

Abstract Data type (ADT) is a type (or class) whose behavior is defined by a set of operations.

The definition of ADT only mentions what operations are to be performed but not how these operations will be implemented. It does not specify how data will be organized in memory and what algorithms will be used for implementing the operations. It is called “abstract” because it gives an implementation independent view. The process of providing only the essentials and hiding the details is known as abstraction.

There are 5 main Abstract Data Types that you will need to know (for now): List, Stack, Queue, Map, Set.

- [ ] What are the generic operations supported by lists, stacks, queues, maps, and sets?
- [ ] What are their associated runtimes?

#### Choosing the Right ADT

**[Sample Midterm](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 2**: For each of these descriptions, indicate what ADT is appropriate to store the following information and show what types would be used for the template arguments (e.g. `map<string, int>` or `list<double>`). If you think that there are multiple equally good options, feel free to justify the choice you make. 

1. Data structure allowing you to find a book's title from its ISBN number (13 characters, mostly digits, but could contain the letter 'X'). 

2. Data structure storing the type of obstacle at each square of a 40 x 40 level of an arcade game. 

3. Waitlist of students who want to enroll in CS104, but couldn't get in yet. 

4. Data structure to store the content of each line of code in a possibly long C++ program. 

5. A data structure that allows you to input an academic semester and find all students who earned an A in CS104 that semester. 

### STL

STL stands for Standard Template Library. The C++ STL is a set of classes that include common data structures like maps, sets, lists, queues, stacks and more. In addition to data structures, STL also has some pre-implemented algorithms, that do things like fill an array with zeros, or sort a vector. 

There are several STL container classes that you'll use in this class and beyond. You can find the names of their member functions, as well as comprehensive examples of how to use them at [C++ Reference](http://www.cplusplus.com/reference/).

Here's a fun problem to work on. Using STL, think carefully about which data structure makes the most sense for the problem:

```c++
#include <string>
/*
One day, you decided to design a new keyboard, and you put all of the keys in one row.
Instead of using both hands, you decided to just use one finger at a time.
You place the keys such that it takes you one second to get from one key to each of its direct neighbors.
Given the layout of your keyboard (of 26 letters), calculate how long it will take to type a given word.
You start with your finger is at index 0.
To type a character, you have to move your finger to the index of the desired character.
The time taken to move your finger from index i to index j is |i - j| seconds.
Example 1:
Input: keyboard = "abcdefghijklmnopqrstuvwxyz", word = "cba"
Output: 4
Explanation: The index moves from 0 to 2 to write 'c' then to 1 to write 'b' then to 0 again to write 'a'.
Total time = 2 + 1 + 1 = 4.
Example 2:
Input: keyboard = "pqrstuvwxyzabcdefghijklmno", word = "csci"
Output: 39
 
Constraints:
keyboard.length == 26
keyboard contains each English lowercase letter exactly once in some order.
word[i] is an English lowercase letter.
*/

int calculateTime(std::string keyboard, std::string word);
```
- [ ] Implement `calculateTime`. We've provided skeleton code and tests for you in `resources/lab6`.

### Polymorphism & Inheritance

**[Sample Midterm](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 5**: Here is a piece of code. Tell us what it outputs. (You will get partial credit for partially correct answers.)

```c++
class Question {
public:
  Question(int v) : val(v) { }
  virtual ~Question() { cout << "d1" << endl; }
  virtual string studentResponse() = 0;
  int getValue() { return val; }
private:
  int val;
};

class NonTrivialQuestion : public Question {
public:
  NonTrivialQuestion() : Question(10) { }
  NonTrivialQuestion(int v) : Question(v) { }
  ~NonTrivialQuestion() { cout << "d2" << endl; }
  string studentResponse() { return "I got this!"; }
  int getValue() { return 15 + Question::getValue(); }
};

class DifficultQuestion : public NonTrivialQuestion {
public:
  DifficultQuestion() : NonTrivialQuestion() { }
  ~DifficultQuestion() { cout << "d3" << endl; }
  string studentResponse()
  { return "When are office hours?"; }
};

int main()
{
  Question* p[2];
  p[0] = new NonTrivialQuestion(15);
  p[1] = new DifficultQuestion;
  for(int i=0; i < 2; i++){
    cout << p[i]->getValue() << endl;
    cout << p[i]->studentResponse() << endl;
  }
  NonTrivialQuestion* q[2];
  q[0] = new NonTrivialQuestion(15);
  q[1] = new DifficultQuestion;
  for(int i=0; i < 2; i++){
    cout << q[i]->getValue() << endl;
    cout << q[i]->studentResponse() << endl;
  }
  delete p[1];
  return 0;
}
```

### Deep Copy Constructors
**[Sample Midterm](https://bytes.usc.edu/cs104/resources/midterm-b.pdf), Question 6**: Consider the following code: 

```c++
class IntArray {
public:
  IntArray(const IntArray &other);
  //other class functions are here, which you don’t need to worry about
private:
  int *myarray; //data
  int used; //number of elements in myarray
  int alloc; //number of allocated indices. Unused indices have garbage values.
};
class ArrayOfArrays {
public:
  ArrayOfArrays(const ArrayOfArrays &other);
  //other class functions are here, which you don’t need to worry about
private:
  IntArray **myarray; //an array of IntArray pointers.
  int used; //number of arrays in myarray
  int alloc; //number of allocated indices. Unused indices have garbage values.
};
```
- [ ] Implement deep copy constructors for both `IntArray` and `ArrayOfArray`
