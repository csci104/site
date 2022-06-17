#include <iostream>
#include <fstream>
#include <sstream>
using namespace std;

void count_palindromes(string input, int& count);
bool is_palindrome(string check);

int main()
{
  string file_name;
  cout << "Please enter a file name:" << endl;
  cin >> file_name;
  if (cin.fail()){
    cout << "Invalid file name" << endl;
    return -1;
  }

  int palindrome_count = 0;
  count_palindromes(file_name, palindrome_count);
  cout << file_name << " contains " << palindrome_count << " palindromes."  << endl;
}

void count_palindromes(string input, int& count){
	ifstream ifile(input.c_str()); 
	if (ifile.fail()) {
	   return;
	}
  string word;
  while(getline(ifile, word)){
    if(is_palindrome(word) == true) 
      count++;
	}

	ifile.close();
}
bool is_palindrome(string check) 
{  // assume strings have an string::erase(position) member function
   // i.e. string s = "Bye"; s.erase(1); would make s = "Be"  

   int len = check.length();
   if(len == 0 || len == 1){
	  return true;   
   }
   else if (check[0] != check[len-1]){
	   return false;
   }
   else {
	   check.erase(check.begin()+0);
	   check.erase(check.begin()+len-2);
	   return is_palindrome(check);
   }

}
