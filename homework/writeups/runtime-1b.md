In Big-&Theta; notation, analyze the running time of the following three pieces of code/pseudo-code. Describe it as a function of the input (here, `n`).   Submit your answers as a PDF (using some kind of illustration software or scanned handwritten notes where you use your phone to convert to PDF) showing your work and derivations supporting your final answer.  **You must name the file `q3_answers.pdf`**.  As usual, answers without supporting work will receive 0 credit.

#### Part (a)

```c++
void f1(int n)
{
  int t = sqrt(n);
  for(int i = 0; i < n; i++){
    for(int j = 0; j < n; j++){
      // do something O(1)
    }
    n -= t;
  }
}

```

#### Part (b)

```c++
Assume A is an array of size n+1.

void f2(int* A, int n)
{
  for(int i=1; i <= n; i++){
    for(int k=1; k <= n; k++){
      if( A[k] == i){
        for(int m=1; m <= n; m=m+m){
          // do something that takes O(1) time
          // Assume the contents of the A[] array are not changed
        }
      }
    }
  }
}
```

#### Part (c)

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


#### Part (d)

Notice that this code is very similar to what will happen if you keep inserting into an ArrayList (e.g. `vector`).  Notice that this is **NOT** an example of amortized analysis because you are only analyzing *1* call to the function `f()`.  If you have discussed amortized analysis, realize that does NOT apply here since amortized analysis applies to *multiple* calls to a function.  But you may use similar ideas/approaches as amortized analysis to analyze this runtime. If you have NOT discussed amortized analysis, simply ignore it's mention.

```c++
int f (int n)
{
  int *a = new int [10];
  int size = 10;
  for (int i = 0; i < n; i ++) 
     {
        if (i == size)
          {  
             int newsize = 4*size;
             int *b = new int [newsize];
             for (int j = 0; j < size; j ++) b[j] = a[j];
             delete [] a;
             a = b;
             size = newsize;
          }
        a[i] = i*i;
     }
}
```


