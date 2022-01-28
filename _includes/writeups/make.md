Continue your answers in `hw2.txt`.

#### Part (a): 
Every *action* line in a makefile must start with a:

1. TAB
1. Newline
1. Capital letter
1. Space
1. It doesn't matter, any character can start an action line

#### Part (b):
Look at the Makefile below and answer the following question. Assume this Makefile is in the current directory, and all required files are available.

```
IDIR=.
CXX=g++
CXXFLAGS=-I$(IDIR) -std=c++11 -ggdb

LDIR =../lib

LIBS=-lm

DEPS = shape.h

OBJ = shape.o shape1.o shape2.o

%.o: %.cpp $(DEPS)
	$(CXX) $(CXXFLAGS) -c  $< -o $@ 

all: shape1 shape2

shape1: shape1.o shape.o
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LIBS)

shape2: shape2.o shape.o
	$(CXX) $(CXXFLAGS) $^ -o $@ $(LIBS)


.PHONY: clean

clean:
	rm -f *.o *~ shape1 shape2 *~
	``` 

Now we run the command 

```
make clean
make shape1
```

Which action(s) will get called? What compiler command(s) with what exact parameters will get executed as a result of the action(s)?

#### Part (c):
What is the purpose of a .PHONY rule?

#### Part (d):
What are acceptable names for a makefile? Select all that applies.

1. Makefile.txt
1. Makefile
1. makefile.sh
1. makefile

