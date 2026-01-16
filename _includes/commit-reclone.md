
**WAIT** You aren't done yet.  Complete the last section below to ensure you've committed all your code.

### Commit then Re-clone your Repository

Be sure to add, commit, and push your code in your {{page.hwpath}} directory to your assignment repository.  Now double-check what you've committed, by following the directions below (failure to do so may result in point deductions):

- In your terminal, `cd` to the top level folder (e.g. `cs104-repos`) that has your `resources` and `{{page.hwpath}}-<your_reponame>` repos, etc.
- Create a subfolder called `verify` using the `mkdir` command below and then `cd` into that folder.

```bash
mkdir -p verify
cd verify
```

- Clone a new copy (of the latest contents that you pushed) of your assignment repo hw_username repo: 

```bash
git clone git@github.com:{{site.data.urls.github_org}}/{{page.hwpath}}-<your_reponame>.git`
cd {{page.hwpath}}-<your_reponame>
```

- Copy the test suite folder again into this new repo copy:  `

```
cp -rf ../../resources/{{page.hwpath}}_tests  .
```

- Recompile and rerun your programs and tests to ensure that what you submitted works.  You may need to copy over a test-suite folder from the `resources` repo, if one was provided.

```bash
cd {{page.hwpath}}_tests
cmake .
make grade
```

And ensure all the tests pass (or the ones you expect to pass). 

**If there is a discrepancy, you likely did not add/commit/push your latest code. Go back to your `cs104-repos/{{page.hwpath}}-<your_username>` repo/folder and figure out what did not get pushed, and rectify the situation.**  

Then, you can come back to `cs104-repos/verify/{{page.hwpath}}-<your_username>/{{page.hwpath}}_tests` and re-run `make grade`, repeating this process until it gives the expected results.