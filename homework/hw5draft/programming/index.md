---
layout: asides
toc: true
tasks: true
title: Homework 5 Programming
---

# HW5: Programming Assignment

+ Due: Friday, April 16th, 11:59pm PST

+ To access the written portion of this assignment, click [here](..)

+ Directory name in your github repository for this homework (case sensitive): `hw5`

  - There is no skeleton code for this assignment.
  - You **MUST** provide a `Makefile` so that we can compile your code (not run it) by simply typing `make` which should, among other compilation commands, produce an executable `bayes`
- Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
  - Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.
  

### Construct a Naive Bayes' Classifier (50%)

A *Naive Bayes Classifier* is a simple data classifier used in machine learning and data mining.  It relies on Bayes' Theorem, and is based on certain probabilistic assumptions about independence that may not hold in practice.  Despite its limitations, it often performs much better in practice than other, more sophisticated classification techniques.

The problem that your program will address is as follows: you will be given a collection of data on which to "train" your program, allowing it to determine how likely an object with a specific set of attributes will have a certain classification.  As a concrete example, we could train our program on voting records for past elections to gather data on which age groups, ethnicities, and genders were more likely to vote, and then try to predict in future elections if a specific person will vote.

You'll be running your program on some very simple and non-controversial data: pieces of fruit (an apple tends to be sweet and crunchy, but if an object is sweet and crunchy, how likely is it to be an apple?)  However, your program could just as well be used to analyze voting patterns, determine if an inmate is rehabilitated, or measure systemic racism in the training data for inmate rehabilitation.

### How It Works

Most of the data will be used to train.  For any given classification C of data (such as C = "*is sweet*"), Pr(C) will be the number of pieces of fruit that meet that classification, divided by the total pieces of fruit in our training data set.  Pr(x | C) would be the probability an arbitrary record will meet classification x, given that it meets classification C (such as, what is the probability an object is sweet, given that it is an apple?)  You will train on this type of data.

Using the data you collect, you will then try to classify the rest of the data.  You will try to calculate Pr(C \| x) (such as, what is the probability an object is an apple, given that it is sweet?)  You will also try to calculate more complicated things, where you have multiple traits (such as, what is the probability an object is an apple, given that it is both sweet and crunchy?)  To do this, you will: 

1. Use Bayes' Theorem
2. Assume, rightly or not, that each trait is conditionally independent.  That is, `Pr(sweet and crunchy | apple) = Pr(sweet | apple) * Pr(crunchy | apple)`.  We make this assumption because, for a specific item we are trying to classify, we will not have seen much (if any) training data that has *exactly* those traits.

### Laplacian Smoothing

Suppose you are trying to classify a piece of fruit that is soggy.  Oops, none of your training data involved fruit that was soggy!  What should you do?  One possibility would just be to refuse to classify ("I'm afraid I can't do that, Dave").  This is not ideal, because what if all of the other traits that this fruit has match up perfectly with being an apple?  It's probably just a soggy, gross apple.

Normally, when calculating Pr(x | C) with your training data, you would divide the # of occurrences of x and C (denoted occ(x,C)) by the # of occurrences of C (denoted occ(C)).  Now, to accomplish our goal, we will calculate it as:

$$
\frac{1+occ(x,C)}{1+occ(C)}
$$

In particular, this will lead us to calculate the probability that something soggy is an apple as:

$$
\frac{1}{1+occ(apple)}
$$

### Log-Likelihoods

Instead of calculating probabilities, we'll be calculating the logs (base-2) of probabilities.  That is, we calculate log(Pr(x)) instead of Pr(x).  Why?  This is for computational convenience.  To calculate Pr(x1 ^ x2 ^ ... ^ xn | C), we are instead calculating Pr(x1 | C) * Pr(x2 | C) * ... * Pr(xn | C).  If we take the log of this, all those multiplications turn into easier-to-handle additions:

$$
log(Pr(x_1 \wedge x_2 \wedge ... \wedge x_n | C)) = log(Pr(x_1 | C)) + log(Pr(x_2 | C)) + ... + log(Pr(x_n | C))
$$

### Input/Output

You will run your program as `./bayes train.txt classify.txt output.txt`.   

The `train.txt` input file will consist of a single number on the first line, indicating the number of lines that follow.  Each successive line will always start with a classification (in this case, the type of fruit that it is) followed by 1 or more adjectives to describe this particular object.  It might look like:

```
5
apple crunchy sweet
apple sour crunchy green
banana yellow
apple yellow sweet
banana mushy brown sweet
```

The `classify.txt` input file will consist of a single number on the first line, indicating the number of lines that follow.  Each successive line will have 1 or more adjectives to describe this particular object.  It might look like:

```
3
mushy brown
crunchy green
sweet crunchy green small
```

Once your program is done, the `output.txt` output file should have one word per line, one line for each object in your `classify.txt` file, containing your best guess as to what classification this object falls under.  For the above example, it will hopefully look like this:

```
banana
apple
apple
```

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw5`
  - This directory should be in your `hw-username` repository
  - This directory needs its own `README.md` file briefly describing your work
  - Any `.cpp` and `.h` files you created.
  - Your `Makefile`
+ The submission link will be posted on Piazza a few days before the due date.
