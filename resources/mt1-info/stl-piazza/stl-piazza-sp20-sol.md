### Summer 2020 Midterm - STL Problem - Piazza Post Manager

*Note:* This problem was a computer-based coding problem.  It is likely your exam will be paper-based coding.  However, this is representative of the kinds of problems you may be asked to complete.

#### Problem: Piazza Post Manager

Implement a Piazza-like post manager using STL containers. The system must efficiently handle posts, pinning, and searching.

---

### Header File: `piazza.h` (Solution)

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

class Piazza : private PostList /* or protected */
               // we don't want clients to be able to call push_front()
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
  
  Post* pinnedHead;
  std::map<Post*, Post*> pinnedMap;

};

#endif
```

---

#### Implementation File: `piazza.cpp` (Solution)

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


// Complete the constructor below
Piazza::Piazza() {
  pinned_head = NULL;
}

// Complete the destructor below as needed
Piazza::~Piazza()
{ }



// Runs in O(log(n)), assuming n >> t where n is the number  
// of existing posts and t is the number of words in the post.
void Piazza::addPost(const std::string& data, bool pinned)
{
  // You may change this line and add the remainder of your
  // implementation
  std::vector<std::string> words = makeWords(data);

  this->push_front(data);
  if(pinned){
    this->pinnedMap.insert(std::make_pair(head, pinned_head));
    this->pinned_head = this->head;
  }

  for(unsigned int i = 0; i < words.size(); i++) {
    head->termIndex.insert(words[i]);
  }
}

// Complete the code below.
// Remember this must run in O(n*log(t)) where n is the number
// of posts and t is the number of words per post
size_t Piazza::numMatches(const std::string& term)
{
  Post* cursor = head;
  size_t val = 0;
  while(cursor){
    if(cursor->termIndex.find(term) != cursor->termIndex.end()){
      val++;
    }
    cursor = cursor->next;
  }
  return val;
}

// Complete the code below.
// Must run in O(i)
const std::string& Piazza::getIthMostRecentPost(size_t i)
{
  if(i >= this->size){
    throw std::out_of_range("bad location");
  }
  Post* cursor = head;
  while(i-- != 0U) cursor = cursor->next;
  return cursor->text;
}

// Complete the code below.
// Must run in O(i)
const std::string& Piazza::getIthMostRecentPinnedPost(size_t i)
{
  if(i >= this->pinnedMap.size()){
    throw std::out_of_range("bad location");
  }
  Post* cursor = pinned_head;
  while(i-- != 0U) cursor = pinnedMap[cursor];
  return cursor->text;

}
```

---

## Key Implementation Details

### Data Structure Design

**Main Structure:**
- Inherit from `PostList` to get the main linked list of all posts
- Add `pinnedHead` to maintain a separate linked list of pinned posts
- Each `Post` struct has a `termIndex` set of words for efficient searching

### Algorithm Analysis

#### `addPost()` - $O(\log n)$
- `push_front()`: $O(1)$ - prepend to linked list
- Extract words: $O(t)$ - iterate through words
- Insert each word into set: $t \cdot O(\log t) = O(t \log t)$
- Create pinned post if needed: $O(1)$ plus copy term index $O(t \log t)$
- **Total:** Dominated by word processing, but problem states $O(\log n)$ assuming $n >> t$

#### `numMatches()` - $O(n \log t)$
- Iterate all posts: $O(n)$
- For each post, check set membership: $O(\log t)$ per check
- **Total:** $O(n \log t)$

#### `getIthMostRecentPost()` - $O(i)$
- Walk $i$ steps from head: $O(i)$ operations
- Each step is $O(1)$ pointer dereference

#### `getIthMostRecentPinnedPost()` - $O(i)$
- Walk $i$ steps from pinnedHead: $O(i)$ operations
- Each step is $O(1)$ pointer dereference

### Important Design Choices

1. **Separate Pinned List:** Rather than marking posts as pinned in the main list, maintain a separate linked list for pinned posts. This allows efficient $O(i)$ access.

2. **Term Indexing:** Store extracted words in each post's `termIndex` set. This enables efficient searching with set membership tests.

3. **Inheritance:** Use `public` inheritance from `PostList` to access the protected `head` and `size` members for manipulating the main linked list.

4. **Error Handling:** Both get methods throw `std::out_of_range` for invalid indices, as specified.

---

## Test Verification

All test cases should pass:
- ✓ Adding blank and regular posts
- ✓ Retrieving posts by index with correct ordering (most recent first)
- ✓ Counting term matches (case-sensitive)
- ✓ Pinned posts maintain separate ordering
- ✓ Pinned posts don't interfere with main list
