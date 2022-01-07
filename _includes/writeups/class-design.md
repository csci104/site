
This problem has nothing to do with the programming problem(s) below, but it will separately test your understanding of class structures and inheritance. **Place your answers in PDF file named `hw2_q2.pdf`** (Use your phone to convert hand-drawn results to a PDF, if necessary).

Imagine that you are writing a simulation of a restaurant to help make decisions about number of employees, ensure appropriate crowding levels both in the restaurant and kitchen, etc.

- The restaurant employs chefs, waiters, and hosts. The restaurant also has an owner.
- Employee pay is calculated using a different algorithm based on the type of employee. Waiters also receive tips. The owner doesn't get paid hourly ... she owns the business.
- Parties of customers are categorized as walk-in, reserved, and celebrity parties
   + A party has a size (number of people).
   + A party will be matched to a table (we'll assume 1 party per table).
   + All parties tip, and the algorithm for calculating the tip is based on their category (celebrities generally tip 25% + a constant amount while walk-ins usually tip 15% for parties of 2-3 people, 18% for parties of 4 or more, etc.).
- Each waiter has a list of tables he/she is assigned to wait on.
- There should be a way for Waiters to take orders from customers, give orders to the chef, and return orders (i.e. their food) to customers.
- Each chef has a different skill level allowing them to cook the order faster (higher skill) or slower (lower skill).
- Each chef has a queue of orders they are assigned to cook.

- The restaurant should support the following operations:
  + Return a list of all the employees.
  + Compute the gross amount of money/pay employees earned by iterating through the list of all employees (including tips)
  + At any particular time, indicate how many customers a waiter is serving.
   
Note: You don't have to worry about how time would "increase" or "pass", nor do you have to worry about the overall coordination of who calls the higher level functions.  Just consider the objects and member functions necessary to support appropriate invocation of the described functionality.

Diagram the classes (show as a box) involved from the description given. Indicate which classes are abstract, and which aren't. Show which classes inherit from each other with an arrow and label it as `public` or `private`. Also show which classes have a "has-a" relationship to another class and indicate what container class (if any) would be used to store them (e.g., lists, sets or maps where appropriate).

You should identify the **key** virtual functions (and whether they are *pure* virtual functions). Also, identify the data members of a class insofar as they indicate "has-a" relationships.  

For this problem, you can choose to draw this by hand and scan it (and submit as a JPG or PDF), or to use some graphics software (and produce a JPG or PDF), or to use UML (if you know it), or draw it using ASCII art (this may be a lot of work). Provide an explanation with your choices, i.e., tell us why you chose to have certain classes inherit from each other (or not inherit). Notice that you don't need to do any actual programming for this problem.

Of course, there isn't just one solution, but some solutions are better than others.  Just do your best to write a class hierarchy, define member functions, and identify keep composition and data structure members to support the description above. Good explanations may help you convince us that your proposed approach is actually good.

#### Clarifications:

  - **Question:**  Do we need to define every member function and data member that the classes are supposed to have? Or just the virtual functions and composed objects?

     - **Answer:** Just the composed objects, and the (important) virtual functions.  In addition, if a detail is mentioned by the problem statement, and you decide to implement it by way of a data member, you should mention this, so as to let the grader know that you are NOT implementing it via a virtual function, or inheritance, or composition.

  - **Question:**  Do we actually need to write out the definitions for all the functions? Or do we simply declare the functions that each class has?

     - **Answer:** No programming is necessary.  You don't even have to declare all the functions, just the more important pure virtual functions.
