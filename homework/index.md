---
layout: asides
toc: true
title: Homework
---

# Homework

Homework will be assigned once every **7-10 days**. It will be graded, and require substantial work. The average student should **expect to spend about 15-20 hours per homework**. Homeworks will typically contain a mix of programming exercises and "theory" questions about data structures and their implementation.  


Each student will be responsible for creating and using a GitHub repo for the development and submission of all assignments. You will be using the **git** source code management tool to maintain your homework code. 

Please read the submission instructions and policies below **carefully**!  Failure to follow the process (of pushing the appropriate files to Github and submitting your git commit SHA on our website) will result in a 0 on the assignment. 

<h2 id="schedule">Schedule</h2>
<table class="standard assignments">
  <thead>
    <tr>
      <th>#</th>
      <th>Link</th>
      <th>Title</th>
      <th>Due</th>
      <th>Regrade</th>
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
        <a href="foo">Codio</a>
        {% else %}
        
        {% endif %}
      </td>
      <td>{{ assignment.title }}</td>
      <td>{{ assignment.dates.due }}</td>
      <td><a href="{{ site.data.urls.regrades }}">Regrade</a></td>
    </tr>
    {% endfor %}
  </tbody>
</table>

## Editors, Debuggers, and Git Help

Checkout our [**Tools and Links page**]({{site.baseurl}}/resources)

## Submission

In order to properly submit your assignment, **please follow the course [submission instructions]({{ site.baseurl }}/homework/submission-instructions/)** which will show you the steps to submit a particular `git` commit of your code. 

For each assignment, a precise time will be specified on the due date (usually at 11:59 PM PST).  The programming submission must be made correctly via your github account and your **`git` commit SHA** must be submitted on the appropriate submission page using the process described on the [submission instructions]({{ site.baseurl }}/homework/submission-instructions/) page.  Read and follow those instructions carefully for each homework.  **Failure to do so may lead to a 0 on the assignment** even though you may have had all the code working on your machine.  Much of software development requires following strict processes, so it is important you start to understand and follow those processes.


**Important Note:**  You will NOT receive an exception for failing to follow these instructions!

For example, often times students forget to commit/push a file that is part of their solution to Github.  If they had followed the submission instructions and re-cloned their repo to a temporary folder and attempted to build their assignment code, they would have easily found the issue.  We cannot accept files that were not submitted or files where you submitted "the wrong version".  We can only grade what you submitted.

In addition to making sure your submission is on time, **please make sure that the code you submit is formatted and works as expected with `g++`**.  We will grade your assignments using <code>g++</code> at the command line.  You are free to use other compilers or IDEs to develop your code, but in the end, it has to work with `g++` on the course Docker container or virtual machine.

## Policies

There will be **6 assignments**. In CSCI 104L we do not accept late submissions (except as outlined below). We  do realize that as a student, things will come up and other classes may need more focus on certain weeks.  While 7-10 days per assignment should allow you to finish on time if you **start early** and **work consistently**, we have a flexible due-date policy that allows for submitting assignments within 5 days of the due date with minimal penalty. For each of the first five days **after** the due date you may submit an assignment with a penalty of 1% per day (for a total of 5% on the last day). After five days, there are no late submissions.

In this age of COVID, we realize that being sick or having sick family may preclude you from working on your assignments as you would be able to otherwise.   If a confirmed COVID-related illness or other emergency occurs, please fill out [this form]({{site.data.urls.extension_form}}) and make a private note on [edStem]({{site.data.urls.discussion}}) to inform the course staff and we will try our very best to work out a flexible plan for completing the assignment. **Note:** A minor illness, injury or other incident a few days before the deadline or a trip home to see family does not qualify for an extension. Start early anticipating that things may come up closer to the deadline.  If you have not started early and ask for an extension, your request may be rejected. Commit and push your intermediate work often as a record of your effort on an assignment.

For non-emergency issues (especially those close to the deadline), extensions are generally not applicable. Instead, **your late days** are available and should be used for such circumstances.

As a reward for starting early coding assignments turned in early will receive a 5% bonus. "Turned in early" means the assignment was marked-as-complete on Codio and the autograding script awarded full marks **before** the day of the deadline. Said another way, if you finish your assignment with full marks before the due date (not time) you will receive the bonus. This means you can earn up to 105% of the points on the homework portion of the course.

Late days and the 1% per day penalty apply **only** to the coding portion of the assignments. The written portions must be completed on-time by uploading your written answers to Codio before the deadline.

The most consistent advice from students who have done well in CS 104 is (you guessed it): **start early!**  

### HW Grades and Regrades

We will work hard to post HW scores and feedback within 1 week of the homework's due date. Exams will typically be graded within at most a few days of the exam date. Only the written portion of the homework is graded by a human. The score for the programming portion is determined by a grading script and is not avilable for regrading.

Any disputes with posted grades **must** be raised within **7 days** (unless specifically noted) of the score posting.  Then follow the process below for the type of regrade you are requesting.  

Fill out this [**HW regrade form**]({{site.data.urls.regrade_form}}) **within 7 days** of grades being released. The graders will review your regrade request and if appropriate make any updates to your score on Codio. They will also respond via the Admin and Grading discussion board with a reply whether or not your score changed.

Any regrade request will result in us trying to give the fairest possible grade to you, which could be higher or lower than the one you received originally.  Finally, please note that regrades are not for "fixing" your code.  For example: If there was just one line off that caused all the tests to fail, that might be a viable reason for a regrade but with the Codio submission process you will know that your code fails when you submit. It is your responsibility (especially if the test suite was released before submission) to ensure your code compiled, tested, and all files were submitted on Github which can be verified by the "Verification" process outlined at the end of each homework.

### Exam Regrades
Exams may or may not have regrades enabled. If they do, then regrades will be handled through Gradescope.  


## Academic Integrity
We take academic integrity very seriously in our CS courses to ensure that your grades reflect your mastery of the material presented in this class as well as to provide fairness to fellow students, to ensure the reputation of USC, and the expectations of our constituencies are met.  

Your homework assignments and exams should be individual efforts unless explictly stated otherwise. While collaboration and online searches are common in the workplace, taking code from those sources is usually not allowed due to licensing and can have legal ramifications.  Similarly, while collaboration in a company is common, we are training you to be capable computer scientists and, thus, you need to develop the skills for yourself.  You will have higher levels of collaboration for team-based projects in future courses and in the workplace.  For homework assignments, you may only have high level discussions with classmates. Any discussion that includes specific code (describing variables, loops, functions, etc.) and implementation details is an **inappropriate level** of collaboration. **Looking for similar examples of code online is also a likely violation if you model your code after those online examples.**.  We run all submissions through code similarity tools that compares every student to every other student from this semester and past semesters.  If you are suspected of violating the academic integrity code of conduct the process will be as outlined at the [Office of Academic Integrity](https://academicintegrity.usc.edu/what-should-i-expect/process/):

1. If the violation minor (i.e limited to one assignment and not an exam) the instructor will opt for the FSR process.
1. Through the FSR process the instructor will propose a penalty and if the student accepts reponsibility, the case will close after the FSR agreement is submitted to OAI.
1. If the violation is major (i.e on an exam), or the student does not accept responsibility, the instructor will submit the case to OAI for the AR process.
1. The OAI will acts as an impartial 3rd party to determine if a violation has occurred.
1. If a violation is deemed to have occurred, the OAI will recommend a sanction.  
1. If OAI determines this is not your first violation, they may initiate a review that could lead to suspension from the school.

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
- **Even searching for similar code and solutions** on Github, StackOverflow, online sources (Chegg, etc.), or other textbooks is NOT allowed, even just for "reference".  If you happen to find related work in a source that is not the course materials, it is best that you notify your instructor first to ask if it can be used and, if it can be, then cite the materials.
- Posting in online forums asking people to solve homework questions or paying for solutions.

**In summary, any time that you are trying to get higher grades for work that you did not earn is not acceptable. Any behavior by which you are attempting to receive or grant an unfair advantage that your classmates who are following the rules do not have is not acceptable.** Please act with the integrity that is expected of USC Trojans.

We run MOSS on all homework submissions to catch inappropriate collaboration and plagiarism. If there is suspected cheating, you will be reported to [SJACS](http://sjacs.usc.edu/), no exceptions. Follow the above guidelines to make sure this doesn't happen to you.

In order to make sure that an appropriate level of collaboration is used between you and your classmates, please do not keep notes,  pictures, or any records from your discussions. This will ensure that your work reflects only your understanding when you create it. Please do not sit coding next to each other while discussing the work. If you are concerned that an inappropriate level of collaboration has occured, please do the following:

- **Keep no notes, pictures, or records from your discussions.**
- Cite your **high-level** collaborators in your comments in your work. 
- Take at least a 30 minute break before you continue working and make sure that your work only reflects your own understanding of the solution. If you truly do not understand part of the solution, please do not include it as your own work.

