---
layout: asides
toc: true
tasks: false
title: Mac Toolchain Setup
---

# C++ Setup for macOS (VS Code + Homebrew)

> **Audience:** CS104 Students  
> **Goal:** Build, debug, and memory-check C++ programs using a browser-based Linux environment  
> **Platform:** Install VS Code, g++, gdb/lldb, CMake, and Valgrind on macOS

---

## 1. Install Visual Studio Code

If you do NOT have VS Code installed on your Windows laptop: 

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Download **VS Code for Windows**
3. Install with default options

Enable command-line launch:
- Open VS Code
- Press **Ctrl + Shift + P**
- Type `Shell Command: Install 'code' command in PATH`


---

## 2. Install Toolchain

### 2a. Install Xcode Command Line Tools

Open **Terminal**:
```bash
xcode-select --install
```

Needed: **Screenshot:** Xcode command line tools install prompt

---

### 2b. Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify:
```bash
brew --version
```


---

### 2c. Install C++ Tools

**For Intel Macs:**
```bash
brew install gcc gdb cmake valgrind
```

**For Apple Silicon Macs (M1/M2/M3/M4):**
```bash
brew install gcc gdb cmake
```

> ⚠️ **Important:** Valgrind does NOT support Apple Silicon natively. If you have an M1/M2/M3/M4 Mac, you'll need to use **AddressSanitizer (ASAN)** instead for memory checking (see Section 8 below), or use Google Cloud Shell for a Linux environment with Valgrind.

---

### 2d. Install and Compile GoogleTest (gtest)

Install the GoogleTest library:
```bash
brew install googletest
```

On macOS with Homebrew, the library is automatically compiled and installed to the appropriate location. You can verify the installation:
```bash
ls /opt/homebrew/lib/libgtest*
```

Or for older Intel Macs:
```bash
ls /usr/local/lib/libgtest*
```

---

## 3. Verify Installed Tools and Setup VSCode
### 3a. Verify Installed Tools

**For Intel Macs:**
```bash
g++ --version
gdb --version
cmake --version
valgrind --version
```

**For Apple Silicon Macs:**
```bash
g++ --version
gdb --version
cmake --version
# Skip valgrind - it's not supported on Apple Silicon
```

![Expected tool version results](./img/gcloud-tools-version-verify.png)
---

## 5. Recommended VS Code Extensions

- C/C++ (Microsoft)
- CMake Tools
- CodeLLDB (recommended)

📸 **Screenshot:** VS Code Extensions on macOS

---

## 4. CMake Starter Project (Multi-file, In-Source Build)

Here is the final folder structure and files you will now create:

### Folder Structure
```
hello-cmake/
├── CMakeLists.txt
├── .vscode/
│   └── launch.json
└── src/
    ├── main.cpp
    ├── greeter.cpp
    └── greeter.h
```

Create the test folders:

```bash
mkdir -p hello-cmake/src hello-cmake/.vscode
cd hello-cmake
```

Create the necessary files in the specified folders.  **Ensure you click on the appropriate folder before creating a new file in VSCode**.   The button to create a new file looks like:

![img](./img/vscode-new-file.png)

---

### `CMakeLists.txt`
```cmake
cmake_minimum_required(VERSION 3.16)
project(hello LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(hello
    src/main.cpp
    src/greeter.cpp
)
```

---

### `src/greeter.h`
```cpp
#pragma once
#include <string>

std::string make_greeting(const std::string& name);
```

---

### `src/greeter.cpp`
```cpp
#include "greeter.h"
using namespace std;

string make_greeting(const string& name) {
    return "Hello, " + name + " from CMake + WSL!";
}
```

---

### `src/main.cpp`
```cpp
#include <iostream>
#include <string>
#include "greeter.h"
using namespace std;

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cout << "Usage: " << argv[0] << " <name>" << endl;
        return 1;
    }

    string name = argv[1];
    cout << make_greeting(name) << endl;
    return 0;
}
```

After creating these files you folder structure should look like this:

![img](./img/vscode-hello-cmake-file-structure.png)

---

## 5. Build and Run (In-Source)


At the terminal in the lower pane (you may need to click `View..Terminal`)
```bash
cmake .
make
./hello Alice
```
---

You should see the program run and greet Alice!

## 6. Valgrind (Memory Checking)

### For Intel Macs:

Run with valgrind to check for memory errors:

```bash
valgrind --tool=memcheck ./hello Alice
```

![img](./img/valgrind-output.png)

### For Apple Silicon Macs (M1/M2/M3/M4):

Since Valgrind is not supported, use **AddressSanitizer (ASAN)** instead. First, recompile with sanitizer flags:

```bash
cmake . -DCMAKE_CXX_FLAGS="-fsanitize=address -g"
make clean
make
```

Then run normally (ASAN instruments the binary):

```bash
./hello Alice
```

ASAN will automatically detect and report memory errors like leaks, buffer overflows, and use-after-free issues.

To revert back to normal compilation:
```bash
cmake . -DCMAKE_CXX_FLAGS=""
make clean
make
```

---

## 7. Debugging with Cloud Editor (VS Code GUI)

To use the integrated debugging GUI front end of VSCode is most easily accomplished with a `launch.json` file in a `.vscode` subfolder.  For VSCode to automatically find and use this configuration file, you must point VSCode to the top-level project folder where the `.vscode` subfolder resides.  Regardless of where your terminal indicates it is, VSCode must be opened to the specific project folder.  

So, choose `File..Open Folder` and choose the `hello-cmake` folder your created and click `OK`.  

- Open the Extensions view (Ctrl+Shift+X)
- Search for "C/C++ Debugger"
- Install the extension authored by **Microsoft** (or any C/C++ GDB extension available in the marketplace)
- Reload the editor when prompted

![img](./img/wsl-cpp-debug-vscode-extension.png)

Create `.vscode/launch.json` by first running these commands at the terminal (assuming your are in your `hello-cmake` folder at the terminal):

```bash
touch .vscode/launch.json
```

Your file tree should now look like:

![img](./img/vscode-hello-cmake-file-debug-conifg.png)

Then open the `launch.json` in the editor and paste in these contents and save the file.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug hello (gdb)",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/hello",
      "args": ["Alice"],
      "stopAtEntry": false,
      "cwd": "${workspaceFolder}",
      "environment": [],
      "externalConsole": false,
      "MIMode": "gdb",
      "setupCommands": [
        {
          "description": "Enable pretty-printing",
          "text": "-enable-pretty-printing",
          "ignoreFailures": true
        }
      ]
    }
  ]
}
```

### Debug Steps

1. Open `main.cpp`
2. Click left of a line number to set a breakpoint
3. Press **Run..Start Debugging**

---



---

## 8. Summary and Reminders

- This environment should match our autograder's exactly

---

You can now build, debug, and analyze multi-file C++ programs on Mac.**

