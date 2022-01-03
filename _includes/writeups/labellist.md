## LabelList (Multi-level Doubly-Linked List)

### How To Approach This Assignment

We use this homework not just as a coding exercise but to teach aspects of C++, object-oriented design, and rationale for certain data structure choices.  Several of these aspects are discussed in the Motivation and Background Information sections.  Links to other examples or reference material are often provided. Take time to consider these, read more on your own, and ask questions. We recommend you read through the entire assignment once or twice before even considering code (though you can look at the skeleton files, especially the header file for reference).  

**** Layout an approach to incremental implementation and testing.

### Introduction

This exercise will build your linked list skills and confidence and ability in using pointers.  You will implement a multi-level, doubly-linked list of *labelled messages* that models something akin to an email mailbox and allows messages to be members of mulitple, user-defined **labels**.  All messages are part of the default `all` label, while new labels may be defined at any time by the user.  Each label is represented by a separate doubly-linked containing only those messages that are members of that label.  Messages can be part of any number of labels with a next/previous pointer for each label list, as shown in the diagram below.

<img src="{{site.baseurl}}/homework/img/labellist.png" alt="drawing" id="responsive-image"/>

New messages are always added to the end of the `all` list. Once added, they can be labelled or unlabelled, as desired.  Messages can also be deleted (removed) permanently.  New labels need not be created explicitly by the user, but the first time a label is applied to a message, a new list should be created and the message will added to that new list.  For example, if a `fam` (short for `family`) label is applied to message 1 then a new label is added to the list of labels and the index where that label is added becomes the index in the vector of the next and previous pointers in each message that is a member of that label, which will require resizing those vectors in the node. (Note that only member messages need to have their next/previous vectors resized, while as messages that are not a member of the new label need not be modified).

![img](assets/labellist-label.png)


When a message is unlabeled, it is simply removed from the corresponding list.  

![img](assets/labellist-unlabel.png)


Removing a message should delete the entire message node, first unlinking it from all lists of which it is a member.

![img](assets/labellist-remove.png)


### Approach and Motivation

Many possible data structures can be implemented to support these operations.  For example, one could simply store all messages in a single linked list or vector and then use a separate vector per label that stores pointers to the messages that are members of that label. This would lead to a vector of vectors iemplementation.  


However, such an approach lacks two key features we would like to support.  
   1. First, having obtained a pointer or reference to a message, we would like to be able to quickly (roughly constant time) find neighboring (next/previous) messages of a different label.  If we had a separate vector per label, we'd need to perform a new search within the new label's vector for the current message to then find its neighbors. 
   2. Second, erasing a message should be a constant time operation.  Again, we do not want to have to search for the message pointer/reference in each label's vector.

![img](assets/labellist-motivation1.png)
![img](assets/labellist-motivation2.png)

Thus, we have chosen to use a multi-level, doubly-linked list approach.  In this implementation, we will have a vector of labels and a vector of head pointers (1 head pointer per label) stored in the `LabelList` object.  The index of a label stored in the label vector should correspond to the index of that label's head pointer.  Each message node we add will have a vector of previous and next pointers as well as a vector of booleans indicating whether the message is a member of the label that corresponds to that level/index.

A further benefit of this approach is that if the client obtains a pointer to a message and then other messages are erased, the original message pointer will still be valid. Unlike vectors where removing an item may shift other elements up to new indices/addresses and thus invalidate pointers held by third parties, the linked list approach allows an item to remain at the same memory address throughout its lifetime and keeps any pointers/references valid, even as other elements are added or removed.

### Basic Implementation

#### LabelList class

The primary `LabelList` class requires only two vectors as data members: a vector of labels (`labels_`) and a vector of head pointers (`heads_`).  These two vectors should always be the same size.  As new labels are added, new lists (via new head_ pointers) are added to their respective vectors.

All the operations to add, remove, label, unlabel, find, and print messages (that belong to particular labels) will be implemented in the `LabelList` class.  

#### MsgNode

To model a message and its next/previous pointers, a nested struct `MsgNode` has been created to store the actual `string` that contains the message, vectors for next and previous pointers, and a vector of `bool`s to indicate membership of the given label.  This struct is similar to the typical `Item` struct that is often defined for a linked list. As a design point, you may want to consider if the `bool`s are needed or if simply setting both next and previous pointers to `nullptr` would suffice to indicate that a node is NOT a member of a given label.

#### MsgToken

One goal of object-oriented design is **encapsulation** which usually means giving only the minimum access necessary to third parties.  We want/need to provide the client some way of referencing a particular message and performing operations on it (accessing the message, navigating to neighboring messages for a given label, etc.). However, if we simply returned a pointer to a `MsgNode` the client would have access to the public members of the `MsgNode` struct. Instead, to limit access to only the operations we want to expose to clients, we define a `MsgToken` class that internally (privately), stores a pointer to a paritcular `MsgNode` as well as the overall `LabelList` that the `MsgNode` belongs to and provides public functions to access the message or navigate to the next or previous messages of a given label.  

**A look ahead:**  You should shorlty learn about `iterator`s in the C++ STL container library.  This `MsgToken` object is very similar and should help the concept of iterators make more intuitive sense in the future.

![img](assets/labellist-msgtoken.png)


### C++ and Background Information

There are several features of C++ that are used in the given `LabelList` implementation, but may be unfamiliar.  Read below to understand some of these features.  It would help to open the provided `labellist.h` and reference the provided code as each feature is described.

#### Forward declarations

Suppose two classes each contain pointers to each other. Which would you define first?  One could not be fully defined without defining the other.  And `#include` statements wouldn't work because each would need to `#include` the other.  


```c++
class TypeA {
  TypeB b;
};
```

```c++
class TypeB {
  TypeA a;
};
```

To break the dependence, we can use a forward *declaration*.  A forward *declaration* states a class/struct will exist and be defined without providing its definition (i.e. data and function members).  Given a forward declaration **NO objects of that type can be declared**, BUT **pointers and references to that type CAN BE declared**.

Thus, the example above could be made to work using these forward declarations:

```c++
// forward declaration
class TypeB;

class TypeA {
  TypeB* b;  // pointer to TypeB can be used
};
```

```c++
// forward declaration
class TypeA;

class TypeB {
  TypeA* a;  // pointer to TypeA can be used
};
```

We use that approach in our `LabelList` to `typedef` a vector of `MsgNode*` before we actually define `MsgNode`, since it will contain those vectors as members.

#### Friend classes

Recall the motivation for the `MsgToken` class is to provide an access mechanism to 3rd-party clients without exposing the underlying structure of (and access to) our `MsgNode`.  However, we may want the `LabelList` methods to access private members or construct `MsgToken`s differently than the public interface.  Thus, we use C++'s `friend` declaration.  Classes can indicate that a particular non-member function **OR another class** is a `friend` and thus can access private members of the class.  Thus the `MsgToken` class specifies the `LabelList` as a `friend` class.  Note: `friend` declarations are one way (just because `A` declares `B` as a friend class, `A` is not automatically a friend of `B`.  However, because we are using nested types and `MsgToken` is a member of `LabelList`, then members have access to other members.  So as a member of `LabelList`,  `MsgToken`s have access to other `LabelList` members, such as `findLabelIndex`, etc. 

Notice we also have two constructors for `MsgToken`.  The defaults constructor `MsgToken()` allows 3rd party clients to declare `MsgToken` objects but prevents initialization of its members to anything but an invalid state.  This forces clients to then assign the token with the return values produced by `LabelList` members (like `add()` or `find()`).  The initializing constructor `MsgToken(MsgNode* node, LabelList* list)` is private, so that only the friend `LabelList` class can use it to create valid tokens.  This again requires clients to use the `LabelList` interface to generate valid tokens. 

#### Static members

Often, certain data members or constants may be the same for **ALL** instances of the object and need not require a separate data member (storage) in each object.  Instead, we can define the data member once and have it be shared by all objects.  `LabelList` defines two static members:  the constant `size_t INVALID_LABEL` and the `MsgToken end_`.  `INVALID_LABEL` is used as the return value to the helper function `findLabelIndex` to indicate a non-existent label.  `end_` is returned by any `LabelList` member functions such as `find()` if the desired message cannot be found, or when attempting to advance to the next or previous message when none exists.

 Once declared in the class with the `static` keywork, static members should generally be instantiated and initialized in the `.cpp` (though for integral values, newer versions of C++ allow them to be defined inline in the header file).  We intialize `INVALID_LABEL` to `(size_t)-1` since `-1` is all 1s in binary and will be the largest unsigned value when **cast to an unsigned type**.  We construct `end_` in the `labellist.cpp` implementation.  You can see that it looks like a global variable declaration, but is preceded with the `static` keyword and is **scoped** to indicate it is a member of the `LabelList` class.  You may need to use `INVALID_LABEL` as you implement certain functions.  Similarly, `end_` can be returned by functions that need to return a `MsgToken` when no valid token is possible.
 
 Note: An example of a similar use of static members is the constant `npos` defined in `std::string` (really `std::basic_string`).  Info about its use is [here](http://www.cplusplus.com/reference/string/string/npos/)



#### Exceptions

Errors happen in programming. We receive unexpected or illegal inputs or arguments or we reach a state that we cannot handle. In those cases we can take some action like returning a specific value, but in some cases, based on the function signature, that may be impossible. An alternate approach is exceptions.

You should learn about exceptions by watching the [provided lecture video](http://ee.usc.edu/~redekopp/Streaming/cs104/cs104-exceptions/cs104-exceptions-proj.html) and reading online or in the textbook.

- In this homework, you do not need to catch any exceptions.
- However, we will ask you to throw certain exceptions in the following problem.  You can just use an appropriate `throw` statement.  Look in the skeleton code documentation for where/when to throw an exception.


### Implementation Tasks

To start your implementation, read over the provided `labellist.h` and the documentation provided for each member function. This documentation acts as a set of requirements by which you will be graded for partial credit (in addition to some automated tests).  Ensure you meet the specified requirements (including runtime).  You may declare additional data members and private helper functions but should never change the given public interface without express consent from the instructor (ask on Piazza).

In `labellist.cpp` note the functions that have been specified as `Complete` or `To be completed`.  Only the latter are functions you need to write.  

For the `MsgToken` class you need to complete the following functions, among others:
  - Comparison operators (`==` and `!=`).  Since a token refers to a message, what do you think you should actually compare when the user compares the entire `MsgToken` objects.  
  - The `operator bool()` allows `MsgToken`s to be used in the context of a condition (i.e. `if(token)`) and should return `true` for valid tokens.  
  - The `msg()` accessors for both `const` and non-`const` contexts should return the underlying `std::string` message
  - The `next` and `prev` routines to update the token to refer to the appropriate message.
  - The `ostream` operator (`operator<<`) to output the underlying message. Do NOT output a newline at the end.
  - If you find yourself duplicating work or wanting to break a complex task into simpler tasks, consider adding **private** member functions to help.

For the `LabelList` class, you will need to implement the following: 
  - Constructor and destructor (ensuring no memory leaks, etc.)
  - `clear` to reset the list to an empty state, removing and deleting all messages in the list.
  - `empty` should return true if no messages exist in the entire list.
  - `add`/`remove` should add a new message to the `all` list while remove should delete the message node, removing it from all labels (lists) of which it is a member.
  - `label/unlabel` should cause the referenced message to be added or removed from membership of the given label.
  - `find` should return a desired message based on its string content or position (0-based index) in the given label's list.
  - the `findLabelIndex` helper function to return the index/level of a given label (i.e. what index in the `heads_` and `next_/prev_` vectors corresponds to the specified label). **Note:** `findLabelIndex` returns `INVALID_LABEL` when a message cannot be found while `getLabelIndex` will throw an exception (i.e. `getLabelIndex` should be used when a correspond label **SHOULD** be defined while `findLabelIndex` should be used if a label may appropriately not exist yet)
  - If you find yourself duplicating work or wanting to break a complex task into simpler tasks, consider adding **private** member functions to help.

### Testing

#### Unit Tests

We are providing a suite of unit tests.  

#### Using Valgrind

Remember, it is **ALWAYS** a good idea to run your tests through `valgrind`.  You can do so by executing the following command line.

 ```bash
 valgrind --tool=memcheck --leak-check=yes ./labellist_tests
 ```

 Scroll through the output and look for invalid reads, writes, and the heap usage summary at the end.  However, please note, that just as a doctor can only diagnose you based on the symptoms or the info you provide, **valgrind can only check for errors based on what the test code exercises**.  If the test code never triggers a function and there are memory leaks or invalid accesses in that function, `valgrind` will say no errors occurred.  You are only as good as what your tests exercise, so it helps to write tests that will trigger each line of code in your class (this is often referred to as *code coverage*).

### Requirements

- You **MUST** meet all runtime, exception, and other requirements listed in the documentation/comment of each member function given in the skeleton code header file. 
- You may not alter the public interface of `LabelList` provided but can add data members and private helper functions.
- You may not alter the public interface of the `MsgToken` or `MsgNode` classes but may add to the public interface as well as adding private data or helper functions.
- We want you to practice with linked lists and pointers. Thus, no use of any other container is allowed (i.e. no additional `vector`s or any other C++ data structures beyond the already given data members can be used).  **Failure to follow this guideline will result in a 0 since it likely alleviates the need to practice the desired pointer/linked list skills.**



