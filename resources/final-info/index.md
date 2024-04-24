---
layout: default
title: Final Info
nav: Resources
---

## Final Info

### Overview and Process

- Time/Date: **{{site.data.schedule.exams[2].time}}**
  - The test will be set for **110 minutes**. The room is scheduled for 2 hours, so please be a few minutes early.
  - If you have USC approved accommodations, please coordinate with {{site.data.people.administrators[0].name}} ({{site.data.people.administrators[0].email}}) and we will make preparations for your approved time. All OSAS exams will be taken at the OSAS center, please make your arrangements as soon as possible.
- Location: (leave a blank seat between you and your neighbor, if possible)
  {% for location in site.data.schedule.exams[2].location %}
  - {{ location }}
  {% endfor %}

- There will be a one page attendance sheet with 1-2 written questions.
- The rest will be on Gradescope
- The exam is **Closed book, Closed notes, Closed Internet (search/reference/ChatGPT)**.
- You are allowed 1 **8.5x11 handwritten (front and back) cheatsheet**. No **typed** cheat sheets.  No **single-sided, taped** pages to form a double-sided sheet.  You will be asked to turn your cheatsheet in when you are done with the exam (so if you want it for posterity, make a copy beforehand).

<!--

- The test will be taken on a combination of paper (for problems requiring diagrams, tracing, or runtime) and Gradescope.  Gradescope can be accessed by logging into our Blackboard section, choose Assignments, and click on the Gradescope link. You will then find a **Final - Coding** assignment (once the exam begins) where you will be able to find, textboxes for some answers to certain questions and links to skeleton files and upload your completed files.  For coding questions, you will write code on your laptop and then uploading the `.cpp` file.  Skeleton files will be linked directly from Gradescope and you can download them, edit them, and upload your final code.  You can write your code in any editor and even try to compile and run if you like, but we are not expecting you do that and it will take away time from coding the other problems. We will **visually** grade your code and be fairly lenient with **small** syntax errors (e.g. a missing semicolon).  No automated tests will be provided since we don't expect you to compile and run your code.
- You will be given a paper exam that includes all questions and has room for the written answers
- The exam is **Closed book, Closed notes, Closed Internet (search/reference)**. You may use your mind, an editor and/or compiler, and blank scratch paper but nothing else. No referencing your labs, homeworks, etc.
- You are allowed 1 **8.5x11 handwritten (front and back) cheatsheet**. No **printed** cheat sheets.  No **single-sided, taped** pages to form a double-sided sheet.  You will be asked to turn your cheatsheet in when you are done with the exam (so if you want it for posterity, make a copy beforehand).

-->
### Topics and Style

The final is cumulative, so questions related to any unit we have covered may appear on the exam. However, the exam will focus on the topics we have covered since the 2nd midterm:  

#### Unit 17 - Counting
 - All relevant counting rules and approaches taught in lecture and on HW

#### Unit 18 - Probability
 - All relevant counting rules and approaches taught in lecture and on HW
 - Basic probability calculation
 - Conditional probability and its definition
 - Law of total probability
 - Definition of (mutual and pairwise) independence
 - Bernoulli trials and binomial distribution
 - Bayes Theorem
 - Random Variables and Expected Value
 - Linearity of Expectation
 - Geometric Distribution

#### Unit 19 - Number Theory
 - Definitions of modular congruence
 - Performing modular arithmetic
 - Modular exponentiation techniques
 - Euclid's algorithm for finding `gcd`
 - Finding multiplicative inverses for modulo-n systems

#### Unit 20 - Hash Tables, Functions, and Bloom Filters
 - One-way / cryptographic hash functions
 - Bloom filter pros and cons
 - Bloom filter operations (insert and find)

#### Unit 21- Skip Lists

#### Unit 22 - Prefix Trees and Compressed Prefix Trees
 - Construction and insertion
 - Finding elements
 - Ways of structure nodes (arrays vs. linked lists for sparse implementations)
 - Compressed prefix trees

#### Unit 23 - Amortized Analysis
 - Approaches to performing amortized analysis

#### Unit 24 - Log Structured Merge Trees

### Practice Materials

#### Sample Finals
 - **There is a practice final available on Gradescope:**
    - CSCI 104L Spring 2024 PRACTICE FINAL
 - [Sample Final (Spring 2014)]({{site.baseurl}}/resources/final-a.pdf) (no solutions)
 - [Sample Final (Spring 2014 and others)]({{site.baseurl}}/resources/final-b.pdf) (no solutions)

 - [Final Practice (Summer 2020)]({{site.baseurl}}/resources/cs104-su20-final-prac.pdf) 
 - [Final Practice Solutions (Summer 2020)]({{site.baseurl}}/resources/cs104-su20-final-prac-sol.pdf)

 - [Final Practice (Summer 2021)]({{site.baseurl}}/resources/cs104-su21-final-practice.pdf) 
 - [Final Practice Solutions (Summer 2021)]({{site.baseurl}}/resources/cs104-su21-final-practice-sol.pdf)
