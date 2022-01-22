Read the Web Search programming problem desribed in the second half of the assignment carefully, and study the provided skeleton code.  Then, draw an inheritance diagram (an example of an inheritance diagram is shown below) of all the classes in the skeleton code, as well as all of the classes you need to create for this assignment. Show any inheritance relationship as well as **important** composition (has-a) relationships between the classes we've given (you can ignore composition relationship of basic `string`, `int`, etc. data members) of important data members)

Then provide an explanation for the following questions.  

1. Why do we have an abstract `PageParser` class, and why do we have a pure virtual `parse` function inside the `PageParser` class?
2. Why does the `Handler` class have a pure virtual `process` function? 
3. Do a bit of online research about the **Model, View, Controller (MVC)** software design pattern.  Identify what major classes implement the each of the three and briefly describe how they achieve each of the three.

Below is an example of the kind of diagram we want you to produce which shows inheritance and composition relationships.

<img src="{{site.baseurl}}/homework/img/classhierarch.png">