---
layout: default
title: Midterm 2 Info
nav: Resources
---

# Solution: Graph Implementation with STL

## Problem Summary
Read a directed graph with named nodes (strings) and create the graph structure with proper edges. Must run in O((m+n)log(m+n)) time where n = number of nodes, m = number of edges.

## Solution

```cpp
#include <iostream>
#include <string>
#include <map>
using namespace std;

int main ()
{
    int n, m;
    cin >> n >> m;
    
    // Use a map to store node name -> GraphNode* mapping
    // Map operations are O(log n), which allows us to achieve O((m+n)log(m+n))
    map<string, GraphNode*> nodeMap;
    
    // Read all node names and create GraphNode objects
    for (int i = 0; i < n; i ++)
    {
        string nodename;
        cin >> nodename;
        
        // Create new node and store in map
        GraphNode* newNode = new GraphNode(nodename);
        nodeMap[nodename] = newNode;
        // Time: O(log n) per insertion -> O(n log n) total
    }
    
    // Read all edges and add them to the graph
    for (int j = 0; j < m; j ++)
    {
        string nodenameStart, nodenameEnd;
        cin >> nodenameStart;
        cin >> nodenameEnd;
        
        // Look up both nodes in the map
        GraphNode* startNode = nodeMap[nodenameStart];  // O(log n)
        GraphNode* endNode = nodeMap[nodenameEnd];      // O(log n)
        
        // Add directed edge from start to end
        startNode->addEdgeTo(endNode);      // O(1)
        endNode->addEdgeFrom(startNode);    // O(1)
        // Time: O(log n) per edge -> O(m log n) total
    }
    
    // other stuff using the graph goes here - not yours to worry about
    
    return 0;
}
```

## Explanation

### Key Insight: Use a Map for Fast Lookup

The critical requirement is O((m+n)log(m+n)) time complexity. To achieve this, we need:
- Fast node creation: O(n log n)
- Fast edge creation with node lookup: O(m log n)

**Why not use an array or vector?**
- Arrays/vectors would require O(n) time to search for a node by name
- This would give us O(mn) time for edge creation - too slow!

**Why use std::map?**
- `map<string, GraphNode*>` provides O(log n) lookup by name
- Insertion is also O(log n)
- This gives us the required time complexity

### Algorithm Steps:

1. **Create a map** to store the mapping from node names to GraphNode pointers
   - Key: string (node name)
   - Value: GraphNode* (pointer to the node)

2. **Read and create all nodes** (O(n log n))
   - For each of n nodes:
     - Read the node name
     - Create a new GraphNode with that name (O(1))
     - Insert into map (O(log n))

3. **Read and create all edges** (O(m log n))
   - For each of m edges:
     - Read start and end node names
     - Look up both nodes in the map (2 × O(log n))
     - Add the directed edge using the provided methods (O(1))

### Time Complexity Analysis

- Node creation: O(n log n)
  - n iterations, each with O(log n) map insertion
  
- Edge creation: O(m log n)
  - m iterations, each with 2 × O(log n) map lookups + O(1) edge additions
  
- **Total: O(n log n + m log n) = O((n + m) log n)**

Since m can be at most n², and log(n²) = 2log(n), we have:
- O((n + m) log n) ≤ O((n + m) log(m + n))

This satisfies the required time complexity. ✓

### Space Complexity
O(n) for the map storing all node pointers.

## Alternative Data Structures (Not Used)

### HashMap/unordered_map
- Would give O(1) average lookup → O(n + m) time
- Even better than required!
- Valid solution if allowed

### Array/Vector
- Would require O(n) search time → O(mn) total
- Too slow! Would get "almost no credit"

## Why the Skeleton Code Matters

The skeleton creates the loops for you and ensures you focus on the correct data structure choice. The key insight they're testing is: **"Which STL container allows fast lookup by string key?"**

Answer: **std::map** (or unordered_map if you want even better performance)
