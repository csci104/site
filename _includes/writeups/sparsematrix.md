
Be sure you copy over all the skeleton files in `resources/hw1` that start with `spmat` to your `hw-username/{{page.hwpath}}` folder as well as the `Makefile`.

In this problem you will apply and deepen your linked list programming skills by creating a **sparse matrix** (ie. 2D array) of `double`s.  


### Background

A **sparse matrix** is one where the majority of entries are `0`.  Due to this characteristic, we can save memory (and potentially time) by **only storing non-zero entries**. One approach to doing this is to use linked lists to only store the **non-zero cells**. Since we do not have an entry at every row/column index, each cell must store the row/column coordinates to which it corresponds along with its data value and necessary linked list pointers.  So that we can scan quickly down either a row or a column we will choose to make each cell a member of two linked lists:  a row linked list and a column linked list.  Each list is a doubly-linked list to support faster insertions and removals. (*You may wish to spend a moment considering why a singly-linked list would make insertion/removal less efficient*).  Thus the overall sparse matrix would resemble the diagram below for a **4x4** matrix.  Notice, there is an array of head pointers for the row lists on the far left and another array of head pointers for the column lists on the top.

<img src="{{site.baseurl}}/homework/img/spmat1.png" alt="" width="100%"/> 

### Provided Implementation

Much of the skeleton has been provided to you and you will need to provide the implementation of several of the key member functions.   Please review it as you read this description. 

We first use a simple `Coord` struct with a `row` and `col` member to track where entries belong in the 2D matrix. Next, we create a `SparseItem` struct to hold each non-zero cell's data and, finally, a `SparseMatrix` class to model the entire matrix.  The matrix can be of size `n` x `n` where `n` is provided when the `SparseMatrix` is constructed.  Since, we have both row and column lists, we need to store the head pointers for the `n` rows and the `n` columns (for a total of `2*n` head pointers) by using an array for each set of head pointers.

The header file is provided and is **complete**.  **You should not alter the public interface** but may add private helper functions if you desire and potentially other data members (though this is not recommended and should likely be discussed with a course staff to see if there is a good alternative). 

A few nested types have been defined to help with the implementation of the `SparseMatrix`:

 - `Coord` and `SparseItem` are declared as nested types inside `SparseMatrix` meaning non-member code will need to scope the type (e.g. `SparseMatrix::Coord`).
 - `Dim` is an **enumerated** type which simply assigns integer values to symbolic names (as if you had written `const int ROW = 0` and `const int COL = 1`, etc.)  The *row* list of head pointers, row coordinate, and `next`/`prev` pointers for the row list are **all at index 0** and thus we can use `ROW` rather than writing `0`.  Similarly, the *column* list of head pointers, column coordinate, and `next`/`prev` pointers for the column list are **all at index 1** and thus we can use `COL` rather thant writing `1`.  **Helpful Hint:**  Given a dimension index, `dim` (0=ROW, 1=COL), you can convert to the other dimension index with the expression `1-dim`.

#### Provided Functions

We have provided the following **completed** functions which you should **NOT** alter.
 - `SparseMatrix::Coord::Coord(size_t row, size_t col)` constructs `Coord` objects

 - `SparseMatrix::SparseItem::SparseItem(Coord coord, double v)` constructs `SparseItem` objects

 - `double SparseMatrix::get(const Coord& coord) const` will return the value at the given Coordinate.

 - `void SparseMatrix::print(std::ostream& ostr) const` will output the matrix in a 2-dimensional format to the provided `ostream`

 - `SparseMatrix::SparseItem* SparseMatrix::lowerBound(size_t list, Coord target_coord ) const` can be used to find the `SparseItem` with the given "target" coordinates by iterating through either the ROW(0) or COL(1) list.  If no `SparseItem` with the given coordinates exists in the specified list, either the Item that would come **before** the given coordinates will be returned, or `nullptr` if the list is empty of the target coordinate would come before the first item in the list.

#### Additional Learning: Exceptions

Errors happen in programming. We receive unexpected or illegal inputs or arguments or we reach a state that we cannot handle. In those cases we can take some action like returning a specific value, but in some cases, based on the function signature, that may be impossible. An alternate approach is exceptions.

You should learn about exceptions by watching the [provided lecture video](http://ee.usc.edu/~redekopp/Streaming/cs104/cs104-exceptions/cs104-exceptions-proj.html) and reading online or in the textbook.

- In this homework, you do not need to catch any exceptions.
- However, we will ask you to throw certain exceptions in the following problem.  You can just use an appropriate `throw` statement.  Look in the skeleton code documentation for where/when to throw an exception.

### Your Task

Study the class definition in the header file and the functions already implemented in the `.cpp` file.  Use that code to understand how to interact with the head pointer lists, `SparseItem`s, etc. and then implement the remaining functions (listed below).  Note: You **MUST** adhere to the requirements of each function provided in the header file documentation.  **Failure to do so may result in no credit**.

#### To be Implemented

For the `SparseMatrix` class, you will need to complete the following operations:

 - `size_t& SparseMatrix::Coord::operator[](size_t index)` (both const and non-const versions) which are easy accessors to retrieve either the `r` member if `index` is `0` (or `ROW`) or the `c` member if index is `1` (or `COL`).
 - `bool SparseMatrix::Coord::operator==(const Coord& rhs) const` to compare `Coord` objects if necessary 
 - `SparseMatrix(size_t n)` constructor should allocate memory for the arrays of head pointers and intiailze them as well as other data members
 - `~SparseMatrix()` destructor should deallocate all memory correctly without leaks
 - `set(coord, val)` should set the cell with given `coord` coordinates to the value, `val`.  If the cell at the given coordinates does not exist (i.e. it is currently `0`), create and insert the new cell provided the value is not zero.  If the cell at the given coordinates does exists, update its value unless the value is 0 in which case the cell should be removed from the lists. Attempting to set a non-existent cell (i.e. that is already implicitly 0) with an explicit value of 0 should simply have no effect.  Read and comply with the corresponding header file description of exception cases to handle.  Ensure no memory is leaked.  This will likely be one of the more difficult functions to implement. Consider how `lower_bound()` can be used to help find the location to insert a new cell, if necessary.  Also, note that you should call `createSparseItem` to dynamically allocate a `SparseItem` rather than using `new` yourself.  This aides the DebugHelper described later on to verify your implementation.
 - `double sumDim(const Coord& coord) const` returns the sum of the values in the specified dimension. Exactly one of the row or column coordinates must be `SparseMatrix::npos`. For example, a `Coord` of `{SparseMatrix::npos, 2}` specifies all entries in column 2 should be summed.
 - `void copyDim(size_t srcCoord[], size_t destCoord[])` copies one row or column to another (may be a transpose...row to column or vice versa).  Each argument should have exactly one of the row or column coordinates be `SparseMatrix::npos`.  For example, `copyDim({5,SparseMatrix::npos}, {SparseMatrix::npos,3})` would copy row 5 to column 3.
 
**Private Helper function**
 - `void deleteNode(SparseItem* node)` should delete the specified node from both the row and column lists of which it is a member.  You must leave the provided code at the end of this function that updates the DebugHelper and performs the actual memory free by calling `delete`.

 - `SparseMatrix::npos` is a **static** constant member (meaning all instances of `SparseMatrix` share that one definition of `npos`. You must initialize it at the top of `spmat.cpp`.  It should be initialized to the largest possible unsigned value which can easily be done by setting it to `(size_t)-1;` since `-1` is all 1s in binary and will be the largest unsigned value when **cast to an unsigned type**.  You should use `npos` as the value for the unused dimension in calls to `sumDim` and `copyDim`.  This value is patterned from the constant defined in `std::string` (really `std::basic_string`) with the same name.  Info about its use is [here](http://www.cplusplus.com/reference/string/string/npos/)


### Example

Suppose we create the following 4x4 `SparseMatrix` (`n=4`):

<img src="{{site.baseurl}}/homework/img/spmat1.png" alt="" width="100%"/> 

If we then perform a **set** operation on coordinate `{0,0}` with value `1.8`, a new `SparseItem` should be created in that location and added to the appropriate linked lists, resulting in the following.

<img src="{{site.baseurl}}/homework/img/spmat2.png" alt="" width="100%"/> 

If we then perform a **set** operation on coordinate `{1,2}` to value `0`, the `SparseItem` that in that location should be deleted (since we do not store values of 0).  The resulting matrix is shown below.

<img src="{{site.baseurl}}/homework/img/spmat3.png" alt="" width="100%"/> 

Finally, if we perform a `copyDim` operation from **row 3** to **column 2** (i.e. `SparseMatrix::copyDim({3,SparseMatrix::npos}, {SparseMatrix::npos,2})` ) then the old contents of column 2 should be removed (taking care not to delete an item that is also in the source dimension), and the elements from source row 3 should be copied into column 2.  **Note:** the source dimension may be modifed by this operation when copying from one row/column to the opposite (as seen here).

<img src="{{site.baseurl}}/homework/img/spmat4.png" alt="" width="100%"/> 

### Notes and Other Info

 - We have provided a debug helper class `SparseMatrixDebugHelper` to help check the consistency of your linked lists.  You can examine its code in `spmat-debug.h/cpp`. For it to work you must use `SparseMatrix::createSparseItem()` anytime you allocate a `SparseItem` and you must use `SparseMatrix::deleteNode()` anytime you delete a `SparseItem`. These functions have hooks to call the debug helper to track the pointers to currently "scoped" `SparseItems`.  We have included calls to the consistency checker at the end of `SparseMatrix::set()` and `SparseMatrix::copyDim()` which are the most likely places you will introduce errors.  It uses conditional compilation (e.g. `#ifdef` tags) and currently the `Makefile` is setup to define `SPARSE_DEBUG` so that the consistency checks are enabled.

 - No use of any other container is allowed (i.e. no `vector` or any other C++ data structure other than arrays and the linked lists of `SparseItem`s can be used).  **Failure to follow this guideline will result in a 0!**

### Testing
 
 - We have provided a simple test driver in `spmat-test.cpp` that will create a few different matrices and exercise some of the member functions.  It does not perform automated testing so you will need to read the code and examine the output to verify that your code is producing correct, expected output. 

 - We have, however, provided a helper, debug class: `SparseMatrixDebugHelper`.  It performs consistency checks regarding your linked list pointers and will output error message. For it to work, you must use `createSparseItem` and `deleteNode` to dynamically allocate and delete SparseItems. These functions have calls to the DebugHelper to track which nodes exist currently.  Hooks to call the consistencyChecker are already inserted in `set` and `copyDim`. To enable those calles, you should compile by using:

 ```bash
 make debug
 ```

 And then run `./spmat-test`

 To compile without the debug code enabled, you can just run:

 ```bash
 make
 ```

 Remember, it is **ALWAYS** a good idea to run your tests through `valgrind`.  You can do so by executing the following command line.

 ```bash
 valgrind --tool=memcheck --leak-check=yes ./spmat-test
 ```

 Scroll through the output and look for invalid reads, writes, and the heap usage summary at the end.  However, please note, that just as a doctor can only diagnose you based on the symptoms or the info you provide, valgrind can only check for errors based on what the test code exercises.  If the test code never triggers code to test a function and there are memory leaks or invalid access in that function, valgrind will say no errors occurred.  You are only as good as what your tests exercise, so it helps to write tests that will trigger each line of code in your class (this is often referred to as *code coverage*).
 



