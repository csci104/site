Generate another trainer similar to what is in ../avl-trainer, ../splay-trainer, etc. but now for hashing, hash tables, open- and closed-addressing.

The user input interface should containe the following:
- table size (m) textbox (default 9)
- key selection
  - string or int radio selection
  - auto (random)-generated or manual key input radio selection
  - textbox for manual key entry
- hash function
  - automatic or manual entry radio selection
    - If string is selected above, then this should always be automatic (grayed out).  Said another way this is only viable if integer keys are selected
  - textbox labelled h(k) that defaults to just "k"
    - Show "% m" after the textbox so the user realizes you will automatically mod it by m.
    - allow them to type a simple arithmetic expressions in terms of k and constants, *, +, -, /, and % that you will parse and apply to the key they type in the key-selection text box above.
- Collision Handling (choose from 4 options)
  - Chaining (closed addressing)
  - Linear Probing (open addressing)
  - Quadratic Probing (open addressing)
  - Double hashing Probing (open addressing)
    - Provide the same hash function input controls from that section I described above (automatic/manual radio selection, textbox labelled h2(k) (and default it to just "k"), etc)
- Rehash table size
  - textbox for new table size
- Buttons for the actual operations the trainer should support to help the user learn hash tables
  - Insert
  - Find
  - Remove
- Display
  - In the main display area show the a vertical array (with index on the left and array entry (keys) in the hash table. ) If chaining has been selected, show arrows from the array entry to nodes on the right that show each key in the node.  When open addressing is used, show a T/F boolean "Deleted" (start all at False) in a column next to the key that are set when the key at that location is removed.  These will be reset when the rehash operation is performed.
- Operations
  - Overall guidance: Check that the user does the insert, find, erase algorithm correctly based on descriptions below. Have an error count if they click somewhere they should not and a timer for how long the take.  Have a cancel button after the start an operation to stop and undo and go back to the starting state before that operation began. If needed, have a done button to indicate they are done with the operation, but if the operation is clearly done based on other needed buttons, you can drop this for those operations. 
  - Insert
    - Show the user the result of the hash function being applied to the key and then ask them to click on the array entries that would be probed or nodes that would have to be searched (if chaining is used) having a button that says "Insert Here" that they click when they've selected the right array entry after probing. For chaining, when they click on the last node in the chain, make a new node appear labelled "+" that they can click on to insert the key there (and then they'd click  "Insert Here"). For closed addressing / probing, don't show them where to probe next, that is the part they should know and we are trying to train them to learn on their own. For double-hashing, show them teh result of that hash function on the key.  Besides "Insert Here" have a button that says "Cannot Insert" that is only correct to click if no location exists (the table is full) or they have probed all the locations and are ABOUT to start a cycle / probing the same location twice when they are in a cycle (this would be important for any of hte open addressing probing sequences and you should detect when we have hit a cycle)
  - Find
    - Show the user the results of the hash function being applied to the key and then ask them to click on the array entries that would be probed or nodes that would have to be searched.  Tell them to click "Return Found" after they click on the node they were searching for (checking that they actually probed their way to that node and didn't skip or click other nodes they should not have probed) or "Return not found" when they have probed all the needed locations and can say for certain that the key is not present (i.e. when probing and get to an empty or removed node.)
  - Remove
    - Show the user the results of the hash function being applied to the key and then ask them to click on the array entries that would be probed or nodes that would have to be searched.  Tell them to click "Erase" after they click on the node they were searching for (checking that they actually probed their way to that node and didn't skip or click other nodes they should not have probed) or "Return not found" when they have probed all the needed locations and can say for certain that the key is not present (i.e. when probing and get to an empty or removed node.)  For open addressing, set the "Deleted" flag but erase the key. For chaining, we can just show the updated chain with the node deleted.
  - Rehash
    - Show the old hash table on the left and show a new array on the right of the size given in the rehash table size textbox.
    - Then, you should iterate through each key in the old table (likely from 0 to m-1) highlight each node from the table on the left. When they click on it show them the output of the hash function on that key mod by the new table size m.  Then ask them to click which entry (index) in the new, larger hash table that the key should be copied to.  Raise errors if they click the wrong location.  You can simply ask them to click the FINAL entry in the new table where the key should go (they don't have to click through the probing sequence).
    - Once all old keys have been rehashed the operation can be complete and you can replace the old table in the main display with the new table.



Fixes 1:
- don't highlight the locations to click.
- Can you make the table smaller so that larger tables can fit
- For open addressing don't have "slot-x" labels
- Your algorithm is wrong. For find and remove, if a key hashes to a location or we probe through a location whose deleted flag is true, we can/should not stop.  We need to keep probing since we may have inserted it, had it probe deeper but then removed a key earlier in that probing sequence.


Fixes 2:
- For chaining can you have them NOT click on the index but the array entry square (i think that's where you currently show "head")
- Can we update the UI for the table to HIDE the keys and delete boolean when an operation begins (like maybe show a gray background and no text) and only reveal it when they click on that array entry or node and then hide it again when they click on to another location.  Once an operation is done or cancelled, then you can show the full contents as you are currently.
- For rehashing, you need to highlight in a stand out color which node from the old table they should rehash.  Don't make them click that old node. Just highlight and ask them to click where it should be placed in the new table.
- For auto gen integer keys please make them all positive
Fixes 3:
- When I use closed addressing/ chaining and click insert the array entries shrink in width as you hide the text. can you keep the width but hide the text.
- As we clikc through nodes can you highlight them more obviously (like yellow background for the currently selected node (and + when we get there))
- You need to give instructions in the instructions area on insert for closed addressing that indicate they should "Click the array entry where the key hashes. Then click nodes that need to be searched, and finally, click + and 'Insert Here' when the node should be added to the chain."
- Can you add a textbox to enter an integer, k, and a button that when clicked inserts (correctly and without user interaction), k random keys into the correct location using the currently selected probing method and hash function(s). This will make it faster to practice find, remove, and rehash.

Fixes 4:
- When we do the rehashing operation, it's strange to see the original table and I don't even notice that below is where I see the old and new table. Also when you show the hash function result as I rehash each node, I have to scroll up to see the hash code and then backdown to the lower table. Is it possible to hide the old window/panel area with the old table and instructions with the cancel button and instead just hide that and show the side-by-side old and new table where the old table used to be and then just have a cancel button in the instruction bar area where you show the hash code result. Then restore the view when they are done or cancel.

Fixes 5:
Can we add a major new feature. In the upper control area, can you add two fields to display: Number of operations, Number of access/probes.  Every operation (insert, remove, find) should increment the operaitons if they complete it correctly (i.e. don't increment if htey cancel). During each operation, count each array/chain/node/probe total over all operations and update that total if they complete the operatoin successfully (if they cancel don't change it from the last count we had).  In this way students can see that hopefully the number of accesses/probes is roughly constant compare to the number of operations. Maybe add this in a bar that stays on the screen just above the status bar between theuser input fields and the hash table area.

Please update the operations and probes/access count appropriate (with correct values ) when I auto-insert k keys.

The counts should reset every time we rehash or reset the table (size or probing)

Fixes 6:

Do you think we can move the key selection and operations panels of user input to be in the right "Trainer" panel...sharing that area until an operation begins? Then put table setup and hash function in a single row at the top and thus save vertical space because with all of these moves we won't need a second row of user input panels. Can you take extreme case to not lose the nice formatting you have for all the current aspects like the hash table? because when I asked you to do this previously you broke the formatting and the hash table looked terrible. I would like to move the key selection and operation panels to the right Trainer panel, but don't want to break how the hash table status bar and other aspects are displayed.

=== 

for open-addressing remove, auto-generated keys, you generated a random key that did not exist, it hashed to a locaiton that had an item and so I cliked "Return not found", but you showed that this is wrong. It is not.  