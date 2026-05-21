---
layout: default
title: Labs
---

# Lab Overview

NOTE: Due to summer staffing, Labs may use our scheduled Quiz section instead, or the hour immediately after class with student consent. 

Lab sessions are held every week with the possible exception of Exam weeks, and will be conducted by a team of TAs or the Instructor.  Labs are **NOT** just summaries of previous lecture content and may contain completely new content.  While you will do some review, the labs will often teach new tools (debuggers, unit testing, Makefiles, etc.) or have you practice skills in more depth than lecture was able to cover.  Thus, it is very important you attend labs and give your best effort.  This may be different from previous CS courses where labs/discussions were optional or done ahead of time. In CS104, you should treat labs as you do lectures and make it a priority to attend each week.

## Policies

 - **Attendance:** You must attend lab in person and in your registered section (seating is limited; do not attend a different lab).
 - **Allowed absences:** You may miss at most **3 labs** during the semester and still receive credit for the lab portion. You have **2 excused lab sessions** (illness/emergency only). To use an excused absence, email your lab instructor in advance.
 - **Grading (CR/NC):** To receive credit, attend for the vast majority of the session, participate in exercises, and show honest effort on the assigned work. Effort matters — ask questions and engage; lack of effort/work may result in no credit.
 - **Collaboration:** Light pair collaboration is allowed and encouraged only when both partners consent and clearly contribute. Do not direct or code for your partner. Staff may require independent work if needed.
 - **Make‑ups:** Labs generally cannot be made up after the session unless pre‑approved for documented emergencies; otherwise, a missed lab counts toward your allowed absences.
 - **Disputes:** If you have a dispute about attendance, contact your discussion/lab leader within **1 week**.

## Schedule

<table class="standard assignments hover click">
  <thead>
    <tr>
      <th>ID</th>
      <th>Week</th>
      <th>Title</th>
      <th>Topics</th>
      <th>Slides</th>
    </tr>
  </thead>
  <tbody>
    {% for lab in site.data.content.labs %}
    <tr
      {% if lab.assigned %}
      onclick="window.location = '{{ site.baseurl }}/labs/{{ lab.folder }}'"
      {% else %}
      class="disabled"
      {% endif %}
    >
      <td>
        {{ lab.id }}
      </td>
      <td>{{ lab.week }}</td>
      <td>
       {% if lab.assigned %}
        <a href="{{ site.baseurl }}/labs/{{ lab.folder }}">{{ lab.title }}</a>
        {% else %}
        {{ lab.title }}
        {% endif %}
      </td>
      <td>{{ lab.topics }}</td>
      <td>
        {% if lab.slides %}
          {% for slide in lab.slides %}
          <a href="{{ lab.folder }}/assets/{{ slide }}">{{ slide }}</a>
          {% endfor %}
        {% elsif lab.slide_msg %}
          {{lab.slide_msg}}
        {% endif %}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
