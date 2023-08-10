---
layout: asides
toc: true
tasks: true
title: Templates
---


---

## Templates


At this point in the course, we've created many simple data structures ourselves, as well as used a number of already-templated STL classes. The first goal of this lab is to learn how to actually create these templated classes ourselves. By the end of this lab, you will learn to convert one of the type-specific lists into a generic, templated one.

### 1 - Template Motivation

You probably have already used the `std::vector` container a lot till now. You know that you could have vectors that contain different type of elements: `std::vector<int>`, `std::vector<std::string>`, `std::vector<MsgNode*>`, etc.

One way to implement `std::vector` is to implement it separately for every type: one for `int` (e.g. `int_vector`) and one for `string` (e.g. `string_vector`). Doing this has two problems:

* The code between two vector implementations are going to look similar, just that the stored type is different. This violates the [**Don't Repeat Yourself (DRY)**](http://en.wikipedia.org/wiki/Don't_repeat_yourself) principle.

* You can never accomodate all the types your users create, such as `MsgNode*`, `Cat`, or `StudentRecord`.

To address such limitations, C++ offers an extremely powerful system called **"templates"**.
Through templates, we can treat a type as a variable, and use it as the type in class definition. Later, when a user declares a templated object with a particular type, the compiler will substitute in the user-speficied type to generate a version of your implementation with this type.

### 2 - Template Example

One of the simplest templated examples we've encountered so far is the `std::pair` class. It is declared with two "types", and values of the sepcified types are passed in to the constructor. In a templated class, functions signatures and parameters can be defined "programatically". For example:

```
std::pair<int, std::string> student(1234567890, "Tommy Trojan");
std::pair<std::string, int> question("What is the answer to life, universe, and everything?", 104);
```

Similarly, the return values of its functions can be defined "programmatically" as well. For example:

```
int studentId = student.first; // returns an int
std::string answer = question.first; // returns a string
```

Let's open the file `pair.h` and take a closer look.

#### 2.1 - Declare the types with `template < >`

We list the number of programatically declared types that we'll use in a templated class with a simple `template < >` tag before the class declaration and before each implementation of the class's functions. This is important — a templated `Pair` class with two dynamic types is an entirely different class from a non-templated `Pair` class, even if they share the same name. Therefore, every time we mention a templated class, we must refer to it with `template < >`.

Notice that with Pair, we are listing that two classes can be specified with `template <typename FirstType, typename SecondType>`. It means we're going to name the first type `FirstType` and the second type `SecondType`. These names act as variable names — wherever in this class, `FirstType` and `SecondType` refer to the specific types that the user of the templated class specified in declaration. Think of `typename` as their type, `FirstType` or `SecondType` as their name, just like when you declare `int counter`, `int` is the type and `counter` is the name, which you can later refer to in your program.

#### 2.2 Do not pre-compile!

Another thing you'll notice is that the class's implementations for all its methods are included in this header file. This is not a bad practice; in fact, it is required for templated class to do so, since templated classes cannot be pre-compiled, and the reason is rather complex:

In a templated class declaration and implementation, since it uses a variable type, there is no information for the compiler to know if a member funciton or data exists.

```c++
template <typename T>
class Dummy
{
public:
	void SomeFunction()
	{
		T name;
		std::cout << name.length(); // Does T have a member function length()?
	}
}
```

In order to resolve the linking problem, the compiler will generate a version of the templated class implementation by substituting in the type that the users try to use into the variable type.

```c++
// If a user tries to use Dummy<int> and Dummy<std::string>, the compiler will generate the following two code
// The actual generated code is not in C++ but some low-level machine code.
// C++ code is shown here for illustration purpose only.

class DummyInt
{
public:
	void SomeFunction()
	{
		int name; // Notice T is replaced with int
		std::cout << name.length(); // This should not compile
	}
}

class DummyStdString
{
public:
	void SomeFunction()
	{
		std::string name; // Notice T is replaced with std::string
		std::cout << name.length(); // This should compile
	}
}
```

From the above example, you can see that the compiler doesn't know whether the code should compile until it sees how the user is using the code. In addition, where the class definition is and when it's needed also depends on when and where the users use the templated class. All of these make it impossible for the compiler to compile templated class into object files ahead of time.

Since the compiler needs to do substitutions based on the use of templated class, it will do it while it's in the user's program, where the templated class is use, based on the implementation of the class referenced by `#include`. Therefore it needs to know all implementations from the header file, so we should not separate out the implementations into a `.cpp` file.

**TL;DR: Always put your templated class implementations in the header file. Never compile a templated class into `.o` files. Always include the header file in the dependency list but never list it in the compile command.**

### 3 - Using Inner Class of Templated Class

In your homework you have seen the use of the inner struct `Item` in `TokenList`. Inner classes work the same way in templated classes, and inner classes share their outer class's templated type variables. However, the syntax for using the inner class is a little different. Wherever you need to refer to the inner class outside of your class definition, you must append `typename` to the front of the type.

```c++
template<typename T>
class Outer
{
private:
	// We don't need template<typename T> here. Inner will get it from Outer.
	struct Inner
	{
		T val; // Inner class will share outer class's template variable name
	};

public:
	T GetValue();
private:
	Inner GetInner(); // We are in class definition, so we can refer to the inner class without Inner<T>, though that will work just fine.

private:
	Inner mInner;
};

// The first template<typename T> tells the compiler that we need to use T as a type variable.
// Outer<T>::GetValue is the function name. Since Outer is templated, Outer<int>::GetValue is
// very different from Outer<double>::GetValue, so must include <T> after Outer.

template<typename T>
T Outer<T>::GetValue()
{
	return mInner.val;
}

// The typename in second line at the front of function signature tells the compiler Outer<T>::Inner
// is a class or struct name, not a static variable name and Outer<T>::Inner is the return type. Again,
// since Outer is templated, we must include <T> after Outer.

template<typename T>
typename Outer<T>::Inner Outer<T>::GetInner()
{
	return mInner;
}
```

### Check Off: Templated Linked List

We have included a simplified version of a linked list of integers,`LList`, in `resources`. Your job is to template it and make it usable with any class, not just ints.

What you need to do:

- [ ] Template the LList class. Include `template < >` tags wherever the class is mentioned. Since there is only one generic type - convention the name is `T` (instead of `FirstType`, `SecondType`).
- [ ] Fix the inner classes Item. Item is setup to store an int variable.
- [ ] Change approriate mentions of `int` to `T`. References to inner classes need to be changed as well - remember that they are now templated.
- [ ] Copy the contents from `llist.cpp` into the bottom of `llist.h`, and fix these functions.
- [ ] Make and run the program using `make`. It should produce the following output without valgrind errors:

```
1 Bulbasaur
4 Charmander
7 Squirtle
144 Articuno
145 Zapdos
146 Moltres
```

### Tips for Completing the Lab

* After you templated your code, where should the functions implementations go? Should they
  be in `llist.cpp` or `llist.h`?

* If you would like to implement the constructor for an inner type like `Item`, you have to use the fully qualified name like this:

```c++
template <typename T>
LList<T>::Item::Item(const T& v, Item* p, Item* n)
```

Notice that you could simply say `Item* p` because by then you are already considered
to be inside the `Item` class.

### Checking off

To get checked off, show the result after running `make` and your source files to one of your CP/TAs.
