---
layout: asides
toc: true
title: Homework
---

# Homework

Homework will be assigned once every **2-3 weeks**. It will be graded, and require substantial work. The average student should **expect to spend over 15 hours per homework**. Homeworks will typically contain a mix of programming exercises and "theory" questions about data structures and their implementation.  


Each student will receive a private code repository on the course's [GitHub Organization]( {{ site.data.urls.github }}) to use it for the development and submission of all assignments. You will be using the **git** source code management tool to maintain your homework code. 

Please read the submission instructions and policies below **carefully**!  Failure to follow the process (of pushing the appropriate files to Github and submitting your git commit SHA on our website) will result in a 0 on the assignment. 

<h2 id="schedule">Schedule</h2>
<table class="standard assignments hover click">
  <thead>
    <tr>
      <th>#</th>
      <th>Written</th>
      <th>Programming</th>
      <th>Title</th>
      <th>Written Due</th>
      <th>Programming Due</th>
      <!-- <th>Submit</th>
      <th>Regrade</th> -->
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
        {% if assignment.assigned %}
        <a href="./{{ assignment.id }}/">Written</a>
        {% else %}
        Written
        {% endif %}
      </td>
      <td>
        {% if assignment.assigned %}
        <a href="./{{ assignment.id }}/programming/">Programming</a>
        {% else %}
        Programming
        {% endif %}
      </td>
      <td>{{ assignment.title }}</td>
      <td>{{ assignment.dates.written }}</td>
      <td>{{ assignment.dates.due }}</td>
      <!-- <td><a href="{{ assignment.submit_link }}">Submit</a></td>
      <td><a href="{{ site.data.urls.regrades }}">Regrade</a></td> -->
    </tr>
    {% endfor %}
  </tbody>
</table>



## Editors, Debuggers, and Git Help

Checkout our [**Tools and Links page**]({{site.baseurl}}/resources)

## Submission

In order to properly submit your assignment, **please follow the course [submission instructions]({{ site.baseurl }}/homework/submission-instructions/)** which will show you the steps to submit a particular `git` commit of your code. 

For each assignment, a precise time will be specified on the due date (usually at 11:59 PM PST).  The programming submission must be made correctly via your github account and if you want an earlier commit to be graded, submit your **`git` commit SHA** as mentioned in [submission instructions]({{ site.baseurl }}/homework/submission-instructions/).  Read and follow those instructions carefully for each homework.  **Failure to do so may lead to a 0 on the assignment** even though you may have had all the code working on your machine.  Much of software development requires following strict processes, so it is important you start to understand and follow those processes.


**Important Note:**  You will NOT receive an exception for failing to follow these instructions!

For example, often times students forget to commit/push a file that is part of their solution to Github.  If they had followed the submission instructions and re-cloned their repo to a temporary folder and attempted to build their assignment code, they would have easily found the issue.  We cannot accept files that were not submitted or files where you submitted "the wrong version".  We can only grade what you submitted.

In addition to making sure your submission is on time, **please make sure that the code you submit is formatted and works as expected with `g++`**.  We will grade your assignments using <code>g++</code> at the command line in the virtual machine we provide for the course.  You are free to use other compilers or IDEs to develop your code, but in the end, it has to work with `g++` on the course Docker container or virtual machine.

You WILL lose points for submitting unreadable code, or for failing to follow submission instructions. **Be sure to refer to our <a href="./rubric" target="_blank">Visual Inspection Rubric</a>** before submitting.

## Policies

There will be **6 assignments**.  In CS 104 we do not accept late submissions (except in the cases outlined below). We  do realize that as a student, things will come up and other classes may need more focus on certain weeks.  While 2  weeks per assignment should allow you to finish on time if you **start early** and **work consistently**, we will provide **5 grace days** to be used over the semester with a **maximum of 2 grace days allowed per assignment**.  The use of a grace day extends your due date by 24 hours.  48 hours after the due date, no submissions will be allowed.  Once you have used your grace days, any late submission will not be accepted for any reason; thus, it will be graded as a 0.  Our online submission system will automatically deduct and track late days, so you do NOT need to alert anyone.

**Extensions:** **Save your grace days** for extreme situations.  Only emergencies cleared through [campus support services]({{site.data.urls.uscsupport}}) or [student accessibility services]({{site.data.urls.osas}}) will be granted extensions.  Similarly, while we appreciate the mental health needs of our students, extensions will generally not be granted without campus support direction.  The best strategy to reduce stress and give yourself the best chance of success, you should **start your assignments on the DAY THEY ARE RELEASED** and working at an even pace throughout the duration.  By leaving the work for just a few days before the due date, you will increase your stress levels!  With that said, if an unexpected emergency does occur, you may fill out [this form]({{site.data.urls.extension_form}}) and make a private note on [Piazza]({{site.data.urls.discussion}}) to inform the course staff. **Again**, start early anticipating that things may come up closer to the deadline.  If you have not started early and something comes up, you may be denied since you chose to leave your work until the deadline. Commit and push your intermediate work often as a record of your effort on an assignment.


The most consistent advice from students who have done well in CS 104 is (you guessed it): **start early!**  

### HW Grades and Regrades

We will work hard to post HW scores and feedback within 2 weeks of the homework's due date. Exams will typically be graded within a few days of the exam date. 

Homework grades will normally be posted back as **ISSUES** on your `hw-username` Github repository and their release will be announced on {{site.data.urls.qa_tool}}. If you have not received your score (no issue was posted to your repo webpage) on a particular HW even though most other students in the class have (say, 24 hours after the score release date), post a private note on {{site.data.urls.qa_tool}} and someone will then follow up with your grader.

Any disputes with posted grades **must** be raised within **7 days** (unless specifically noted) of the score posting.  Then follow the process below for the type of regrade you are requesting.  

Fill out your regrade **within 7 days** of grades being released for programming assignments only. Please fill out written HW regrades and PA Visual regrades on Gradescope. For PA Automatic score regrades, please reply the Issue that was given to your pa#-username repository on GitHub. The TAs will review the request. If they can deal with it themselves, then they will do so and email you the result.  If they cannot address it or you don't hear from them, please make a private Piazza post.  Again you must submit your regrade request within 7 days and **after 7 days no regrade requests will be considered** for any reason, even if it is our grading mistake.  Be prompt and do not delay reviewing your HW grades. [Note: The regrades don't have to be resolved within 7 days, though hopefully they will; we just need you to raise the issue on the regrade form within 7 days].

Any regrade request will result in us trying to give the fairest possible grade to you, which could be higher or lower than the one you received originally.  Finally, please note that regrades are not for "fixing" your code.  For example: If there was just one line off that caused all the tests to fail, that might be a viable reason for a regrade but we have a standard policy over the years that each expression change on a regrade is a -10 deduction, because it was really your responsibility (especially if the test suite was released before submission) to ensure your code compiled, tested, and all files were submitted on Github which can be verified by the "Verification" process outlined at the end of each homework.

### Exam Regrades

You will submit your regrade through Gradescope.  Your entire exam will be regraded, which may cause scores to go up or down.


## Academic Integrity

We take academic integrity very seriously in our CS courses to ensure that your grades reflect your mastery of the material presented in this class as well as to provide fairness to fellow students, to ensure the reputation of USC, and the expectations of our constituencies are met.  

**Collaboration**:  Your homework assignments and exams should be individual efforts unless explictly stated otherwise. While collaboration and online searches are common in the workplace, taking code from those sources is usually not allowed due to licensing and can have legal ramifications.  Similarly, while collaboration in a company is common, we are training you to be capable computer scientists and, thus, you need to develop the skills for yourself.  You will have higher levels of collaboration for team-based projects in future courses and in the workplace.  For homework assignments, you may only have **CONCEPTUAL** discussions with classmates. Any discussion that includes specific code (describing variables, loops, functions, etc.) and implementation details is an **inappropriate level** of collaboration and a **violation of academic integrity**.    **Copying (and then modification) or just "viewing for reference"** any (**even small**) portion(s) of code from Internet sources or fellow students is prohibited unless explicitly cleared with the instructor.  Simiarly, **ANY use of chatGPT or similar AI-generators** to generate ANY amount of code is a violation. Similarly you should NOT verbally describe your code at any level of detail.  Instead, draw (non-code) pictures, ask questions that consider possible inputs or other scenarios, or provide advice on how to debug.

 If you are suspected of violating the academic integrity code of conduct the process will be as outlined at the [Office of Academic Integrity](https://academicintegrity.usc.edu/what-should-i-expect/process/):

<!--

1. If the violation minor (i.e limited to one assignment and not an exam) the instructor will opt for the FSR process.
1. Through the FSR process the instructor will propose a penalty and if the student accepts reponsibility, the case will close after the FSR agreement is submitted to OAI.
1. If the violation is major (i.e on an exam), or the student does not accept responsibility, the instructor will submit the case to OAI for the AR process.
1. The OAI will act as an impartial 3rd party to determine if a violation has occurred.
1. If a violation is deemed to have occurred, the OAI will recommend a sanction.  
1. If OAI determines this is not your first violation, they may initiate a review that could lead to suspension from the school.
   -->

The official language on academic integrity is on the [**syllabus**]({{ site.url }}/syllabus.html), but what is written below acts as an additional, binding policy for this course:

Collaboration is important in an academic environment. We want to be sure that you are aware of what is appropriate collaboration and conduct and what may be considered a violation of academic conduct rules. Here are examples to consider:

### Acceptable Actions

- Discussing **high-level** ideas (no coding terms at all) with other students is fine. It is even helpful if you annotate your work with the names of your collaborators.
- Asking course staff (instructor, TAs, CPs) for help or to look at your code.
- Copying test cases from other students or {{site.data.urls.qa_tool}} when test cases are not graded is fine since it serves to teach you something, and there is no risk that you will get points for the work of other students.
- Looking up references on C++ library containers, functions, and syntax.  However, looking up "similar" examples to a homework assignment is NOT okay.

### Unacceptable Actions (Violations of Academic Integriy)

- Copying **EVEN A FEW LINES** of code from other students (current or former) or online sources, **even if you edit it significantly** is NOT okay.  You must start from scratch or from the provided skeleton and come up with the design ideas and code yourself.  Taking code from some other source and then saying you *understand* it doesn't make it your own code.
- Take care even coding together in the same room and talking through approaches.  It often leads to describing your approach in specific coding terms that will lead to near-exact code structures.
- Having other students in the class look at your code or access a copy of your code is not acceptable. If test cases are graded, it is also not acceptable to let other students have copies of those test cases. 
- Obtaining copies of code or test cases from students who were enrolled in a previous term of CSCI 104. (That would even be a violation for the student not enrolled in CSCI 104 this term.)
- **Even searching for similar code and solutions** on Github, StackOverflow, online sources (Chegg, etc.), or other textbooks is NOT allowed, even just for "reference".  If you happen to find related work in a source that is not the course materials, it is best that you notify your instructor.
- Posting in online forums asking people to solve homework questions or paying for solutions.

**In summary, any time that you are trying to get higher grades for work that you did not earn is not acceptable. Any behavior by which you are attempting to receive or grant an unfair advantage that your classmates who are following the rules do not have is not acceptable.** Please act with the integrity that is expected of USC Trojans.

We run code similarity tools on all homework submissions to catch inappropriate collaboration and plagiarism. If there is suspected cheating, you will be reported to the [OAI](https://academicintegrity.usc.edu/), no exceptions. Follow the above guidelines to make sure this doesn't happen to you.

In order to make sure that an appropriate level of collaboration is used between you and your classmates, please do not keep notes,  pictures, or any records from your discussions. This will ensure that your work reflects only your understanding when you create it. Please do not sit coding next to each other while discussing the work. If you are concerned that an inappropriate level of collaboration has occured, please do the following:

- **Keep no notes, pictures, or records from your discussions.**
- Cite your **high-level** collaborators in your comments in your work. 
- Take at least a 30 minute break before you continue working and make sure that your work only reflects your own understanding of the solution. If you truly do not understand part of the solution, please do not include it as your own work.
