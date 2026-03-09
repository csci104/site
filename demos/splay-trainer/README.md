Create a webpage similar to demos/avl-trainer (which was for practicing AVL tree operations), but now create a webpage where students can practice skills related to splay trees (splay BSTs). 

Use the same interface, minus the "label balance" mode, button, etc.  So, to be clear, the user should still be able to specify the contents of the Splay tree or generate a random n-node Splay BST.  Then they should specify a specific key to insert or remove as well as choose a random mode where the webpage provides a random, unique key to insert or chooses a key at random to remove.

For both operations, the same sequence of interaction as the AVL tree should be used but then modifying the "insert-fix" and "remove-fix" operations appropriate for a splay tree. For example, after inserting a node or performing the selecting of 0-children, 1-children, or swapping with the successor/predecessor when there are 2-children as you remove a node, we should now have the user choose the right sequence of operations to splay the appropriate node to the root. This splay operation, should ask them to identify the next node to perform the splay operation on, and then ask if that node requires a single (zig) rotation, or a "zig-zig" (double rotation) and just ask them what node the zig-zig should be performed on or a "zig-zag" (double rotation).

Add a button associated with the Remove textboxs and random checkbox that, if pressed, has the user walk the tree down to the node to find and then requires them to splay it to the top. It should be pretty much the same code as remove but without actually removing a node (nor needing to answer any questions about the 0-child, 1-child, or 2-child cases).

Iteration 2:

Nice start, but on insert I just see a Done and Cancel button...no choices about rotations.  
Also, can you limit random values initially to -100 to +100 and grow it later if needed.

Iteration 3:

That's a bit better, but the first node that needs to be rotated is always the grandparent of the previous node (we perform Zig-zig- or zig-zag and in doing so move up 2 levels at a time), only the root may require a single rotation if the path length was odd.  Are you familiar with splay tree operations or do I need to be more specific.

Iteration 4:
Still not working on insert. When I insert a node, splaying starts on the grandparent or parent (if there is no grandparent). But the current implementation gives an error when I choose the above and instead says I should have chosen the node I just inserted. Please fix that.

Don't give hints like you gave in the parentheses when insert or removing (Click the next rotation pivot (grandparent for Zig-Zig/Zig-Zag, parent for final Zig), 

When I'm inserting a new node as the left or right child of the root, and I choose the root to splay, I can choose zig, but nothing happens.  It doesn't do the rotation. And when I clicked on the root to be the next pivot point, it doesn't highlight it.

so now I click the next pivot point and say it only needs a zig rotation and hit submit button. But then for some reason rather than doing it and asking me if I'm done or need to pick another pivot, it makes me click that node to rotate again.  This seems like an error.

Remove doesn't quite work.  When I delete a node, we need to splay it's parent, but that means the pivot point is the parent or grandparent of the *parent* and yet you are asking me to splay the parent node.