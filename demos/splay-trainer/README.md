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


Can you change the splay command button to "Find".  Also, during that splay (or, now, "find") operation it's unclear what I should do once I traverse the tree and find that node.  The options on the right are to click "Done" or "Cancel" and say to "Click the node to splay next, or:"...please say "Click the node to splay next, or press Done if no splay is necessary, or Cancel".

We need to change the "find/splay" operation to support keys that ARE NOT in the tree, because for splay trees we must splay something to the top. The correct behavior is to walk the tree downward. At each node, let's give a button to say "Node found", "Node not found", "Cancel". Thus, for finding (or removing a node as well), they need to walk down the tree and for find, choose Node not found at the leaf node on the path to the desired, non-existent key.  After they click Node found, or Node not found, then ask them: "Click 'Done' if the operation is done or 'Splay' if a node should be splayed (of course, keep 'cancel' button).  The right answer is to 'Splay'. After that they should be asked to choose the pivot point like in insertion, as I've noticed there is a discrepancy in the current "Find/Splay" operation for how splyaing works vs. when insert operations are performed.   During a find operation requires us to "click the node" to splay which is the node that is deeper on the ancestory path.  But for insert we are asked to "Click the next rotation pivot" (which is the node higher in the ancestry path). Can we make this consistent across all operations. I think it would be best to make them click on the node to splay (the deeper node that is moving up) and then choose zig-zig or zig-zag or zig.  

finally, as we splay nodes up the tree can we highlight the last node they clicked to splay even after the zig-zig, zig-zag, or zig.  We just ask them to click the next node to splay. It will be the item that's highlighted but without that highlighting it's sometimes easy to visually lose your place.


===

this looks good but a few alterations:

Don't show "Step m/n" in the right pane area as it gives away the solution.  And don't say " (normally required)" in the status area as that is too much of a hint.

I think even for insert, once they insert the new node, we want to ask them to click a button "Splay" or "Done" (or "cancel") before splyaing back up to make sure they know they SHOULD splay.

I found a bug. When I try to remove a node with 2 children, go to it, and click "Found it" and it asks me to swap wiht successor or predecessor, but those actions don't work. I've tried multiple times and I start to click through the pathway to either the predecessor or successor and it raises errors. Or I just click on my successor or predecessor and it also gives errors. Please fix.

===

Removing still doesn't work with neither successor and predecessor working. In the graphic, I try to remove 19, go to it and click "Found". I then enter success or predecssor, which from the graphic clearly has at most 2 steps to find, but you think there should be 4 steps and when I click either child of 19 (no matter predecessor or successor being chosen), I get an error.