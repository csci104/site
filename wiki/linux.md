---
layout: asides
toc: true
tasks: false
permalink: /:path/:basename/
---

# Linux Cheatsheet

By Jamie Flores and Leif Wesche

## Description

Linux is the OS you all are using on your VM/docker.  Unix (a variant of which is MacOS) is another OS that has many of the same commands.
Here are some of the most useful ones!  Hopefully you never open the file explorer on your VM again after reading this!

## Terminal

In this class, and in CS in general, the terminal is the best way to interact with your computer. Plus it's easier to learn than you'd think. From the terminal you can run programs and manipulate the file system. 

### Autocomplete

You can always have the terminal guess what you are trying to say by pressing `tab`. This doubles as a handy way to avoid typos. If it doesn't find anything to autocomplete with, or finds too many possible matches, `tab` will do nothing.  

### Previous commands

To rerun a command you already ran, you don't have to type it out again. You can use the up arrow on your keyboard to look through previously ran commands.

## Directory Aliases

A directory is what you think of as a folder.

The filesystems of modern OSes are heirarchies, meaning there is some root directory any other directory can be reached from. When referring to directories from the command line: 

- `.` = your current directory
- `..` = your parent directory
- `~` = your home directory, which is where your user files live.

So, if you are in `~/user/cs104/hw-username/`:

- `.` = `~/user/cs104/hw-username/`
- `..` = `~/user/cs104/`
- and as always `~` = `~`

## Commands

Any of these command should run in your Unix/Linux/MacOS terminal.

### Keep Things Neat

- `clear` will clear text previously printed in your terminal, but won't delete anything (scroll up to see old output again). `ctrl+L` also works.

### Navigating Directories

- `cd <directory_name>` moves you into that directory.
  So, `cd ..` moves you back into the parent directory of your current directory. `cd` by itself moves you to the home directory. `cd /` takes you all the way back to root, which is where you can look at system files.

- `ls` lists all the files and directories.
  If you specify a directory in your current directory, `ls <directory_name>` will list the contents of that directory.
  So, if you are in the `hw-username` directory, but you want to see what files you have in your `hw1` directory, simply type `ls hw1`.

- `pwd` prints out the current working directory all the way from root, which is different than from home, which is normally shown. For times when you need to copy and paste a file path (ie setting up docker), this is what you want. 

### Creating a Directory

- `mkdir <directory_name>` will make a new, empty directory in your current directory with the name `<directory_name>`.

### Moving Files Around

- `cp <src_file_name> <dest_directory_name>` or `cp <src_directory_name> <dest_directory_name>` will COPY `src_file_name` or the contents of `<src_directory_name>` to `<dest_directory_name>` (leaving the original unchanged). 
  Note that to copy a directory, include the `-r` flag.
- `mv <src_file_name> <dest_directory_name>` or `mv <src_directory_name> <dest_directory_name>` will MOVE the contents of the source to the destination (the original is no longer at the source).
  This can also be used to rename files.
  Also remember to use `-r` to move a directory.

### Flags

- Commands in Linux can accept flags to change their behavior. Flags look like `-r` or `-Wall`, and do different thing depending on the program. No matter what program you run from the command line, the order of flags does not matter (however the order of arguments after flags might). 

### Create a file

- `touch newfile.cpp` creates a new blank file called `newfile.cpp`. Another way you can do this is to just open a file that does not exist with a text editor...

### Opening a Text Editor

- `subl` opens a blank sublime document.
- `subl <file_name>` opens only that file.
- `subl <directory_name>` opens all the files in the directory and is SUPER CONVENIENT!

NOTE: if you are using VS Code, just replace `subl` with `code`.
For Emacs, replace with `emacs`.
For sublime, replace with `vim`. 

### Deleting Stuff

- `rm old-file.txt` will delete `old-file.txt`. Careful! Files you delete via this command will not go into your computers trash - they are gone for good. You can also delete directories with the `-r` option. 

### sudo

- Any command can be prepend with `sudo` to execute the command with administrator privileges. 
For example, if `subl system-file.txt` says you don't have permission, try `sudo subl systemfile.txt`.
Running a `sudo` command might prompt you for your password. 

### Searching

- `grep -r "find this string" .` will search for the literal words "find this string" in and files that can be reached from the current directory. Don't forget the dot! Usefull if you are looking for where a variable is declared in a project with lots of files. `grep` is a really useful command with tons more options than I will go into here.

### Creating Your Own Scripts

- If you ever find yourself doing something repetetive, you can create a bash script with `touch my-script.sh` to run anything you want with `./my-script.sh`. A script is just a text file. On the first line of the scrip write "#!/bin/bash", then whatever commands you want to run on subsequent lines. Note if your computer gives you trouble about permissions, try granting exe permissions to the file with `sudo chmod +x my-script.sh`.









