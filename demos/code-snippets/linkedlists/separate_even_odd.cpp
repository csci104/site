#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE SEPARATE - Using a loop
// ========================================
void separateIterative(Item* head, Item*& evenHead, Item*& oddHead) {
    evenHead = nullptr;
    oddHead = nullptr;
    Item* evenTail = nullptr;
    Item* oddTail = nullptr;
    
    Item* current = head;
    while (current != nullptr) {
        Item* newItem = new Item{current->val, nullptr};
        
        if (current->val % 2 == 0) {
            // Even number
            if (evenHead == nullptr) {
                evenHead = newItem;
                evenTail = newItem;
            } else {
                evenTail->next = newItem;
                evenTail = newItem;
            }
        } else {
            // Odd number
            if (oddHead == nullptr) {
                oddHead = newItem;
                oddTail = newItem;
            } else {
                oddTail->next = newItem;
                oddTail = newItem;
            }
        }
        
        current = current->next;
    }
}

// ========================================
// RECURSIVE SEPARATE - Using recursion
// ========================================
void separateRecursive(Item* head, Item*& evenHead, Item*& oddHead) {
    // Base case: reached the end
    if (head == nullptr) {
        return;
    }
    
    // Process the rest of the list first
    separateRecursive(head->next, evenHead, oddHead);
    
    // Create a new node for current value
    Item* newItem = new Item{head->val, nullptr};
    
    if (head->val % 2 == 0) {
        // Even number - prepend to even list
        newItem->next = evenHead;
        evenHead = newItem;
    } else {
        // Odd number - prepend to odd list
        newItem->next = oddHead;
        oddHead = newItem;
    }
}

// Helper function to print the list
void printList(Item* head) {
    if (head == nullptr) {
        cout << "null" << endl;
        return;
    }
    
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

// Helper function to clean up list
void deleteList(Item* head) {
    Item* temp;
    while (head != nullptr) {
        temp = head;
        head = head->next;
        delete temp;
    }
}

// ========================================
// Example usage
// ========================================
int main() {
    // Create a linked list with mixed even/odd: 5 -> 10 -> 15 -> 20 -> 7 -> 12 -> null
    Item* head = new Item{5, nullptr};
    head->next = new Item{10, nullptr};
    head->next->next = new Item{15, nullptr};
    head->next->next->next = new Item{20, nullptr};
    head->next->next->next->next = new Item{7, nullptr};
    head->next->next->next->next->next = new Item{12, nullptr};
    
    cout << "Original list: ";
    printList(head);
    
    // Separate using iterative approach
    Item* evenHead1 = nullptr;
    Item* oddHead1 = nullptr;
    separateIterative(head, evenHead1, oddHead1);
    
    cout << "\nIterative separation:" << endl;
    cout << "Even list: ";
    printList(evenHead1);
    cout << "Odd list: ";
    printList(oddHead1);
    
    // Separate using recursive approach
    Item* evenHead2 = nullptr;
    Item* oddHead2 = nullptr;
    separateRecursive(head, evenHead2, oddHead2);
    
    cout << "\nRecursive separation:" << endl;
    cout << "Even list: ";
    printList(evenHead2);
    cout << "Odd list: ";
    printList(oddHead2);
    
    // Clean up memory
    deleteList(head);
    deleteList(evenHead1);
    deleteList(oddHead1);
    deleteList(evenHead2);
    deleteList(oddHead2);
    
    return 0;
}
