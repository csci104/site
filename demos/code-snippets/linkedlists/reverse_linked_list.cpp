#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE REVERSE - Using a loop
// ========================================
Item* reverseIterative(Item* head) {
    Item* prev = nullptr;
    Item* current = head;
    Item* next = nullptr;
    
    while (current != nullptr) {
        // Save the next node
        next = current->next;
        
        // Reverse the link
        current->next = prev;
        
        // Move prev and current one step forward
        prev = current;
        current = next;
    }
    
    // prev is now the new head
    return prev;
}

// ========================================
// RECURSIVE REVERSE - Using recursion
// ========================================
Item* reverseRecursive(Item* head) {
    // Base case: empty list or single node
    if (head == nullptr || head->next == nullptr) {
        return head;
    }
    
    // Recursively reverse the rest of the list
    Item* newHead = reverseRecursive(head->next);
    
    // Make the next node point back to current node
    head->next->next = head;
    
    // Current node becomes the tail
    head->next = nullptr;
    
    return newHead;
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
    Item* head1 = new Item{5, nullptr};
    head1->next = new Item{10, nullptr};
    head1->next->next = new Item{15, nullptr};
    head1->next->next->next = new Item{20, nullptr};
    
    cout << "Original list: ";
    printList(head1);
    
    // Reverse using iterative approach
    head1 = reverseIterative(head1);
    cout << "After iterative reverse: ";
    printList(head1);
    
    // Reverse back to original
    head1 = reverseIterative(head1);
    cout << "Reversed back: ";
    printList(head1);
    
    // Create another list for recursive test
    Item* head2 = new Item{5, nullptr};
    head2->next = new Item{10, nullptr};
    head2->next->next = new Item{15, nullptr};
    head2->next->next->next = new Item{20, nullptr};
    
    cout << "\nOriginal list: ";
    printList(head2);
    
    // Reverse using recursive approach
    head2 = reverseRecursive(head2);
    cout << "After recursive reverse: ";
    printList(head2);
    
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
    
    return 0;
}
