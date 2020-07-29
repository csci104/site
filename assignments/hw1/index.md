---
layout: asides
title: CSCI 104 - Homework 1
toc: true
tasks: true
---

# Homework 1

This is a sample homework designed for testing various facets of the curricula ecosystem.
These problems are legit, so consider giving them a shot if you're interested!


## 1. Decimal (40%)

Fixed-point decimals are particularly useful in cases where we are dealing with precise values, such as currency, time, or your grades (for which we do in fact use decimals).
"But what's wrong with floating point numbers?" you might be wondering.
Nothing intrinsically; `float` and `double` are both convenient and fairly accurate, and are sufficient for most application.
However, both fall victim to rounding error which you can read about [here](https://floating-point-gui.de/basic/), making them unsuitable for the aforementioned scenarios.
This is why, as you'll see later on, we don't offer constructors or operations for other numeric types.
Practically, there's little reason to; if you're working with decimals for their precision, there is no point at which you would want to introduce a stray floating point error.

In this problem you will implement a rudimentary fixed-point decimal.
All `Decimal` instances will be templated with a parameter `size_t P`, which will dictate how many places are to be reserved after the decimal point.
For example, a `Decimal<4>` would have 4 digits of precision, and could store `-12.3456` or `0.6667`.
Your `Decimal` will have two main capabilities: translation to and from `std::string`, and standard mathematical operations.

### Underlying Representation

You'll notice that the `Decimal` class skeleton provided to you has exactly one private member of type `value_type`.
This is, as defined in the first lines of the file, is an alias to `int64_t`, which is the widest size integer universally supported by C++.
Using an `int64_t` will give us the largest range with the least trouble.
Note that we `typedef` it as `value_type` for convenience; if we wish to change the type at a later date, we can do so in just one place.

In terms of underlying representation, our design is quite simple: our decimal `d` is stored as `d * pow(10, p)`.
If we had a `Decimal<4>` representing `0.3333`, its value would consist of the integer `3333`.
If we had a `Decimal<6>` representing `-12.345678`, its value would consist of the integer `-12345678`.
While this means that we cannot represent anything with more precision than `0.0001` for `Decimal<4>` and `0.000001` for `Decimal<6>`, it also means that we are storing exactly the values that we can represent.

### Convenience Methods

There are two convenience methods we highly recommend you write at the start.
The first is `inline int8_t sign(value_type value)`, which simply returns `-1` if the value is negative and `1` otherwise.
The second, `constexpr value_type E(size_t n)`, is a little bit more interesting.
 
All calls to `E(n)` with positive `n` should return 10 to the `n`th power.
You'll likely find yourself invoking `E` with constant functions of `P` for multiplication, division, and perhaps a few other tasks.  
Because `P` is a template parameter and therefore also available during compilation, marking `E` as `constexpr` will save us a few cycles during runtime by precomputing the result ahead of time. 

### String Translation

As with all other methods related to the `Decimal<P>`, a base structure is available in the problem resources.
The first thing you will want to implement is `std::string` parsing, as it will allow you to start testing.
Like `stoll`, which you may want to use, the overload of `Decimal<P>::value_from_string` you will implement should take the `std::string` from which you are to parse the decimal and an `index` reference, which should be left pointing to the next character in the string after those consumed by the decimal.

This method should return a `value_type` corresponding to the internal representation you would expect for a `Decimal<P>` matching the value of the string.
In other words, `Decimal<4>::value_from_string("0.6666")` should return `6666`, and `Decimal<4>::value_from_string("1.0")` should return `10000`.
Throughout this project we will round up from 5 to handle values more precise than we can represent.
Therefore, `Decimal<4>::value_from_string("0.66666")` should return 6667 and `Decimal<4>::value_from_string("0.33333")` should return `3333`.

Note that this signature also receives the `str` by value, as you will most likely want to modify the buffer.
By comparison, `Decimal<P>::to_string()` should be a breeze.

## 2. Arithmetic (60%)

Write a parser capable of computing the value of mathematical expressions comprised of `+`, `-`, `*`, `/`, and parentheses.
The parser should accept read an expression in for every line of `stdin` and output its value to `stdout` on the corresponding line.
Some example expressions might include:

```
1 + 2.2 + 3
6 + 4 / 2 - 3
(1 - 2) / 3
12.34 * -2 * 4 + 0.5
-2 - -5 / 5
```

Should division by zero occur, the problem should simply output `divide by zero` on the corresponding line.
However, it should continue reading in expressions until the stream is closed.
This program will use the decimal class you wrote in the first part of the assignment.

### Implementation

We recommend you use an [operator precedence parser](https://en.wikipedia.org/wiki/Operator-precedence_parser), which we will discuss in detail below.
We also recommended that you tokenize the input prior to parsing, as it will separate your code into more manageable pieces.
Optionally, we suggest that you use iterators to consume tokens from the input.

- [ ] Skim operator precedence parsing

### Tokenization

Tokenization for our arithmetic parser should be fairly straightforward.
We recommend you represent tokens with an `enum class Kind` and a `Decimal<4>` value.
While all of the symbols, `+-*/()` will have their own `Kind`, all numeric tokens can share a `number` kind to simplify cases in `parse_primary`.

Skipping whitespace and consuming single character tokens should be no problem. 
For decimals, we recommend you use the static helper `Decimal<P>::from_string` you already implemented.

- [ ] Finish `enum class Kind`
- [ ] Create a `Token` struct with `Kind kind` and `decimal_type`
- [ ] Write a tokenizer that takes a string and returns some collection of tokens
    - [ ] Implement single character token parsing
    - [ ] Use `decimal_type::from_string` to implement decimal parsing

### Parsing

Wikipedia provides an extensive review of the theory behind the operator precedence parser, and includes such valuable insights as:

> An operator-precedence parser is a simple shift-reduce parser that is capable of parsing a subset of LR(1) grammars.
> More precisely, the operator-precedence parser can parse all LR(1) grammars where two consecutive nonterminals and epsilon never appear in the right-hand side of any rule.

Most of us will likely read this and walk away somehow knowing less.
However, upon translation to English, there are a couple things we can gleam.
In general, a grammar is a set of patterns defining the structure of language.
An operator precedence parser implements a certain grammar to be able to parse things like arithmetic expressions, which can have ambiguities resolved by operator precedence.
Consider `a + b + c`, which is pretty easy to parse from left to right, and compare it to `a + b * c`, which cannot be parsed the same way.

With all of that said, instead of trying to understand it without all of the requisite linguistic knowledge, we'll simply walk through the algorithm.
Fortunately, it's fairly concise, and there are two main functions for us to think about.

#### Primaries

The first thing we need to know how to parse is a `primary`, which for operator precedence parsers is defined as a value and any associated unary operators.
Things like `5.0` and `-20` and `(3.3)` are all primaries, and combinations of them, such as `-(-20)` or even `--4`, are as well.
It might seem daunting to have to consider all of these possibilities, but it turns out that if we approach the problem recursively, it's nearly painless.
We will implement four cases in our recursive method:

```
parse_primary(tokens)
    if next token is number
        token = pop next token
        return token
    if next token is -
        pop next token
        token = parse_primary(tokens)
        negate token value
        return token
    if next token is +
        pop next token
        token = parse_primary(tokens)
        return token
    if next token is (
        pop next token
        token = parse_expression(tokens)
        pop next token  # closing paren
        return token
```

- [ ] Implement `parse_primary` however you see fit

#### Expressions

Once this is done, we can implement the aforementioned `parse_expression`.
Essentially, the idea here is that we only progress from left to right if the next operator is of equal or greater precedence, and if it's not, we first evaluate what we've got then continue.

```
parse_expression(tokens, lhs, minimum precedence)
    lookahead = peek next token
    while lookahead is a binary operator whose precedence is >= minimum precedence
        operator = pop next token
        rhs = parse_primary(tokens)
        lookahead = peek next token
        while lookahead is a binary operator whose precedence is greater than operator's, 
                or a right-associative operator whose precedence is equal to operator's
            rhs = parse_expression(tokens, rhs, lookahead's precedence)
            lookahead = peek next token
        lhs = the result of applying operator with operands lhs and rhs
    return lhs
```

Note that this implementation associates a precedence with operators.
For us, it is sufficient for `+` and `-` to have precedence 1 and `*` and `/` to have precedence 2, with the default precedence being 0.

- [ ] Add a `int precedence` and `bool is_binary` to `Token`
- [ ] Write a method that applies a binary operator to two `Token`s and returns a `Token`
- [ ] Implement `parse_expression` with pseudocode arguments
- [ ] Add an overload of `parse_expression` that only takes the tokens for convenience
- [ ] Use `parse_expression` in `evaluate`

Good luck!

### Specifications

The entry point for the automated grader, relative to the root of your submission directory, will be `arithmetic/Makefile`.
This makefile will be executed with no arguments, invoking the default task, and should produce a binary `arithmetic/main` that will be tested. 

