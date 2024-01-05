---
layout: asides
toc: true
tasks: true
title: C++11
---

## An Ode to C++11 🌊➕➕

This lab will be covered during lab sections between April 16th (Friday) - April 21st, 2021 (Wednesday). **You need to get checked off during a lab sesson on or before April 21st (Wednesday).**

When we compile in this class, the command usually looks something like this:

`g++ -g -Wall -std=c++11 test.cpp -o test`

In our [Makefile lab](http://bytes.usc.edu/cs104/labs/03_makefile.html), we went over the different flags, and what they mean. Take a minute to make sure you understand them all.

In this lab, we’re going to focus on this part: `-std=c++11`

C++ is an evolving language that releases new versions with updated features every few years. If you use a feature that's introduced in a newer version, but try to compile the code with an older version, the compilation will fail.

Since [`C++11`](https://en.cppreference.com/w/cpp/11), there have been three more versions released ([`C++14`](https://en.cppreference.com/w/cpp/14) and [`C++17`](https://en.cppreference.com/w/cpp/17), with [`C++20`](https://en.cppreference.com/w/cpp/20) on the way), but there were some major features introduced in `C++11` that we’re going to cover in this lab: lambda functions, auto and decltype, and smart/shared pointers. **You don’t *need* to know or use any of these for this class (in other words, you won't be tested on it!), but they may be useful in the future.**

## 🚙 Auto and Decltype

Does this code look familiar?

```cpp
for (map<string,WebPage*>::iterator; it=mymap.begin(); it!=mymap.end(); ++it){
            std::cout << it->first << "  => " << it->second << '\n';
}
```

What about error messages and dozens of notes that look like this?

```
searcheng.cpp: In member function 'std::vector<std::pair<WebPage*, double> > SearchEng::pageRank(const WebPageSet&)':
searcheng.cpp:251:64: error: conversion from 'std::map<WebPage*, double>::iterator {aka std::_Rb_tree_iterator<std::pair<WebPage* const, double> >}'
to non-scalar type 'std::map<std::__cxx11::basic_string<char>, WebPage*>::iterator
{aka std::_Rb_tree_iterator<std::pair<const std::__cxx11::basic_string<char>, WebPage*> >}' requested
         for (map<string,WebPage*>::iterator it=mymap.begin(); it!=mymap.end(); ++it) {
                                                ~~~~~~~~~~~~~~~~^~
searcheng.cpp:251:70: error: no match for 'operator!=' (operand types are 'std::map<std::__cxx11::basic_string<char>, WebPage*>::iterator
{aka std::_Rb_tree_iterator<std::pair<const std::__cxx11::basic_string<char>, WebPage*> >}' and 'std::map<WebPage*, double>::iterator
{aka std::_Rb_tree_iterator<std::pair<WebPage* const, double> >}')
        for (map<string,WebPage*>::iterator it=mymap.begin(); it!=mymap.end(); ++it)
```

Although you should know how to explicitly declare iterators, and understand how they work [(here's a refresher)](http://ee.usc.edu/~redekopp/cs104/slides/L20_Iterators.pdf), you can also use `auto` to simplify your code into something that looks like this:

```cpp
for (auto& j: mymap) {
    std::cout << j.first << " " << j.second << std::endl;
}
```

### What is auto?

`auto` is a **placeholder type specifier**. This means that the type of the variable declared will be automatically deduced from its initializer. To use `auto`, simply declare and initialize a variable instead of giving a type:

```cpp
auto str = "cpp";
auto vec = { 3, 5, 6 };
auto sudokuCell = { vec, { 2, 4, 1 }, { 8, 9, 7 } };
```

**NOTE:**

Because `auto` determines the type from the variable's initialization, you have to declare and initialize the variable at the same time. The example below will throw a compiler error.

```cpp
auto num;
num = 2;
```

Now let's talk about how `auto` works. At compile time, the type of the initializer is used to determine what type the variable is. The compiler already has to check the type of the right-hand side to make sure you're not doing something illegal, so why not let it assign that type to the variable? Using `auto` has no effect on runtime since all types are deduced at compile time.

You can even use `auto` for the return type of a function, but it's typically not recommended that you do so. Why do you think this is?

### Customizing the type deduction

A common use of `auto` is iterating over data structures. You can add `const` and/or `&` to auto to modify the deduced type. In the example below, if
you didn't use `const auto&` instead of `auto`, you're making an expensive copy by value of the vector's contents.

```cpp
vector<string> strings = {"Heap", "Hash Table", "Priority Queue"};
for(const auto& str : strings)
{
    cout << str << "\n";
}
```

### What is decltype?

The `decltype operator` returns the *declared type* of the arguments. It's sometimes useful when you use lambda functions (which we'll go into soon) when the actual return type isn't always clear. Below is a simple example of how you can use it.

```cpp
int i = 104;
decltype(i) j = i * 2 + 62; // this is an int
```

As a more realistic example, take the following template to add two numbers.
You want `add(2, 1.2)` to return a double and `add(2, 1)` to return an int. It's not really possible to specify this kind of behavior without auto and decltype. Instead, you can use decltype to determine the return type for this function.

Example from [cpprefererence](https://en.cppreference.com/w/cpp/language/decltype):

```cpp
template<typename T, typename U>
auto add(T t, U u) -> decltype(t + u) // return type depends on template parameters
                                      // return type can be deduced
{
    return t+u;
}
```

The main difference between `auto` and `decltype` is that you can use `decltype` if you just want the type of some expression or variable.

If you want to customize the type of the variable being initialized (i.e. using `const auto&`), you should use `auto`. `auto` is also easier to type, and you don't need to pass in the expression from which you need to infer a type.

## 🧵 Range-based for loops

We used range-based for loops above in an `auto` example. You can use the following syntax to execute a loop over a range.

```cpp
for (range_declaration : range_expression)
{
    loop_statement
}
```

- `range_declaration` is a named variable that represents the elements of the `range_expression`
- `range_expression` is any expression that's a suitable sequence, such as an array or container, or even a braced-init-list

Here are some examples:

```cpp
vector<int> nums = {2, 3, 4};
for (int i : nums)
    cout << i << " ";
cout << "\n";

for(int i : {2, 3, 4} )
    cout << i << " ";
cout << "\n";

vector<vector<int>> vec2d = { {0,1,2}, {3,4,5}, {6,7,8} };
for(vector<int> v : vec2d)
{
    for(int i : v)
    {
        cout << i << " ";
    }
    cout << "\n";
}
```

You could also use `auto` in these loops, of course!

## 🐑 Lambda expressions

Another feature introduced in C++11 is the lambda expressions, an anonymous function that can be defined and passed to another function, right where it is invoked.

An anonymous function is an unnamed function, meaning it is not tied to a specific identifier. In addition to their convenience, lambda expressions also let you write functions on the fly that use variables from a surrounding scope, without passing them in as arguments. We'll get into what that looks like shortly.

Let's start with a simple example. Suppose have a vector or list of integers, and you want to multiply each integer by 2.

This is pretty simple to achieve with the function `for_each`.

```cpp
std::vector<int> numbers = {1,2,3,4,5};
int scaleByTwo(int& number) {
  number *= 2;
}

std::for_each(numbers.begin(), numbers.end(), scaleByTwo);
```

In this code snippet, `for_each` applies the function `scaleByTwo` to each element in the range ``[numbers.begin(), numbers.end())``.

However, if we only need to do this once, there isn't really a point in declaring the function `scaleByTwo` just to have something to pass in to `for_each`. Wouldn't it be easier to just write a function on-the-fly, and pass that in instead? With lambda expressions, we can do just that!

```cpp
std::for_each(numbers.begin(), numbers.end(), [](int& number) { number *= 2; });
```
Here, the function passed into `for_each` is a lambda expression that has an empty capture clause (meaning it has access to no variables from the surrounding scope), takes in each element of the vector as an argument, and multiplies that element by 2. Don't be intimidated by the weird syntax — we'll go over that next!

### Anatomy of a Lambda Expression
``` c++
[capture clause] (optional parameter list) -> return-type
{
  // body: code you want to execute
}
```

1. **Capture clause**: "captures" all the variables in the surrounding scope, so that the lambda expression has access to them.
  + [] - captures nothing (the lambda expression has access to no variables from the surrounding scope)
  + [=] - captures all local objects (variables, function parameters) in current scope by value
  + [&] - captures all local objects by reference
  + [this] - capture this pointer by value
  + [&vec, i] - capture vec by reference, i by value
2. **Parameter list**: the lambda expression's arguments
  + If empty, the lambda expression takes in no arguments
3. **Return type:** specifies the return type of the lambda expression. This is more for readability.
  + If empty, the compiler will detect what the return type is
4. **Body:** the code you want the lambda expression to execute is written between the curly brackets. The lambda expression will have access to all the variables specified in the capture clause, and all parameters passed in as arguments.

### Capturing variables

So far, we've looked at how lambda expressions allow us to write functions inline. Now, let's see how lambda functions can "capture" variables in the surrounding scope. Let's revisit the previous example, modifying it to scale our vector of integers by some integer variable. Take a look at the following code:

```cpp
int main()
{
  std::vector<int> numbers = {1,2,3,4,5};
  // Read in scale from user:
  std::cout << "Enter Scale: ";
  int scale;
  std::cin >> scale;

  // Will this compile?
  std::for_each(numbers.begin(), numbers.end(), [](int& number) { number *= scale; });

  return 0;
}
```

The above code generates an error, because `scale` is not accessible in the scope of the lambda expression. We could do this instead:

```cpp
int main()
{
  std::vector<int> numbers = {1,2,3,4,5};
  // Read in scale from user:
  std::cout << "Enter Scale: ";
  int scale;
  std::cin >> scale;

  // Will this compile?
  std::for_each(numbers.begin(), numbers.end(), [scale](int& number) { number *= scale; });

  return 0;
}
```

**How else could we modify the capture clause so that the code works?**

You've learned about functors, and in a way, the lambda expression written above is similar to writing the following:

``` c++
struct scaleByScale {
  int scale;
  scaleByScale(int scale) : scale(scale) {}
  void operator()(int& number) { number *= scale; }
}
```

In other words, you can think of the capture clause as a description of the starting state of the lambda expression. Behind the scenes, a lambda object is actually being made, with a variable named `scale` that has a value equal to that declared in the surrounding scope.

## 🧠👉 Smart Pointers

Now that you're almost done with 104, we're sure that you've seen your fair share of pointer problems. Pointers are important to have when you need to allocate objects on the fly and pass them between classes, but they are difficult to manage. It's far too easy to forget to delete objects when your program shuts down, or to accidentally keep using them after they've been deleted. Thankfully, in C++11, the language introduced a great new way to deal with this: smart pointers.

**NOTE**: You'll need to `#include<memory>` to use `unique_ptr` or `shared_ptr`!

### unique_ptr

Simply put, smart pointers are objects that wrap pointers and take care of deleting them when the objects go out of scope.  The first smart pointer we'll talk about is [`unique_ptr`](https://en.cppreference.com/w/cpp/memory/unique_ptr). These are used when you want to have one owning instance of the smart pointer, which has control over when the object is deleted. While you can share the object using pointers or references, the `unique_ptr` always maintains ownership. In other words, they solve the first problem (forgetting to delete things) but not the second (using things after they've been deleted).

To construct a `unique_ptr`, you have two options.  First, you can call the `unique_ptr`'s constructor, passing a pointer that you want it to take ownership of:

```cpp
std::unique_ptr<Foo> foo1(new Foo("Foo 1"));
```

However, this is annoying because you have to specify the type of `foo` twice.  To fix this, you can use `make_unique()`.  This function template takes the type to create as a template argument and the constructor arguments as arguments:

```cpp
auto foo2 = std::make_unique<Foo>("Foo 2");
```

Note that `make_unique` wasn't actually added until `C++14`, so you'll have to use the `-std=c++14` flag when compiling.  The corresponding function (`make_shared()`) for `shared_ptrs` exists in `C++11` though.

To access the contained object, smart pointers overload the `*` and `->` operators just like iterators do.  You can also access the contained pointer directly with `get()`:

```cpp
foo1->func1();
(*foo2).func2();

Foo * foo1Ptr = foo1.get();
```

Once `foo1` and `foo2` go out of scope, the objects they are wrapping will be deleted.  Cool, right?

Unique pointers must always be unique, and they take full advantage of C++'s capabilities to enforce this.  They cannot be copied; the ownership of an object can only be transferred between pointers.  One way is to use the assignment operator:

```cpp
auto origOwner = std::make_unique<Foo>("A Foo");
std::unique_ptr<Foo> newOwner;

// origOwner owns foo, newOwner is empty.

newOwner = origOwner;

// newOwner now owns foo, origOwner is empty.
```

However, if you try to copy values, you'll get a compiler error:

```cpp

    auto origOwner = std::make_unique<Foo>("A Foo");
    std::unique_ptr<Foo> newOwner((origOwner)); // error: use of deleted function ...
    // the problem is this tries  to copy the value from owner!
```

Ownership can also be transferred using the move constructor.  You haven't learned about move constructors yet, but for now just know that they take the content of the given pointer and pass it to the new pointer being constructed.  To tell the compiler to call the move constructor, we use `std::move`:

```cpp
auto origOwner = std::make_unique<Foo>("A Foo");
std::unique_ptr<Foo> newOwner(std::move(origOwner));

// newOwner now owns foo, origOwner is empty.
```

### shared_ptr

Unique pointers are great when you want to pass an object around between owners, with one owner controlling it at a time.  But what about if you want an object to have multiple owners?  This is where `std::shared_ptr` comes in. Shared pointers allow you to pass something around between many different locations and have it only deleted when the _very last_ instance of it goes out of scope.  This is the ultimate in worry-free pointers!  It solves both the problem of deleting the object and the problem of keeping it alive when needed.

Internally, it implements this behavior using a _reference count_ shared between all copies of the `shared_ptr`.  When the first `shared_ptr` is constructed from a pointer, it starts with a reference count of 1.  Then, whenever a new `shared_ptr` is copy-constructed or assigned from this pointer, it increases the reference count by 1.  Likewise, when one of the copies (or the original) is destroyed, the reference count is decremented.  Once all copies have been destroyed, the reference count reaches 0 and the pointed-to object is finally deleted.

Here's an example of how this works:

```cpp
{
    auto sharedFoo1 = std::make_shared<Foo>("Shared Foo");
    {
        std::shared_ptr<Foo> sharedFoo2(sharedFoo1);
        std::shared_ptr<Foo> sharedFoo3 = sharedFoo2;

        // sharedFoo2 and sharedFoo3 both are copies of sharedFoo1
        sharedFoo3->doStuff();

    } // sharedFoo2 and sharedFoo3 go out of scope.  Nothing happens.
} // sharedFoo1 goes out of scope.  Underlying object destroyed.
```

Shared pointers are incredibly useful, and have been widely embraced by the C++ community as a safer alternative to raw pointers.  However, they do have a couple of downsides to be aware of.

First and foremost, the overhead of updating that shared reference count variable is not insignificant, especially since it has to be shared between multiple threads.  So, copying `shared_ptrs` is a somewhat expensive operation and should not be done in a performance-critical application.  This probably isn't something to consider in day-to-day work, but it's a good place to start if you are trying to optimize slow-running code.

The other thing to keep in mind with `shared_ptrs` is that they generally express _intent_ to share an object.  When you read someone's code and see a `shared_ptr`, it means that this piece of data is going to be shared across multiple objects which each "own" it and control when it's destroyed.  While `shared_ptrs` can certainly be used as a general replacement for all pointers everywhere, some programmers will criticize you for doing this — it's always good to think about how a piece of data is going to be shared and who owns it before automatically reaching for a `shared_ptr`.

### ✅ Checkoff

- [ ] Complete all the TO DOs in `lab13/sorting.cpp`. **You need to get checked off during a lab sesson on or before April 21st (Wednesday).**