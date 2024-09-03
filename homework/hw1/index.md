---
layout: asides
toc: true
tasks: true
title: Homework 1 Written
---

# HW1: Written Assignment

+ Due: Friday, September 6th, 11:59pm PST
+ You will submit this homework through Gradescope, by uploading your answers.  Please submit with a common file extension (such as .txt, .jpg, or .pdf)
+ To access the programming portion of this assignment, click [here](../hw1/programming/)

## 1. Course Policies (10%)

Carefully study the information on the [course web site]({{site.url}}), then answer the following questions about course policies.  Circle **all** correct answers (anywhere from none to all options may be correct):

### Part A
Which of the following are acceptable behaviors in solving homeworks/projects?

1. Looking up relevant C++ reference information online.
2. Looking up or asking for sample solutions online from sites like Chegg, Github, etc.
3. Talking to my classmates about general approaches about the problems (but no specific coding statements or description of your own code or someone else’s code).
4. Copying code from my classmates or an online source, and then editing it significantly.
5. Asking the course staff for help.
6. Sitting next to my classmate and coding together as a team or with significant conversation about approach.
7. Sharing my code with a classmate, even if he/she just wants to read over it and learn from it
8. Using chatGPT to help write ANY part of my code.

### Part B

Which of the following are true regarding regrades and wrong submissions?

1. If you forget to submit a file via GITHUB you can still apply for a regrade after the deadline and submit the missing file.
2. Email the professor when you want a regrade.
3. Complete the regrade request form within 7 days of receiving the grade and wait for an email. Or, if you don’t hear back attend the designated regrade TA.
4. Regrades submitted after 7 days of the HW score posting will NOT BE ACCEPTED for any reason.

### Part C
What is the late submission policy?

1. One hour late submission is acceptable for each assignment.
2. Each assignment can be submitted up to two days late for 50% credit.
3. Each student has 5 late days of which only 2 can be used per HW
4. Students need to get an approval before submitting an assignment late.

### Part D
After pushing your code to Github you should:

1. Do nothing. Once you push your code you are done.
2. Wait for the latest GitHub Actions run to finish and verify that the summary is correct based on your local files.
3. Complete the online submission page using your FULL (30 or more digit) SHA only if you do not want your latest commit to be graded.

## 2. Git (10%)
Carefully review and implement the steps discussed in [Lab1](https://bytes.usc.edu/cs104/labs/lab1-gdb). Then, answer the following questions:

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

What is the full command to re-clone your private CSCI104 HW1 repo to your VM? Assume you are in an appropriate folder.

## 3. Runtime Analysis (20%)
In Big-&Theta; notation, analyze the running time of the following pieces of code/pseudo-code. Describe the running time as a function of the input size (here, `n`).  You should **always** explain your work when solving mathematics problems and some of your grade will be purely based on work shown.

### Part A

```c++
for(int i=n-1; i >=0; i--){
  for(int k=0; k < i; k++){
    // do something that takes O(1) time
  }
}
```

### Part B
Assume `A` is an array of size n.

```c++
for(int i=0; i < n; i++){
  for(int k=0; k < n; k++){
    if( A[k] == i){
      for(int m=1; m < n; m=m+m){
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
    // do something with A that takes O(1) time
    f3(A, n-2);
  }
}
```

### Part D

Notice that this code is similar to what happens if you keep inserting into a vector.

```c++
int *a = new int [10]; // assume this is O(1)
int size = 10;
for (int i = 0; i < n; i ++)
  {
    if (i == size)
      {
        int newsize = 2*size;
        int *b = new int [newsize];  // assume this is O(1)
        for (int j = 0; j < size; j ++) b[j] = a[j];
        delete [] a;  // assume this is O(1)
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
   Node* out = NULL; //it is a good idea to initialize pointers to NULL.
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
