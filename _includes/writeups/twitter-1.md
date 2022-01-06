### Project Overview

Note: You may use the C++ STL version of all data structures (i.e. `vector<>`, `map<>`, `set<>`, etc.) in this problem.

Our project (will be used in 2 homeworks) for the semester will be to model a microblog site such as Twitter. As you will see, it will require using quite a lot of the data structures you are learning about. At a high level, a microblog site is based on the following components:

1. Users that follow other users (this forms a graph with users as vertices and follow relationships as **directed** edges)
1. A timeline for each user (user x) that shows their posts as well as others' posts from those that user x follows and (potentially later) posts with appropriate @ mentions
1. Quick lookup/indexing of tagged keywords (hashtags)

For this (first) part of the project, we focus on parsing users and their feeds and searching for tweets based on hashtags.  You will want to keep an eye on making your code well documented and easy to expand, as you will be adding to it later. (That said, you will also be allowed to rewrite your code later.)

For now, while tweets may contain `@username` mentions you don't have to do any special processing of these and can simply show that as text in the tweet.

Please review the code provided to you including the parsing and display functions in `util.h/.cpp`.

Your program will be run at the command line as:

```bash
./twitter twitter.dat
```

This will initially parse the provided databased file for users and tweets.  We have supplied a few "database" (`.dat` files of various sizes).  There will then be a menu system for users to perform searches and enter new tweets. Finally, when the program quits, it should first write out a "feed" file for each user.  All of this is described below.

C++ Guidelines: You should **NOT** use the `auto` keyword or ranged `for` loops for this assignment.  We want you to know what the actual types are because you may see compile errors and you should be able to determine what types are needed. Later in the semester we may allow you to use those features.

### Step 1 (Classes)

You will begin your task by building support to handle Users and their tweets.  

Users contain:

+ a username (which is case-sensitive, so `Mark` is different than `mark`)
+ a set of other Users whom they follow
+ a set of other Users following them
+ a list of tweets that user has posted

Each tweet contains:

+ a timestamp in format:  YYYY-MM-DD HH:MM:SS
+ info about the User who posted the tweet (we will store a pointer to the corresponding User object)
+ the actual text of the tweet (we won't impose the 140 character limit in this project)
+ a set of hashtagged words (i.e. if the tweet contains `#cs104` and `#usc`, then this set should contain the string `cs104` and `usc`)

A `DateTime` class will model a timestamp.  It stores the time stamp info and provides comparison operators and insertion (`<<`) / extraction (`>>`) operators. For the extraction operator, you can take the input stream and read the corresponding pieces (month, day, year, etc.) into member variables (discarding the punctuation).  It may be easiest to extract the text of the date and then the time from the file and then place it in a `stringstream` for extraction into its parts. After you try to extract a variable you should check if the stream **failed** by calling the `.fail()` function on the input stream.  If it does, set the date and time to the current system time (see details below) and return.  Also you do not need to verify valid ranges for year, month, day values (e.g. we'll only give you months between 1-12).

The `TwitEng` class is the main interface to the application. It should store data related to your microblog engine and perform all the high level operations.  Good design would separate the user interface of this application (described later) and only provide member functions to carry out the desired operations. In this way we can remove the current command line/text interface and exchange it for a GUI interface but still use the operations provided by TwitEng.

You may add other classes as needed and any other required member functions to the given classes, but **must** maintain the **public** interfaces of the classes provided in the skeleton.

### Step 2 (Parsing and Twitter Feeds)

Your program will take an input file that contains all the information about users and tweets.  The format of the file and an example that illustrates the format are shown below.

**File Format**

```
number_of_users
username following_username ... following_username
...
username following_username ... following_username
timestamp username tweet_text
timestamp username tweet_text
...
timestamp username tweet_text
```

**Illustrative Example (`twitter.dat`)**

```
4
Mark Tommy Jill
Tommy Jill Sam
Jill Sam
Sam Mark Tommy
2019-05-20 12:35:14 Mark #Selma was an excellent movie to remember the struggle for civil rights
2019-05-19 12:35:15 Jill Can't wait for USC football to start #pac12 #football
2019-05-20 00:56:34 Jill Is UCLAs version of TroGro named WhatsBrew'n #punny
2019-05-21 10:30:27 Sam @Mark when is the next World Cup? #football
```

Here Mark is following Tommy and Jill; Tommy is following Jill and Sam; and so on...

Note: A blank line will not occur in the Users section (i.e. the number you parse on the first line, must then be followed by exactly that number of lines with user info).  However, a blank line encountered in the tweets section (i.e. everything after the users) should just be skipped and processing should continue.  

**You do not need to recover from input stream failure resulting from any format errors. So if at anytime your input stream fails due to an unexpected format error, you are free to quit the program**. (You'll notice `TwitEng::parse()` returns a bool which, if true, indicates an error occurred and allows the overall program to simply quite.)    


Part of this assignment will be to produce one output file per user with the filename `username.feed` (e.g. `Mark.feed`, `Tommy.feed`, etc.).  The requirements for your feed outputs are:

  1. list the username on the first line
  1. Then list all the tweets from the user as well as any **users being followed** (i.e. if this is Mark's feeds then we should show any tweets from Tommy or Jill. 
  1. List the tweets in sorted order from more recent to least recent
  
Thus, the file above should yield the following feeds:

**Mark.feed**

```
Mark
2019-05-20 12:35:14 Mark #Selma was an excellent movie to remember the struggle for civil rights
2019-05-20 00:56:34 Jill Is UCLAs version of TroGro named WhatsBrew'n #punny
2019-05-19 12:35:15 Jill Can't wait for USC football to start #pac12 #football
```

**Tommy.feed**

```
Tommy
2019-05-21 10:30:27 Sam @Mark when is the next World Cup? #football
2019-05-20 00:56:34 Jill Is UCLAs version of TroGro named WhatsBrew'n #punny
2019-05-19 12:35:15 Jill Can't wait for USC football to start #pac12 #football
```

**Jill.feed**

```
Jill
2019-05-21 10:30:27 Sam @Mark when is the next World Cup? #football
2019-05-20 00:56:34 Jill Is UCLAs version of TroGro named WhatsBrew'n #punny
2019-05-19 12:35:15 Jill Can't wait for USC football to start #pac12 #football
```

**Sam.feed**

```
Sam
2019-05-21 10:30:27 Sam @Mark when is the next World Cup? #football
2019-05-20 12:35:14 Mark #Selma was an excellent movie to remember the struggle for civil rights
```

Note:  These feeds should be generated by `TwitEng::dumpfeeds()`.

**Your program must meet this output format or you will lose significant points as this helps our grading scripts!**

Notice that the tweets are listed in sorted order (newest to oldest) based on the timestamp.  You should use the `User::getFeed()` function to get the tweets for each User's feed.  This function returns a `vector<Tweet*>`.  To sort its contents you can use the std::sort algorithm provided in the `<algorithm>` library.  Call it like this:

`sort(myfeedvec.begin(), myfeedvec.end(), TweetComp());`

The `TweetComp()` will allow the `sort()` function to not compare the `Tweet` pointers but the `DateTime` contents of each tweet. It will also put the tweets in order from latest to earliest.

### Step 3 (User Interface, Hashtag Index, and Search)

The user interface should support **FOUR commands** (we may add more later): `AND` (search), `OR` (search), `TWEET`, and `QUIT`.  Information is provided about each below.

#### AND, OR Searches

We now want to add the ability to search tweets by hashtags.   Once the program starts, allow the user to search for tweets that match a given set of hashtags or quit and write the feeds.  Support both an `AND` and `OR` search strategy.  In an `AND` search the user may provide any number of hashtags and see which tweets match **ALL** of those hashtags.  An `OR` search should yield any tweet that matches **ANY** of the provided hashtags. These correspond to the set intersection and set union operations, respectively.  By writing some global-scoped functions to compute the intersection or union of two input sets of Tweets and returning the resulting set, you should be able to compute the `AND` and `OR` search results for any number of search terms, easily and elegantly.

You should sort the results of `AND` and `OR` searches in the same way as you sort the feeds that you create upon quitting. Logic to do this has ALREADY been provided in `util.h/.cpp` in the `displayHits()` function.  You **MUST** use that function to display the results of your searches.

This search should also be efficient. If the search query contains `k` terms then the search should run in **in time O(k * log n) where n = number of hashtags used in the system**  (at the cost of some memory storage).  You may assume that the number of tweets matching any single hashtag is a constant (or at least MUCH less than n).  So if there is an average of T tweets that contain any particular hashtag, you can assume that O(T * k *log n) = O(k * log n).  

**To achieve this, you should keep an index of each hashtag term used in the entire system with the tweets that match them.** Then using set intersections and unions, your code for searches can be fairly elegant and simple.

Note: Hashtags should be case insensitive.  Think of a way to store them such that users searching for a hashtag #fun will match any of #FUN, #Fun, #FuN, etc.


#### QUIT

When the user types QUIT the **feed files should be generated** and include any new tweets that have been added during the interactive user session.

#### TWEET - Adding a Tweet

When a user adds a tweet with the `TWEET` command, you should use the local system time as the timestamp.  You can query the computer system for the current data and time and convert it to your `DateTime` object. It's a bit complicated to extract the current day/time in C++ (other languages give a much cleaner library function to do this) but you are welcome to use the code provided below which populates a `tm` struct (you need to `#include <ctime>`) which you can lookup online to find how to extract the fields you need.

```c++
  // Be sure you #include <ctime>
  
  time_t rawtime;
  struct tm * timeinfo;
  
  time (&rawtime);
  timeinfo = localtime(&rawtime);
  
  // Use timeinfo pointer to access fields of the tm struct
```

See [this link](http://www.cplusplus.com/reference/ctime/tm/).

Note that `time` and `localtime` will likely return GMT on Docker since we haven't configured a timezone.  It should not be a problem for grading and probably is not worth trying to re-configure the Dockerfile.

Finally, when the user inputs a new tweet from the menu, simply **IGNORE** the command if the tweet is **formatted incorrectly** OR the username provided is **not valid**.  Note that we allow a tweet's text to be blank (i.e.) `TWEET <username>`. This would result in a tweet with the current system time but an empty string as the contents.  It may not be ideal, but it should save you error-checking cases.  Also be sure to **remove whitespace** from the start or end of the tweet text (see notes below on Parsing).

Provide your user a menu system and respond after each command with the desired outputs. 

So when you run the program as:

`$ ./twitter twitter.dat`
 
A sample run should look like this:

```
=====================================
Menu:
  AND term term ...
  OR term term ...
  TWEET username tweet_text
  QUIT (and write feed files)
=====================================

Enter command:
OR football selma
3 matches:
2019-05-21 10:30:27 Sam @Mark when is the next World Cup? #football
2019-05-20 12:35:14 Mark #Selma was an excellent movie to remember the struggle for civil rights
2019-05-19 12:35:15 Jill Can't wait for USC football to start #pac12 #football

Enter command:
AND football selma
No matches.

Enter command:
TWEET Mark Treat CS104 right #summerfun

Enter command:
AND summerfun
1 matches:
2019-06-06 09:54:48 Mark Treat CS104 right #summerfun

Enter command:
OR summerfun
1 matches:
2019-06-06 09:54:48 Mark Treat CS104 right #summerfun

Enter command:
QUIT
```

#### Menu System and Command Processing and Polymorphism

`main()` is defined in `twitter.cpp`. This file **should NOT be altered**.  To process commands from the user, we use a polymorphic approach.  We have provided you a base class `Handler` in `handler.h` and `handler.cpp`.  This class defines a `handle` function which will invoke virtual helper functions (that are protected) to see if the derived class a.) can process this kind of command and if it can, b.) actually process (carry-out) the desired command.  This approach uses a common design pattern for object-oriented programming called **"chain of responibility"**.  A great website to read more about this and other design patterns is [sourcemaking.com](https://sourcemaking.com/design_patterns/chain_of_responsibility).

We have already written one derived class to process the `QUIT` command in `cmdhandler.h` and `cmdhandler.cpp`.  Use that as a guide for writing classes for the `AND`, `OR`, and `TWEET` command. You can put all the classes in the same file (`cmdhandler.h` and `cmdhandler.cpp`). If you look at the `handle()` function you will see its signautre is:

```c++
HANDLER_STATUS_T handle(TwitEng* eng, const std::string& cmd, std::istream& instr) const;
```

We will pass in the twitter engine so you have access to all of its public functionality, `cmd` is the identifier of the command (i.e. `AND`, `OR`, `TWEET`, and `QUIT`), and `instr` is the input stream from which you can read in the remaining, expected arguments for the specific command (e.g. search terms, etc.)

We included this design approach so you can see how it can make processing cleaner.  If you look at `twitter.cpp` you'll notice the loop to process commands is very simple and straightforward.  In addition, we achieve more loose coupling because now we can add support for new commands by simply writing a new derived `Handler` class and instantiating it and adding it to the chain.  Nothing in `main()` would need to change.  Spend some time to understand how this is chain-of-responsibility design works and consider its benefits. If you have any questions, please talk to your instructor or TA.


To repeat, **you may NOT** change `twitter.cpp` and need to use this `Handler` design pattern by deriving new classes: `AndHandler`, `OrHandler`, and `TweetHandler`.  `handler.h`, `handler.cpp`, and `cmdhandler.h` are **complete** and need not be altered.  You will need to modify and add to `cmdhandler.cpp` where you can put the implementation of the various CmdHandler derived classes.

Note that we have created an enumerated type for return status from command handlers.  

```
	/** 
	 * Return status options from process()
	 * 	 HANDLER_OK    = successful and processing should continue
	 *   HANDLER_QUIT  = successful and processing should stop / program should quit
	 *   HANDLER_ERROR = an error occurred but processing can continue
	 *   HANDLER_KILL  = an error occurred and the program should halt immediately
	 */
	enum HANDLER_STATUS_T {HANDLER_OK = 0, HANDLER_QUIT, HANDLER_ERROR, HANDLER_KILL};
```

 - `HANDLER_KILL` is returned by the primary `handle()` in the provided `handler.cpp`. It need not be used elsewhere as no other command can fail in such a way once `handle()` has read the first command word.

 - `HANDLER_OK`  will be returned when no parse errors occurred. By definition, `AND` and `OR` searches cannot fail as any text might be a valid hashtag and when no further text is provided after `AND` or `OR` your code should handle that normally by just returning an empty set. 

 - `HANDLER_ERROR` may be returned when processing a `TWEET` command if there is a parse error in note enough information is provided, the date/time is not present or in an unexpected format, or the user does not exist. This might also be returned by subsquent commands added in future parts of the homework.

 - `HANDLER_QUIT` should be returned by the `QUIT` handler. 

### Step 4 (Write a Makefile)

You will need to complete the provided `Makefile`.  Ensure each source code file (`.cpp` file) has an appropriate rule written with all dependencies listed and then the final executable is produced. A change in any source code file (`.h` or `.cpp`) should cause recompilation of only the files dependent on that source file.

### Other Notes

#### Circular Dependencies

You'll notice that class `User` and class `Tweet` each store pointers to the other.  If we simply try to `#include "user.h"` in `tweet.h` and `#include "tweet.h"` in `user.h` we will have a circular dependency of `#includes` (i.e. `user.h` will try to include `tweet.h` which will try to include `user.h` which will...).  Because we only use **pointers** to those types in the header files, we can simply provide a **forward declaration** such as `class User;` in `tweet.h` which tells the compiler there will be a class User defined, we don't know any of its specifics and thus can't access any members, but can allow pointer declarations.  We can do the same in `user.h`.  This breaks the circular dependency of includes.  

Then, **and importantly** once the classes are declared in the respective header files, we can #include **BOTH** `.h` files in both `user.cpp` and `tweet.cpp`.   So to summarize:  
  - Do **NOT** include `tweet.h` in `user.h` or vice versa
  - **DO** include `tweet.h` and `user.h` in each of the respective `.cpp` files.

#### Parsing

Hopefully you learned how to do basic file I/O and parsing in your earlier programming course(s).  We recommend reading line by line (using `getline`) from an `ifstream` and then placing the resulting line of text into a `stringstream` if needs to be further parsed and data extracted.  Remember, after you attempt to extract any data from a stream you can check if it failed by calling the `.fail()` function.

Depending on where you use `getline` white spaces on the front or back of a string may be preserved. We have provided a `trim` function in the `utils.h/cpp` files that will remove whitespace from either end of the string.  Those files also provide functions to convert the letters in a string to upper or lower case.

### Testing

To test your program's correctness, you can perform various searches and compare the result to what you can easily compute as the correct results for a small database just by your own inspection.  However, we also provide a **compiled** solution executable, `twitter_solution`.  By running that executable on the SAME input or searches and comparing the output to your own (e.g. the feed files), you can verify your program or just see what should happen under various input scenarios.

You can run it exactly the same way (other than the name) as your program:

```bash
./twitter_solution twitter.dat
```

**Note**: The compiled solution only runs on x86 processors running Ubuntu (i.e. Docker or our course VM).