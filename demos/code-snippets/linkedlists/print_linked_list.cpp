#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE PRINT - Using a loop
// ========================================
void printIterative(Item* head) {
    Item* temp = head;
    while (temp != nullptr) {
        cout << temp->val << " ";
        temp = temp->next;
    }
    cout <<  endl;
}

// ========================================
// RECURSIVE PRINT - Using recursion
// ========================================
void printRecursive(Item* head) {
    // Base case: reached the end of the list
    if (head == nullptr) {
        cout << endl;
    } else {
        cout << head->val << " ";
        
        printRecursive(head->next);
    }   
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
    
    // Print using iterative approach
    printIterative(head);
    
    // Print using recursive approach
    cout << "List (recursive): ";
    printRecursive(head);
    
    // Clean up memory
    Item* current = head;
    while (current != nullptr) {
        Item* temp = current;
        current = current->next;
        delete temp;
    }
    
    return 0;
}
