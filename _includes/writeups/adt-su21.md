
For each of the following data storage needs, describe which abstract data types you would suggest using. Your choices should be one of `list`, `set`, `map`, but realize you can compose an ADT from other ADTs (a map where the value is a list or even another map).  

Continue your answers in `hw2.txt`.

Try to be specific, i.e., rather than just saying "a list", say "a list of scores (doubles)" or "a list of structs consisting of a name (string) and a GPA (double)". Indicate what the data is that you'd store and put its type in parentheses (i.e. *a list of names (strings)* ). Also, please give a brief (at most 2-3 lines of text) explanation for your choice. We are grading you as much on justification as your ADT identification.  If you give a wrong answer, we'll know whether it was a minor error or a major one, and can give you appropriate partial credit.  Also, there may be multiple equally good options, so your justification may get you full credit.

1. a data type that stores the college that won the NCAA basketball championship each year, in the order they won.  You do not need to store the year.  
1. a data type that would store the SSN (social security number) of those who have registered to vote.  We want to ensure no one can register to vote twice so we would want to do efficient lookups to see if a given SSN is already present.
1. a data type to store all contacts and their phone numbers (home, mobile, etc.). Assume a phone number is represented as a string
1. a data type that stores all of the 2-letter state postal codes (e.g. "CA", "NV", "NY", etc.) and all the zip codes that exist in that particular state.  We should be able to quickly determine if, for a given state, a zip code really does exist in that state.
