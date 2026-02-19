---
layout: default
title: Midterm 1 Info
nav: Resources
---

# Runtime Analysis Practice Problems

## Code

```cpp
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
    if (!(x & (x-1))){ // condition is true if and only if x is a power of 2
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

---

## Questions

### Question 1: Worst Case Runtime of `function3()`

What is the worst case runtime analysis of `function3`?

**(a)** $\Theta(n)$

**(b)** $O(n^2)$

**(c)** $\Theta(n^2)$

**(d)** $\Theta(n \log n)$

---

### Question 2: Worst Case Runtime of `function4()`

What is the worst case runtime analysis of `function4`?

**(a)** $\Theta(n)$

**(b)** $O(n^2)$

**(c)** $\Theta(n^2)$

**(d)** $\Theta(n \log n)$

---

## Analysis Tips

Consider the following when solving:

1. **Analyze `ispowertwo(x)`:**
   - How many recursive calls does it make?
   - What is its time complexity?

2. **Analyze `function1(x)` and `function2(x)`:**
   - What is the cost of the power-of-2 check?
   - What is the cost of the for-loop?
   - When does each branch execute?

3. **Analyze `function3(n)` and `function4(n)`:**
   - How many times is the inner function called?
   - What is the total cost across all iterations?
   - Use summation notation to derive $T(n)$

4. **Key differences:**
   - How does `ispowertwo()` differ from the bitwise check?
   - How does this affect the overall complexity?

