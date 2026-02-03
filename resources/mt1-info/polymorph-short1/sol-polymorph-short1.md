# Solution: polymorph-short1 (Question 1b)

## (a) Three `const` keywords
`const MyClass2& map::get(const MyClass1& key) const`

1. **Leftmost `const`**: the returned reference refers to a **const** `MyClass2` object, so the caller cannot modify it through the reference.
2. **Parameter `const`**: `key` is a const reference, so the function cannot modify the argument and can bind to temporaries.
3. **Trailing `const`**: the member function promises not to modify the observable state of `*this` (except `mutable` members).

## (b) Errors in the code
```cpp
SubClass *s = new BaseClass;
delete s;
```

- **Type error / invalid conversion**: `new BaseClass` returns `BaseClass*`, which cannot be assigned to `SubClass*`.
- Even if forced, deleting through the wrong static type would be **undefined behavior**.

Correct usage would be either:
```cpp
BaseClass *s = new SubClass;
delete s; // OK because destructor is virtual
```
or
```cpp
SubClass *s = new SubClass;
delete s;
```

## (c) If you implement a destructor…
You almost certainly need the **Rule of Three**:
- Copy constructor
- Copy assignment operator
- Destructor

In modern C++, also consider the **Rule of Five** (add move constructor + move assignment).

## (d) Return type rationale
`ostream& operator<< (ostream &o, const LinkedList &ll);`

Return by **reference** so you can **chain** insertions:
```cpp
cout << ll << "\n";
```
and avoid copying the stream.
