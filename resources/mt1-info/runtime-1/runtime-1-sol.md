---
layout: default
title: Midterm 1 Info
nav: Resources
---

# Runtime Analysis Solution Key

## Code Analysis

### Helper Function: `ispowertwo(double x)`

**Purpose:** Determines if x is a power of 2 using recursion.

**Cost Analysis:**
- Base cases: $O(1)$
- Recursive case: divides by 2 each call
- Depth of recursion: $O(\log_2 x)$
- **Total cost of `ispowertwo(x)`:** $\Theta(\log x)$

---

## Problem 1: Worst Case Runtime of `function3(int n)`

```cpp
void function3(int n){
    for (int i = 1; i <= n; i++){
        function1(i);
    }
}
```

### Analysis

For each iteration $i$, we call `function1(i)`:

```cpp
void function1(int x){
    if (ispowertwo(x)){
        for (int i = 0; i < x ; i++)  // Runs if x is power of 2
            cout << i << endl;
    } else {
        cout << x << endl;            // Runs otherwise - O(1)
    }
}
```

**Cost of `function1(i)`:**
- If $i$ is a power of 2: $\Theta(\log i) + \Theta(i) = \Theta(i)$ (for-loop dominates)
- If $i$ is not a power of 2: $\Theta(\log i)$

**Worst case:** Occurs when $i$ is a power of 2 (larger cost)

### Derivation Using Summation

In the worst case, we sum costs for all $i$ from 1 to $n$:

$$T(n) = \sum_{i=1}^{n} \text{Cost}(\text{function1}(i))$$

In the absolute worst case, assume every iteration pays $\Theta(i)$:

$$T(n) = \sum_{i=1}^{n} i = \frac{n(n+1)}{2} = \Theta(n^2)$$

However, only powers of 2 cause the $\Theta(i)$ cost. The number of powers of 2 from 1 to $n$ is $\Theta(\log n)$. But even summing just these:

$$\sum_{k=0}^{\log_2 n} 2^k = 2^{k+1} - 1 \approx 2n - 1 = \Theta(n)$$

All other calls cost $\Theta(\log i)$:

$$\sum_{i=1, i \text{ not power of 2}}^{n} \log i \leq \Theta(n \log n)$$

**Total:** $\Theta(n) + \Theta(n \log n) = \Theta(n \log n)$

### Answer to Question 1

**(d) $\Theta(n \log n)$**

**Justification:** 
- Powers of 2 contribute: $\sum_{k=0}^{\log n} 2^k = \Theta(n)$
- Non-powers of 2 contribute: $\sum \log i = \Theta(n \log n)$
- Total: $\Theta(n \log n)$

---

## Problem 2: Worst Case Runtime of `function4(int n)`

```cpp
void function4(int n){
    for (int i = 1; i <= n; i++){
        function2(i);
    }
}
```

### Analysis

For each iteration $i$, we call `function2(i)`:

```cpp
void function2(int x){
    if (!(x & (x-1))){  // Checks if x is power of 2 - O(1)
        for (int i = 0; i < x ; i++)  // Runs if x is power of 2
            cout << i << endl;
    } else {
        cout << x << endl;            // Runs otherwise - O(1)
    }
}
```

**Key difference from `function1`:** The bitwise check `!(x & (x-1))` is $O(1)$, not $O(\log x)$.

**Cost of `function2(i)`:**
- If $i$ is a power of 2: $\Theta(1) + \Theta(i) = \Theta(i)$
- If $i$ is not a power of 2: $\Theta(1)$

### Derivation Using Summation

$$T(n) = \sum_{i=1}^{n} \text{Cost}(\text{function2}(i))$$

**Powers of 2 (from $i = 1, 2, 4, 8, \ldots, 2^{\lfloor \log n \rfloor}$):**

$$\sum_{k=0}^{\lfloor \log_2 n \rfloor} 2^k = 2^{\lfloor \log_2 n \rfloor + 1} - 1 < 2n = \Theta(n)$$

**Non-powers of 2:**

$$\sum_{i=1, i \text{ not power of 2}}^{n} 1 = n - \Theta(\log n) = \Theta(n)$$

**Total:**

$$T(n) = \Theta(n) + \Theta(n) = \Theta(n)$$

