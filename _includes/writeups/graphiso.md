In this problem, you will again use backtracking search to determine if two graphs are isomorphic.  Two graphs, $$G1$$ and $$G2$$, are said to be isomorphic if:
  - There exists a bijection (1-to-1 and onto), $$M$$, from the vertices in G1 to the vertices in G2 (i.e. M(v1) => v2 where v1 is in G1 and v2 is in G2), such that:
    - for each edge $$(u1,v1)$$ in G1, the edge $$(M(u1), M(v1))$$ exists in G2 **AND** 
    - for each vertex, $$v1$$ in G1, $$deg(v1) = deg(M(v1))$$. 

We have written **and implemented** a basic graph class for you.  It reads in graphs (as adjacency lists) from an input stream (file) and allows you to check if an edge exists, find all the neighbors of a given vertex, and get all the vertices in the graph.  It uses a `std::map` to store the graph information in adjancency list form.

```c++
// Graph class for use with graph isomorphism function
typedef std::string VERTEX_T;
typedef std::set<VERTEX_T> VERTEX_SET_T;
typedef std::vector<VERTEX_T> VERTEX_LIST_T;
class Graph {
public:
    Graph(std::istream& istr);
    bool edgeExists(const VERTEX_T& u, const VERTEX_T& v) const;
    const VERTEX_SET_T& neighbors(const VERTEX_T& v) const;
    VERTEX_LIST_T vertices() const;
private:
    std::map<std::string, VERTEX_SET_T > adj_;
};
```

Your task is to write a function (prototyped below) to determine if the two graphs are isomorphic (as defined above) and return `true` if so, and `false`, otherwise, **AND** if you return `true` you must also provide the valid mapping of vertices in graph 1 and their corresponding mapped vertices in graph 2 that form the isomorphism (i.e. you should produce a map where the keys are the vertices from graph 1 and the values are the vertices from graph 2 to which each vertex from graph 1 maps to).  

To create, update, and store this mapping, you **MUST** use your hash table data structure from the previous part of this homework.  If you do not use your hash table implementation, you will **RECEIVE NO CREDIT** on this problem.

```c++
/// Use your hashtable for the mapping between vertices
typedef HashTable<VERTEX_T, VERTEX_T> VERTEX_ID_MAP_T;

/**
 * @brief Determines if two graphs are isomorphic
 * 
 * @param g1 Graph 1
 * @param g2 Graph 2
 * @param mapping isomorphic mapping between vertices of graph 1 (key) and graph 2 (value)
 * @return true If the two graphs are isomorphic
 * @return false Otherwise
 */
bool graphIso(  const Graph& g1, 
                const Graph& g2, 
                VERTEX_ID_MAP_T& mapping);
```

#### Testing

We have provided a "driver"/test program (`graphiso-driver.cpp`) that will read in two files (whose names are given on the command line)  that contain graph descriptions, call your function, and then print the results for you to verify.  You can compile it with `make` and run it as:

```bash
./graphiso-driver graph1a.in graph1b.in
```

Use `graphiso-driver` to do some sanity tests of your code before moving on to any of the tests from our grading suite. 

A few examples of graphs and the results that your function should produce are shown below. We have provided three pairs of graphs in the files: `graph1a/b.in`, `graph2a/b.in`, and `graph3a/b.in` that match the examples shown below.

**Graph 1a/1b**:

<img src="{{site.baseurl}}/homework/img/graphiso-g1-true.png" alt="drawing" width="100%" height="auto" id="responsive-image"/>

**Graph 2a/2b**:

<img src="{{site.baseurl}}/homework/img/graphiso-g2-true.png" alt="drawing" width="100%" height="auto" id="responsive-image"/>

**Graph 3a/3b**:

<img src="{{site.baseurl}}/homework/img/graphiso-g2-false.png" alt="drawing" width="100%" height="auto" id="responsive-image"/>

During grading, **we will run some additional instructor tests** but they will be similar to the ones we provide in our test suite.

#### Requirements and Assumptions

 - As always you may not change the signature of the primary function provided.
 - You **MAY** define helper functions in `graphiso.cpp`
 - You **MUST** use a recursive approach that follows the general backtracking structure presented in class.  **Failure to use such a recursive approach will lead to a 0 on this part of the assignment.**  
 - You MAY use structures such as `std::set` or `std::map` or `std::vector` as necessary to help your implementation.
 - There is no specific runtime, but you must pass each test in `ctest` with timeout limits of 60 seconds per test.
 - Any valid mapping is acceptable (since many may exist for certain graphs).  Our tests simply verify your solution rather than looking for a hard-coded mapping.

#### Hints and Approach

Recall that a backtracking search algorithm is a recursive algorithm that is similar to generating all combinations, but skipping the recursion and moving on to another option if the current option violates any of the constraints.  It is likely easiest to recurse over each vertex in graph 1 attempting to find a suitable mapping to a vertex in graph 2 that meets the criteria known (or assigned) at the current time. As you map a vertex from G1 to G2, you can check whether the vertices you've mapped are "consistent" and meet the isomorphism requirements. Because not all vertices will be mapped during the intermediate stages of your algorithm, you can only determine if a mapping is NOT valid by finding mapped vertices that have differing degrees **or** if an edge, $$(u1, v1)$$, in G1 where both $$u1$$ and $$v1$$ are mapped to a vertex in G2, does **NOT** have a corresponding edge $$(M(u1), M(v1))$$ in G2.

We have provided the start of a helper function you can use to implement these checks.

```c++
bool isConsistent(const Graph& g1, const Graph& g2, VERTEX_ID_MAP_T& mapping);
```

You should consider completing it and calling it from your main backtracking code.