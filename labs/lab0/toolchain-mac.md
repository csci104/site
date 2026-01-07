# macOS C++ Setup (VS Code + Homebrew)

> **Audience:** CS 104 Students
> **Goal:** Install VS Code, g++, gdb/lldb, CMake, and Valgrind on macOS

---

## 1. Install Visual Studio Code

1. Visit https://code.visualstudio.com
2. Download **VS Code for macOS**
3. Drag to **Applications**

Enable terminal launch:
- Cmd + Shift + P → `Shell Command: Install 'code' command in PATH`

📸 **Screenshot:** VS Code on macOS

---

## 2. Install Xcode Command Line Tools

Open **Terminal**:
```bash
xcode-select --install
```

📸 **Screenshot:** Xcode command line tools install prompt

---

## 3. Install Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Verify:
```bash
brew --version
```

📸 **Screenshot:** Homebrew installation output

---

## 4. Install C++ Tools

```bash
brew install gcc gdb cmake valgrind
```

Verify:
```bash
g++ --version
cmake --version
valgrind --version
```

📸 **Screenshot:** Brew-installed tools verified

---

## 5. Recommended VS Code Extensions

- C/C++ (Microsoft)
- CMake Tools
- CodeLLDB (recommended)

📸 **Screenshot:** VS Code Extensions on macOS

---

## 6. CMake Starter Project (Multi-file, In-Source Build)

> ⚠️ For this course we use **in-source builds** (no separate `build/` folder) to reduce confusion.

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

std::string make_greeting(const std::string& name) {
    return "Hello, " + name + " from CMake + macOS!";
}
```cpp
#include "greeter.h"

std::string make_greeting(const std::string& name) {
    return "Hello, " + name + " from CMake + WSL!";
}
```

---

### `src/main.cpp`
```cpp
#include <iostream>
#include <string>
#include "greeter.h"

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <name>" << std::endl;
        return 1;
    }

    std::string name = argv[1];
    std::cout << make_greeting(name) << std::endl;
    return 0;
}
```cpp
#include <iostream>
#include "greeter.h"

int main() {
    std::cout << make_greeting("CS Student") << std::endl;
    return 0;
}
```

---

## 7. Configure, Build, and Run (No build folder)

From the project root:
```bash
cd hello-cmake
cmake .
make
./hello Alice
valgrind --tool=memcheck ./hello Alice
cd ..
```

📸 **Screenshot:** Terminal showing successful in-source build and run

---

## 8. Debugging (VS Code GUI) and Valgrind

### VS Code Debug Configuration

Create `.vscode/launch.json`:
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

1. Build the project
2. Open `main.cpp`
3. Click to the left of a line number to set a breakpoint
4. Press **Run → Start Debugging (F5)**

📸 **Screenshot:** VS Code debugger stopped at breakpoint

---

### Valgrind (WSL only)
```bash
valgrind ./hello
```

---

✅ **You can now build, debug, and analyze multi-file C++ programs using VS Code's GUI.**

