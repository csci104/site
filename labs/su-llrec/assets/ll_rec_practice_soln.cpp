#include <iostream>
#include <string>
using namespace std;

struct Node {
  int data;
  Node* next;
};

class LList {
  public:
    Node* head;
};

int ll_len(Node* head);
void ll_unique(Node* head);
void ll_partial_sum(Node* head);
Node* ll_rotate(Node* head, int n);
int ll_compare(Node* lhs, Node* rhs);

LList* make_list(int input[], int size){
  LList* ret = new LList();
  Node* head = new Node();
  Node* temp;
  ret->head = head;
  for (int i = 0; i < size; i++){
      head->data = input[i];
      if (i < size -1) { 
        head->next = new Node();
        head = head->next;
      } 
  }
  
  head->next = NULL;
  head = NULL;
  return ret;
}

void print_list(Node* head){
  if (head == NULL){
    return;
  }
  if (head->next == NULL){
    cout << head->data << endl;
    return;
  } else {
    cout << head->data << " -> ";
    print_list(head->next);
  }
}


int main() {
  int l1[] = {1,2,3};
  int l2[] = {1,1,2,4,4,4,5,4};
  
  LList* ll1 =  make_list(l1, 3);
  LList* ll2 =  make_list(l2, 8);

  cout << "l1: ";
  print_list(ll1->head);
  cout << "l2: ";
  print_list(ll2->head);

  cout << "length of l1: " << ll_len(ll1->head) << endl;
  cout << "length of l2: " << ll_len(ll2->head) << endl;

  ll_unique(ll1->head);
  ll_unique(ll2->head);
  cout << "ll_unique on l1: ";
  print_list(ll1->head);
  cout << "ll_unique on l2: ";
  print_list(ll2->head);

  ll1 =  make_list(l1, 3);
  ll2 =  make_list(l2, 8);

  ll_partial_sum(ll1->head);
  cout << "ll_partial_sum on l1: ";
  print_list(ll1->head);

  cout << "rotated l2: ";
  print_list(ll_rotate(ll2->head, 2));
  
  int l2a[] = {1,2,3,4,5};
  LList* ll2a = make_list(l2a, 5);
  cout << "l2a: ";
  print_list(ll2a->head);

  cout << "rotate l2a by 2: ";
  print_list(ll_rotate(ll2a->head,2));

  ll2a =  make_list(l2a, 5);
  cout << "rotate l2a by 3: ";
  print_list(ll_rotate(ll2a->head,3));

  ll2a = make_list(l2a, 5);
  cout << "rotate l2a by 0: ";
  print_list(ll_rotate(ll2a->head,0));
  
  ll2a = make_list(l2a, 5);
  cout << "rotate l2a by 5: ";
  print_list(ll_rotate(ll2a->head, 5));


  int l3[] = {1, 2, 3, 4};
  int l4[] = {};
  int l5[] = {0, 1, 2, 3, 4};
  int l6[] = {1, 2, 3, 5};
  LList* ll3 = make_list(l3, 4);
  LList* ll4 = make_list(l4, 0);
  LList* ll5 = make_list(l5, 5);
  LList* ll6 = make_list(l6, 4);

  cout << "l3: ";
  print_list(ll3->head);
  cout << "l4: " << endl;
  print_list(NULL);
  cout << "l5: ";
  print_list(ll5->head);
  cout << "l6: ";
  print_list(ll6->head);

  cout << "compare l3, l3: " << ll_compare(ll3->head, ll3->head) << endl;
  cout << "compare l3, l4: " << ll_compare(ll3->head, ll4->head) << endl;
  cout << "compare l3, l5: " << ll_compare(ll3->head, ll5->head) << endl;
  cout << "compare l3, l6: " << ll_compare(ll3->head, ll6->head) << endl;
  
  return 0;
}


int ll_len(Node* head) {
    if (head == NULL) {
      return 0;
    }
    else {
       return 1 + ll_len(head->next);
    }
}

void ll_unique(Node* head) {
  if (head == NULL || head->next == NULL) {
    return;
  } else {
    if (head->data == head->next->data) {
      Node* temp = head->next;
      head->next = head->next->next;
      delete temp;
      ll_unique(head);
    } else {
      ll_unique(head->next);
    }
  }

}
void partial_sum_hlp(Node* head, int sum){
  if (head == NULL){
    return;
  } else {
    sum += head->data;
    head->data = sum;
    partial_sum_hlp(head->next, sum);
  }
}
void ll_partial_sum(Node* head){
    if (head == NULL){
      return;
    } else {
      partial_sum_hlp(head, 0);
    }
  
}

// example soln with while loop

Node* ll_rotate_hlp(Node* cur, int n, Node* head){
  // traverse to get to the nth position
  if (cur == NULL){
    return head;
  } 
  if (n > 0){
    return ll_rotate_hlp(cur->next, n-1, head); 
  }

  Node* last = cur;
  while (last->next != NULL){
     last = last->next;
  }
  last->next = head;
  head = cur->next;
  cur->next = NULL;

  return head;
  
}
// example soln without while loop
/*
void ll_rotate_hlp2(Node* cur, Node* head) {
  // Continue Traversing until end, and connect end of list to new head
  if(cur->next == NULL) {
    cur->next=head;
  }
  else {
    ll_rotate_hlp2(cur->next, head);
  }
}

Node* ll_rotate_hlp(Node* cur, int n, Node* head){
  if (cur == NULL){
      return head;
  }
  if (n > 1){
    // If before nth position, continue traversing
    return ll_rotate_hlp(cur->next, n-1, head);
  }
  else {
    // If right before nth position disconnect the two parts of the list
    if(cur->next == NULL) {
      return head;
    }
    Node* tempNext = cur->next;
    cur->next = NULL;
    ll_rotate_hlp2(tempNext, head);
    // Return the new head
    return tempNext;
  }
}*/

Node* ll_rotate(Node* head, int n) {
    if (head == NULL || n == 0){
      return head;
    } else {
      return ll_rotate_hlp(head, n, head);
    }
    
}

int ll_compare(Node* lhs, Node* rhs){
  if ((lhs == NULL) && (rhs != NULL)) return -1;
  if ((lhs != NULL) && (rhs == NULL)) return 1;
  if ((lhs == NULL) && (rhs == NULL)) return 0;
  if (lhs->data < rhs->data) {
    return -1;
  }
  if (lhs->data > rhs->data) {
    return 1;
  }
  else {
    return ll_compare(lhs->next, rhs->next);
  }

}

