cmake_minimum_required(VERSION 3.16)
project(hello LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set a default build type if none was specified
if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Debug)
  message(STATUS "No build type specified, defaulting to ${CMAKE_BUILD_TYPE}")
endif()

add_executable(hello
    src/main.cpp
    src/greeter.cpp
)
