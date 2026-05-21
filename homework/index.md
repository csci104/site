---
layout: asides
toc: true
title: Homework
---

# Homework

Homework will be assigned once every **2 weeks** roughly (Sometimes more often for the Summer section). It will be graded, and require substantial work. The average student should **expect to spend about 15-20 hours per homework**. Homework assignments will typically be split into two components: a written component and a coding component. Note: These components are submitted separately and have different late policies.
<!--
Each student will be responsible for use Github Classroom to generate a `git` repository for their coding work and also for submission. You will be using the **git** source code management tool to maintain your homework code. 
-->

All Assignmets can be found on Codio {{ site.data.urls.codio_course }}

Join the Codio via the link: {{ site.data.urls.codio_join }}

<h2 id="schedule">Schedule</h2>

**Note: All deadlines are 11:59 pm Pacific on the indicated date.**

<table class="standard assignments">
  <thead>
    <tr>
      <th>#</th>
      <th>Link</th>
      <th>Title</th>
      <th>Due (Written)</th>
      <th>Due (Coding)</th>
    </tr>
  </thead>
  <tbody>
    {% for assignment in site.data.content.assignments %}
    <tr
      {% if assignment.assigned %}
      {% else %}
      class="disabled"
      {% endif %}
    >
      <td>{{ forloop.index }}</td>
      <td>
        
      </td>
      <td>
        {% if assignment.assigned %}
        <a href="{{ site.baseurl }}/homework/{{ assignment.id }}/">{{ assignment.title }}</a>
        {% else %}
        {{ assignment.title }}
        {% endif %}

      </td>
      <td>{{ assignment.dates.written }}</td>
      <td>{{ assignment.dates.programming }}</td>
<!--
      <td><a href="{{ site.data.urls.regrades }}" target=_blank>Regrade</a></td>
      -->
    </tr>
    {% endfor %}
  </tbody>
</table>

## Editors, Debuggers, and Git Help

Checkout our [**Tools and Links page**]({{site.baseurl}}/resources)

## Submission

In order to properly submit your assignment, please follow, in-detail, the instructions on codio which will show you the steps to submit a particular `git` commit of your code. 

For each assignment, a precise time will be specified on the due date (usually at 11:59 PM PST).  The programming submission must be made correctly via your Git repo using the process described on the [submission instructions]({{ site.baseurl }}/homework/submission-instructions/) page.  Read and follow those instructions carefully for each homework.  **Failure to do so may lead to a 0 on the assignment** even though you may have had all the code working on your machine.  Much of software development requires following strict processes, so it is important you start to understand and follow those processes.

**Important Note:**  You will NOT receive an exception for failing to follow these instructions!

For example, often times students forget to commit/push a file that is part of their solution to Github.  If they had followed the submission instructions and re-cloned their repo to a temporary folder and attempted to build their assignment code, they would have easily found the issue.  We cannot accept files that were not submitted or files where you submitted "the wrong version".  We can only grade what you submitted.

In addition to making sure your submission is on time, **please make sure that the code you submit is formatted and works as expected with `g++`**.  We will grade your assignments using <code>g++</code> at the command line.  You are free to use other compilers or IDEs to develop your code, but in the end, it has to work with `g++` on our recommended coding environment (Google Cloud Shell).

## Policies

There will be **6 assignments**. In CSCI 104L we do not accept late submissions (except as outlined below). Late days apply **only** to the coding portion of the assignments. The written portions must be completed on-time by uploading your written answers to Codio before the deadline. This is because the Course staff grade the written portions by hand.

- **Submission:** Written/analysis problems are submitted on **Codio**; coding problems are submitted via **Codio**. Follow submission instructions precisely (commit, push, verify).
- **Late policy:** You may submit late up to the *next* exam, with the exception of the Final exam. A **flat 25‑percent penalty** applies to any late submission. No submissions are allowed after the late window.
- **Extensions:** Reserved for **significant** emergencies (major illness/injury).  *Minor issues (small illness/injury, travel, interviews, etc.) do not qualify for extensions*. For non-emergency issues (especially those close to the deadline), extensions are generally not applicable. Instead, **the late-submission days** are available and should be used for such circumstances.  If you believe you do qualify for an extension, make a **private Piazza note** indicating your request and how much work you have already completed. Extensions will be declined if minimal prior work appears in your Git history. 
- **Autograding & verification:** Coding problems are graded via automated tests, but we reserve the ability to take points off for "smelly" or low quality code.
- **Advice:** The most consistent advice from successful students: **start early** and **work consistently**.


### HW Grades and Regrades

We will work hard to post HW scores and feedback within 1 week of the homework's due date.  Only the written portion of the homework is 100% graded by a human. The score for the programming portion is determined by a grading script and is not avilable for regrading.

Any disputes with posted grades **must** be raised within **7 days** (unless specifically noted) of the score posting.  Then follow the process below for the type of regrade you are requesting.  

For coding assessments, post a private note on Piazza detailing why you believe the assignment was factually graded wrong.  

Any regrade request will result in us trying to give the fairest possible grade to you, which could be higher or lower than the one you received originally.  Finally, please note that regrades are not for "fixing" your code.  For example: If there was just one line off that caused all the tests to fail, that might seem like a viable reason for a regrade, but with the automated tests provided, you will know that your code fails when you submit. It is your responsibility to ensure your code compiled, tested, and all files were submitted on Github which can be verified by the "Verification" process outlined at the end of each homework.

### Exam Regrades
Exam regrade requests must be made through the Gradescope regrade facility.  Exam regrade requests must be submitted **within 7 days** of when the exam scores are posted.  After that, your exam grade is final.


## Academic Integrity
To ensure that your grades reflect your mastery of the material presented in this class, to ensure the reputation of USC, and the expectations of our constituencies are met, we expect you to adhere to the USC Viterbi honor code and avoid any academic integrity policy violations.


Use of (Generative) Artificial Intelligence and Academic Integrity.  Only by spending significant time working and struggling with the assignments yourself or with course staff will you gain the skills needed to excel on exams.  While use of (generative) AI is not strictly prohibited on coding and written assignments, it is STRONGLY DISCOURAGED! Exams are the vast majority of your score for this course.Even if you write significant code on your own, as soon as you ask AI to generate an outline of how to approach the code or help debug some code you’ve written, etc. you have ALREADY lost valuable learning experience, much less if you start by asking AI to write significant portions of code for you.  Only through failure and the ensuing struggle will you develop the mental skills and recall needed to perform well on the exams. 

**Significant, obvious copying of code or written work from other students or other sources IS prohibited and may be referred to the Office of Academic Integrity and a sanction applied.** 

 Violations of this policy will likely result in an F in the course. If you are suspected of violating the academic integrity code of conduct the process will be as outlined at the [Office of Academic Integrity](https://academicintegrity.usc.edu/what-should-i-expect/process/):

1. If the violation minor (i.e limited to one assignment and not an exam) the instructor will opt for the FSR process.
1. Through the FSR process the instructor will propose a penalty and if the student accepts reponsibility, the case will close after the FSR agreement is submitted to OAI.
1. If the violation is major (i.e on an exam), or the student does not accept responsibility, the instructor will submit the case to OAI for the AR process.
1. The OAI will acts as an impartial 3rd party to determine if a violation has occurred.
1. If a violation is deemed to have occurred, the OAI will recommend a sanction.  
1. If OAI determines this is not your first violation, they may initiate a review that could lead to suspension from the school.

The official language on academic integrity is on the [**syllabus**]({{ site.data.urls.slide_location }}), but what is written below acts as an additional, binding policy for this course:

To help you determine what is appropriate for learning and the best possible grade outcome, here are some suggestions for collaboration and getting help:  

### Acceptable Actions
- Discussing **high-level** ideas (no coding terms at all) with other students is fine. Do NOT pseudocode together as often it becomes detailed and yields the same code.  
- Asking course staff (instructor, TAs, tutors) for help or to look at your code.
- Copying test cases from other students or {{site.data.urls.qa_tool}} when test cases are not graded is fine since it serves to teach you something, and there is no risk that you will get points for the work of other students.
- Looking up **references** (where nothing specific to the assignment is provided or input) on C++ library containers, functions, and syntax.  However, looking up "similar" examples to a homework assignment is NOT okay.

### Discouraged Actions
- Looking up similar programs or using AI for for references, hints, or approaches. Only by struggling with the design process will you learn and recall important lessons and appreciate better solutions.
- Asking AI to debug your code when you have an issue. The critical thinking of engineering is your key skill and attribute.  To solve large problems in the future, you have to learn how to isolate, characterize, and solve smaller problems now.  Using AI to help you actually cheats you of the very experience you need to be a valuable contributor in the future.

### Unacceptable Actions (Violations of Academic Integriy)
- Copying another current, past, (of future?) student's work
- Any kind of collaboration or use of 3rd party tools on exams.

