---
layout: asides
toc: true
tasks: false
title: Syllabus
---

# CSCI 104 Syllabus

The course covers the fundamentals of data structures.
As a programmer becomes more proficient, they realize that how well and efficiently a problem can be solved often depends on how the data are stored.
Some of the ideas are quite sophisticated and clever, and we will explore a spectrum of them in this class, ranging from fairly basic to moderately advanced structures.

The other side is that once one realizes the importance of data structures, it is natural to think of programs not as sequences of instructions that pass around some data, but as data packets that come with the code needed to process them.
This is at the heart of the object-oriented design paradigm, and often leads to more modular and extensible (and readable) programs.

The class will put significant emphasis on a theoretical understanding of data structures, their implementation, and the object-oriented viewpoint. Assignments will contain significant programming projects along with programming-free questions to explore how data structures work.

## Learning Objectives

1. Ability to choose appropriate and efficient data structures and algorithms to solve a problem.
2. Ability to compare data structures and algorithms for efficiency using algorithm analysis and experiments.
3. Ability to apply algorithm analysis and knowledge of discrete mathematics to evaluate algorithms and data structures.
4. Ability to implement and use linear data structures, including stacks, queues, lists.
5. Ability to implement and use search structures and algorithms including binary search, search trees, and hash tables.
6. Ability to use and implement search data structures, including search trees and hash tables.
7. Ability to use and implement priority queues.
8. Knowledge of and ability to implement sorting algorithms and compare their performance analytically and empirically.
9. Understanding of graphs and their representations; ability to implement graph search using BFS, DFS, and Dijkstra's Algorithm.
10. Ability to write recursive functions and understand when recursion is appropriate to a problem.
11. Ability to write readable and maintainable code.
12. Ability to explain computational solutions in person and in writing.
13. Use probability as a tool in analyzing the efficiency of various data structures
14. Use basic number theory to analyze basic hash functions

## Catalog Entry

Introduces the student to standard data structures (linear structures such as linked lists, (balanced) trees, priority queues, and hashtables), using the C++ programming language.

### Prerequisites

- CSCI 103: Introduction to Programming
- CSCI 170: Discrete Methods in Computer Science

## Course Websites

- [All content & info]({{ site.baseurl }}/)
- [Blackboard]({{ site.data.urls.blackboard }}){:target="_blank"}
- [EdStem]({{ site.data.urls.piazza }}){:target="_blank"}

## Grading Weights and Scale

The following point structure will be used in determining the grade for the course.
Your final grade will depend solely on your own performance, graded according to the scale given below.

<div class="text-align-center">
  <table class="simple center">
    <thead>
      <th>Weight</th>
      <th>Item</th>
    </thead>
    <tbody>
      <tr>
        <td>36%</td>
        <td>Homework</td>
      </tr>
      <tr>
        <td>6%</td>
        <td>Lab Exercises</td>
      </tr>
      <tr>
        <td>28%</td>
        <td>Midterm Exams</td>
      </tr>
      <tr>
        <td>30%</td>
        <td>Final Exam</td>
      </tr>
    </tbody>
  </table>
</div>

### Grading Scale

We will guarantee that you will get at least the grade indicated by the following scale.
Because of the fairly generous scale we will not round up if you are close to the lower threshold of a letter grade.
At the end of the semester, we may decide to lower the scale if the exams were more difficult than intended.

<div class="text-align-center">
  <table class="simple center">
    <thead>
      <tr><th>Grade</th><th>Letter</th></tr>
    </thead>
    <tbody>
      <tr><td>85%</td><td>A </td></tr>
      <tr><td>80%</td><td>A-</td></tr>
      <tr><td>75%</td><td>B+</td></tr>
      <tr><td>70%</td><td>B </td></tr>
      <tr><td>65%</td><td>B-</td></tr>
    </tbody>
  </table>
  <table class="simple center">
    <thead>
      <tr><th>Grade</th><th>Letter</th></tr>
    </thead>
    <tbody>
      <tr><td>60%</td><td>C+</td></tr>
      <tr><td>55%</td><td>C </td></tr>
      <tr><td>50%</td><td>C-</td></tr>
      <tr><td>45%</td><td>D+</td></tr>
      <tr><td>40%</td><td>D </td></tr>
    </tbody>
  </table>
</div>

### Assignments and Labs

Information regarding [homework]({{ site.baseurl }}/homework/) and [labs]({{ site.baseurl }}/labs/) are available on their respective pages.
They contain **policies** related to grading, assignments, and policies related to submission, contesting grades, academic integrity, etc.
You are **responsible** for reading those pages *carefully* and following all of its stated policies, which should be considered as part of this syllabus.

## Attendance

While regular attendance will not be taken, class participation and attendance is **expected**.

## Textbook

We will be using **"Data Structures and Algorithm Analysis in C++" by Mark Weiss**.  In addition, you should have a Discrete Mathematics textbook (whichever book you used for CSCI 170 will suffice): I will specificially refer to reading from "Essential Discrete Mathematics for Computer Science" by Lewis & Zax.
You may also find the course lecture notes useful.  You may download (and possibly print) the [lecture notes]({{ site.data.urls.notes }}).
These are based on teaching of CSCI 104 in past semesters, and cover the material quite accurately as presented in class.
However, the lecture notes may be out of order and cover different topics, as we have changed the schedule significantly.
We will also be providing detailed lecture slides and recorded videos that you may also use.

We want to provide you with additional references that may enhance study so in addition to the textbook used for CSCI 103, for the C++ Language the following references are available for free online from the USC Library:

- [Lippman, Stanley, Barbara Moo, and Josee Lajoie. C++ Primer](https://uosc.primo.exlibrisgroup.com/permalink/01USC_INST/273cgt/cdi_askewsholts_vlebooks_9780133053036). Addison-Wesley Professional, 2012.
- [Stroustrup, Bjarne. A Tour of C++](https://uosc.primo.exlibrisgroup.com/permalink/01USC_INST/hs9vaa/alma991043008444003731). Upper Saddle River, NJ: Addison-Wesley, 2014.
- [Stroustrup, Bjarne. The C++ Programming Language](https://uosc.primo.exlibrisgroup.com/permalink/01USC_INST/273cgt/cdi_askewsholts_vlebooks_9780133522853). Pearson Addison Wesley, 2013.

For data structures specifically: 

- Weiss.  Data Structures and Algorithm Analysis in C++ 4th Ed. Pearson, 2014.
- Carrano, Frank and Thomas Henry. Data Abstraction & Problem Solving with C++ 6th Ed. Pearson, 2013.
- [Goodrich, Michael T, Roberto Tamassia, and David M Mount. Data Structures and Algorithms in C](https://uosc.primo.exlibrisgroup.com/permalink/01USC_INST/hs9vaa/alma991043327161803731). Wiley, 2011.

## Reading Assignments

Readings from lecture notes and other sources form the base of your learning pyramid.
These readings contain theoretical concepts, examples and usable code that will be very helpful for all the work in this course.  We also recommend reviewing the lecture slides/notes after each lecture (or at the end of each week to see what you still remember, what doesn't make sense now that you have to do an exercise yourself, etc.)  This will help you retain the content, increase mastery, and prime you to ask quesitons in future lectures.

## Exams

Exams will involve analysis and coding.  Questions require students to demonstrate their mastery over the material. Exams are currently expected to be in person but will likely be given via Gradescope and require you to bring a laptop. More details will be posted at least 1 week before the exam.

## Accommodations

If you have USC approved (OSAS) accommodations, you **MUST** upload your OSAS generated PDF letter for this class to the **[linked form]({{site.data.urls.osas_dsp_form}})**.

## Statement on Academic Conduct

Below is USC's official language.
 However, **we have specific rules in CS 104 which are outlined on the [assignments & grading page]({{ site.baseurl }}/homework/)**.

Plagiarism - presenting someone else's ideas as your own, either verbatim or recast in your own words - is a serious academic offense with serious consequences.
Please familiarize yourself with the discussion of plagiarism in the USC Student Handbook, Integrity and Accountability: Acadmic Integrity (page 11): 
 [https://policy.usc.edu/studenthandbook/](https://policy.usc.edu/studenthandbook/).
Other forms of academic dishonesty are equally unacceptable.
See additional information in the USC Student Handbook and university policies on scientific misconduct, [http://policy.usc.edu/scientific-misconduct/](http://policy.usc.edu/scientific-misconduct/).

## Support Systems

- **Student Counseling Services (SCS)** - (213) 740-7711 - 24/7 on call
  Free and confidential mental health treatment for students, including short-term psychotherapy, group counseling, stress fitness workshops, and crisis intervention.
  [engemannshc.usc.edu/counseling](engemannshc.usc.edu/counseling)

- **National Suicide Prevention Lifeline** - 1 (800) 273-8255
  Provides free and confidential emotional support to people in suicidal crisis or emotional distress 24 hours a day, 7 days a week.
  [www.suicidepreventionlifeline.org](www.suicidepreventionlifeline.org)

- **Relationship and Sexual Violence Prevention Services (RSVP)** - (213) 740-4900 - 24/7 on call
  Free and confidential therapy services, workshops, and training for situations related to gender-based harm.
  [engemannshc.usc.edu/rsvp](engemannshc.usc.edu/rsvp)

- **Sexual Assault Resource Center**
  For more information about how to get help or help a survivor, rights, reporting options, and additional resources, visit the website: [sarc.usc.edu](sarc.usc.edu)

- **Office of Equity and Diversity (OED)/Title IX Compliance** - (213) 740-5086
  Works with faculty, staff, visitors, applicants, and students around issues of protected class.
  [equity.usc.edu](equity.usc.edu)

- **Bias Assessment Response and Support** - Incidents of bias, hate crimes and microaggressions need to be reported allowing for appropriate investigation and response.
  [studentaffairs.usc.edu/bias-assessment-response-support](studentaffairs.usc.edu/bias-assessment-response-support)

- **The Office of Disability Services and Programs**
  Provides certification for students with disabilities and helps arrange relevant accommodations.
  [dsp.usc.edu](dsp.usc.edu)

- **Campus Support and Intervention** - (213) 821-4710
  Assists students and families in resolving complex issues adversely affecting their success as a student EX: personal, financial, and academic.
  [studentaffairs.usc.edu/ssa](https://campussupport.usc.edu/)

- **Diversity at USC**
  Information on events, programs and training, the Diversity Task Force (including representatives for each school), chronology, participation, and various resources for students.
  [diversity.usc.edu](diversity.usc.edu)

- **USC Emergency Information**
  Provides safety and other updates, including ways in which instruction will be continued if an officially declared emergency makes travel to campus infeasible.
  [emergency.usc.edu](emergency.usc.edu)

- **USC Department of Public Safety** - UPC: (213) 740-4321 - HSC: (323) 442-1000 - 24-hour emergency or to report a crime.
  Provides overall safety to USC community. [dps.usc.edu](dps.usc.edu)
