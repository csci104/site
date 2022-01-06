
Now that you have the basic idea of heaps down, build your own m-ary `Heap` class whose public definition and skeleton code are provided in the `hw3/heap.h` folder of the `resources` repo with the interface given below.  Rather than specifying a specific type of heap (Min- or Max-Heap) we will pass in a Comparator object so that if the comparator object functor implements a **less-than** check then we will have a min-heap.  If the Comparator object functor implements a **greater-than** check we will have a max-heap.  

```c++
template <typename T, typename Comparator = std::less<T> >
class Heap
{
 public:
   /// Constructs an m-ary heap for any m >= 2
   Heap(int m, Comparator c = Comparator() );

   // other stuff
   
};
```

You may use the STL `vector<T>` container if you wish.  You should of course **NOT** use the STL `priority_queue` class or `make_heap`, `push_heap`, etc. algorithms.

Notice we can provide a default template type for the Comparator so that the client doesn't have to specify it if they are happy with the `std::less` (i.e. which assumes a built-in `operator<` is available for type T and calls it).

Notice the constructor also provides a *default* value for the Comparator which is a default-constructed Comparator.  Default parameter values will be used if the client does not supply them.  Also if a default parameter is used then all parameters after it must also have default values (i.e. default parameters must be at the end of the declaration).  The last thing to note is you only supply the default value in the declaration of the function.  **When you define the function (i.e. write the implementation below) you would not specify the default value again but just leave the argument types/names.**  For example, when implementing the function you'd just define:

```c++
template <typename T, typename Comparator>
Heap<T,Comparator>::Heap(int m, Comparator c /* Don't specify the default value here, only above */ ) 
// Your code here
```



So with these defaults in place, the client that wants a **min-heap** with a type that has a **less-than operator** need only write:

```c++
Heap<string> h1(2);  // std::less<string> is used as the default template type for Comparator
                     // and std::less<string>() (i.e. the default constructor) will be the
					           // comparator object created by the constructor
```

or the client who wants a some custom method of comparison so that they can implement a max-heap
or some other alternative using a custom comparator can write:

```c++
ObjAComparator c1( /* some arguments as desired */ );
Heap<ObjA, ObjAComparator> h1(2, c1);
```

You should test your heap either using gtest or another test driver program.  Be sure it works as a min-heap and as a max-heap using different comparators.  For reference if your type `T` has a `<` operator, then C++ defines a `less` functor which will compare the type `T` items using the `operator<()`. Similar there is a `greater` functor already defined by C++ that will compare using the `operator>()`.  They are defined in the `functional` header (`#include <functional>`) and you can look up their documentation online for further information.  This is meant to save you time writing functors for types that can easily be compared using built in comparison operators.

We have provided some basic heap tests (`hw3_heap_checker` folder in `resources`) for you to check your heap.  They are not exhaustive and we will run more complete tests for grading but this should help you. Just copy them to your `hw3` folder, `cd hw3_heap_checker`, and run the normal `cmake .`, `make` and run the tests.

**Note: You may use this Heap object in Homework 6, so test it well now!**
