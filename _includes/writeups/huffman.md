
#### Background

One potential application for a priority queue is Huffman coding. Huffman coding is a form of lossless compression (no information is lost / the operation is invertible to the original).  Huffman coding is a key component in other compression algorithms such as the JPG and MPG image and video compression algorithms.

Huffman coding is a variable-length coding scheme that determines the frequency of occurrence of each symbol in the input data (how often each symbol occurs).  It then assigns the symbols that appear the **most** often to the **shortest** codes (and those that occur **least** often with the **longest** codes).  How those variable-length codes are generated is the crux of the algorithm and is explained below. But once generated, we simply scan through the input replacing each occurence of a symbol with its corresponding code which generally reduces the storage required. Note: we need to also store the dictionary of keys and codes to that we can invert the operation (decompress) to recover the original.

#### Algorithm

There are many websites that will give an overview and even actual C++ code.  You may review those for the overview of the algorithm but you are **NOT ALLOWED** to copy code from any online source. Instead, use them for understanding the general approach. 

Below is the pseudocode for the compression algorithm that we require you to implement:

 - Find the frequency of each symbol (i.e. count the number of occurrences of each key/symbol)
 - Add each symbol into a min-PQ where the priority is the frequency (number of occurrences)
 - Also maintain a mapping of each symbol to its resulting Huffman code starting with blank (empty string) codes for each symbol.
 - While the priority queue has 2 or more nodes
    - Pop the top two nodes
    - Prepend '0' to the corresponding code of all the keys represented by (contained in) one of the nodes
    - Prepend '1' to the corresponding code of all the keys represented by (contained in) the other node
    - Push a new node that contains the union of all the keys whose priority is the sum of the priorities of the two nodes that were popped
 - The codes created for each key are valid Huffman codes
 - Scan through the original input data replacing each symbol with its Huffman code creating a single, long string of 0s and 1s.

A step by step visualization of how the Huffman tree is built is shown below.

 <img src="https://en.wikipedia.org/wiki/File:HuffmanCodeAlg.png">

Most online references construct a tree using pointers, etc.  We will not do that (and if you do so, it will be an indicator that you inappropriately used online code).  Instead, we will take a potentially less efficient approach and use nodes that store the collection of all keys that would be in the leaves of the subtree rooted at that node, and we will build up the code strings as we join two nodes (sub-trees).

#### Example 1

Here is how the Huffman codes would be generated using the string `mississippi`.

**Note**: In these images we are not explicitly showing the heap but the construction of the "Huffman" tree.  To understand what is happening the heap, we color code the items below.  The two yellow nodes are the nodes popped from the heap in that iteration, and the green nodes are what remains at the end of that iteration.    

<img src="{{site.baseurl}}/homework/img/huffman-ex1.png" alt="drawing" id="responsive-image"/>

#### Example 2

Here is how the Huffman codes would be generated using the string `i boo big bruins`.
<img src="{{site.baseurl}}/homework/img/huffman-ex2.png" alt="drawing" id="responsive-image"/>

#### Using the Huffman Codes

Returning to our example of the string `mississippi` we could count the frequency of each symbol to obtain:

 - **i** => 4
 - **s** => 4
 - **p** => 2
 - **m** => 1

A valid Huffman coding would be:

 - **i** => `0`
 - **s** => `11`
 - **p** => `101`
 - **m** => `100`

The resulting compressed string would be: `100011110111101011010`

#### Decompression

To decompress we simply scan one character at a time from the compressed data, appending each character to a code word (string) and as soon as the code word matches any code in the key/code dictionary we can substitute the original character.

Given the compressed string for `mississippi` and the codes we found above the decompression process would be:

  - Get the first character (`1`) and append it to the code string (i.e. `code` = `1` ), then check if `code` is in our key/code dictionary. Since it is not, we continue.
  - Get the next character (`0`) and append it to the code string (i.e. `code` = `10`), then check if `code` is in our key/code dictionary. Since it is not, we continue.
  - Get the next character (`0`) and append it to the code string (i.e. `code` = `100`), then check if `code` is in our key/code dictionary. It is the code for `m` so we append `m` to our decrypted data (string): `m` and reset `code` back to the empty string.
  - Get the next character (`0`) and append it to the code string (i.e. `code` = `0`), then check if `code` is in our key/code dictionary. It is the code for `i` so we append `i` to our decrypted data (string): `mi` and reset `code` back to the empty string.
  - Get the next character (`1`) and append it to the code string (i.e. `code` = `1`), then check if `code` is in our key/code dictionary. Since it is not, we continue.
  - Get the next character (`1`) and append it to the code string (i.e. `code` = `11`), then check if `code` is in our key/code dictionary. It is the code for `s` so we append `s` to our decrypted data (string): `mis` and reset `code` back to the empty string.
  - *...and so on until we reach the end of the compressed data.*

#### I/O Routines

We can compress any data (binary/ASCII/etc.) we wish but must determine the set of possible **"symbols"** or the size of each symbol (e.g. bytes [0-255]) in the input.  For this assignment, we will use strings that correspond to the hexadecimal values of UTF-16 (2-byte) characters.  UTF-16 is a character coding scheme that represents each possible character as a 16-bit (2-bytes = **4 hex characters**) value (i.e. `0000` - `ffff` in hex).  It is a superset of ASCII (i.e. 16-bit codes `0000`-`007f` represent the same characters as ASCII `00`-`7f` hex). The input files for your program will be the ASCII representation (so you can easily use `std::string`s) of the hexadecimal for these files.

For example, given a file (`mississippi.txt`) that contains the characters: `mississippi`, we could save that as a UTF-16 formatted file where each character in the input text would be represented as a 2-byte code (e.g. `m` is ASCII `6d` hex and, thus, in UTF-16 would be `006d` hex) and then convert each of those 2 bytes to its corresponding 4-hex digits.  For your convenience in reading and making sense of these files, we will then store those 4 hex digits as ASCII strings and save them to a text file so you can use normal file I/O routines that work with ASCII.

Thus `mississippi` will be coded in an input file (`mississippi.aschex`) as:

```
006d 0069 0073 0073 0069 0073 0073 0069
0070 0070 0069 
```

We have provide a Python script that takes normal ASCII text files and converts to this ASCII-UTF16-hex format for you.  You can run it as follows:

```bash
$ python3 conv-to-utf16-aschex.py mississippi.txt mississippi.aschex
```

`mississippi.txt` can be replaced with any normal ASCII text file and the resulting output will be written to the filename provided as the last command line argument.

#### The Code Base

We provide a **COMPLETED** class with `static` methods to read and write these ASCII hex (of UTF-16 codes) files:

```c++
class AsciiHexIO {
public:
    static RawTextVector read(const char* filename);
    static void write(const char* filename, const RawTextVector&  text);

};
```

 - `read` takes in the filename and returns a vector containing the sequence of 4-hex digit strings representing each UTF-16 character (i.e. reading the filename `mississippi.aschex` should return a vector with contents [`006d`, `0069`, `0073`, `0073`, `0069`, `0073`, `0073`, `0069`, `0070`, `0070`, `0069` ] )
 - `write` takes a vecotr containing those 4-hex digit strings and writes them to a file.  

 These operations are the inverse of each other (i.e. calling `read` on an `.aschex` file and then passing the returned vector to `write` will result in a new file that is a copy of the original) 

Next, we have a partially completed class that provides routines to read and write **compressed** files.

```c++
typedef std::vector<std::string> RawTextVector;
typedef std::string CompressedData;
typedef std::map<std::string, std::string> CodeKeyMap;

class AsciiHuffmanIo {
public:
    static void writeCodedText(const char* filename, const CompressedData& inText, const CodeKeyMap& code);
    static void readCodedText(const char* filename, CompressedData& outText, CodeKeyMap& code);
};
```

 - `writeCodedText` takes the compressed data (e.g. `inText` = `100011110111101011010`) along with the code/key mapping (e.g. { `0`:`0069`, `11`:`0073`, `100`:`006d`, `101`:`0070`} ) and saves a text file with that data.  And example is shown below:
   
    ```
    4
    0 0069
    11 0073
    100 006d
    101 0070
    100011110111101011010
    ```

    - The first line of the file contains the number of code/key pairs, `n`
    - That is followed by `n` lines with a code and key on each line separated by whitespace.
    - Finally, 1 more line of text is present representing a **single string** containing the entire compressed data

 - `readCodedText` reads in files of the format created by `writeCodedText` and sets the `CodeKeyMap` and `CompressedData` string (`outText`) with the contents from the file. At this point, all the information is present to decompress the data.

Finally, a class `HuffmanCoder` is started for you to take the various data structures and compress or decompress the data.

```c++
class HuffmanCoder {
public:
    typedef std::map<std::string, size_t> KeyFrequencyMap;
    typedef std::map<std::string, std::string> KeyCodeMap;

    static void compress(const RawTextVector& inText, CompressedData& outText, CodeKeyMap& codes);
    static void decompress(const CompressedData& inText, const CodeKeyMap& codes, RawTextVector& outText);
    static double ratio(const RawTextVector& inText, const CompressedData& outText, const CodeKeyMap& codes)
;
};
```

Note: `ratio` is a function that computes the compression ratio (how much space was saved) and displays that info.

#### Your Task

 1. Complete the `AsciiHuffmanIO::readCodedText` function to read in compressed files and return the string of compressed data and the code/key map.
 1. Write the `HuffmanCoder::compress` function
   - Use the pseudocode at the top of this problem statement to guide your implementation.  You **MUST USE** your heap implementation (`heap.h`) for the priority queue.    
   - You must maintain appropriate data structures (i.e. maps) to avoid expensive linear searches when replacing the input data symbols with the Huffman codes as well as avoiding expensive linear search when searching for the code of a symbol as you build up the Huffman codes.
 1. Write the `HuffmanCoder::decompress` function
   - Use the decompression process described above to develop your algorithm and code for converting the compressed text back to the original sequence of symbols

#### Testing

We have provided a **COMPLETE** test program in `huffman-test.cpp`.  This program is a utility that will use the various I/O and HuffmanCoder functions to either **compress** or **decompress** files.  You can use it one of two ways:

To compress a file, you could run:

```bash
$ ./huffman-test c samples/mississippi.aschex samples/mississippi.huf
```

The first argument `c` indicates the program will **compress** a file.  It then takes the ASCII coded UTF-16 hex file in the `samples` folder: `samples/mississippi.aschex` and compress it, saving the compressed file to `samples/mississippi.buf` (or whatever path/filename you provide).

To decompress a file, you could run:

```bash
$ ./huffman-test d samples/mississippi.huf samples/mississippi.dec
```

Here, `d` indicates the program will **decompress** a file. It then takes a file that shold be the output of a compression operation (similar to the example above) and decompresses it to a new file given by the last command line argument.

After decompression, the resulting file (`samples/mississippi.dec`) should be a match for the original input (`samples/mississippi.aschex`).

You could use the `diff` utility on Linux/Unix/MacOS to compare the files:

```bash
$ diff samples/mississippi.aschex samples/mississippi.dec
```

If the two files have differences, the `diff` utility will display them.  If they are the **same**, no output will be generated (a good thing).  

You can use this flow of compressing, decompressing, and then using `diff` to ensure your program works.  We have provided a few files for you to test with and you can create others by using the `conv-to-utf16-aschex.py` script described above:

   - `samples/mississippi.aschex` which is produced from `samples/mississippi.txt` - This is the same as the running example in this description
   - `samples/alphabet.aschex` which is produced from `samples/alphabet.txt` - This contains a file with 26 `a`s, 25 `b`s, 24 `c`s, etc. (plust newlines which are `000a` hex).  Use this as another input test.  We believe you should be able to achieve a compression ratio that is shown below:

    ```
    Original size (bytes): 754
    Compressed size (bytes): 433
    Compression ratio: 1.74
    ```

   - `samples/war-and-peace.aschex` which is produced from `samples/war-and-peace.txt` - This contains the full text of the Tolstoy novel *War and Peace* and can be used a stress test. We believe you should be able to achieve a compression ratio that is shown below:

    ```
    Original size (bytes): 6.58734e+06
    Compressed size (bytes): 1.87401e+06
    Compression ratio: 3.52
    ```

