Write a **recursive** (no loops allowed) routine to determine if **ALL** paths from leaves to root are the same length.  

The tree nodes are instances of the following struct:

```c++
struct Node {
    int key;
    Node *left, *right;
};
```

The function is prototyped in `equal-paths.h` and should be implemented in the corresponding `.cpp` file.

```c++
// Prototype
bool equalPaths(Node * root);
```

### Examples

See the images below of trees with equal paths that should return `true` and trees that do not have all equal paths which should return `false`.

<img src="{{site.baseurl}}/homework/img/bt-equal-paths.png" alt="drawing" width="100%" height="auto" id="responsive-image"/>

<!--
```
  4
 / \
3   5
     \
      6
```
- A call to `sumInternalRange(root, 2, 3, 4)` should return 2 since nodes 3, 4, and 5 are above depth 2 (but 6 is not) and nodes 3 and 4 are in the inclusive range: [3,4].

-->


You MAY define helper functions if needed in `equal-paths.cpp`.  We have also provided a **VERY RUDIMENTARY** test program `equal-paths-test.cpp` that you may use and modify as desired to test certain configurations and debug your code.  It will not be graded.
