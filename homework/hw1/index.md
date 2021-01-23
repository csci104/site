---
layout: asides
toc: true
tasks: true
title: Homework 1 Written
---

# HW1: Written Assignment

+ Due: Friday, January 29th, 11:59pm PST
+ You will submit this homework through Blackboard, by uploading your answers.  Please submit with a common file extension (such as .txt, .jpg, or .pdf)
+ To access the programming portion of this assignment, click [here](../hw1/programming/)

## 1. Course Policies (10%)

Carefully study the information on the [course web site]({{site.url}}), then answer the following questions about course policies (anywhere from no to all answers may be correct):

### Part A
Which of the following are acceptable behaviors in solving homeworks/projects?

1. Looking up information relevant to the course online.
2. Looking up or asking for sample solutions online.
3. Copying code from my classmates, and then editing it significantly.
4. Asking the course staff for help.
5. Sitting next to my classmate and coding together as a team or with significant conversation about our approach.
6. Sharing my code with a classmate, if they just promise not to copy them, but to just read over it and learn from it.

### Part B
Which of the following are recommended ways of writing code (see the Resources page)?

1. gedit
2. emacs
3. Eclipse
4. sublime
5. Microsoft Visual Studio
6. notepad

### Part C
What is the late submission policy?

1. Each assignment can be submitted late for 50% credit.
2. Each student has 3 late days of which only one can be used per HW.
3. Students need to get approval before submitting an assignment late.
5. Use the normal submission system provided you have late days available

### Part D
After making a late submission by pushing your code to Github you should...

1. Use the normal submission system on the course website
2. Complete a separate late submission form.
3. Email your instructor.
4. Start the next assignment sooner (hint: this is correct)

## 2. Git (10%)
Carefully review and implement the steps discussed in [Lab1]({{ site.url }}/labs/lab01.html). Then answer the following questions:

### Part A
Which of the following git user interfaces are accepted and supported in this course?

1. Git Bash (Windows)
2. GitHub Desktop Client
3. Terminal (Mac or Linux)
4. Eclipse eGit
5. Tower Git Client

### Part B
Provide the appropriate git command to perform the following operations:

1. Stage an untracked file to be committed. The (hypothetical) file is called 'hw1q2b.cpp'.
2. Display the details of the last three commits in the repository.

### Part C
Let's say you staged three files to be committed. Then, you ran the following command:

`git commit`

What will git do?

## 3. Runtime Analysis (20%)
In Big-&Theta; notation, analyze the running time of the following pieces of code/pseudo-code. Describe the running time as a function of the input size (here, `n`).  You should **always** explain your work when solving mathematics problems.

### Part A

```c++
for(int i=n-1; i >=0; i--){
  for(int k=0; k < i; k++){
    // do something that takes O(1) time
  }
}
```

### Part B
Assume `A` is an array of size n+1.

```c++
for(int i=1; i < n; i++){
  for(int k=1; k <= n; k++){
    if( A[k] == i){
      for(int m=1; m <= n; m=m+m){
        // do something that takes O(1) time
        // Assume the contents of the A[] array are not changed
      }
    }
  }
}

```

### Part C

```c++
void f3(int* A, int n)
{
  if(n <= 1) return;
  else {
    f3(A, n-2);
    // do something that takes O(1) time
    f3(A, n-2);
  }
}
```

### Part D

Notice that this code is similar to what happens if you keep inserting into a vector.

```c++
int *a = new int [10]; // new is O(1)
int size = 10;
for (int i = 0; i < n; i ++)
  {
    if (i == size)
      {
        int newsize = 2*size;
        int *b = new int [newsize];  // new is O(1)
        for (int j = 0; j < size; j ++) b[j] = a[j];
        delete [] a;  // delete is O(1)
        a = b;
        size = newsize;
      }
    a[i] = i*i;
  }
```

## 4. Linked Lists, Recursion (10%)

Consider the following C++ code.  What linked list is returned if funcA is called with the input linked list `1,2,3,4,5`?  All of the points for this problem will be assigned based on your explanation, since we have full faith in your ability to run this program and copy down the answer.  We **strongly** recommend solving this by hand, and only using a compiler to verify your answer.

```c++
struct Node {
    int value;
    Node *next;
};

void funcB (Node* in1, Node* in2);

Node* funcA (Node* in)
{
   if (in == NULL) return NULL;
   Node* out = NULL;
   if (in->next != NULL)
   {
       out = funcA (in->next);
       funcB (in, out);
       in->next = NULL;
       return out;
   }
   return in;
}

void funcB (Node* in1, Node* in2)
{
   if (in2->next != NULL) 
   {
       funcB (in1, in2->next);
       return;
   }
   in2->next = in1;
}
```

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)
