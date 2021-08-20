# CSCI 104 Site

Welcome to the updated version of the 104 course site.
You'll have to do a little bit of setup before you can get started!

0. Install submodules.
   Run `git submodule init && git submodule update` in this repository.

1. Install [Ruby](https://www.ruby-lang.org/en/).
   You can use [Homebrew](https://brew.sh) if you're on macOS or the package manager of your choice on Linux.

2. Install [Bundler](https://bundler.io).
   You can use `gem install bundler` once Ruby is installed.

3. Install this project's dependencies.
   Run `bundle install` from the root directory of this repository. 

To make changes and see the results in real time, run the Jekyll development server.
You can do this using the following command once you've finished setup:

```
bundle exec jekyll serve
```

The Jekyll development server will automatically reload when it detects that you've made changes.
You can view these changes by viewing the site locally in your browser.
By default, it is served at the URL `http://localhost:4000`.

To update remote, use:

```
git push origin 2021/fall:deploy
```
