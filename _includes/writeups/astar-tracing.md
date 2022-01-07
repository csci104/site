
<div class="showcase">
    <img src="{{ site.url }}/assignments/img/astar.jpg" alt="A-Star" width="320"/>
</div>

You are given the above unweighted graph, and want to find the shortest path from **node L** to **node A**, using **A* Search**. 
 Your algorithm has the following properties:

- It uses Manhattan distance for both heuristic (the h-value) and distance from the source (the g-value)
- If two nodes look equally good, it breaks ties by selecting the node with a smaller heuristic (or, equivalently, the node with the largest distance travelled)
- If two nodes are still tied, it break ties by choosing the node which comes first alphabetically.

Place your answer in a file `q2.txt` which lists the order that nodes are explored and discovered (start from `L`) showing the `g`, `h`, and `f` values for each node as it is discovered. Use the format shown below (where the values are fictitious and intended for demonstrating the format):

```
- explore L
  - discover H (g=1, h=9, f=10)
  - discover P (g=1, h=7, f=8)
- explore P
...
```
