# Windows C++ Setup (VS Code + WSL / Ubuntu)

> **Audience:** CS Freshmen  
> **Goal:** Install VS Code, g++, gdb, CMake, and Valgrind on Windows  
> **Toolchain:** Windows Subsystem for Linux (WSL – Ubuntu)

---

## 1. Install Visual Studio Code (Windows)

1. Go to https://code.visualstudio.com
2. Download **VS Code for Windows**
3. Install with default options

Enable command-line launch:
- Open VS Code
- Press **Ctrl + Shift + P**
- Run: `Shell Command: Install 'code' command in PATH`

---

## 2. Install WSL (Ubuntu Linux)

Open **PowerShell as Administrator** and run:

```powershell
wsl --install
```

This will:
- Enable WSL
- Install **Ubuntu**
- Prompt you to reboot

---

## 3. Set Up Ubuntu (First Launch)

After reboot:
1. Open **Ubuntu** from the Start Menu
2. Choose a **Linux username and password**

---

## 4. Update Linux Packages

In the Ubuntu terminal:

```bash
sudo apt update
sudo apt upgrade -y
```

---

## 5. Install C++ Development Tools

```bash
sudo apt install -y \
  build-essential \
  gdb \
  cmake \
  valgrind
```

Verify:

```bash
g++ --version
gdb --version
cmake --version
valgrind --version
```

---

## 6. Install VS Code WSL Extension

In **VS Code (Windows)**:
1. Open Extensions
2. Install **WSL** (Microsoft)

---

## 7. Open Your Project in WSL

From Ubuntu:

```bash
code .
```

---

## 8. CMake Starter Project (Multi-file, In-Source Build)

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

### CMakeLists.txt

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

### src/greeter.h

```cpp
#pragma once
#include <string>

std::string make_greeting(const std::string& name);
```

### src/greeter.cpp

```cpp
#include "greeter.h"

std::string make_greeting(const std::string& name) {
    return "Hello, " + name + " from CMake + WSL!";
}
```

### src/main.cpp

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
```

---

## 9. Build and Run (In-Source)

```bash
cmake .
cmake --build .
./hello Alice
```

---

## 10. VS Code Debugging

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
      "cwd": "${workspaceFolder}",
      "MIMode": "gdb"
    }
  ]
}
```

---

## 11. Valgrind

```bash
valgrind ./hello Alice
```

---

✅ You now have a Linux-grade C++ toolchain on Windows using WSL.
