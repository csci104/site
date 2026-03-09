Create a webpage similar to demos/heap-trainer where students can practice skills related to AVL BSTs. There should be user input at the top and a tree view below (with questions and interaction form controls on the right.) Use the tree formatting, spacing, sizing you did from the heap-trainer code.

For input, allow them to use a textbox to  enter a sequence of integer keys separate by spaces and then create an AVL BST from them or allow them a textbox labelled `n` where you will create an AVL tree from the size/number of nodes they fill that textbox.



Have a `Reset/Clear` button to reset the whole tree to blank.

Another button to add is `Label balances`.  This should only be enabled once a tree has been created. I'll explain more later.

From their have a button called `Insert`  with a checkbox `random` and a textbox for a key that they choose to insert.  When they Press `Insert` if `random` is checked, generate a random unique key (not already in the tree) and show it for them to insert.  If random is not checked then use the key they enter in the textbox. If the textbox is blank or not an integer generate an error.

Similarly, have a `Remove` button with `random` checkbox or text box where they can choose the key to remove. If random is checked when they select remove, then pick a key from the tree randomly and ask them to remove it.  Otherwise, ask them to remove the key they've entered in the textbox. If the textbox is blank OR has a key number that is NOT in the tree, generate an error.


For this AVL tree trainer, let us use balance values (-1 (left heavy), 0 blanaced, +1 (right heavy)).  

Label Balances interactive exercise:
When they click `Label Balances`, go through all n nodes in random order. For each node, highlight the node and on the side ask the user what the balance of that node is showing radio buttons for -1, 0, +1 and a `Next` button. The user should click the appropriate balance value and click next to go on. Count up how many errors they get highlighting that node in red once they press Next and were wrong for that node.  Highlight the node in green after they press next if they got the balance correct.  Add a timer as well stopping once they got through all nodes.  Include a 'Stop Now' button to stop the exercise if the user does not want to continue. 

Finally provide query string options so I can specify the starting tree in the query string.

For insert, I've already described the random option or textbox entry for the next key to insert.  Once they click insert, show the key to insert in a message at the top and then in the tree view area.

They should then be asked to click each node in sequence that AVL insert would traverse to find the correct location in the BST to insert the node. When they click on a node that has 0 or 1 child, show a new node where the missing child would be allowing them to click that as the place to insert the new key.

Once they have clicked on a new child, connect it to the tree and now make the user "fix" the balance as needed.  Iteratively work up the parent pathway / chain, starting with the newly inserted node. On the right, ask them the *current* balance of that node (which should be 0 for all newly inserted nodes) with options -2, -1, 0, +1, +2 and a 'Next' button or `Done` button, instructing them to press Done if no more operations are needed.  If they are wrong ask them to try again. (There should be a 'Cancel' button allowing the user to stop at any time and have the tree revert back to its state before they started to try to Insert the node.) If they get the balance correct, ask them if: a.) no rotations needed on this node, b.) 1 rotation is needed, or c.) 2 rotations are needed.  If they are correct and 1 or more rotations are needed ask them to click the node that should be rotated downward and specify the direction of the rotation. If they are wrong ask them to try again.  Once they finish identifying the correct rotations or that no rotations are needed, ask them to click Next or Done.  If they click Next, ask them what node should they update next and make them click on it until they get it correct. Stop when they correctly press Done (when no more AVL updates are needed) or htey press cancel.

## Updates 

- when doing the insert exercise, do not highlight the correct node but let the user choose without hint.  So highlight the node only once they click it.

- when inserting and we reach a leaf, show two potential blank nodes (left and right) for the new key to use and make them choose the right one.

- For the tree in this image that you generated, I was asked to insert 33.  I did and said its balance is 0 which is correct. The code you generated agreed. I then when to my parent and said it's balance is 0, which it is and clicked Done as I don't think any further updates are needed since the height of that subtree did not change, I don't need to keep going up the parent chain, but the code you generated says I do. Can you verify and then fix your code if you are wrong?

After performing rotations, don't just consider everything done (even though we are) but provide the user the 'next' or 'done' or 'cancel' buttons.  Make them decide by asking them to "choose the next node that needs to be visited to update balance or press 'Done' if no more nodes need to be visited." 

It still says exercise complete 
I'll add Remove instructions shortly.  Just work on this for now.

Now we will add the remove operation.   When the user clicks remove using either the random key or the user-specified key, start by having them click the nodes on the path that leads to the node to remove. If they click a wrong node, add an error and tell them to try clicking a node again. Don't give them hints or highlight what they SHOULD click, just highlight where they have clicked (the node they already got right)

Once they click on the node to remove, ask them what they want to do next:
 - delete the node
 - reattach the node's child to the node's parent
 - Swap values with their predecessor or successor.

If there are 0 children, delete the node is the right answer.  If there is just 1 child, then reattach the node's child to the node's parent is the right answer.  If the node has 2 children then swap with the successor or predecessor is the right answer.

For the 0 or 1 child case, if they get it wrong ask them to try again. If they get it right (reattached the child to the parent for the 1 child case) and then delete the node to be removed and then go on to the removeFix algorithm/specification I give later.

For the 2 child case, ask them if they want to swap with the successor or predecessor (either is fine and acceptable). Then based on their choice instruct them to click on each node on the path way from the node to remove to its predecessor or successor, which ever they chose.  If they click some node not on the right path to their successor or predecessor, generate an error and ask them to try again by finding the next node on the path to the successor or predecessor (whichever they chose).  Have a button "Swap with node to remove" which would swap the value of the node they have most recently clicked on and the node to remove. They should click this when they reach the successor or predecessor.  Once they do this correctly, delete the node that now has the value to remove and move on to the removeFix algorithm.

The removeFix algorithm should have the following interaction.  Ask the user which node removeFix should be called on.  Make sure they choose the parent of the node that just got removed. If not generate an error and ask them to try again. 

Ask them what the balance of the node should be (-2, -1, 0, +1, +2) and how many rotations are needed.  Similar to insert fix if they correctly choose 1 or 2 rotations ask them what node needs to be rotated first and in what direction.  Follow the same user interface as you did for insert, for example, after the appropriate rotations, ask them to click next or done and if they click next ask them to choose the node that removeFix should be performed on next.  You know that removeFix may need to keep recursing up the tree even after rotations, but if no more recursing up the tree IS necessary, then they should click Done (and not next)


Can you make sure that when random is selected for insert or remove, show the text in the corresponding insert or remove textbox in gray so they realize that value won't be used. It should still be editable, but in gray

Can you please allow building of an empty tree if the keys textbox has no entries.

Can you also allow insertion of a key into an empty tree. Then just show a root node as the possible location to enter the key. From there everything else should work as it does already.

Without breaking anything in this AVL-trainer that already exists, can you add the feature where on INSERT, as we walk down the tree choosing the path to traverse to find the correct location to insert, if we get to a node with only 1 child, even though it is not hte correct place to insert the node, make a new node appear as an option for them to click on even though it would be wrong.  Just to test their understanding? 

No, you are showing the possible new child nodes  right at the start of insert. Only show the potential new child  when I reach that node. 

Much better, but two things: Don't show them in gray while you show the actual correct potential children (when I get to the correct leaf) in normal colors.  This gives it away that it is an incorrect choice. Finally once I click on to another node, make that optional child disappear if I didn't choose it.

If they do click an incorrect child, in addition to incrementing the error, give a status message that that is not the correct location for the new node.

Nope, that didn't change anything..when I click the wrong potential child of a node where the new node should not be connect, I still just see "Complete the traversal clicks before placing the new node."  I'd like to see "That is not the correct location to attach the new node. Keep going."