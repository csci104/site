**Prerequisite:** `make` lab.
 - If the lab session covering `make` has not happened yet, consider waiting until it is covered.

#### Part (1): 
Every *action* line in a makefile must start with a:

1. TAB
1. Newline
1. Capital letter
1. Space
1. It doesn't matter, any character can start an action line

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

#### Part (2):

If we ran the following, which rules would execute?

```
make
```

#### Part (3):

If we ran the following, type out the **first** compiler command that would execute with **EXACT** parameters.  Don't put any leading or trailing spaces **before** the first text or **after** the last text, and put 1 space between each parameter/word (e.g. `g++ -g ... shape.o`).

```
make shape1
```


#### Part (4):

If we ran the following, type out the **last** compiler command that would execute with **EXACT** parameters.  Don't put any leading or trailing spaces **before** the first text or **after** the last text, and put 1 space between each parameter/word (e.g. `g++ -g ... shape.o`).

```
make shape1
```


#### Part (5):
What is the purpose of a .PHONY rule?

#### Part (6):
What are acceptable names for a makefile? Select all that applies.

1. Makefile.txt
1. Makefile
1. makefile.sh
1. makefile

