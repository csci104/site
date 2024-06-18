#!/bin/bash

# This script will compile each command and run each executable set within TODO.
# The program output is shown after running normally and with Valgrind.
# It will also parse compile warnings and errors, then give a prettified output.
# Ideal to use if students are writing test cases in plain C++ or using GTEST (both without the cmake scaffolding suite)
# If you are using a Makefile or have advanced compilation needs, you may need to edit the "cmd" variable within the for-loop as well

echo "Compiling..."

# TODO
compile_commands=(
    "g++ -g -Wall split.cpp split_test.cpp -o split_test"
    "g++ -g -Wall ulliststr.cpp ulliststr_test.cpp -o ulliststr_test"
)
executables=(
    "split_test"
    "ulliststr_test"
)
# End TODO


build_failed=0
build_success_counter=0
compile_errors=0
valgrind_errors=0

rm -rf diagnostics.txt

for exe in "${executables[@]}" # Clear out executables in case student tries pushing executables compiled without docker 
do
    rm -rf ${exe}
done

for cmd in "${compile_commands[@]}"
do
    echo $cmd
    # Including the gtest stuff in case students want to use gtest. Doesn't affect output if they don't use gtest
    # 2> >(tee -a diagnostics.txt >&2) Allows the result to be printed on both the terminal and on diagnostics.txt for later use
    cmd="$cmd `pkg-config --cflags --libs gtest` 2> >(tee -a diagnostics.txt >&2)"
    eval $cmd
    if [ "${PIPESTATUS[0]}" -ne "0" ] ; then # Unsuccessful compilation, checks for exit code status
        ((compile_errors++))
    else
        ((build_success_counter++))
    fi
done



if [ $build_success_counter -eq 0 ] ; then # Nothing compiled correctly
    echo "::error::Code did not compile!"
    echo -e "## \xF0\x9F\x9A\xA8\xF0\x9F\x9A\xA8 Code did not compile!! Your grade is currently a 0!! \xF0\x9F\x98\xAD\xF0\x9F\x98\xAD" >> ${GITHUB_STEP_SUMMARY}
    echo "### Build Log"  >> ${GITHUB_STEP_SUMMARY}
    echo -n "<pre>" >> ${GITHUB_STEP_SUMMARY}
    cat diagnostics.txt >> ${GITHUB_STEP_SUMMARY}
    echo "</pre>" >> ${GITHUB_STEP_SUMMARY}
    build_failed=1
elif [ $compile_errors -ne 0 ] ; then # Something compiled correctly but not all test directories
	echo "::error::Some code did not compile!"
fi

chmod +x ./.github/helpers/diagnostics-json.py # Give necessary permissions for script to run
python3 ./.github/helpers/diagnostics-json.py # Parse/convert compilation warnings and errors into JSON for Build Annotations workflow
if [[ "$build_failed" == 1 ]] ; then
	exit 1
fi


# Run test files
echo ""
echo -e "Running your test files..."

echo ""

for exe in "${executables[@]}" # Run each exe in regular and Valgrind mode
do
    echo -e "Output from running ${exe}:"
    echo -e "### Output from running ${exe}" >> ${GITHUB_STEP_SUMMARY}
    echo -en "<details closed><summary>Click Here</summary><pre>" >> ${GITHUB_STEP_SUMMARY}
    ./${exe} | tee -a "${GITHUB_STEP_SUMMARY}" # Show the output in both terminal and summary for GitHub Actions
    echo -e "</pre></details>\n" >> ${GITHUB_STEP_SUMMARY}
    echo ""

    echo -e "Valgrind Output from running ${exe}:"
    echo -e "### Valgrind Output from running ${exe}" >> ${GITHUB_STEP_SUMMARY}
    echo -en "<details closed><summary>Click Here</summary><pre>" >> ${GITHUB_STEP_SUMMARY}
    valgrind --error-exitcode=2 --tool=memcheck --leak-check=yes ./${exe} 2>&1 | tee -a ${GITHUB_STEP_SUMMARY} # Show the output in both terminal and summary for GitHub Actions
    if [ "${PIPESTATUS[0]}" -ne "0" ] ; then # Valgrind error, then increment this so process exits with error code 1 (makes X appear on GitHub report)
        ((valgrind_errors++))
    fi
    echo -e "</pre></details>\n" >> ${GITHUB_STEP_SUMMARY}
    echo ""
done

echo "If you prefer to see the full terminal output, click on the build tab on the left, go to Build and run tests, and scroll through the output." >> ${GITHUB_STEP_SUMMARY}

echo -e "\n## Compiler Errors & Warnings" >> ${GITHUB_STEP_SUMMARY}
if [ $compile_errors -ne 0 ] ; then
	echo -e "\xF0\x9F\x9A\xA8 Some code did not compile. Your grade may be a 0 on all associated tests!" >> ${GITHUB_STEP_SUMMARY}
fi
if [ $valgrind_errors -ne 0 ] ; then
    echo -e "\xE2\x9A\xA0 There are Valgrind errors and/or warnings" >> ${GITHUB_STEP_SUMMARY}
fi
if grep -q warning diagnostics.txt || [ $compile_errors -ne 0 ] ; then
	echo -e "\xE2\x9A\xA0 There are compiler warnings\n" >> ${GITHUB_STEP_SUMMARY}
	echo -en "<details closed><summary>Build Log</summary><pre>" >> ${GITHUB_STEP_SUMMARY}
	cat diagnostics.txt >> ${GITHUB_STEP_SUMMARY}
	echo -e "</pre></details>\n" >> ${GITHUB_STEP_SUMMARY}
else
	echo -e "\xE2\x9C\x85 There were no compiler warnings\n" >> ${GITHUB_STEP_SUMMARY}
fi
if [[ $compile_errors -ne 0 || $valgrind_errors -ne 0 ]] ; then # If only some stuff compiled correctly or there was a Valgrind error
	exit 1 # Makes GitHub Actions show an X instead of checkmark
fi