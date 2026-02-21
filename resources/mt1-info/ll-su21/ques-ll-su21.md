---
layout: default
title: Midterm 1 Info
nav: Resources
---


# Linked Lists and Recursion 

## 3. Linked Lists and Recursion (8 pts.)

Given the code in the image below answer the following questions regarding a call to  
`llmystery(head, 2)` assuming `head` points to the linked list of values:

```
1 2 3 4 5
```

Answer the following questions:

**3.1. True/False:** Will the original linked list be modified (values or pointers)?  
________

**3.2.** Show what will be printed by the code, and further show a call tree (box diagram) of the recursive calls (with relevant arguments) made during execution.

---

```cpp
struct IntItem {
    int val;
    IntItem *next;
    IntItem(int v, IntItem* n) { val = v; next = n; }
};

void llmystery(IntItem* head, size_t loc);
int llmysteryHelper(IntItem* head, size_t loc, IntQueue& q);

void llmystery(IntItem* head, size_t loc)
{
    IntQueue q;
    int t = llmysteryHelper(head, loc, q);
    cout << t << endl;   // *** COUT PRINT HERE ***

    while(!q.empty()) {
        cout << q.front() << " ";   // *** COUT PRINT HERE ***
        q.pop_front();
    }
    cout << endl;
}

int llmysteryHelper(IntItem* head, size_t loc, IntQueue& q)
{
    if(head == nullptr) {
        return 0;
    }
    else if(loc > 0) {
        int t = llmysteryHelper(head->next, loc-1, q);
        q.push_back(head->val);
        return t;
    }
    else {
        q.push_back(head->val);
        return head->val + llmysteryHelper(head->next, loc, q);
    }
}
```