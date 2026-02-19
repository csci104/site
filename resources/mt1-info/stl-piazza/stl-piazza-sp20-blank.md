---
layout: default
title: Midterm 1 Info
nav: Resources
---

### Summer 2020 Midterm - STL Problem - Piazza Post Manager

*Note:* This problem was a computer-based coding problem.  It is likely your exam will be paper-based coding.  However, this is representative of the kinds of problems you may be asked to complete.

#### Overview
In this problem, you will complete a class to model a Piazza-like system of "posts", some of which can be "pinned" and which can be searched quickly to see if they contain a particular term/word. 

#### Classes and Your Task
We have provided a `Post` object that can be used to store the text of the post and, potentially other information of your choice, and act as a single item in a linked list. 

Furthermore, we have implemented a rudimentary `PostList` that provides code to implement a simple linked list of `Post`s.  **You must use this class in the implementation of the `Piazza` class below.**

Your task is to implement the `Piazza` class.  This class **inherits from `PostList`** (you should determine the kind of inheritance). This class implements the notion of a *pinned* post which is a subset of the overall list of posts.  In addition, the user can query how many posts contain a particular word/term.  This query should be performed efficiently (see the runtime requirements in the header file.) 

Complete the `Piazza` class (in `piazza.h` and `piazza.cpp`) by choosing the kind of inheritance, adding data members, specifying any inheritance relationship, implementing the public functions according to the requirements and run-time limits provided in the comments in the header file, and adding any private helper functions you wish. You may add data members to the `Post` struct as you deem useful.

Public operations of the `Post` class include:

  + Adding a Post (via the provided input string).
  + Determining how many posts contain a given (single)word.  **To make your life easier, you may perform case-sensitive searches** so that no extra processing is needed.
  + Retrieving the `i`-th **most recent** overall post (either pinned or non-pinned).
  + Retrieving the `i`-th **most recent pinned** post.

You do not have to support removal/deletion of posts.

You may use `std::vector`, `std::set`, and `std::map`. You may not use `std::list`. If you want a linked-list you will need to write code to manage it yourelf.  (That doesn't mean you should write a list class but can just embed code to manage a linked list...and you may define new structs).

Again, the specifics of each post are listed in the documentation/comments in the header file.  **You must meet these requirements including the run-time requirements listed.**

#### Running and Testing your Code

We have provided a `Makefile` with a `make test` rule that will compile your code and run a few unit tests define in `piazza-tests.cpp`.  You are welcome to add to this file as you see fit.

---
## Header File: `piazza.h`

```cpp
#ifndef PIAZZA_H
#define PIAZZA_H
#include <string>
#include <iostream>
#include <sstream>
#include <vector>
// You may add additional headers here
#include <map>
#include <set>


// A single post that can form a linked list
struct Post {
  Post(const std::string& val, Post* nxt) : text(val), next(nxt)
  {}
  
  std::string text;
  Post* next;
  // You may add other data members here (recall they are public)
  std::set<std::string> termIndex;
};

// A linked list of posts with limited capabilities
// You MAY NOT ALTER THIS CLASS. IT IS COMPLETE.
class PostList {
 public:
  PostList() { size = 0; head = NULL; }
  ~PostList() {
    while(head) { Post* cursor = head->next; delete head; head = cursor; }
  }
  void push_front(const std::string& val){
    head = new Post(val, head);
    size++;
  }
 protected:
  size_t size;
  Post* head;
};

//
// You may choose the kind of inheritance and/or data members of this class
// as well as adding private helper functions if you so choose.

class Piazza : /* <choose kind of inheritance */ PostList
{
 public:
  Piazza();  // Constructor
  ~Piazza(); // Destructor - Clean up any necessary memory

  /// Adds a new post with the given string and performs any preprocessing
  /// necessary to support case-sensitive searches for individual words.
  ///  @param[in] data - text of the post to add
  ///  @param[in] pinned - true if this post should be pinned
  /// Assuming n >> t, runs in O(log(n)) where
  /// n is the number of existing posts and t is the average words per post 
  void addPost(const std::string& data, bool pinned);

  /// Returns the number of posts that contains the given term in their index.
  /// To make your life easier, you may perform case-sensitive searches
  ///  so that no extra processing is needed.
  /// Runs in O(n*log(t)) where n is the number of posts and t is the number
  ///  words in each post.
  size_t numMatches(const std::string& term);
  
  /// Returns the text of the i-th most recent post (includes all posts,
  /// pinned or not).  Indexing is 0-based, so i=0 indicates the most
  /// recent post. If i is an invalid index, throw std::out_of_range.
  /// Runs in O(i) where is is the input argument.
  const std::string& getIthMostRecentPost(size_t i);
  
  /// Returns the text of the i-th most recent pinned post (and does
  /// not include non-pinned posts. Indexing is 0-based, so i=0
  /// indicates the most recent pinned post. 
  /// If i is an invalid index, throw std::out_of_range.
  /// Runs in O(i) where is is the input argument.
  const std::string& getIthMostRecentPinnedPost(size_t i);

 private:
  // Add appropriate data members
  // You may use `std::vector`, `std::set`, and `std::map`.
  // You may not use `std::list`. If you want a linked-list you will
  // need to use code provided or write code to manage it yourelf.

};

#endif
```

---

## Implementation File: `piazza.cpp` (Blank)

```cpp
#include "piazza.h"
using namespace std;

// Helper function to convert a string of text to individual words
std::vector<std::string> makeWords(const std::string& s)
{
  std::vector<std::string> words;
  std::stringstream ss(s);
  std::string temp;
  while(ss >> temp){
    words.push_back(temp);
  }
  return words;
}

// Complete the constructor below as needed
Piazza::Piazza()
{

}

// Complete the destructor below as needed
Piazza::~Piazza()
{

}

// Runs in O(log(n)), assuming n >> t where n is the number  
// of existing posts and t is the number of words in the post.
void Piazza::addPost(const std::string& data, bool pinned)
{
  // You may change this line and add the remainder of your
  // implementation
  std::vector<std::string> words = makeWords(data);



  
}

// Complete the code below.
// Remember this must run in O(n*log(t)) where n is the number
// of posts and t is the number of words per post
size_t Piazza::numMatches(const std::string& term)
{

}

// Complete the code below.
// Must run in O(i)
const std::string& Piazza::getIthMostRecentPost(size_t i)
{

  
}

// Complete the code below.
// Must run in O(i)
const std::string& Piazza::getIthMostRecentPinnedPost(size_t i)
{

  
}
```

---

## Test File: `piazza-tests.cpp`

```cpp
#include "piazza.h"
#include <string>
using namespace std;

#include <gtest/gtest.h>


/*
 * Nominal test with values before and after defined range
 */
TEST(PiazzaNominal, AddBlankRegularPost)
{
  Piazza p;
  EXPECT_NO_THROW(p.addPost("", false));
}
TEST(PiazzaNominal, AddBlankPinnedPost)
{
  Piazza p;
  EXPECT_NO_THROW(p.addPost("", true));
}
TEST(PiazzaNominal, AddRegularPost)
{
  Piazza p;
  EXPECT_NO_THROW(p.addPost("word1", false));
}
TEST(PiazzaNominal, AddRegularPinnedPost)
{
  Piazza p;
  EXPECT_NO_THROW(p.addPost("word1", true));
}
TEST(PiazzaNominal, AddAndGetPosts)
{
  Piazza p;
  p.addPost("hello there", false);
  EXPECT_NO_THROW(p.getIthMostRecentPost(0));
  EXPECT_EQ("hello there", p.getIthMostRecentPost(0));
  p.addPost("bye bye", false);
  EXPECT_NO_THROW(p.getIthMostRecentPost(0));
  EXPECT_NO_THROW(p.getIthMostRecentPost(1));
  EXPECT_EQ("bye bye", p.getIthMostRecentPost(0));
  EXPECT_EQ("hello there", p.getIthMostRecentPost(1));
  p.addPost("nope yep hello", false);
  EXPECT_NO_THROW(p.getIthMostRecentPost(0));
  EXPECT_NO_THROW(p.getIthMostRecentPost(1));
  EXPECT_NO_THROW(p.getIthMostRecentPost(2));
  EXPECT_EQ("nope yep hello", p.getIthMostRecentPost(0));
  EXPECT_EQ("bye bye", p.getIthMostRecentPost(1));
  EXPECT_EQ("hello there", p.getIthMostRecentPost(2));

}

TEST(PiazzaNominal, NumMatches)
{
  Piazza p;
  p.addPost("hello there", false);
  p.addPost("bye bye", false);
  p.addPost("nope yep hello", false);
  EXPECT_EQ(2, p.numMatches("hello"));
  EXPECT_EQ(0, p.numMatches("Hello"));
}

TEST(PiazzaNominal, PinnedPosts)
{
  Piazza p;
  p.addPost("hello there", true);
  p.addPost("bye bye", false);
  p.addPost("nope yep hello", true);
  // Check that only the appropriate elements are in the pinned list
  EXPECT_EQ("nope yep hello", p.getIthMostRecentPinnedPost(0));
  EXPECT_EQ("hello there", p.getIthMostRecentPinnedPost(1));
  // Ensure the pinned list didn't interfere with the primary list
  EXPECT_EQ("nope yep hello", p.getIthMostRecentPost(0));
  EXPECT_EQ("bye bye", p.getIthMostRecentPost(1));
  EXPECT_EQ("hello there", p.getIthMostRecentPost(2));

}
```

---

## Makefile

```makefile
BINDIR := bin

CXX := g++
CXXFLAGS := -g -Wall -std=c++11

VALGRIND := valgrind --tool=memcheck

GTEST_CXXFLAGS := -I /usr/include/gtest/
GTEST_LDFLAGS := -l gtest_main -l gtest -pthread

all: test

# Create binary dir
$(BINDIR)/.dirstamp:
	mkdir -p $(BINDIR)
	touch $(BINDIR)/.dirstamp

# provided test executable
piazza-tests: $(BINDIR)/piazza-tests.o $(BINDIR)/piazza.o 
	$(CXX) $(CXXFLAGS) $^ $(GTEST_LDFLAGS) -o $@

# $(BINDIR)/piazza-test-functions.o

# grading test executable
piazza-grading-tests: $(BINDIR)/piazza-grading-tests.o $(BINDIR)/piazza.o 
	$(CXX) $(CXXFLAGS) $^ $(GTEST_LDFLAGS) -o $@

#$(BINDIR)/piazza-test-functions.o

# provided test using solution executable
piazza-tests-sol: $(BINDIR)/piazza-tests.o $(BINDIR)/piazza-sol.o 
	$(CXX) $(CXXFLAGS) $^ $(GTEST_LDFLAGS) -o $@

#$(BINDIR)/piazza-test-functions.o

# grading test using solution executable
piazza-grading-sol: $(BINDIR)/piazza-grading-tests.o $(BINDIR)/piazza-sol.o 
	$(CXX) $(CXXFLAGS) $^ $(GTEST_LDFLAGS) -o $@

# $(BINDIR)/piazza-test-functions.o

# generic rule for .cpp files
$(BINDIR)/%.o : %.cpp $(BINDIR)/.dirstamp
	$(CXX) -c $(CXXFLAGS) $(GTEST_CXXFLAGS) $< -o $@

# student test target
test: piazza-tests
	$(VALGRIND) ./piazza-tests

# grading test target
grade: piazza-grading-tests
	$(VALGRIND) ./piazza-grading-tests

# header dependencies
$(BINDIR)/piazza-tests.o:  piazza.h
$(BINDIR)/piazza-grading-tests.o:  piazza.h
$(BINDIR)/piazza.o: piazza.h
$(BINDIR)/piazza-sol.o: piazza.h
#$(BINDIR)/piazza-test-functions.o: piazza-test-functio.h piazza.h

# clean
clean:
	rm -rf $(BINDIR) piazza-tests piazza-grading piazza-tests-sol piazza-grading-sol

.PHONY: test grade clean
```

---

### Constraints:
- May use: `std::vector`, `std::set`, `std::map`
- Cannot use: `std::list`
- Must respect the provided `PostList` class (public interface only)
- Maintain the runtime complexities specified
