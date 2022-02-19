Write a **recursive** (no loops allowed) routine to determine if the path from the root to **EACH and EVERY** leaf node is the **same** length node.

The tree nodes are instances of the following struct:

```c++
struct Node {
    int key;
    Node *left, *right;
};
```

The function is prototyped in `equalpaths.h` and should be implemented in the corresponding `.cpp` file.

```c++
// Prototype
bool equalLengthPaths(Node * root);
```

For example, given the BST:


### Examples

Given the tree:

```
  4
 / \
3   5
     \
      6
```

- A call to `sumInternalRange(root, 2, 3, 4)` should return 2 since nodes 3, 4, and 5 are above depth 2 (but 6 is not) and nodes 3 and 4 are in the inclusive range: [3,4].

- A call to `sumInternalRange(root, 1, 3, 4)` should return 1 since only the root is at a depth (i.e. 0) above `d=1` and in the range.

- A call to `sumInternalRange(root, 1, 0, 3)` should return 0 since only the root is at a depth (i.e. 0) above `d=1` but the root's value is not in the range [0,3].

You MAY define helper functions if needed in `internal-range.cpp`.  We have also provided a **VERY RUDIMENTARY** test program `internal-range-test.cpp` that you may use and modify as desired to test certain configurations and debug your code.  It will not be graded.
