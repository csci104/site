struct IntItem {
  int val;
  IntItem *next;
};

void llreverse(IntItem *curr, IntItem* prev, IntItem*& head);

int main(int argc, char* argv[])
{
        IntItem * head;
       /* Code to create linked list here */
  
       llreverse(head, nullptr, head);
       /* Code to print and delete dynamic memory from linked list here */
     
}

/* Before the initial call to llreverse, curr should be a pointer to the head of the linked list to reverse.
    After the llreverse call, head should be the head of the reversed list */
void llreverse(IntItem *curr, IntItem* prev, IntItem*& head){

    // If we've gone off the end, 
    // then prev is the pointer to the last item and 
    // thus the new head
    if(curr == nullptr){
        head = prev;
    }
    else {
        IntItem* temp = curr->next;
        curr->next = prev;
        llreverse(temp, curr, head);
    }
}
