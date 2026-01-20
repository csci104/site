#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE SIZE - Using a loop
// ========================================
int sizeIterative(Item* head) {
    int count = 0;
    Item* temp = head;
    
    while (temp != nullptr) {
        count++;
        temp = temp->next;
    }
    
    return count;
}

// ========================================
// RECURSIVE SIZE - Using recursion
// ========================================
int sizeRecursive(Item* head) {
    // Base case: reached the end of the list
    if (head == nullptr) {
        return 0;
    }
    
    // Recursive case: 1 + size of rest of list
    return 1 + sizeRecursive(head->next);
}

// Helper function to print the list
void printList(Item* head) {
    Item* temp = head;
    while (temp != nullptr) {
        cout << temp->val;
        if (temp->next != nullptr) {
            cout << " -> ";
        }
        temp = temp->next;
    }
    cout << " -> null" << endl;
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
    
    cout << "List: ";
    printList(head);
    
    // Calculate size using iterative approach
    int sizeIter = sizeIterative(head);
    cout << "Size (iterative): " << sizeIter << endl;
    
    // Calculate size using recursive approach
    int sizeRec = sizeRecursive(head);
    cout << "Size (recursive): " << sizeRec << endl;
    
    // Test with empty list
    Item* emptyHead = nullptr;
    cout << "\nEmpty list size (iterative): " << sizeIterative(emptyHead) << endl;
    cout << "Empty list size (recursive): " << sizeRecursive(emptyHead) << endl;
    
    // Test with single node
    Item* singleHead = new Item{42, nullptr};
    cout << "\nSingle node list size (iterative): " << sizeIterative(singleHead) << endl;
    cout << "Single node list size (recursive): " << sizeRecursive(singleHead) << endl;
    
    // Clean up memory
    Item* temp;
    while (head != nullptr) {
        temp = head;
        head = head->next;
        delete temp;
    }
    delete singleHead;
    
    return 0;
}
