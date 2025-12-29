In Big-&Theta; notation, analyze the running time of the following three pieces of code/pseudo-code. Describe it as a function of the input (here, `n`).   Submit your answers as a PDF (using some kind of illustration software or scanned handwritten notes where you use your phone to convert to PDF) showing your work and derivations supporting your final answer.  As usual, answers without supporting work will receive 0 credit.

#### Part (a)

```c++
void practice1(int n) {
    for (int i = 1; i <= n; i = i * 2) {
        for (int k = 1; k <= i; k++) {
            /* O(1) something */
        }
    }
}

```

#### Part (b)

```c++

void practice2(int n) {
    // Phase 1
    for (int i = 0; i < n * n; i++) {
        /* O(1) task */
    }
    // Phase 2
    for (int j = 1; j <= n; j++) {
        for (int m = 1; m <= n; m = m + m) {
            /* O(1) task */
        }
    }
}


```

#### Part (c)

```c++
void practice3(int n) {
    for (int i = 1; i * i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            /* O(1) task */
        }
    }
}

```

#### Part (d)


```c++

void practice4(int n) {
    int remaining = n;
    while (remaining > 1) {
        for (int i = 0; i < remaining; i++) {
            /* O(1) task */
        }
        remaining = remaining / 2;
    }
}

```






