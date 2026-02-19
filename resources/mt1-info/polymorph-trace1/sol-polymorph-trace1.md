---
layout: default
title: Midterm 1 Info
nav: Resources
---

# Solution: Polymorphism Trace

## Output

```
15
I got this!
10
When are office hours?
30
I got this!
25
When are office hours?
d3
d2
d1
```

## Why

### Class behavior recap
- `Question::getValue()` is **not virtual**, so it uses the **static type**.
- `studentResponse()` is **virtual**, so it uses **dynamic dispatch**.
- Destructors are **virtual**, so deleting via `Question*` calls derived destructors.

### First loop (`Question* p[2]`)
Static type is `Question*`, so `getValue()` calls `Question::getValue()`.

- `p[0] = new NonTrivialQuestion(15)`
  - `val = 15`
  - `getValue()` → **15**
  - `studentResponse()` → **"I got this!"**

- `p[1] = new DifficultQuestion` (default `Question(10)`)
  - `val = 10`
  - `getValue()` → **10**
  - `studentResponse()` → **"When are office hours?"**

### Second loop (`NonTrivialQuestion* q[2]`)
Static type is `NonTrivialQuestion*`, so `getValue()` calls `NonTrivialQuestion::getValue()`.

- `q[0] = new NonTrivialQuestion(15)`
  - `getValue()` → **15 + 15 = 30**
  - `studentResponse()` → **"I got this!"**

- `q[1] = new DifficultQuestion`
  - `getValue()` → **15 + 10 = 25**
  - `studentResponse()` → **"When are office hours?"**

### Destructor output
Only `delete p[1];` is called. Because the destructor is virtual:

```
DifficultQuestion::~DifficultQuestion() -> d3
NonTrivialQuestion::~NonTrivialQuestion() -> d2
Question::~Question() -> d1
```
