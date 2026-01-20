#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE SUM - Using a loop
// ========================================
int sumIterative(Item* head) {
    int sum = 0;
    Item* temp = head;
    while (temp != nullptr) {
        sum += temp->val;
        temp = temp->next;
    }
    return sum;
}

// ========================================
// RECURSIVE SUM - Using recursion
// ========================================
int sumRecursive(Item* head) {
    if (head == nullptr) {
        return 0;
    }
    int sumAfter = sumRecursive(head->next);
    return head->val + sumAfter;
}

// ========================================
// Example usage
// ========================================
int main() {
    // Create a linked list: 5 -> 10 -> 15 -> 20 -> null
    Item* head = new Item{5, nullptr};
    head->next = new Item{10, nullptr};
    head->next->next = new Item{15, nullptr};
    head->next->next->next = new Item{20, nullptr};
    
    // Calculate sum using iterative approach
    int sumIter = sumIterative(head);
    cout << "Sum (iterative): " << sumIter << endl;
    
    // Calculate sum using recursive approach
    int sumRec = sumRecursive(head);
    cout << "Sum (recursive): " << sumRec << endl;
    
    // Expected: 5 + 10 + 15 + 20 = 50
    
    // Clean up memory
    Item* current = head;
    while (current != nullptr) {
        Item* temp = current;
        current = current->next;
        delete temp;
    }
    
    return 0;
}
