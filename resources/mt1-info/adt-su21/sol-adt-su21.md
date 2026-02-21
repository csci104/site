---
layout: default
title: Midterm 1 Info
nav: Resources
---

# Abstract Data Types

Choose the best abstract data type (List, Set, Map, PQ, Queue, Stack) given the description of the desired data structures below. Be as specific as possible (don't answer List if a Queue is applicable). Also show what types would be used as template arguments (e.g. `map<string, int>` or `stack<double>`). If multiple "best" options exist, choose either. Give a SHORT 1–2 sentence justification for your choice (don't waste time on a long explanation...it won't help you get any more credit than a short answer).

---

## 1.1

A structure to support the following: an academic advisor wants to track the students she advises each day over the course of a semester. Given a day, she'd like to quickly check if she advised a particular student and also be able to quickly go from one day's students to the next or previous day's students.

**Answer:**  
`map<Date, set<Student>>`  
(It is fine to use `int` as the key if dates are represented numerically: `map<int, set<string>>`.)

**Explanation:**  
A `map` maintains ordering by date and allows quick lookup of a specific day. A `set` allows fast membership checking to determine whether a student was advised on that day.

---

## 1.2

A structure for storing the percentage of people vaccinated in each US state (and quickly be able to update that percentage).

**Answer:**  
`map<string, double>`

**Explanation:**  
A `map` allows fast lookup and update by state name. The percentage can be stored as a `double`.

---

## 1.3

A structure to store the answers on a website like StackOverflow.com. The answers should be displayed in order of "upvotes" from highest number of upvotes to least.

**Answer:**  
`priority_queue<Answer>`

**Explanation:**  
A `priority_queue` maintains elements in priority order so the highest-upvoted answer can be accessed efficiently.

---

## 1.4

A structure to track who is in each checkout/cashier lane and their order for an entire grocery store where customers may choose a checkout line (given by an integer) to then wait in.

**Answer:**  
`map<int, queue<Customer>>`  
(Alternatively, `vector<queue<Customer>>` if lane numbers are contiguous.)

**Explanation:**  
Each lane is a FIFO structure, so `queue` models customer order correctly. A `map` (or `vector`) allows access to a specific checkout lane by its integer identifier.
