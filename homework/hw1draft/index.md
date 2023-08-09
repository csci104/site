---
layout: asides
toc: true
tasks: true
title: Homework 1 Written
---

# HW1: Written Assignment

+ Due: Friday, September 1st, 11:59pm PST
+ You will submit this homework through Blackboard, by uploading your answers.  Please submit with a common file extension (such as .txt, .jpg, or .pdf)
+ To access the programming portion of this assignment, click [here](../hw1/programming/)

### Problem 1 - Course Policies (8%)

Carefully study the information on the [course web site](https://bytes.usc.edu/), then answer the following questions about course policies:

#### Part (a):

Which of the following are acceptable behaviors in solving homeworks/projects (list all that apply)?

1. Looking up relevant C++ reference information online.
2. Looking up or asking for sample solutions online from sites like Chegg, Github, etc.
3. Talking to my classmates about general approaches about the problems (but no specific coding statements or description of your own code or someone else’s code).
4. Copying code from my classmates or an online source, and then editing it significantly.
5. Asking the course staff for help.
6. Sitting next to my classmate and coding together as a team or with significant conversation about approach.
7. Sharing my code with a classmate, even if he/she just wants to read over it and learn from it
8. Using chatGPT to help write ANY part of my code.

#### Part (b):

Which of the following are true regarding regrades and wrong submissions (indicate True/False):

1. *True/False*: If you forget to submit a file via GITHUB you can still apply for a regrade after the deadline and submit the missing file.
2. *True/False*: Email the professor when you want a regrade.
3. *True/False*: Complete the regrade request form within 7 days of receiving the grade and wait for an email. Or if you don’t hear back attend the designated regrade TA.
4. *True/False*: Regrades submitted after 7 days of the HW score posting will NOT BE ACCEPTED for any reason.

#### Part(c):

What is the late submission policy (list all that apply)?

1. One hour late submission is acceptable for each assignment.
2. Each assignment can be submitted up to two days late for 50% credit.
3. Each student has 5 late days of which only 2 can be used per HW
4. Students need to get an approval before submitting an assignment late.

#### Part(d):

After pushing your code to Github you should… (indicate True/False)

1. *True/False*: Do nothing. Once you push your code you are done.
2. *True/False*: Clone your repo to a temporary folder to ensure all the files you desire are pushed and that your code compiles.
3. *True/False*: Complete the online submission page using your FULL (30 or more digit) SHA.

#### Part (e):

What are the penalties if we find your code is TOO similar to another students (past or current) or an online source?

### Problem 2 - Git (7%)

Carefully review and implement the steps discussed in [Lab1](https://bytes.usc.edu/labs/lab1/). Then, answer the following questions:

#### Part (a):

When cloning a Git repo, which of the following should you avoid:

1. Cloning into a folder that itself is a git repo
2. Cloning into a sync’ed folder like Dropbox or Google Drive
3. Cloning into the `Desktop` folder of your VM

#### Part (b):

Provide the appropriate git command to perform the following operations:

1. Stage an untracked file to be committed. The file is called ‘hw1q2b.cpp’.
2. Display the details of the last three commits in the repository (hint: checkout this [webpage](https://git-scm.com/book/en/v2/Git-Basics-Viewing-the-Commit-History) )

#### Part (c)

What is the full command to re-clone your private CSCI104 repo to your VM? Assume you are in an appropriate folder.

## 3. Runtime Analysis (25%)

In Big-&Theta; notation, analyze the running time of the following pieces of code/pseudo-code. Describe the running time as a function of the input size (here, `n`).  You should **always** explain your work when solving mathematics problems.

### Part A

```c++
for (int i = 0; i < n; i ++)
{  // A is an array of integers of sufficient size
   if (A[i] == 0) {
      for (int j = 0; j <= i; j++) {
          if (A[i] == 0) {
             for (int k = 0; k <= j; k++) {
                 A[i] = 1;   // this is not a typo
             }
          }
      }
   }
}
```

### Part B
```c++
for (int i = 1; i < n; i *= 2)
{
   func(i);
}

void func(int x) {
  if (x <= 1) return;
  func(x-1);
}

```

### Part C

```c++
// This problem uses the same singly linked list Node structure you've seen a lot
// A is an array of integers of sufficiently large size
Node *head = new Node;
Node *curr = head;
head->data = 0;
head->next = nullptr;
for (int i = 1; i < n; i++)
{
   curr->next = new Node;
   curr = curr->next;
   curr->data = i;
   curr->next = nullptr;
}
for (int i = 1; i <= n; i++) {
   curr = head;
   while (curr != nullptr) {
      if (curr->data % i == 0) {
         for (int j = 0; j < n; j++) {
             A[j] ++;
         }
      }
      curr = curr->next;
   }
}
```

### Part D

Notice that this code is similar to what happens if you keep inserting into a vector.

```c++
double *a = new double [3];
int size = 3;
for (int i = 0; i < n; i ++) 
{
   if (i == size)
   {  
       int newsize = 3 * size;
       double *b = new double [newsize];
       for (int j = 0; j < size; j++) b[j] = a[j];
       delete [] a;
       a = b;
       size = newsize;
   }
   a[i] = sqrt(i);
}
```

### Part E

```c++
recursiveFunc(0, n-1);

void recursiveFunc(int left, int right) {
    // A is an array of sufficiently large size.
    if (right-1 <= left) return;
    int mid = (left+right)/2;
    recursiveFunc(left, mid);
    recursiveFunc(mid+1, right);
}
```



## 4. Linked Lists, Recursion (10%)

Consider the following C++ code.  What linked list is returned if funcA is called with the input linked list `1,2,3,4,5`?  All of the points for this problem will be assigned based on your explanation, since we have full faith in your ability to run this program and copy down the answer.  We **strongly** recommend solving this by hand, and only using a compiler to verify your answer.

```c++
struct Node {
    int value;
    Node *next;
};

Node* funcA(Node* in) {
    Node *out = in;
    while (out->next != nullptr) {
	out = out->next;
    }
    funcB(in)->next = NULL;
    return out;
}

Node* funcB(Node* in) {
   if (in->next != nullptr) {
	funcB(in->next)->next = in;
   }
   return in;
}
```

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)
