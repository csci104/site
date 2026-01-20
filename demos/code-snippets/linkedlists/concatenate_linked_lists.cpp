#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE CONCATENATE - Using a loop
// =======================================
void concatIterative(Item*& head1, Item* head2) {
    //  if list1 is empty, just point to list2
    if (head1 == nullptr) {
        head1 = head2;
        return;
    }
    // Traverse to the end of list1
    Item* temp = head1;
    while (temp->next != nullptr) {
        temp = temp->next;
    }
    // Connect the last node of list1 to head of list2
    temp->next = head2;
}

// ========================================
// ITERATIVE CONCATENATE - Using a loop
// ========================================
void concatIterative2(Item* head1, Item* head2) {
    if (head1 == nullptr) {
        return head2;
    }
    Item* temp = head1;
    while (temp->next != nullptr) {
        temp = temp->next;
    } 
    temp->next = head2;
}

// ========================================
// RECURSIVE CONCATENATE - Using recursion
// ========================================
void concatRecursive2(Item* head1, Item* head2) {
    // Base case: if list1 is empty, point to list2
    if (head1 == nullptr) { 
        return head2;
    } else if (head1->next == nullptr) {
        head1->next = head2;
        return head1;
    } else {
        head1->next = concatenateRecursive2(head1->next, head2);
        return head1;
    }
}

// ========================================
// RECURSIVE CONCATENATE - Using recursion
// ========================================
void concatRecursive(Item*& head1, Item* head2) {
    // Base case: if list1 is empty, point to list2
    if (head1 == nullptr) {
        head1 = head2;
        return;
    }
    
    // Base case: if we hit the last node in list1
    if (head1->next == nullptr) {
        head1->next = head2;
        return;
    }
    
    // Recursive case: continue to next node
    concatenateRecursive(head1->next, head2);
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

// Helper function to delete list
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
    // Test 1: Iterative concatenation
    cout << "=== ITERATIVE CONCATENATION ===" << endl;
    
    // Create list1: 5 -> 10 -> 15 -> null
    Item* head1 = new Item{5, nullptr};
    head1->next = new Item{10, nullptr};
    head1->next->next = new Item{15, nullptr};
    
    // Create list2: 20 -> 25 -> 30 -> null
    Item* head2 = new Item{20, nullptr};
    head2->next = new Item{25, nullptr};
    head2->next->next = new Item{30, nullptr};
    
    cout << "List1: ";
    printList(head1);
    cout << "List2: ";
    printList(head2);
    
    concatenateIterative(head1, head2);
    cout << "After concatenation: ";
    printList(head1);
    
    // Clean up
    deleteList(head1);
    
    // Test 2: Recursive concatenation
    cout << "\n=== RECURSIVE CONCATENATION ===" << endl;
    
    // Create list1: 1 -> 2 -> 3 -> null
    Item* head3 = new Item{1, nullptr};
    head3->next = new Item{2, nullptr};
    head3->next->next = new Item{3, nullptr};
    
    // Create list2: 4 -> 5 -> 6 -> null
    Item* head4 = new Item{4, nullptr};
    head4->next = new Item{5, nullptr};
    head4->next->next = new Item{6, nullptr};
    
    cout << "List1: ";
    printList(head3);
    cout << "List2: ";
    printList(head4);
    
    concatenateRecursive(head3, head4);
    cout << "After concatenation: ";
    printList(head3);
    
    // Clean up
    deleteList(head3);
    
    // Test 3: Empty list1
    cout << "\n=== CONCATENATE TO EMPTY LIST ===" << endl;
    
    Item* head5 = nullptr;
    Item* head6 = new Item{100, nullptr};
    head6->next = new Item{200, nullptr};
    
    cout << "List1: ";
    printList(head5);
    cout << "List2: ";
    printList(head6);
    
    concatenateIterative(head5, head6);
    cout << "After concatenation: ";
    printList(head5);
    
    // Clean up
    deleteList(head5);
    
    return 0;
}
