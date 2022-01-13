---
layout: default
title: Labs
---

# Lab Overview

Lab sessions are held every week and will be conducted by a team of TAs and Course Producers.  Labs are **NOT** just summaries of previous lecture content.  While you will do some review, the labs will often teach new tools (debuggers, unit testing, Makefiles, etc.) or have you practice skills in more depth than lecture was able to cover.  Thus, it is very important you attend labs and give your best effort.  This may be different from previous CS courses where labs/discussions were optional or done ahead of time. In CS104, you should treat labs as you do lectures and make it a priority to attend each week.

## Policies

 - You must attend the lab you are registered for.  If you know in advance you can't make a lab due to some issue, contact your lab leader(s) **in advance** (not after the fact) and indicate what other lab section you'd like to attend that week and they will decide 
 - **You may miss 1 lab session without penalty**.  This excused absence should ONLY be used in the case of illness and not just *a busy week*.  You need to contact your lab leader(s) as soon as you are able if you were ill and missed lab session.
 - Labs are graded **CR/NC**.  You MUST get checked off with a live staff person before the end of the lab session.  If you are struggling with the lab you must ask questions during the lab to show you are trying.  In that way, the lab staff will be able to give you **credit** for your effort.  If you do not show effort/ask questions and have little to no work to show for your lab period, you will be marked as **no credit**. 
 - Some collaboration (in pairs) is allowed for labs but it must be blatantly clear to the lab staff that both members are equally contributing.  One member should not be telling (or showing) the other student what to write, but instead, you can help your fellow student if they encounter an error or question.  If a staff member, directs you to work separately or more independently you need to alter your approach.
 
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
      onclick="window.location = '{{ site.baseurl }}/labs/{{ lab.id }}'"
      {% else %}
      class="disabled"
      {% endif %}
    >
      <td>
        {% if lab.assigned %}
        <a href="{{ site.baseurl }}/labs/{{ lab.id }}">{{ lab.id }}</a>
        {% else %}
        {{ lab.id }}
        {% endif %}
      </td>
      <td>{{ lab.week }}</td>
      <td>{{ lab.title }}</td>
      <td>{{ lab.topics }}</td>
      <td>
        {% if lab.slides != empty %}
        <a href="assets/{{ lab.slides }}">{{ lab.slides }}</a>
        {% endif}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>
