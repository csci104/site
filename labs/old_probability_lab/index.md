---
layout: asides
toc: true
tasks: true
title: Probability Theory
---

---

**Due at the end of your registered lab section**

---

In this lab we are going to do a quick review of counting and probability.

## Counting

### a) Circular permutation

Example: 10 students are sitting in a cirle. How many arrangements are there if two arrangements are considered the same if every student has the same neighbors in the two arrangements?

Generalization: If there are $n$ students, then the number of possible arrangements is:

$$\frac{(n-1)!}{2}$$

for all $n \geq 2$.

- [ ] Where does the $-1$ in the numerator come from?
- [ ] Where does the $2$ in the denominator come from?

### b) Number of pathes on a regular grid

Example: Given a 10x10 grid with bottom left coordinate (0, 0) and top right coordinate (10, 10), you start from the bottom left and walks to the top right, and for each step, you may only walk one unit to the right or one unit to the top. How many different paths could you take?

Generalization: for a $m$-by-$n$ grid, the number of different paths is

$$\binom{m+n}{m}$$

- [ ] Why is this the case?

### c) Multi-set partitioning

Example: How many different permutations (doesn't need to be an actual English word) could you make out of the letters of the word `mississippi`?

Generalization: Given a collection of $n=k_1+k_2+\dots+k_m$ objects which can be split into $m$ groups of $k_1,k_2,\dots,k_m$ objects, and objects from the same group are considered identical, whereas objects from different groups are considered different, then there are

$$\frac{n!}{k_1! k_2! \dots k_m!}$$

- [ ] Why is this the case?

### d) Integer solutions of equations

Example: How many different solutions are there for the equation

$$x+y+z=12$$

where $x, y, z$ are all positive integers?

Generalization: The number of positive integer solutions of $x_1+x_2+\dots+x_m=n$ where $n \geq m$ is

$$\binom{n-1}{m-1}$$

Example: How many different solutions are there for the equation

$$x+y+z=12$$

where $x, y, z$ are all **non-negative** integers?

- [ ] Could you reduce it to the previous case?

Generalization: The number of non-negative integer solutions of $x_1+x_2+\dots+x_m=n$ where $n \geq 0$ is

$$\binom{n+m-1}{m-1}$$

## Probability Theory

### a) Simplest case

Most of probability problems you have seen so far asks you to find the probability of a certain **event** given a **sample space**. The sample space is a set of potential outcomes (i.e the roll of a die could give you numbers from $1$ to $6$, therefore the sample space is simply $ \{ 1, 2, 3, 4, 5, 6\}$). An event is a subset of that sample space, and therefore, a selected set of "favorable" outcomes (i.e. the event that you rolled the die and get a even number is represented by the set $ \{ 2, 4, 6\}$).

In some problem the sample space would be uniform, meaning: every outcome in the sample space is equally likely to occur. In the above example, this corresponds to a fair die. In such case, the probablity is simply

$$\frac{|E|}{|S|}$$

where $\vert E \vert$ is the size of the event (i.e the number of outcomes in the event) and $\vert S \vert$ is the size of the sample space.

Example: two fair D20-s (a D20 is a die with 20 faces, i.e a icosahedron) are rolled, what is the probability that their sum is 15?

*How did you choose the sample space when you were solving this problem?*

### b) The complement rule 

Sometimes life is hard - and calculating the probablity of an event $E$ directly is even harder. However, you may find out that calculating the probablity that the event does not happen is much easier.

The event that $E$ does not happen is called $E$'s complement, and is denoted by $\bar{E}$. The probablity of $\bar{E}$ is simply:

$$P(\bar{E})=1-P(E)$$

Example: What is the proability that you get at least one 20 after you've rolled a D20 for 20 times?

Solution: It is easier to calculate the probality that you get no twenty at all. This is simply $(19/20)^{20}$. So the final answer would just be $1-(19/20)^{20}$

### c) Conditional probability

The event that both $A$ and $B$ happen is denoted as $A \cap B$, and from that we define the conditional
probablity $P(A|B)$ (reads: probablity of A given B) as

$$P(A|B) = \frac{P(A\cap B)}{P(B)}$$


### d) Mututally exclusive events

Sometimes you are given a collection of events, where if one of them happens, then the others cannot happen. Tossing a coin can give you either head or tail (unless you are Harvey Dent), but not both. Getting a head necessary means it cannot be a tail, and vice versa.

Events don't have to be compliments of each other in order to be mutually exclusive. For example, if you roll a D6, the event of getting a 1 and the event of getting a 6 are mutually exclusive, even though they don't cover the whole sample space.

More formally, given $m$ events $E_1, E_2, ..., E_m$, they are said to be mutually exclusive if $E_i \cap E_j = \emptyset$ for all $i \neq j$.

The probability of the union of mutually exlusive events is just the sum of the probablity of the individual events:

$$P(\ \bigcup_{i=1}^m E_i \ ) = \sum_{i=1}^m P(E_i)$$

However, if we do not know whether those events are mutually exclusive, we still know that

$$P(\ \bigcup_{i=1}^m E_i \ ) \leq \sum_{i=1}^m P(E_i)$$

The above inequality is called Boole's inequality.

### e) Inclusion-exclusion principle

If you don't know that two events are mutually exclusive, you can still calculate the probablity of their union by:

$$P(A\cup B)=P(A)+P(B)-P(A\cap B)$$

Example: In a town, 30% of families own a dog and 50% own a cat, and 65% own either a cat or a dog (or both). What percentage of families in the town own both a cat and a dog?

### f) Independence

We say that two events $A$ and $B$ are independent if $P(A \vert B)=P(A)$.

Intuitively speaking, this says the knowing $B$ happens does not change the probability that $A$ happens, and vice versa.

By definition of conditional probality, this is equivalent to $P(A)P(B) = P(A\cap B)$

### g) Bayes' Theorem

This is the theorem:

$$P(A|B)=\frac{P(B|A)P(A)}{P(B|A)P(A)+P(B|\bar{A})P(\bar{A})}$$

- [ ] Could you prove it? 
    *Hint: use the fact that $P(E) = P(E|F)+P(E|\bar{F})$*

Example: A test for a virus is accurate 95% of the time on patients infected by the virus, and 99% accurate of the time on patients thatr are not infected. It is estimated that 1% of the population is infected. A patient is chosen randomly from the population, and he tested positive for the virus, what is the probablity that he is actually infected?

Solution: Let $I$ be the event that the patient is infected and $T$ be the event that the patient tested positive. Then

$$
\begin{split}
P(I|T)
&=\frac{P(T|I)P(I)}{P(T|I)P(I)+P(T|\bar{I})P(\bar{I})} \\
&=\frac{0.95 \times 0.01}{0.95 \times 0.01 + 0.01 \times 0.99} \\
&\approx 0.49
\end{split}
$$

### h) Binomial distribution

Example: A mobile network has 30 users, and at any given time, each user has a 10% chance of being active. Assuming users act independently, what is the probablity that there are at least 10 users active at the same time?

Generalization: Given $n$ independent Bernulli trials with a probability of success of $p$, the probablity of getting $k$ successes is

$$\binom{n}{k}p^k(1-p)^{n-k}$$

### i) Random Variables

A **Random Variable** is a mapping from the sample space to the set of real numbers. Consider the outcomes of flipping 2 coins. Our sample space had 4 elements, listed below. We can create a random variable **X** to denote the number of heads in each outcome:

+ $X(HH) = 2$
+ $X(HT) = 1$
+ $X(TH) = 1$
+ $X(TT) = 0$

The **probability distribution** of a random variable X is the probability of every possible value of X. In the above example, the distribution of X is:

+ $P(X = 0) = 1/4$
+ $P(X = 1) = 2/4$
+ $P(X = 2) = 1/4$

### j) Expectation

Given a random variable X, the **expectation** or **expected value** of X, E(X), is the weighted average of X:

$$E(X)=\sum_{s \in S} P(s)X(s)$$

Using the **linearity of expectations**, we can calculate the expectation of a sum of random variables:

$$E(X_1+X_2+\dots+X_n)=E(X_1)+E(X_2)+...+E(X_n)$$

**The above holds even if random variables are not independent!**

Furthermore, multiplying a random variable by a scalar constant multiplies its expected value by that constant; likewise, adding a constant to a random variable adds that constant to its expected value. For random variable X and constants a and b:

$$E(aX+b)=a \cdot E(X) + b$$

**Example 1:** 

Suppose we roll 2 fair dice. Let X be the sum of each roll. What is E(X)?

**Solution**: the probability distribution of X is:

+ $P(X = 2) = 1/36$
+ $P(X = 3) = 2/36$
+ $P(X = 4) = 3/36$
+ $P(X = 5) = 4/36$
+ $P(X = 6) = 5/36$
+ $P(X = 7) = 6/36$
+ $P(X = 8) = 5/36$
+ $P(X = 9) = 4/36$
+ $P(X = 10) = 3/36$
+ $P(X = 11) = 2/36$
+ $P(X = 12) = 1/36$

Thus:

$$E(X) = 2 * (1/36) + 3 * (2/36) + ... + 12 * (1/36) = 7$$

**Example 2:**

You are given a standard deck of 52 cards. You then shuffled it in a way so that each permutation is equally likely to occur. What is the expected number of cards that stayed at the same position in the pile before and after the shuffle?

**Solution:**

Given a specific card $C_i$, it has the proability of ${51!}/{52!}=1/52$ of staying at the same position.

We can define the random variables $F_i$, where $i=1,2,\dots,52$

$$
F_i = \begin{cases}
   1 &\text{if } C_i \text{ does not change position} \\
   c &\text{otherwise} 
\end{cases}
$$

Let $X$ be the number of cards that does not change position.

Then $X=F_1+F_2+\dots+F_{52}$

Therefore 

$$
\begin{split}
E(X) &=E(F_1+F_2+\dots+F_{52})\\
&=E(F_1)+E(F_2)+\dots+E(F_{52})\\&=52 \times 1/52=1
\end{split}
$$

### Practice Problems

a) You are sending a message to your friend via a network consisting of three routers A, B, and C. The message could reach your friend only if all three routers are functioning correctly. At any given time, router A, B, and C have chances of failure of 1%, 2%, and 3%, respectively. If your friend does not receive your message, what is the probablity that router A is not functioning correctly? (Assuming that routers function independently)

b) What is the number of integer solutions of the equation $x+y+z=12$, where $x, y, z \geq -2$?

c) The rule of California's Mega Million lottery is as followed:

> Players may pick six numbers from two separate pools of numbers - five different numbers from 1 to 70 (the white balls) and one number from 1 to 25 (the gold Mega Ball)

The host would do the same (at random). If the player's choice matches the host's choice, the player wins the jackpot. What is the probability of winning a jackpot?

d) There are 15 different gifts and 5 different children. How many ways are there to distribute all the gifts to the children if the $i$-th child must receive exactly $i$ gifts? (i.e child 1 must receive 1 gift, child 2 must receive 2 gifts, and so on)

e) There are a total of 100,000 lottery tickets of which 100 are winning tickets. You bought 50 lottery tickets at random. What is the expected number of winning tickets among those you bought?

f) (Bonus) How many ways are there to arrange $n$ pairs of parentheses such that they are balanced? (Example: for $n=2$, we can only do `(())` and `()()`)

- [ ] To get checked off, finish the problems from (a) through (e) (Problem (f) is optional). You do not have to calculate the exact numeric answer. You will be asked to explain your solution, so be prepared!

If you are requesting a checkoff via Piazza, please include the following in your post:

- [ ] The lab number you are requesting checkoff for. (**This is lab 8**)
- [ ] A copy of your answers to the practice problems (including a reasonable amount of intermediate steps or explainations)
- [ ] Your USC email and your 10-digit USC ID.