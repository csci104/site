#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE APPEND - Using a loop
// ========================================
void appendIterative(Item*& head, int value) {
    Item* newItem = new Item{value, nullptr};
    
    // Special case: empty list
    if (head == nullptr) {
        head = newItem;
        return;
    }
    
    // Traverse to the end of the list
    Item* temp = head;
    while (temp->next != nullptr) {
        temp = temp->next;
    }
    
    // Append the new item
    temp->next = newItem;
}

// ========================================
// RECURSIVE APPEND - Using recursion
// ========================================
void appendRecursive(Item*& head, int value) {
    // Base case: reached the end of the list or empty list
    if (head == nullptr) {
        head = new Item{value, nullptr};
        return;
    }
    
    // Recursive case: continue to the next node
    appendRecursive(head->next, value);
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
    // Create a linked list: 5 -> 10 -> 15 -> null
    Item* head1 = new Item{5, nullptr};
    head1->next = new Item{10, nullptr};
    head1->next->next = new Item{15, nullptr};
    
    cout << "Original list: ";
    printList(head1);
    
    // Append using iterative approach
    appendIterative(head1, 20);
    cout << "After iterative append(20): ";
    printList(head1);
    
    // Create another list for recursive test
    Item* head2 = new Item{5, nullptr};
    head2->next = new Item{10, nullptr};
    head2->next->next = new Item{15, nullptr};
    
    cout << "\nOriginal list: ";
    printList(head2);
    
    // Append using recursive approach
    appendRecursive(head2, 20);
    cout << "After recursive append(20): ";
    printList(head2);
    
    // Test with empty list
    Item* head3 = nullptr;
    cout << "\nEmpty list: ";
    printList(head3);
    appendRecursive(head3, 100);
    cout << "After recursive append(100): ";
    printList(head3);
    
    // Clean up memory
    Item* temp;
    while (head1 != nullptr) {
        temp = head1;
        head1 = head1->next;
        delete temp;
    }
    while (head2 != nullptr) {
        temp = head2;
        head2 = head2->next;
        delete temp;
    }
    while (head3 != nullptr) {
        temp = head3;
        head3 = head3->next;
        delete temp;
    }
    
    return 0;
}
