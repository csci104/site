import os, sys

number_of_tests = 50
executable_name = 'Facile'
for i in range(1, number_of_tests + 1):
	os.system('./' + executable_name + ' test_input/facile_test' + str(i) + '.txt test_output/facile_output' + str(i) + '.txt')