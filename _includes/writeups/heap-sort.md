### Problem 6 (Implement Heap Sort, 20%)

Write your own template **function** (*NOT CLASS*) implementation, `hsort(...)`  of the HeapSort algorithm that works with any class `T`.  Put your implementation of  `hsort(...)`  in a file `hsort.h`. It **must run in O(n log(n))**.  Failure to ensure your program has O(n log(n)) runtime will lead to **at most half-credit** for this part of your assignment. Also, you must perform the sorting **in-place** (no 2nd array).   Use the approach shown in lecture of converting the array to a heap and then popping items from the heap and placing them at the back of the array and then reverse the array in linear time at the end.

Your `hsort()` function should take in a vector.  Your Heap sort algorithm should also take a comparator object (i.e., functor) that has an operator() defined for it. 

```c++
template <typename T, typename Comparator >
void hsort(std::vector<T>& data, Comparator c = Comparator())
```

We recommend you define a helper function `heapify` to help with the process of converting the array to a heap and popping elements.  

```c++
// heapify() helper function
// loc - Location to start the heapify() process
// effsize - Effective size (number of items in the vector that
//           are part of the heap). Useful for performing heap-sort in place.
template <typename T, typename Comparator >
void heapify(std::vector<T>& data, size_t loc, size_t effsize, Comparator& c )
```

Passing a comparator allows you to change the sorting criterion by passing in a different Comparator object.  Feel free to use `std::less<T>` and `std::greater<T>` for testing.

You should test your code by writing a simple program that initializes a vector with data and finally calls your `hsort()` function with different comparison functors.  You should be able to produce different orderings based on your functors.

Again do NOT define a class, just standalone functions.  You should not use `std::sort` or `std::make_heap` or other `heap` functions from `<algorithm>`. 

### Problem 7 (Replace Tweet sorting with your Heap Sort, 2%)

When displaying your feeds (main or mentions feeds) or search hits, we asked you to output the tweets in sorted order based on date/time from newest to oldest.  If you were able to get your heapsort algorithm working above, **now try to replace all calls to `std::sort(...)`with calls to your own `hsort` code to perform the sorting operation.**  Note: That `hsort` just takes the vector while `std::sort` took iterators as arguments, but you should easily be able to modify your code to work with `hsort`.