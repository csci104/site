The following is background info that will help you understand how to do the next step.  

If you saw the following:

```c++
 int x = f();
```

You'd think `f` is a function.  But with the magic of operator overloading, we can make `f` an object and `f()` a member function call
to `operator()` of the instance, `f` as shown in the following code:

```c++
  struct RandObjGen {
    int operator() { return rand(); }
  };
  
  RandObjGen f;
  int r = f(); // translates to f.operator() which returns a random number by calling rand()
```

An object that overloads the `operator()` is called a __functor__ and they are widely used in C++ STL to provide a kind of polymorphism.

We will use functors to make a sort algorithm be able to use different sorting criteria (e.g., if we are sorting strings, we could sort either lexicographically/alphabetically or by length of string). To do so, we supply a functor object that implements the different comparison approach.

```c++
  struct AlphaStrComp {
    bool operator()(const string& lhs, const string& rhs) 
	{ // Uses string's built in operator< 
	  // to do lexicographic (alphabetical) comparison
	  return lhs < rhs; 
	}
  };

  struct LengthStrComp {
    bool operator()(const string& lhs, const string& rhs) 
	{ // Uses string's built in operator< 
	  // to do lexicographic (alphabetical) comparison
	  return lhs.size() < rhs.size(); 
	}
  };
  
  string s1 = "Blue";
  string s2 = "Red";
  AlphaStrComp comp1;
  LengthStrComp comp2;
  
  cout << "Blue compared to Red using AlphaStrComp yields " << comp1(s1, s2) << endl;
  // notice comp1(s1,s2) is calling comp1.operator() (s1, s2);
  cout << "Blue compared to Red using LenStrComp yields " << comp2(s1, s2) << endl;
  // notice comp2(s1,s2) is calling comp2.operator() (s1, s2);
```

This would yield the output

```c++
1  // Because "Blue" is alphabetically less than "Red"
0  // Because the length of "Blue" is 4 which is NOT less than the length of "Red (i.e. 3)
```

We can now make a templated function (not class, just a templated function) that lets the user pass in which kind of comparator object they would like:

```c++
template <class Comparator>
void DoStringCompare(const string& s1, const string& s2, Comparator comp)
{
  cout << comp(s1, s2) << endl;  // calls comp.operator()(s1,s2);
}

  string s1 = "Blue";
  string s2 = "Red";
  AlphaStrComp comp1;
  LengthStrComp comp2;

  // Uses alphabetic comparison
  DoStringCompare(s1,s2,comp1);
  // Use string length comparison
  DoStringCompare(s1,s2,comp2);
```
	   
In this way, you could define a new type of comparison in the future, make a functor struct for it, and pass it in to the `DoStringCompare` function and the `DoStringCompare` function never needs to change.

These comparator objects are use by the C++ STL `map` and `set` class to compare keys to ensure no duplicates are entered.

```c++
template < class T,                        // set::key_type/value_type
           class Compare = less<T>,        // set::key_compare/value_compare
           class Alloc = allocator<T>      // set::allocator_type
           > class set;
```

You could pass your own type of Comparator object to the class, but it defaults to C++'s standard less-than functor `less<T>` which is  simply defined as:

```c++
template <class T> 
struct less 
{
  bool operator() (const T& x, const T& y) const {return x<y;}
};
```

For more reading on functors, search the web or try [this link](http://www.cprogramming.com/tutorial/functors-function-objects-in-c++.html)