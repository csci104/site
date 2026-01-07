# Windows C++ Setup (VS Code + WSL / Ubuntu)

> **Audience:** CS 104 Students  
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
  - We strongly recommend you use the same username as your USC username (i.e. if your @usc.edu email is `ttrojan@usc.edu`, then we recommend making your WSL username `ttrojan`).

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
  valgrind \
  unzip \
  libgtest-dev \

cd /usr/src/gtest
sudo cmake .
sudo make
sudo cp lib/*.a /usr/lib
cd ~
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
cd hello-cmake
cmake .
make
./hello Alice
valgrind --tool=memcheck ./hello Alice
cd ..
```

---

## 10. VS Code Debugging

If VS Code prompts you to "Select debugger" when you add a debug configuration, pick "C++ (GDB/LLDB)" (this option is provided by the Microsoft C/C++ extension). If that option is not shown, choose "Install an extension for C++" extension (ms-vscode.cpptools) from the Extensions view and reopen the Run & Debug panel.

Notes for WSL users:
- Open the project from the WSL Ubuntu terminal using `code .` (this runs the Windows VS Code connected to your WSL environment). The Remote - WSL extension makes the C/C++ tooling operate inside WSL so the debugger and paths refer to the Linux side (e.g. `/usr/bin/gdb` and `/home/<you>/...`).
- When you create the configuration, choose the GDB option ("C++ (GDB/LLDB)") and use the sample below. The important fields to check are `program` (path to the built executable inside the WSL workspace) and `miDebuggerPath`/`MIMode` (pointing to `/usr/bin/gdb`).

Example `launch.json` for WSL / gdb (place inside `.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug hello (gdb)",
      "type": "cppdbg",
      "request": "launch",
      "program": "${workspaceFolder}/hello-cmake/hello",
      "args": ["Alice"],
      "cwd": "${workspaceFolder}/hello-cmake",
      "MIMode": "gdb",
      "miDebuggerPath": "/usr/bin/gdb",
      "setupCommands": [
        { "description": "Enable pretty-printing for gdb", "text": "-enable-pretty-printing", "ignoreFailures": true }
      ]
    }
  ]
}
```

If VS Code still shows the "Select debugger" list after the C/C++ extension is installed, choose "C++ (GDB/LLDB)". If you are editing/launching from the Windows side (not via Remote - WSL) and want to debug a Windows build, you would instead install the Windows C++ debugger support ("C++ extension for Visual Studio") and pick the appropriate Windows debugger.

Troubleshooting checklist:
- Make sure you built the executable in WSL (run `cmake . && make` inside WSL) so `${workspaceFolder}/hello-cmake/hello` exists.
- Confirm `gdb` is installed in WSL: `which gdb` and `gdb --version`.
- If the debug session fails to start, open the Debug Console for errors — common causes are incorrect `program` path or missing `miDebuggerPath`.


---

## 11. Valgrind

```bash
valgrind ./hello Alice
```

---

✅ You now have a Linux-grade C++ toolchain on Windows using WSL.
