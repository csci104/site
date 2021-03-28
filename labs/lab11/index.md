---
layout: asides
toc: true
tasks: true
title: Probability Theory
---

## Probability Theory

This lab will be covered during lab sections between March 31 (Wednesday) - April 6th, 2021 (Tuesday). **You need to get checked off during a lab sesson on or before April 6th (Tuesday).**

This week, we'll be taking the counting principles we learned from Lab 9 and applying them to probability! Probability is something you'll be revisiting time and time again both in and outside of computer science. Maybe you're interested in artificial intelligence or machine learning, or maybe you just want to think more critically about the uncertainty of life. Probability is an important skill you'll want to carry with you well beyond 104, regardless of what path you take!

*For this lab, you will need to write down the answers to the practice problems and share your solutions with a CP/TA to get checked off. You are expected to do all the exercises, and your CP/TA will randomly select two questions to check your understanding (this means you have to show your work!)* Don't worry, we'll go through examples together!

### Warm Up, Definitions, and Rules

Suppose we have a fair coin, and we flip it 2 times. What is the probability of getting at least one head?

Here, flipping a coin 2 times is called a **trial**. Each trial has an outcome, and our **sample space** is the set of all possible outcomes for any trial. Denoting H for heads and T for tails, and assuming each coin flip yields either H or T (and will never land on an edge), our sample space can be written as {H, T}<sup>2</sup>. The size of our sample space is &#124;{H,T}&#124;<sup>2</sup> = 4. With a small sample space like this, it should be easy enough to list out all the elements:

+ HH
+ HT
+ TH
+ TT

Any subset of the sample space is called an **event**. In this example, the event we are interested in is the event of getting at least one head,  {HH, HT, TH}. Assuming that all outcomes are equally likely, we can say that the probability of this event occurring is 3/4.

More generally, if S is a sample space of equally likely outcomes and E is an event of S, the probability of E is:

<div style="text-align:center"><img src="./assets/p(E).png" alt="P(E)" height="60"/></div>

#### Probabilty of Complements

The **complement** of an event E, denoted as Ē, is the event that E does not occur. 

The **Complement Rule** states that the probability of an event and its complement should sum up to 1:

<div style="text-align:center"><img src="./assets/p(Ec).png" alt="P(E complement)" height="37"/></div>

Sometimes it is easier to first compute the probability of an event's complement, in order to compute the probability of an event. For example, rather than asking "what is the probability of getting at least one head" in 2 consecutive coin tosses, we might instead consider the probability of its complement, or "the probability of getting ZERO heads." The probability of getting zero heads is easy--the only way this can happen is if we get 2 tails, which has a probability of 1/4. Using the complement rule, we can compute the probability of getting at least 1 head as 1 - 1/4 = 3/4.

#### Sum Rule

The **Sum Rule** states that given a sequence of pairwise disjoint (mutually exclusive) events E<sub>1</sub>, E<sub>2</sub>, E<sub>3</sub>, the probability of these events occurring is the sum of the probability of each event: P(E<sub>1</sub> ∪ E<sub>2</sub> ∪ E<sub>3</sub> ∪ ...) = P(E<sub>1</sub>) + P(E<sub>2</sub>) + P(E<sub>3</sub>) + ...

+ Events E<sub>i</sub> and E<sub>j</sub> are **mutually exclusive** if E<sub>i</sub> ∩ E<sub>j</sub> = ∅. In other words, they cannot occur at the same time.

#### Example

Suppose we draw a card from a standard deck of cards. What is the probability that the card we draw is a Queen or a King?

**Solution**: let event E<sub>1</sub> be the event of getting a Queen, and event E<sub>2</sub> be the event of getting a King. There are 4 Queens and 4 Kings in a standard deck of 52 cards, so P(E<sub>1</sub>) = 4/52, and P(E<sub>2</sub>) = 4/52. Thus, the probability of drawing a Queen or King is 4/52 + 4/52 = 8/52.

#### Subtraction Rule (Inclusion-Exclusion Principle)

What if we want to compute the probability of the union of events that are not mutually exclusive? This is where the **inclusion-exclusion principle** comes in:

<div style="text-align:center"><img src="./assets/subtraction_rule.png" alt="P(E1 U E2)" height="37"/></div>

#### Example

Suppose we draw a card from a standard deck of cards. What is the probability that the card we draw is a Queen or a Heart?

**Solution**: let event E<sub>1</sub> be the event of getting a Queen, and event E<sub>2</sub> be the event of getting a Heart. These two events are no longer mutually exclusive: both events can occur simultaneously if we draw a Queen of hearts. There are 4 Queens, 13 Hearts, and 1 Queen of hearts in a standard deck of 52 cards. Thus, P(E<sub>1</sub>) = 4/52, P(E<sub>2</sub>) = 13/52, and P(E<sub>1</sub> ∩ E<sub>2</sub>) = 1/52. Thus, the probability of drawing a Queen or Heart is 4/52 + 13/52 - 1/52 = 16/52. 

### Conditional Probability

The **Conditional Probability** of an event B is the probability of B occurring given that another event A has already happened. We write and compute "the probability of B given A" as:

<div style="text-align:center"><img src="./assets/conditionalP.png" alt="P(B|A)" height="50"/></div>

We say that events A and B are **independent** if the likelihood of B occurring does not depend on event A, or if P(B|A) = P(A).

#### Example

We draw a card from a deck. We know the card is a face card. Given this information, what is the probability the card is a King?

Let K denote King, and let A be the event that the card is a face card, and B be the event that the card is a K.

First, let's compute P(A). There are 52 cards in a deck. Each deck has 13 ranks, 3 of which have "faces" (Jack, Queen, King). Each rank comes in 4 suits, yielding a total of 3 * 4 = 12 face cards in a deck. Thus, assuming a well shuffled deck where all outcomes are equally likely, the probability of event A is 12/52.

Next, we need to compute P(A ∩ B). Of the 12 possible face cards one can draw, 4 are Ks. P(A ∩ B), the probability of drawing a face card AND a K, is 4/52.

Finally, we can compute P(B): (4/52)/(12/52) = 4/12 = 1/3

### Random Variables

A **Random Variable** is a mapping from the sample space to the set of real numbers. Consider the earlier example of flipping 2 coins. Our sample space had 4 elements, listed below. We can create a random variable **X** to denote the number of heads in each outcome:

+ X(HH) = 2
+ X(HT) = 1
+ X(TH) = 1
+ X(TT) = 0

The **probability distribution** of a random variable X is the probability of every possible value of X. In the above example, the distribution of X is:

+ P(X = 0) = 1/4
+ P(X = 1) = 2/4
+ P(X = 2) = 1/4

### Expectation

Given a random variable X, the **expectation** or **expected value** of X, E(X), is the weighted average of X:

<div style="text-align:center"><img src="./assets/expectation.png" alt="E(X)" height="42"/></div>

Using the **linearity of expectations**, we can calculate the expectation of a sum of random variables:

<div style="text-align:center"><img src="./assets/linearity.png" alt="linearity of expectations" height="42"/></div>

The above holds even if random variables are not independent!

Furthermore, multiplying a random variable by a scalar constant multiplies its expected value by that constant; likewise, adding a constant to a random variable adds that constant to its expected value. For random variable X and constants a and b:

<div style="text-align:center"><img src="./assets/expectation2.png" alt="E(aX+b)" height="37"/></div>

The above holds even if random variables are not independent!

To compute the expectation of a product of two *independent* random variables, X and Y, we take the product of their expectations:

<div style="text-align:center"><img src="./assets/E(XY).png" alt="E(XY)" height="37"/></div>

### Variance

While the expectation of a random variable tells us its mean, the **variance** tells us how widely distributed its values are. Two data sets with the same mean but have a vastly different distributions: if you are told that in a batch of a dozen chocolate chip cookies, the average number of chocolate chips is 10 per cookie, it's possible that every cookie has 10 chocolate chips, but it's also possible that one cookie has 120 chocolate chips, while the others have none! (That would be a very sad batch of cookies indeed!)

We can compute the variance for the random variable X as follows:
<div style="text-align:center"><img src="./assets/variance.png" alt="variance" height="47"/></div>

Although we won't prove it here, this can be simplified to V(X) = E(X<sup>2</sup>) - E(X)<sup>2</sup>

#### Example

Suppose we roll 2 fair dice. Let X be the sum of each roll. What is E(X)? What is V(X)?

**Solution**: the probability distribution of X is:

+ P(X = 2) = 1/36
+ P(X = 3) = 2/36
+ P(X = 4) = 3/36
+ P(X = 5) = 4/36
+ P(X = 6) = 5/36
+ P(X = 7) = 6/36
+ P(X = 8) = 5/36
+ P(X = 9) = 4/36
+ P(X = 10) = 3/36
+ P(X = 11) = 2/36
+ P(X = 12) = 1/36

Thus:

+ E(X) = 2 * (1/36) + 3 * (2/36) + ... + 12 * (1/36) = 7.
+ E(X<sup>2</sup>) = 2<sup>2</sup> * (1/36) + 3<sup>2</sup> * (2/36) + ... + 12<sup>2</sup> * (1/36) = 54.83333
+ V(X) = E(X<sup>2</sup>) - E(X)<sup>2</sup> = 54.83333 - 49 = 5.83

### Exercises
1. In Charlie and the Chocolate Factory, Willy Wonka invites 5 lucky children to tour his factory. He randomly distributes 5 golden tickets in a batch of 1000 chocolate bars. You purchase 5 chocolate bars, hoping that at least one of them will have a golden ticket.
+ What is the probability of getting at least 1 golden ticket?
+ What is the probability of getting 5 golden tickets?
2. Scrooge is getting ready for the 104 Duck Fashion Show. Scrooge has 3 hats (yellow, black, green), 9 shirts (3 of which are yellow, and 6 of which are green), and 7 bowties (all of which are blue). Scrooge selects his outfit randomly. What is the probability that his hat and shirt will be different colors?
3. You roll a fair die 6 times. What is the probability that no two number appears twice?
4. Earlier this month, porcupines Stekeltje and Loki in Belgium's ZOO Plackendael gave birth to two porcupettes, Wafa and Winga. You are told that Wafa is male. Given this information, what is the probability that Winga is also male? 
5. Two cookies are pulled out one by one (order matters) and eaten from a jar containing 7 chocolate chip cookies and 6 snickerdoodles. Let X be a random variable denoting the number of snickerdoodles pulled out. What is the probability distribution of X?
+ What is the expected value of X?
+ What is the variance of X?

- [ ] Share your answers with a CP/TA to get checked off. **You need to get checked off during a lab sesson on or before April 6th (Tuesday).**