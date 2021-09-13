---
layout: asides
toc: true
tasks: true
title: Inheritance
---

---

**Due @ 7:00 pm on Sep 17, 2021**

---

## Inheritance

### Why do we use inheritance?

You've learned in your intro CS classes that copying and pasting code is an indication that you could be doing something better. For example, if you're iterating through an array of three elements, instead of typing:

```
cout << arr[0] << endl;

cout << arr[1] << endl;

cout << arr[2] << endl;
```

you would use a for loop. Not only is this a lot cleaner, it's also easier to make changes. For example, if you decide later on that you want to print out both the value and its index, you would only have to change one line of code to ```cout << i + " : " + arr[i]```, instead of three.

Similarly, if you're doing a task multiple times with different inputs, you'll want to abstract out the repeated code into a function, and pass in different parameters. 

You already have a lot of experience with loops and functions, and today we're going to talk about another aspect of code reuse that's just as fundamental: **inheritance**.

### What is inheritance?

**Inheritance** is the major principle of object orientated programming. 

If Class `B` inherits from Class `A`, it automatically copies all the data members and functions. Class `B`, which is called the child class, can create new functions and data members, as well as overwrite functions defined in Class `A`, which is called the parent or base class.

The syntax looks something like this:

```
class B : public A
{
...
}

```

Think about how you could you could implement this without using inheritance. What are the cons of this approach?

### What does inheritance look like?

Let's take a look at a more concrete example. Imagine you have a database of different people, and you want to print some information about them. 

We have two types of people in our database: students and professors. For the students, we'd like to print out their majors, and for the professors, we'd like to print out their department. For everyone, we'd like to print out their name. 

We could write our classes like this: 

**NOTE:** Normally, we would only have one class per header file for better organization, but for this simple example, we're going to keep everything together.

```
class Student {
	public:
		Student(std::string name, std::string major);
		std::string getName();
		std::string getMajor();
	private:
		std::string mName;
		std::string mMajor;
};

class Professor {
	public:
		Professor(std::string name, std::string department);
		std::string getName();
		std::string getDepartment();
	private:
		std::string mName;
		std::string mDepartment;
};

```

This would work, but note the repetition — students and professors both have `mName` data members and `getName` functions. Every person has a name, so instead of writing the same function in both classes, we can have Student and Professor inherit from a third class, a Person class. We're also going to add some additional functions and data members, so that our classes looks like this diagram.

<div style="text-align:center"><img src="{{site.url}}/labs/lab5/inheritance_diagram.png" alt="inheritance" width="500" height="400" /> </div>


```
class Person {
	public:
		Person(std::string name);
		std::string getName();
	private:
		std::string mName;
		int mAge;
};

class Professor : public Person {
	public:
		Professor(std::string name, std::string department);
		std::string getDepartment();
	private:
		int mSalary;
		std::string mDepartment;
};

class Student : public Person {
	public:
		Student(std::string name, std::string major);
		std::string getMajor();
	private:
		std::string mMajor;
};

class UscStudent : public Student {
	public:
		UscStudent(std::string name, std::string major);
		std::string getUscEmail();
	private:
		int mUscID;
		std::string mUscEmail;
};

```

Now, `Professor`, `Student` and `UscStudent` all have the function `getName()` and the data member `mName`, but we didn't have to write those out three times, because these classes inherit from `Person`. 

In this example, we have both `Professor` and `Student` inheriting from `Person`, but we only have one class inheriting from `Student`. What's the point of the `Student` class? Shouldn't we just have a `UscStudent` class?

#### Constructors

Let's try to compile this code. Run ``` make ``` and see what happens.

We get a ton of errors. Let's start with this one: `"no matching function for call to 'Person::Person()'"`.

What does this error message mean? You've probably seen an error message like this before, like if you passed in the wrong argument to a function. Here, the compiler is confused because when you inherit from the `Person` object, you need to call a constructor, and since we didn't do that, the default constructor is implicitly called. But there is no default constructor for `Person`! Why is that?

To fix this error, we need to explicitly call our `Person` constructor, which takes in a name. 

This will look like this: 

```
Student::Student(string name, string major) : Person(name) {
	// rest of student constructor
}
```

- [ ] Make these changes (to `Student`, `Professor`, and `UscStudent`), and now your code should compile.

#### Private, protected, public

Now, let's add some additional functionality to our `UscStudent` class. 

- [ ] Write a public function called `printTranscript()`, which will print out (and nicely format) the name of the school, the student's name, their GPA, and their major. 

What problem pops up when you try to compile this function?

How can we resolve this?

We need to change the access level of the `mGpa` data member. We don't want to make it public (although that would allow the program to compile), but we do want to be able to access it from the `UscStudent` class. To allow inherited classes to access a data member, you can make it **protected**. 

- [ ] Change `mGpa` to protected, and test out your function.

What's another way we could solve this problem while leaving `mGpa` private?

#### Inheritance and visibility

Private, protected and public also apply to the type of inheritance. Look back at this line: 

`class Student : public Person {`

Putting the word public in front of Person means that we are using **public inheritance**. That is, every function and data member in `Person` has the same level of protection in `Student`. This will *not* make every element in `Person` public — if an element was protected in `Person`, it will be protected in `Student`, and if an element was private in `Person`, it will be private in `Student`. 

**Protected inheritance** means that all private and protected elements in a parent class A will remain at the same access level in a child class B, but all public elements will now be protected in B. This means that every element in B that was in inherited from A is now either protected or private.


Finally, **private inheritance** means that all elements inherited from A in B are private. 

When would you use these types of inheritance? Let's take a look back at our `UscStudent` class. A `UscStudent` is a type of `Student`, and needs to have the same data members as `Student`. However, imagine that someone is using our `UscStudent` class. We only want them to have access to a few functions, like `printTranscript()` and `getUscEmail()`, and we don't want them to have access to the `setGPA()` function. We can make `UscStudent` protectedly inherit from `Student`. 

`class UscStudent : protected Student {`

- [ ] Now, uncomment the line 8 in `tests.cpp`, and `make`.

We get the error `void Student::setGPA(double)’ is inaccessible in this context`. We can't publicly call the `setGPA()` function for a `UscStudent` object, even though it was a public function in `Student`.

Now, let's go over a few more important parts of inheritance.

#### Polymorphism

If a child and base class both implement a function, what code gets executed? This concept, of determining which version of a function to use, is called **polymorphism**, and there are two types: dynamic binding and static binding.

Let's say we have a `printTitle()` function in (a simplified version of) all of our classes. Here's the header file.

```
class Person {
  public:
    printTitle(); // prints "Person"
};

class Professor {
  public:
    printTitle(); // prints "Professor"
};

class Student {
  public:
    printTitle(); // prints "Student"
};

class UscStudent {
  public:
   printTitle(); // prints "USC Student"
};

```

If we call `printTitle()` on the object `UscStudent`, it will print out "USC Student".

``` 
UscStudent* u = new UscStudent(); 
u->printTitle(); // will print "USC Student"
```

But what if we our code looks like this instead?

```
Person* p = new UscStudent();
p->printTitle();
```

What gets printed? This time it's less clear. 

Does "USC Student" get printed, or "Person"?

In this case, it will print "Person", because the compile time type of the object is `Person`. This is called **static binding**, because the version of the function that is called is based on the static (can't change) type of the pointer. If you're familiar with Java, this is a difference between the two languages, because Java will execute the function of the runtime object.

Now, what if we *do* want to do this?

We add the **virtual** keyword to the function in the base class. 

```
class Person {
  public:
    virtual void printTitle(); // prints "Person"
};

class Professor {
  public:
    void printTitle(); // prints "Professor"
};

class Student {
  public:
    virtual void printTitle(); // prints "Student"
};

class UscStudent {
  public:
   void printTitle(); // prints "USC Student"
};

```

Now, when we run the same code snippet, we had earlier, it will print "USC Student".

```
Person* p = new UscStudent();
p->printTitle(); // USC Student
```

This is called **dynamic binding**, because the function that is called is based on the type of object that is being pointed to, which can change. 

All base classes should have a virtual destructor. Why do you think this is?

#### Abstract classes

Let's take a look at another classic example of inheritance: shapes. 

Consider the following shapes: square, rectangle, circle, and triangle. All of these shapes should have a `getName()` function, and a name data member, which indicates that they should probably inherit from a `Shape` base class that implements this function. 

Aditionally, we want the to call `getArea()` and `getPerimeter()` functions on the shapes, but these values are not calculated the same way for each type. We're going to need a different implementation for square, rectangle, circle, and triangle.

But what does the `Shape` class do for `getArea()` and `getPerimeter()`? In this case, we declare these functions in our base class, but we don't implement them, because we don't know which formula to apply for an arbitrary shape. In `Shape.h`, our functions will look like this:

```
class Shape {
	public:
		virtual double getArea() = 0; // = 0 indicates that this class doesn't implement this function
		virtual double getPerimeter() = 0; 
}
```

These functions are called **pure virtual functions**, and this call is now an **abstract class**. If a class has at least one pure virtual function, it cannot be instantiated. That is, we can't do this:

``` Shape s = new Shape(); ```

If we try, we get the following error message:

```invalid new-expression of abstract class type 'Shape' because the following virtual functions are pure virtual ```

If we wanted to instantiate this class, we'd have to implement all the functions.

## Assignment

That was a lot of information! Let's apply it.

Take a look at the files in part 2. 

## Making an RPG

The assignment asks you to to make a very simple RPG (role-playing game). There are three player classes: `Tank`, `Healer`, and `Fighter`. 

You must implement the `doAction()` method for all the classes. We've done the implementation of the `Tank` class for you (that was easy!). Complete `Healer` and `Fighter`. The `Healer` must restore 75 HP (Health Points) to the target **up to the maxHP limit**, and the `Fighter` must deal 75 damage to the target (here, you can go below 0). You also need to fix the doAction() declaration in `player.h`.

- [ ] Implement `doAction()` for `Healer` and `Fighter`

Players also have an inventory of items. We want to store the name and amount of each item. Normally, we would use a `map` to do this (make sure you know why!), but to get some practice with vectors, we're going to use a `vector` to implement the map. Recall that, like arrays, `vectors` are lists of elements, but unlike arrays, they can dynamically change in size. 

[C++ Reference](http://www.cplusplus.com/reference/vector/vector/) is a great resource to use throughout 104, and especially in this lab for `vector` syntax and examples!

As you can see in `inventory.h`, `Inventory` inherits from `vector`. Notice that this is *private* inheritance, so outside classes cannot call `vector` functions on our `Inventory` object. That is, if we have instance of `Inventory`, we can't call the `vector` function `push_back` — we can only call `addItem()`. 

- [ ] Implement the inventory system in `inventory.cpp`.

When you're done, the provided test should run using `make tests`. The Makefile is already written for you, and you don't need to modify it.

*If you're unable to `make`, carefully read the error messages!*

- [ ] Once all of your tests pass, show your code to a CP to get checked off!

Note: if you are checking off via Piazza, 
