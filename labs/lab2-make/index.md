---
layout: asides
toc: true
tasks: true
title: Makefiles
---

**Due at the end of your registered lab section. Make sure you get checked off by a CP!**

---


# Makefiles

In this lab, we will review Makefiles, how they work, and how to write them.
In order to do this, we will also be reviewing how to use GCC to effectively compile your code with the right settings and configuration.
We will also explore some advanced techniques you can use to streamline your Makefile as your projects get larger (heads up for PA 2!).

To access the source code for this lab, head over to the 104 <a href="https://github.com/usc-csci104-fall2023/resources">resources repository</a> and pull to your local machine to work on it.


## GCC and Makefiles

GCC (GNU Compiler Collection) is a program that we use to compile our program into executables.
You have already used it in previous homework.

Make (GNU Make) is a program that makes other programs.
This is especially useful when your programs become large, and recompiling after an edit requires multiple steps.
Using a `makefile`, we can configure a program to compile simply by typing the `make` command into terminal.
This lab will teach you how to write a basic makefile to be used in assignments from here on out.

### 1 - GCC

You might have noticed that we have been using some magic commands when we compile files.
Namely, you should have seen `g++`, `-g`, `-Wall`, `-o`, and `-c`.
Here is a brief explanation of what exactly these commands do.

First of all, `g++` is used to compile your programs using the GNU Compiler Collection (GCC).
The `g++` command tells GCC that you want to compile a C++ program.
There are other compilers out there, and when you want to use other compilers, you replace `g++` with the command that's used by the other compiler, such as `clang++`.
In this class, we ask that you always compile your program with GCC using the `g++` command, because that's what we use when we grade you.

When you see a terminal command that has a `-` followed by some text, this is usually a flag (also called options).
A flag can be used to specify a setting or add additional information about the command.
An option may or may not take an argument.
If an option takes in an argument, the argument is followed immediately after the flag.
To use a flag, simply include it with your compile command.

In the `g++` command, you will often see `-g`, `-Wall`, `-o`, `-c`, and `-std=` command.
Here's a descriptino of what they do and how to use them:

  + `-g`: Provide debugging feature for your program.
  You will need this when you want to use gdb or valgrind.
  To use this flag, simply append the command to the end of your compile command.
  + `-Wall`: Turn on all warnings.
  This is helpful because, as you might have seen, not all errors cause your program to not compile.
  There are some problematic operations that can cause undefined or unexpected behaviors in edge cases.
  By turning on all warnings, you make sure that you eliminate these potentially dangerous operations.
  + `-o`: This flag controls the output name of your compilation.
  By default, the binary file name is `a.out`.
  When you append `-o filename` to the end of your compile command, the compiled binary output will be the filename you specificed.
  Be carefule that the filename is not an existing file because you will overwrite the file.
  + `-c`: Compile the files but do not link them.
  This is usually used to compile intermediate object files.
  We will explain this more in later parts of the lab.
  + `-std=<version>`: This flag is used to specify the c++ version that you would like to use.
  As you expect, c++ is an evolving language, and it keeps adding new features to the language.
  Therefore, if you use a feature that's introduced in a newer version but try to compile the code with an older version, the compiler wouldn't know what the features are and the compilation will fail.
  You use this flag by appending this flag to the end of your compile comand and speficy the version number after the equal sign (i.e. `-std=c++17`).
  In this class, most of the times you can get away with using the default version and don't need to include this command at all.
  There are times when you need to use the c++ 17 and you do it with `-std=c++17`.
  + `-fmax-errors=N`: This tells the compiler to stop after encountering N errors in your code.
  Usually we don't use it, because we want to see all errors in a code, and fix them together.
  However, at times you will find that some error messages are long and there are so many of them that you can't see the top one (and if you are not fixing your compile errors starting with the first one, you should start doing that).
  This is when it becomes handy to stop compilation after some number of errors.
  + `-Wfatal-errors`: This is similar to the previous one, except that the compiler will treat an error as fatal and stop on first error.

Lastly, you might sometimes see people compile files with `g++ something.cpp main.cpp -o main -g -Wall`, and you might wonder why they list the source files before the options.
As it turns out, the order that you specify the options does not matter.
If you really want to, you can even use `g++ something.cpp -g -Wall main.cpp -o main` to compile your program.
However, by convention, we usually group the list of source files together and the list of options together.

### 2 - Using Make

GCC is nice to compile our programs, but it gets annoying if we have to type a 20 character command 10 times during development.
This is when a makefile comes in handy.

When you type `make` into terminal, Make will look for a file named `makefile` or `Makefile` for instructions.
Let's start with a makefile for a single cpp file.

In the part 1 folder, you will find a file called `charizard.cpp`.
You can compile this simply with the following instruction:

```
g++ -g -Wall charizard.cpp -o charizard
```

That's too much typing if we need to do it 20 times during developing, so let's use make.

#### 2.1 - Syntax and Structure

A basic makefile's structure is the following:

```
target: dependencies
    command_1
    command_2
    ...
    command_N
```

Each of these is called a rule.
A target is a file that Make tries to create, commands are used to create the target, and dependencies are the files that determine whether the commands need to be executed.
When you type `make <target>`, the make tool searches for the appropriate target in the directory and checks whether any of its dependencies need to be rebuilt.
If the file is not found, or if any of its dependencies is newer than the target file, all commands in the rule will be executed.

In this instance, we want to create a charizard executable using `g++ -g -Wall charizard.cpp -o charizard`, and we need to recompile the file if charizard.cpp changes.
Therefore, our rule should look like this:

```
charizard: charizard.cpp
    g++ -g -Wall charizard.cpp -o charizard
```

Put this rule into the empty Makefile in part1.

- [ ] Compile your code by running `make charizard`

Note that the system command must have a **tab** before it (not spaces!).

If you are getting an error message like this:

```
makefile:2: *** missing separator. Stop.
```

It means on line 2, make is expecting a tab but didn't find it.

Editors like VSCode will convert tabs to spaces automatically. Normally that's fine but it's not okay for Makefiles.
If you're using VSCode, you can use tabs as indentation this way:

1. Open the command pallete with `Ctrl+Shift+P` (Windows) `Cmd+Shift+P` (MacOS)
2. Search/Run the command: "Convert indentation to tabs"
3. (Suggested for MacOS users) In the command pallete, run the command "Shell Command: Install 'code' command in PATH"


#### 2.2 - Default Target

What happens when you just run `make`?
Good question!
By default, `make` will execute the first target in a makefile.
By convention, we add a target called `all` and list targets we wish to build on `make` command after `all`.

Let's have 'all' make the charizard file, which will become the name of our target.
Our resulting `makefile` is as below:

```
all: charizard

charizard: charizard.cpp
    g++ -g -Wall charizard.cpp -o charizard
```

- [ ] Compile your code by running `make all`

- [ ] Now, try runnign just `make`

Congratulations, you've just made your life 100x easier!

### 3 - Compiling Multi-File Programs

#### 3.1 - Object Files

Compiling a multi-file program requires two main steps: compiling each `.cpp` file separately, and putting them all together to form the executable.
The first step is know as compilation, during which the compiler checks for syntax and semantic mistakes, such as missing semicolons, calling a function that's not declared, or returning the wrong type in a function.
The second step is known as linking, during which the linker "links" your function calls - it finds where the body of a function is so that it knows what line to execute when you call that function.

When you compile a program with `g++ -g -Wall charizard.cpp -o charizard`, you are actually compiling and linking it.
It turns out that it's possible to do them separately.
This comes in handy when you have multiple files in your project.
When you change one of the files, you can re-compile only files that depend on the change, and run linker, without having to re-compile the entire project.

In order to do that, we introduce a new binary file type: .o files, or object files.
These are the intermediate files we make in preparation to compile the executable.

Let's look inside the part 2 folder.

```
$ cd ../part2
$ ls *
```

You will find three classes: `AttackMove`, `Battle`, and `Pokemon`.
We want to compile each of these into their own .o file of the same name.

Since we're going to have a lot of binary files beyond this point, let's make a `bin` directory to hold them all for easy cleanup.

```
$ mkdir bin
```

To make an object file, we simply need to add the `-c` flag in the compile command, which tells g++ to not run linker.
Let's compile `AttackMove` first.

```
g++ -g -Wall -c attackMove.cpp -o bin/attackMove.o
```

Simple as that.
Do the same for the other two classes, and we can then compile the main.

- [ ] Run compile commands for battle.cpp and pokemon.cpp


#### 3.2 - Putting It All Together

To compile the main, we just have to include all the `.o` files that we've already made in the g++ command.

```
g++ -g -Wall bin/attackMove.o bin/battle.o bin/pokemon.o main.cpp -o bin/pokemon
```

**Note:** A `.o` file is compiled code that doesn't get linked to other code even if it calls functions from other classes.
We tell the compiler this using the `-c` flag so that the compiler does not check whether the functions from other classes are implemented.
When we want to compile the full executable, we do not want to have the `-c` flag in that statement because we want the compiler to link all the code together in the final step.

And you have your own pokemon battle simulator! Run it like normal using:

```
./bin/pokemon
```

- [ ] Run the command to compile main to and then run `./bin/pokemon`

#### 3.3 - Makefile Dependencies

Well that's great and all, but how do we do that in a makefile?

Let's go back to the basic make rule structure:

```
target: dependencies
    command_1
    command_2
    ...
    command_N
```

We skipped dependencies before, but it's something we want to use now.
If a target has dependencies, make first checks if those dependencies exist before executing the system command associated with that rule.
If the dependencies don't exist, make will run the rule to make those dependencies if they exist.

Make will also check to see if the dependencies have been updated since the last make and will only recompile the dependencies that have changed.
This can save you a lot of time if you make a change and don't want to recompile all the files in your project.

Remember that dependencies are the files that can affect the compilation result of your target.
This includes all the non-standard-library files that you `#include`, a class's own header file and .cpp file, and, if you are compiling into an executable, all the .o files you need.

(Note: techincally speaking, `#include` files should be considered as transitive dependencies, that is: if `A` includes `B`, and `B` includes `C`, then `C` would also be a dependency of `A`. However, handling transitive inclusion is more complicated and not covered here)

A multi-file program might have a Makfile like this:

```
all: bin/pokemon

bin/pokemon: main.cpp bin/attackMove.o bin/battle.o bin/pokemon.o
    g++ -g -Wall main.cpp bin/attackMove.o bin/battle.o bin/pokemon.o -o bin/pokemon

bin/attackMove.o: attackMove.h attackMove.cpp
    g++ -g -Wall -c attackMove.cpp -o bin/attackMove.o

bin/<???>: <???>
    <???>

bin/<???>: <???>
    <???>
```
Copy this into the Makefile in part2. If you run `make`, this will fail.
Fill in all the `<???>` to get it to work.

- [ ] Fill in the blanks in the sample code to get your program to successfully compile

### 4 - More Makefiles

#### 4.1 - Variables

Your professors decides they don't like the students compiling to the `bin` directory.
They instead want the directory to be named `exe`.
You could easily find and replace bin with exe, but that's messy and could generate errors.
Why not take advantage of variables instead?

At the top of your makefile, let's define:

```
BIN_DIR = exe
```

Now let's replace every instance of `bin` with `$(BIN_DIR)`, like so:

```
$(BIN_DIR)/attackMove.o: attackMove.h attackMove.cpp
    g++ -g -Wall -c attackMove.cpp -o $(BIN_DIR)/attackMove.o
```

Now when the profesors change their mind again and want a different name for the directory, we can just change the variable at the top.
By convention, we keep the binaries in a directory named `bin`.
(For homework, don't put your final executable in a bin directory unless we tell you to do so.)

Another use for this is to have a CPPFLAGS (compiler flags) variable that holds all the flags you frequently use to compile.
We can have a CXX variable to specify which compiler to use. For example:

```
CXX = g++
CPPFLAGS = -Wall -g
BIN_DIR = exe

$(BIN_DIR)/attackMove.o: attackMove.h attackMove.cpp
    $(CXX) $(CPPFLAGS) -c attackMove.cpp -o $(BIN_DIR)/attackMove.o
```

- [ ] Rewrite your compile commands to use your new `BIN_DIR` variable

The most useful variables you will use are **Automatic Variables**.
Things that look like `$@`, `$<`, and `$^` are called automatic variables.
When Make parses through the Makefile, it'll automatically substitute them with the correct string.

  + `$@`: target name
  + `$<`: first dependency
  + `$^`: entire dependency list.

Using these variables, we can rewrite our makefile rules as so:

```
CXX = g++
CPPFLAGS = -Wall -g
BIN_DIR = exe

$(BIN_DIR)/pokemon: main.cpp $(BIN_DIR)/attackMove.o $(BIN_DIR)/battle.o $(BIN_DIR)/pokemon.o
    $(CXX) $(CPPFLAGS) $^ -o $@

$(BIN_DIR)/attackMove.o: attackMove.cpp attackMove.h
    $(CXX) $(CPPFLAGS) -c $< -o $@
```

- [ ] Rewrite your compile commands to use automatic variables

#### 4.2 - DIRSTAMP

There is one problem with the above approach. If you now run

```shell
rm -r exe
g++ -Wall -g -c attackMove.cpp -o exe/attackMove.o
```

you'll probably get an error that the `exe` directory doesn't exist.
We could just use `mkdir exe` everytime we compile our program, but that's a pain.

Let's define a rule to make sure the `exe` directory exists.

```
$(BIN_DIR)/.dirstamp:
    mkdir -p $(BIN_DIR)
    touch $(BIN_DIR)/.dirstamp
```

The `.dirstamp` file is a hidden file we make to make sure a directory exists.
Notice that this rule does not have any dependency.
When a rule has no dependency, it will be executed if the target does not exist.
You can add this rule to the dependency list of your compile commands.

```
all: $(BIN_DIR)/.dirstamp $(BIN_DIR)/pokemon
```

It's important that you list `.dirstamp` before `pokemon`, because Make will check the dependencies in order. Since building `pokemon` requires that `$(BIN_DIR)` exists, make needs to create `.dirstamp` before `pokemon`.

- [ ] Add `.dirstamp` to your Makefile where needed

#### 4.3 - PHONY and Clean

Now large projects will eventually generate a lot of binary files.
We want to keep our workspace relatively clean by writing a rule to delete the generated files.
This is also helpful when you're having mysterious problems as they sometimes go away after you delete and recompile your binaries.

Here's our `clean` rule:

```
clean:
    rm -rf $(BIN_DIR)
```

You can add this to the end of your makefile.
Now clean your directory using the `make clean` rule.

- [ ] Add `clean` as a target in your Makefile

Very nice, but there's a small problem with the original rule.
If a file named 'clean' exists in our directory, make won't run the clean rule because it sees that the file already exists!

To get around this, we declare the clean rule as PHONY to tell make that `clean` is not associated with a file.

```
.PHONY: clean
clean:
    rm -rf $(BIN_DIR)
```

Now `clean` will always run when you use `make clean`.

- [ ] Add a `.PHONY` target

**Note:** there's a danger when using rm -rf as it will irreversably delete whatever `BIN_DIR` is without prompting additional confirmation.
Be good and don't delete your entire OS (or worse, delete your grader's VM).

#### 4.4 - Search Path

If you look at files under `src` or `main.cpp`, you will see that we are including header files by writing out the relative path to it.
It can be annoying if we wish to move our header files into a different directories, because we need to go to every single file that includes the header and change the path.
We can avoid this by adding additional **Search Paths** during compilation.

You should create a separate `lib` and `src` directory and move your `*.h` files into `lib` and `*.cpp` files into `src`. Here's some commands to help do that:

```shell
# run this in part2 folder
mkdir lib src
mv *.h lib/
mv *.cpp src/
```

Now that every `cpp` file has been moved to the `src/` directory, you need to change
your Makefile to reflect that. Change `main.cpp` to `src/main.cpp` and `attackMove.cpp` to
`src/attackMove.cpp`, and `attackMove.h` to `lib/attackMove.h`.

```
$(BIN_DIR)/pokemon: src/main.cpp $(BIN_DIR)/attackMove.o $(BIN_DIR)/battle.o $(BIN_DIR)/pokemon.o
    $(CXX) $(CPPFLAGS) $^ -o $@

$(BIN_DIR)/attackMove.o: src/attackMove.cpp lib/attackMove.h
    $(CXX) $(CPPFLAGS) -c $< -o $@
```

There is another problem, however. By default, GCC will look in the current directory of the file (i.e. `src` when compiling a file in `src`), but it will not look under nested directories.
In addition, GCC also searches for standard libraries.

In order to add a directory to its search paths, you use the -I*dir* option, where *dir* is the relative directory path from where you run the compile command.
If you are using a Makefile, the path will be relative to where your Makefile is.

In our case, we want to ask GCC to look for files under the `lib` directory.
We can add append the option to the end of `CPPFLAGS`:

```
CPPFLAGS = -Wall -g -Ilib
```

Technically, this is not a makefile feature, but a compiler option.
However, you don't normally group files into different directories unless your have a bigger project, in which case you should be using a Makefile (or IDE) to manage compilation.

- [ ] Add `-I` to your compile commands

### 5 - Assignment: Complete the Makefile

Your final makefile should look something like this.
Note: if you copy and paste the code from course website and paste it into your makefile, you will need to fix all the spaces and change them into tabs.

```
BIN_DIR = exe
CXX = g++
CPPFLAGS = -g -Wall -Ilib

all: $(BIN_DIR)/.dirstamp $(BIN_DIR)/pokemon

$(BIN_DIR)/pokemon: <???>
    <???>

<???>.o: <???>
    <???>

<???>.o: <???>
    <???>

<???>.o: <???>
    <???>

.PHONY: clean
clean:
    rm -rf $(BIN_DIR)

$(BIN_DIR)/.dirstamp:
    mkdir -p $(BIN_DIR)
    touch $(BIN_DIR)/.dirstamp
```

After finishing this part, you should be able to run

```shell
make
exe/pokemon
```

to see a marvelous battle between pokemons!

- [ ] Show your final Makefile to a CP or TA for checkoff. Be prepared to answer some of the review questions below!

#### 5.1 - Review Questions

1. What is the purpose of the `-c` flag?
1. What is the advantage of compiling to .o files via makefile compared to compiling the executable together in one step?
1. What files should be in a rule's dependency list?

### 6 - More about Makefiles

If you would like to know more about Makefile, you can visit [GNU Make Manual](https://www.gnu.org/software/make/manual/make.html).
It covers both the basic and more advanced topics of the Makefiles.

**CAUTION** Do not use these advanced make commands until you are very comfortable with Makefiles.

### 7 - More about GCC

We have listed some commonly used flags and options that you will see in this class.
This is just a list of the common flags that you will use in this class.
This is in no way comprehensive.
If you see a flag that you do not understand, or if you are curious about other options, you can refer to this [official document from GCC](https://gcc.gnu.org/onlinedocs/gcc/Option-Summary.html).
Feel free to play around with the flags in your free time.

**IMPORTANT** We will be compiling your code with `-g -Wall -std=c++11`, so you must use the same options to check that your code compiles and produces no warnings.
