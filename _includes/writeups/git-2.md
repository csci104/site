
  In this problem, suppose we are working with a fictitious repository called `SampleRepo` (**Note: this repo doesn't exist so you can't try the commands and expect them to work**) which has a file `README.md` already committed to it. Let us now measure your understanding of the [file status lifecycle](http://git-scm.com/book/en/Git-Basics-Recording-Changes-to-the-Repository) in git. Please frame your answers in the context of the following lifecycle based on your interaction with the repository as specified below:

![Git File Status Lifecycle]({{ site.baseurl}}/homework/img/git-file-lifecycle.png "Git File Lifecycle")
>figure courtesy of the [Pro Git](http://git-scm.com/book) book by Scott Chacon

Notes:
  - Parts (a) through (f) should be done in sequence. In other words, when you get to part (f), you should assume that you already executed the earlier commands (a), (b), ..., (e). You **must** use the terminology specified in the lifecycle shown above. 
  - For the purposes of this question, you can assume you have full access (i.e. read/write) to the repository.
  - For this problem you may use online sources to look up information about `make` and Makefiles, but please cite your sources).  

#### Part (1):
What is the status of `README.md` after performing the following operations:

```bash
#Change directory to the home directory
cd
#Clone the SampleRepo repository
git clone git@github.com:{{site.data.main.github_org}}/SampleRepo.git
#Change directory into the local copy of SampleRepo
cd SampleRepo
```

#### Part (2) and (3):
What is the status of `README.md` and `fun_problem.txt` after performing the following operations:

```bash
#Create a new empty file named fun_problem.txt
touch fun_problem.txt
#List files
ls
#Append a line to the end of README.md
echo "Markdown is easy" >> README.md
```

#### Part (4) and (5):
What is the status of `README.md` and `fun_problem.txt` after performing the following operation:

```bash
git add README.md fun_problem.txt
```

#### Part (6) and (7):
What is the status of `README.md` and `fun_problem.txt` after performing the following operations:

```bash
git commit -m "My opinion on markdown"
echo "Markdown is too easy" >> README.md
echo "So far, so good" >> fun_problem.txt
```

#### Part (8) and (9):
What is the status of `README.md` and `fun_problem.txt` after performing the following operations:

```bash
git add README.md
git checkout -- fun_problem.txt
```

As an ungraded thought question, what are the contents of `fun_problem.txt`? Why?

#### Part (10):
What is the status of `README.md` after performing the following operation:

```bash
echo "Fancy git move" >> README.md
```
