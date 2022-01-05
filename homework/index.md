---
layout: asides
toc: true
title: Homework
---

# Homework

Homework will be assigned once every **2 weeks**. It will be graded, and require substantial work. The average student should **expect to spend about 15-20 hours per homework**. Homeworks will typically contain a mix of programming exercises and "theory" questions about data structures and their implementation.  


Each student will receive a private code repository on the course's [GitHub Organization]( {{ site.data.urls.github }}) to use it for the development and submission of all assignments. You will be using the **git** source code management tool to maintain your homework code. 

Please read the submission instructions and policies below **carefully**!

</p>
<p>
  Students will receive a private repository on the course's <a href="{{ site.data.urls.github }}" target="_blank">GitHub</a> to use it for the development and submission of all assignments.
  You will be using the git source code management tool to maintain your homework code.
</p>
<h2 id="schedule">Schedule</h2>
<table class="standard assignments hover click">
  <thead>
    <tr>
      <th>#</th>
      <th>Link</th>
      <th>Title</th>
      <th>Due</th>
    </tr>
  </thead>
  <tbody>
    {% for assignment in site.data.content.assignments %}
    <tr
      {% if assignment.assigned %}
      onclick="window.location = './{{ assignment.id }}/'"
      {% else %}
      class="disabled"
      {% endif %}
    >
      <td>{{ forloop.index }}</td>
      <td>
        {% if assignment.assigned %}
        <a href="./{{ assignment.id }}/">Writeup</a>
        {% else %}
        Write
        {% endif %}
      </td>
      <td>{{ assignment.title }}</td>
      <td>{{ assignment.dates.due }}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Submission

For each assignment, a precise time will be specified on the due date (usually at 11:59 PM PST).  The programming submission must be made correctly via your github account and your **`git` commit SHA** must be submitted on the appropriate submission page.  You must follow the submission instructions.  Read them carefully and follow them for each homework.  **Failure to do so may lead to a 0 on the assignment** even though you may have had all the code working on your machine.  Much of software development requires following strict processes, so it is important you start to understand and follow those processes.


**Important Note:**  You will NOT receive an exception for failing to follow these instructions!

For example, often times students forget to commit/push a file that is part of their solution to Github.  If they had followed the submission instructions and re-cloned their repo to a temporary folder and attempted to build their assignment code, they would have easily found the issue.  We cannot accept files that were not submitted or files where you submitted "the wrong version".  We can only grade what you submitted.

In addition to making sure your submission is on time, **please make sure that the code you submit is formatted and works as expected with `g++`**.  We will grade your assignments using <code>g++</code> at the command line in the virtual machine we provide for the course.  You are free to use other compilers or IDEs to develop your code, but in the end, it has to work with `g++` on the course Docker container or virtual machine.

You WILL lose points for submitting unreadable code, or for failing to follow submission instructions. **Be sure to refer to our <a href="./rubric" target="_blank">Visual Inspection Rubric</a>** before submitting.

## Policies

There will be **6 assignments** due roughly every **2 weeks**.  In CS 104 we do not accept late submissions (except in the cases outlined below). We  do realize that as a student, things will come up and other classes may need more focus on certain weeks.  While 2 weeks per assignment should allow you to finish with ample time if you **start early** and **work consistently**, we will provide **5 grace days** to be used over the semester with a **maximum of 2 grace days allowed per assignment**. 48 hours after the due date, no submissions will be allowed.  Once you have used your grace days, any late submission will not be accepted for any reason; thus, it will be graded as a 0.  Our online submission system will automatically deduct and track late days, so you do NOT need to alert anyone. 

In this age of COVID, TrojanCheck, etc. we realize that being sick or having sick family may preclude you from working on your assignments as you would be able to otherwise.  If a confirmed COVID-related illness or other emergency occurs, please fill out [this form]({{site.data.urls.extension_form}}) and make a private note on Piazza to inform the course staff and we will try our very best to work out a flexible plan for completing the assignment.

For non-emergency issues (especially those close to the deadline), extensions are generally not applicable. Instead, **your grace days** are available and should be conserved for such circumstances.

In addition, **starting early** can help offset any blocks to working on and completing your assignment.  The most consistent advice from students who have done well in CS 104 is (you guessed it): **start early!**  Thus, we are implementing a **checkpoint** for each assignment.  These are milestones in the assignment that should be relatively easy to achieve but that you must complete by a certain date (usually 4-7 days) BEFORE the full due date (to ensure you start early).  By submitting your checkpoint you earn **5 points extra credit** to be applied to your assignment, though capping at 100%.  So if you completed the checkpoint, and then got 87/100 after the HW is graded, you would be boosted to 92/100.  If you got 97/100, you'd be boosted to 100. However, You do NOT have to do the checkpoint if you so choose. You can still earn 100/100 on the HW. Your will simply keep whatever score you have earned after the grading process. Details of each checkpoint will be described in the assignment writeup.  (Note: that consistently meeting the checkpoints may also be used when weighing borderline grades or other requests).  


## Grade Disputes
We will work hard to post HW scores and feedback within 1-2 weeks of the homework's due date. Exams will typically be graded within at most a few days of the exam date. If you have not received your score on a particular HW even though most other students in the class have (say, 24 hours after the score release date), post a private note on Piazza and someone will then follow up with your grader.

Any disputes with posted grades **must** be raised within **7 days** of the score posting.  Then follow the process below for the type of regrade you are requesting.

### HW Regrades
Fill out this [**HW regrade form**]({{site.data.urls.hw_regrade_form}}) and wait for someone to be in touch with you, usually via an issue being posted on your Github repo issue tracker.  You may also visit the designated regrade TA within 1 week of your score posting.  If you do not hear from someone within a few days post a private note on Piazza listing the issue.  Notice that any regrade request will result in us trying to give the fairest possible grade to you, which could be higher or lower than the one you received originally.  If you do not submit your regrade in **7 days** you are *NOT* eligible for a regrade, even if it is our grading mistake.  Be prompt and do not delay reviewing your HW grades.

### Exam Regrades
See your registered instructor.  Only instructors can determine exam regrades.  


## Academic Integrity
We take academic integrity very seriously in our CS courses to ensure that your grades reflect your mastery of the material presented in this class as well as to provide fairness to fellow students, to ensure the reputation of USC, and the expectations of our constituencies are met.  

Your homework assignments and exams should be individual efforts unless explictly stated otherwise. While collaboration and online searches are common in the workplace, taking code from those sources is usually not allowed due to licensing and can have legal ramifications.  Similarly, while collaboration in a company is common, we are training you to be capable computer scientists and, thus, you need to develop the skills for yourself.  You will have higher levels of collaboration for team-based projects in future courses and in the workplace.  For homework assignments, you may only have high level discussions with classmates. Any discussion that includes specific code (describing variables, loops, functions, etc.) and implementation details is an **inappropriate level** of collaboration. **Looking for similar examples of code online is also a likely violation if you model your code after those online examples.**.  We run all submissions through code similarity tools that compares every student to every other student from this semester and past semesters.  If you are suspected of violating the academic integrity code of conduct you will:

1. Be reported to SJACS which will acts as an impartial 3rd party to determine if a violation has occurred.
1. If a violation is deemed to have occurred, the recommended sanction is a 0 on the assignment and 1 letter grade deduction (i.e. if you would have gotten a B+ you would receive a B).  
1. If SJACS determines this is not your first violation, they may initiate a review that could lead to suspension from the school.

The official language on academic integrity is on the [**syllabus**]({{ site.url }}/syllabus.html), but what is written below acts as an additional, binding policy for this course:

Collaboration is important in an academic environment. We want to be sure that you are aware of what is appropriate collaboration and conduct and what may be considered a violation of academic conduct rules. Here are examples to consider:

### Acceptable Actions
- Discussing **high-level** ideas (no coding terms at all) with other students is fine. It is even helpful if you annotate your work with the names of your collaborators.
- Asking course staff (instructor, TAs, CPs) for help or to look at your code.
- Copying test cases from other students or Piazza when test cases are not graded is fine since it serves to teach you something, and there is no risk that you will get points for the work of other students.
- Looking up references on C++ library containers, functions, and syntax.  However, looking up "similar" examples to a homework assignment is NOT okay.

### Unacceptable Actions (Violations of Academic Integriy)
- Copying **EVEN A FEW LINES** of code from other students (current or former) or online sources, **even if you edit it significantly** is NOT okay.  You must start from scratch or from the provided skeleton and come up with the design ideas and code yourself.  Taking code from some other source and then saying you *understand* it doesn't make it your own code.
- Take care even coding together in the same room and talking through approaches.  It often leads to describing your approach in specific coding terms that will lead to near-exact code structures.
- Having other students in the class look at your code or access a copy of your code is not acceptable. If test cases are graded, it is also not acceptable to let other students have copies of those test cases. 
- Obtaining copies of code or test cases from students who were enrolled in a previous term of CSCI 104. (That would even be a violation for the student not enrolled in CSCI 104 this term.)
- **Even searching for similar code and solutions** on Github, StackOverflow, online sources (Chegg, etc.), or other textbooks is NOT allowed, even just for "reference".  If you happen to find related work in a source that is not the course materials, it is best that you notify your instructor first to ask if it can be used and, if it can be, then cite the materials.
- Posting in online forums asking people to solve homework questions or paying for solutions.

**In summary, any time that you are trying to get higher grades for work that you did not earn is not acceptable. Any behavior by which you are attempting to receive or grant an unfair advantage that your classmates who are following the rules do not have is not acceptable.** Please act with the integrity that is expected of USC Trojans.

We run MOSS on all homework submissions to catch inappropriate collaboration and plagiarism. If there is suspected cheating, you will be reported to [SJACS](http://sjacs.usc.edu/), no exceptions. Follow the above guidelines to make sure this doesn't happen to you.

In order to make sure that an appropriate level of collaboration is used between you and your classmates, please do not keep notes,  pictures, or any records from your discussions. This will ensure that your work reflects only your understanding when you create it. Please do not sit coding next to each other while discussing the work. If you are concerned that an inappropriate level of collaboration has occured, please do the following:

- **Keep no notes, pictures, or records from your discussions.**
- Cite your **high-level** collaborators in your comments in your work. 
- Take at least a 30 minute break before you continue working and make sure that your work only reflects your own understanding of the solution. If you truly do not understand part of the solution, please do not include it as your own work.

