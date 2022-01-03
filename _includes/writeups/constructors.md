
Place your answers to the questions below in the same file as your answers to problem 1 and 2 (i.e. `hw1.txt`).  You do not need to test and compile the code below. You are just writing out your answers in the `hw1.txt` file.

Suppose you were given the following class to model an *entry* in your contacts list which uses a custom `Str` class that models a string and replaces `std::string`.

```c++
#ifndef ENTRY_H
#define ENTRY_H
#include "str.h"

class Entry {
 public:
  Entry(const Str& name, const Str& phone);
  ~Entry();
  const Str& name() const;
  const Str& phone() const;

 private:
  Str name_;
  Str phone_;
};
#endif
```

Further assume that print statements are added to all constructor and destructors that print:

   - `Str` in the default and initializing constructor(s) 
   - `~Str` in the destructor
   - `Copy Str` in the copy constructor
   - Nothing is printed in the assignment operator(s)


**Question a**:  If the `Entry` constructor is as shown below, what will be printed when a new Entery object is constructed.

```c++
Entry::Entry(const Str& name, const Str& phone)
{
  cout << "Entry" << endl;
  name_ = name; 
  phone_ = phone;
}
```

**Question b**:  If the `Entry` constructor is as shown below, what will be printed when a new Entry object is constructed.

```c++
Entry::Entry(const Str& name, const Str& phone)
  : name_(name), phone_(phone)
{
  cout << "Entry" << endl;
}
```
Now suppose a new `Wrapper` class is written that uses an `Entry` as a data member as shown below.

```c++
#ifndef WRAPPER_H
#define WRAPPER_H
#include "entry.h"
class Wrapper
{
 public:
  Wrapper(const Str& name, const Str& phone);
  void print() const;
 private:
  Entry e_;
};
#endif
```

**Question c**:  Show how to complete the constructor such that the data member `e_` is initalized with the arguments `name` and `phone`.  Be sure to avoid any compile errors or runtime errors.  You can always try your code out using a compiler.  Show the entire constructor in your answer (i.e. start by copying the code below and then add to it).

```c++
// initialize e_ with name and phone
Wrapper::Wrapper(const Str& name, const Str& phone)
{

}
```

