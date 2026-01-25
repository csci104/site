#include <iostream>
using namespace std;

// Define the linked list node structure
struct Item {
    int val;
    Item* next;
};

// ========================================
// ITERATIVE REMOVE - Using a loop
// ========================================
Item* removeAllIterative(Item* head, int x) {
    if(head == nullptr) {
        return NULL; // List is empty
    } else if( head->next == NULL) {
        if(head->val == x ){ 
            delete head;
            head = NULL;
        }
        return head; 
    } else if(head->val == x) {
        Item* newHead = head->next;
        delete head;
        return newHead;
    } else  {
        Item* temp = head;
        while(temp->next != nullptr) {
            if(temp->next->val == x) {
                Item* toDelete = temp->next;
                temp->next = temp->next->next; // Bypass the node to be removed
                delete toDelete; // Remove the node
            }
            temp = temp->next;
        }
        return head;
    }
}


Item* removeAllIterative(Item* head, int x) {
    if(head == nullptr) {
        return NULL; // List is empty
    }
    while(head->val == x) {
        Item* toDelete = head;
        head = head->next;
        delete toDelete;
        if(head == nullptr) {
            return nullptr;
        }
    }
    Item* temp = head;
    while(temp->next != nullptr) {
        if(temp->next->val == x) {
            Item* toDelete = temp->next;
            temp->next = temp->next->next; // Bypass the node to be removed
            delete toDelete; // Remove the node
        } else {
            temp = temp->next;
        }
    }
    return head;
}

// ========================================
// RECURSIVE REMOVE - Using recursion
// ========================================
Item* removeRecursive(Item* head, int x) {
    // Base case: reached the end of the list
    if (head == nullptr) {
        return nullptr;
    } else {
        Item* newNext = removeRecursive(head->next, x);
        if(head->val == x) {
            delete head;
            return newNext;
        } else {
            head->next = newNext;
            return head;
        }
    }
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
