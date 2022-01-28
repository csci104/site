Read the Web Search programming problem desribed in the second half of the assignment carefully (several times), and study the provided skeleton code.  Then, draw an inheritance diagram (an example of an inheritance diagram is shown below) of all the classes in the skeleton code, as well as all of the classes you need to create for this assignment. Show any inheritance relationship as well as **important** composition (has-a) relationships between the classes we've given (you can ignore composition relationship of basic `string`, `int`, etc. data members) of important data members)

Then provide an explanation for the following questions.  

1. Why do we have an abstract `PageParser` class, and why do we have a pure virtual `parse` function inside the `PageParser` class?
2. Why does the `Handler` class have a pure virtual `process` function? 
3. Consider the class hierarch/organization and list the the  sequence of class function calls (i.e. who calls who) that will result from an `AND` query (e.g. `AND term1 term2`), starting with the `SearchUI::run()` until the results are computed. 


<img src="{{site.baseurl}}/homework/img/classhierarchy.png">

**Provide your diagram and answers in `q5.pdf`**

You can use any drawing program you wish (hand-drawn and scanned is also fine **if you draw neatly**).  