---
layout: asides
toc: true
tasks: true
title: Homework 2 Programming
---

# HW2: Programming Assignment

+ Due: Friday, February 19th, 11:59pm PST
+ To access the written portion of this assignment, click [here](..)
+ Directory name in your github repository for this homework (case sensitive): `hw2`

    - In this project we have provided a **substantial** code base.  Do a `git pull` in your `resources` repo.
    - Then copy the `resources/hw2` folder into your `hw-username` repo and use the skeletons provided to start work in that `hw2` folder.

    - You **MUST** modify the provided `Makefile` so that we can compile your code (not run it) by simply typing `make` which should among other compilation commands, produce an executable `amazon`
    - Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
    -   Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.
    - **You may use any STL classes you like**

**Please read the entire assignment through once before you start to perform any tasks.** 

### Background
In this project you will write code to model a **very** simplified version of an online retail system such as Amazon.  In this project you will read a database of products from certain categories as well as users and their associated information.  Your program will then allow a user to interactively search for products based on certain keywords returning the products that match the search.  From those matches, your program will allow a user to add select items to their "cart", view items in their cart, purchase the items in their cart, and save the updated database of product and user information.

**Important**:  In practice, reading and understanding others' code is just as important as writing your own code. So in this project you will need to read and understand a good bit of provided code.  Spend time understanding what it does and its structure.  

One common need when reading large code bases (in the grand scheme this is not that large of a code base) is to find where classes or functions are defined that you see being called or used.  Most editors have the ability to do this via some *Find in files* or *Goto definition* related feature(s). In Sublime if you open a folder (e.g. your `hw2` folder) you can right click on a class name or function name and choose *Goto Definition* to jump to where that class or function is declared/defined. 

Another simple command line tool is `grep`.  At the command prompt you can type:

```bash
grep "search phrase" file(s)
```

 to find all occurrences of `search phrase` in the listed files (often replaced with the wildcard, `*`).  Thus:

```bash
grep "Product" *
```

  would output the lines of text from any file in the current directory that contained `Product`.  An additional option is `-n` to show line numbers.  

```bash
grep -n "Product" *
```

would include the line numbers in each file where the search phrase occurs.  

#### The Data and Its Format
Your online retail system will sell products of various categories.  All products (no matter the type) will have a:

+ Name
+ Price 
+ Quantity in stock

Currently your system will support 3 categories of products and each category will supply additional fields of data as indicated below:

+ `book`
  - ISBN
  - Author
+ `clothing`
  - Size
  - Brand
+ `movie`
  - Genre
  - Rating

Note:  ISBN, Author, Size, Brand, Genre, and Rating should all be `string` type data.

The program will also support a set of known users with a:

+ username : `string`
+ credit_amount : `double`
+ type : `integer` (identifying special users like "prime" users...may be used in later HWs)

This information will be stored and can be accessed from a text database file.

```
<products>
product_category
name
price
quantity
category-specific-info
product_category
name
price
quantity
category-specific-info
...
</products>
<users>
username credit_amount type
username credit_amount type
...
</users>
```

An example is shown here of a sample file we will provide `database.txt`.

```
<products>
book
Data Abstraction & Problem Solving with C++
79.99
20
978-013292372-9
Carrano and Henry
book
Great Men and Women of Troy
19.50
5
978-000000000-1
Tommy Trojan
clothing
Men's Fitted Shirt
39.99
25
Medium
J. Crew
movie
Hidden Figures DVD
17.99
1
Drama
PG
</products>
<users>
aturing 100.00 0
johnvn 50.00 1
adal 120.00 1
</users>

```

#### Provided Code

Here is a list of the files in the codebase that we are providing.  Please do not alter any of the files marked **Complete!** below.

+ `amazon.cpp` - **Incomplete!** Top-level application. Contains `main()`

+ `datastore.h` - **Complete!** Abstract base class.  You will create a derived class which should support storage of all the data: products and users

##### Storage
 - `user.h` and `user.cpp` - **Complete!**  Class to model a User
 - `product.h` and `product.cpp` - **Complete!**  Abstract base class.  Models the common aspects of all categories of products.  Should support various common operations on all products. Ignore and do not alter `isMatch()` for this assignment. It may be used in a future HW.  

##### Parsing
 - `db_parser.h` and `db_parser.cpp` - **Complete!**  A Parser class which utilizes specialized product parsers.
 - `product_parser.h` - **Complete!** In this one file are several class definitions.  The base class, `ProductParser` is meant to parse the common attributes of a product and then there is one derived parser class per category of product to parse the additional attributes 
 - `product_parser.cpp` - **Nearly Complete!** The code for the base class `ProductParser` is complete and does not need to be modified.  For each of the derived types you will need to complete the `makeProduct()` member function of each of these classes to instantiate an appropriate product object for the given category.

##### Utility code
 - `util.h` and `util.cpp` - **Incomplete** - You need to complete the code in `util.h` to find the set intersection and set union.  You also need to complete the function to parse a string containing spaces and words into individual words

+ `database.txt` - Input file to your program.  You may add more products and users to test your code, or write other input files.  These are just text files and can be named however you like.

+ `Makefile` - **Partially complete!** Edit as you add or change code

### Requirements
1. **Keywords** - Your system should build an index mapping keywords to the set of products that match that keyword.  A product should match a keyword if it appears in the product name or one of the following attributes below (dependent on specific type of product):
  + Books: the words in the author's name should be searchable keywords as well as the book's ISBN number
  + Clothing: the words in the brand should be searchable keywords
  + Movie: the movie's genre should be a searchable keyword
  + For the product name, book author, and clothing brand we define a keyword to be any string of 2 or more characters.  If such a word has punctuation it should be split at each punctuation character and the resulting substrings (of 2 or more characters) should be used as keywords. Here are some examples:
	- `Men's` should yield just a keyword of `Men`
	- `J.` would not yield any keyword since the remaining substring `J` is only 1 character
	- `I'll` would yield just `ll` since that substring is 2 or more characters (this is obviously a poor keyword but we'll follow this rule for simplicity)
  + For other keywords (book ISBN and movie genre) no punctuation or size analysis is necessary and it should be used verbatim as a keyword. Here is an example:
	- The ISBN `978-000000000-1` should be used exactly as is for the keyword entry
  + It is suggested you store your keywords in a common case so that searching is easy and case-insensitive

1. **AND/OR Search** - Your system should allow users to search for products based on entering one or more keywords at the program menu prompt.  An `AND` search should return all the products that contain ALL the search terms entered.  An `OR` search is defined as all the products that contain ANY of the search terms entered.  At the prompt the user will need to write `AND` or `OR` as their first word/command followed by any number of search terms separated by spaced.  Your search should treat those terms as case-insensitive when it comes to matching. Examples might be:
    `AND Men` would be the same as `OR Men` since there is only 1 term and would return all products that have the word `men`. (i.e. the book `Great Men and Women of Troy` and `Men's Fitted Shirt`).
    `AND hidden Data` would return nothing since no products have both those terms
    `OR hidden Data` would return both the `Hidden Figures DVD` and `Data Abstraction & Problem Solving with C++` products 
    You may choose any reasonable behavior if the search consists only of `AND` or `OR` (no keywords)

1. Your search must be implemented "efficiently".  You should not have to iterate over ALL products to find the appropriate matches.  Some kind of mapping between keywords and products that match that keyword should be implemented.
1. **Hits** - Results must be displayed to the user via the `displayProducts(vector<Product*>& hits);` function provided in `amazon.cpp`. Failure to use this function will result in **LARGE** deductions since it will make our testing much harder.
1. **Adding to Carts** - You should support the notion of a "cart" for each user that they can add products to.  Using the `ADD username hit_result_index` command should cause the product with index `hit_result_index` from the previous search result to be added to `username`'s cart.  **You must maintain the cart in FIFO (first-in, first-out) order** though that doesn't mean you HAVE TO use the C++ `queue` class.  Currently, we will not support the ability to remove products from a cart.  If a product is added to a cart twice, treat them as separate items and store them in your cart twice (i.e. don't try to store it once with a "quantity" of 2).  This implies that each command of `ADD` adds 1 product to the CART.  If the `username` or `hit_result_index` is either not provided, or invalid, print `Invalid request` to the screen and do not process the command. Note: The results from the last search should be retained until a new search is performed.  Thus, the hits from one search can be referenced by many `ADD` commands. 
1. **Viewing to Carts** - You should support the `VIEWCART username` command which should print the products in `username`'s cart at the current time.  The items should be printed with some ascending index number so it is easy to tell how many items are in the cart.  If the `username` provided is invalid, print `Invalid username` to the screen and do not process the command.
1. **Buying the cart** - You should support the `BUYCART username` command which should cause the program to iterate through the items in `username`'s cart. If the item is in stock *AND* the user has enough money it should be removed from the cart, the in stock quantity reduced by 1, and the product price should be debited from the user's available credit.  If an item is not in stock or the user does not have enough credit, simply leave it in the cart and go on to the next product.  **Note:** Your cart implementation must iterate through the products in the order they were added.  If the `username` provided is invalid, print `Invalid username` to the screen and do not process the command.
1. **Quitting** - You should support the `QUIT filename` command which should cause a new version of the database using the format described above to be saved to a file whose name is `filename`.  It should represent the updated state of the database (i.e. changing product quantities and user credit) to reflect purchases. **Note:** Within the various sections, users and products may be written in any order (not necessarily matching the order of the input database file).

Here is an example run of the program

`$ ./amazon database.txt`

```
Read 4 products
Read 3 users
=====================================
Menu:
  AND term term ...
  OR term term ...
  ADD username search_hit_number
  VIEWCART username
  BUYCART username
  QUIT new_db_filename
====================================

Enter command:
OR hidden DATA
Hit   1
Data Abstraction & Problem Solving with C++
Author: Carrano and Henry ISBN: 978-013292372-9
79.99 20 left.

Hit   2
Hidden Figures DVD
Genre: Drama Rating: PG
17.99  1 left.


Enter command:
ADD johnvn 2

Enter command:
VIEWCART johnvn
Item 1
Hidden Figures DVD
Genre: Drama Rating: PG
17.99  1 left.


Enter command:
BUYCART johnvn

Enter command:
QUIT database.new
```

Here is the resulting output database. Notice the reduction in quantity of the Hidden Figures DVD and the credit for user `johnvn`

```
<products>
book
Data Abstraction & Problem Solving with C++
79.99
20
978-013292372-9
Carrano and Henry
book
Great Men and Women of Troy
19.5
5
978-000000000-1
Tommy Trojan
clothing
Men's Fitted Shirt
39.99
25
Medium
J. Crew
movie
Hidden Figures DVD
17.99
0
Drama
PG
</products>
<users>
aturing 100.00 0
johnvn 32.01 1
adal 120.00 1
</users>

```

### Code Organization

Our code in `amazon.cpp` and `db_parser.cpp` can make calls via the `DataStore` interface by using a base class pointer/reference (`DataStore*` or `DataStore&`).  It is this class where you will likely want to store products and users, via some kind of container object(s).

The parser in `DBParser` is complete but allows for extensions by "registering" certain "section parsers" and "product parsers".  Section parsers handle everything between `<section>...</section>` in the database file.  We can create section parsers out in main() and register them with the DBParser which will maintain a map of section name to the given parser.  When the parser encounters a particular section it will invoke the appropriate section parser.   We have written two sections parsers:  `ProductSectionParser` and `UserSectionParser`.  These are complete.  

Our product parsers will parse all the aspects of the specific category of product into the data members of the class and then call `makeProduct()`.  It is here that you need to instantiate an appropriate product object and return a pointer to it.  It will then be added to the data store object.  **You only need to fill in the code in the `makeProduct()` functions** for each specific product parser and do not need to change any other code in `product_parser.cpp` other than adding appropriate `#include` statements.


### Your Task (90%)

1. Complete the `parseStringToWords()` in `util.cpp` according to the specification given above for taking a string of many words and splitting them into individual keywords (split at punctuation, with at least 2 character words)
1. Complete the `setIntersection` and `setUnion` functions in `util.h`.  These will help you later on to perform searching. These functions should run in **O(n*log(n))** and **NOT O(n^2)**. Note that these are templated functions operating on any generic `set<T>`.  As a hint, to declare an iterator for `set<T>` you must precede the type with the keyword `typename` as in `typename set<T>::iterator it`.  Another **very important** note about using iterators with C++ containers (e.g. `vector`, `set`, `map` ):  if you are iterating over a container with iterators, you should **NOT** modify the contents as you iterate.  Consider the scenario where you have an iterator to the beginning item of a vector, and in your loop you erase that element.  Behind the scenes, the vector shifts all the data elements up a spot, moving the 1st element into the 0th location.  When you increment the iterator you will now move to the next location in the vector skipping the 1st element (now in the 0-th location).   Similar or more serious issues can arise when you insert items, etc. as you iterate.    
1. Write derived product classes: `Book`, `Clothing` and `Movie` implementing the `keywords()` which returns the appropriate keywords to index the product, `displayString()` [to create a string that contains the product info] and `dump()` [that outputs the database format of the product info].  We recommend trying to compile (NOT test, just compile) each of these files as you write them to avoid solving the same compile issue 3 times for each derived class.  Remember you can easily compile by using the -c flag (e.g. `$ g++ -g -Wall -std=c++11 -c book.cpp` ).  Each class should be written in its own `.h` and `.cpp` files (i.e. `book.h`, `book.cpp`, `clothing.h`, etc.)
1. Complete each of the specialized product parser implementations of makeProduct() in `product_parser.cpp` to return a new specific Product for each category. Again we recommend ensuring this file can be compiled after you complete it.
1. Implement a derived DataStore class called `MyDataStore` in `mydatastore.h` and `mydatastore.cpp`.  It is here that you will implement the core functionality of your program:  searching, adding products and users, saving the database, etc. (For search you can use the `setIntersection` and `setUnion`) functions in `util.h`.   This class is likely where you should store products and users in some fashion.  Again we recommend compiling this file separately as well after you write the core functionality.  You may need to add to it or modify it later as you work through other design aspects but make sure it can compile now even just using empty "dummy" function implementations.  This derived class may define non-virtual functions to do other specific commands that the menu supports.  It might be a good idea to have one member function in this class that corresponds to and performs each command from the menu options.  You **should not** modify `datastore.h`.
1. Complete `amazon.cpp`.  It has a pretty good skeleton laid out for you to implement the user interface (text-based menu and command entry) and you only need to modify a few lines in the top area and then add the remaining menu option checks at the bottom.  More specifically, you will need to:
  + Change the `DataStore` object instantiation to your derived type
  + Add checks for other menu input options, read their "arguments" and implement the desired behaviors.
  + You should not need to modify the parser calls at the top.
1. Update the Makefile as needed.  Remember we never compile `.h` files...those just get `#include`d into the `.cpp` files that we actually compile.
1. Be sure you have no memory leaks.
1. You may **NOT** use any *additional* (we use a few in the code provided) algorithms from the `<algorithm>` library  nor may you use the `auto` keyword.

### Displaying Products

When you display the products, `displayString()` will be used to generate the information string.  You should follow the format:

 - **Books**

```
<name>
Author: <author> ISBN: <isbn>
<price> <quantity> left.
```

 - **Clothing**

```
<name>
Size: <size> Brand: <brand>
<price> <quantity> left.
```

 - **Movies**

```
<name>
Genre: <genre> Rating: <rating>
<price> <quantity> left.
```

### Test your Program

We strongly recommend writing separate test drivers programs (i.e. separate `.cpp` files with a `main()`) that perform basic unit tests by calling various functions or instantiating your classes and invoking the various member functions.  In this way you can have some confidence that the individual pieces work before you try to put them all together.  

At the point where you need a database file to parse and act upon, you may use the `database.txt` file. Feel free to add products and users to the `database.txt` or, better, create your own database text file.  Run the program and be sure to test various sequences of command that exercise the requirements described above. 

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw2`
  - This directory should be in your `hw-username` repository
  - This directory needs its own `README.md` file briefly describing your work
  - `amazon.cpp`, `datastore.h`, `db_parser.cpp`, `db_parser.h`, `product.cpp`, `product.h`, `product_parser.cpp`, `product_parser.h`, `user.cpp`, `user.h`, `util.cpp`, `util.h`
  - Any files you created
  - Your `Makefile`
 + You can use the [submission link here](http://bytes.usc.edu/codedrop/?course={{site.data.main.slug}}&assignment=hw2&auth=Google).

You can submit your homework [here](http://bits.usc.edu/codedrop/?course=cs104-sp21&assignment=hw2&auth=Google). Please make sure you have read and understood the [submission instructions]({{ site.url }}/assignments/submission-instructions.html).
