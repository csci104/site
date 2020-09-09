---
layout: asides
toc: true
tasks: false
title: Visual Inspection Rubric
---

# Visual Inspection Rubric

## Style and Readbility
<div class="text-align-center">
    <table class="standard">
        <thead>
            <tr>
                <th>Infraction</th>
                <th>Deduction</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>using namespace std</code> in header files</td>
                <td>2 points</td>
                <td>Always apply unless explicitly allowed</td>
            </tr>
            <tr>
                <td>Global variables</td>
                <td>2 points</td>
                <td>Always apply unless explicitly allowed</td>
            </tr>
            <tr>
                <td>Adding public functions or exposing private variables/functions</td>
                <td>3 points</td>
                <td>Always apply unless explicitly allowed</td>
            </tr>
            <tr>
                <td>Writing class definitions and implementations in one file</td>
                <td>3 points</td>
                <td>Always apply unless class is templated or explicitly allowed</td>
            </tr>
            <tr>
                <td>No comments in projects</td>
                <td>2 points</td>
                <td>Where "project" is anything with more than 2 classes involved</td>
            </tr>
            <tr>
                <td>No comments in larger program</td>
                 <td>1 points</td>
                <td>Unless code is readable without comments</td>
            </tr>
            <tr>
                <td>Long files (>500 lines)</td>
                 <td>2 points</td>
                <td>Unless starting file is already long, or if we specify that this is allowed</td>
            </tr>
            <tr>
                <td>Code is completely unreadable</td>
                 <td>2 points</td>
                <td>Example: no pattern or no indentation</td>
            </tr>
            <tr>
                <td>Code is partially unreadable</td>
                 <td>1 points</td>
                <td>Example: no uniformity in indentation levels</td>
            </tr>
            <tr>
                <td>Large blocks of commented code</td>
                 <td>2 points</td>
                <td>Acceptable as proof of work</td>
            </tr>
            <tr>
                <td>Poor code quality</td>
                 <td>Up to 2 points</td>
                <td>Includes repeated code, redundant logic, etc.</td>
            </tr>
        </tbody>
    </table>
</div>

## Submission
<div class="text-align-center">
    <table class="standard">
        <thead>
            <tr>
                <th>Infraction</th>
                <th>Deduction</th>
                <th>Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Missing Submission</td>
                <td>100 points</td>
            </tr>
            <tr>
                <td>Extra files (binary files, temp files, etc.)</td>
                <td>1 point per file</td>
                <td>We will ignore test files</td>
            </tr>
            <tr>
                <td>Incorrect file name or format</td>
                <td>1 point per file, max 5</td>
                <td>We will ignore test files</td>
            </tr>
            <tr>
                <td>File in wrong directory</td>
                <td>1 point per file, max 5</td>
                <td>We will ignore test files</td>
            </tr>
            <tr>
                <td>Cannot open file or corrupted file</td>
                <td><code>x</code></td>
                <td><code>x</code> = all points for questions that you cannot grade for this reason</td>
            </tr>
        </tbody>
    </table>
</div>
