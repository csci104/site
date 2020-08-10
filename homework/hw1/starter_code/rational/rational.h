#ifndef RATIONAL_H
#define RATIONAL_H
#include <iostream>

/**
 * Models a rational number represented as a numerator and denominator
 */
class Rational
{
public:
    /**
     * Default constructor initializing the rational number to 0/1
     */
    Rational();

    /**
     * Initializes the rational number using 'num' as the numerator
     * and 'denom' as denominator.
     *
     * Stores the rational number in reduced form.
     * Ex. Rational(2,-4) should yield a rational number of -1/2
     */
    Rational(int num, int denom);

    /**
     * Appropriate ostream (insertion) operator '<<'
     *
     * When outputting a Rational simply print the numerator (with the sign),
     * a '/' character, and the denominator.  Thus, if the ostream operator is
     * applied to Rational(2,-4), "-1/2" should be output.  If the ostream
     * operator is applied to Rational(-6,-4), "3/2" should be output.
     */
    friend std::ostream& operator<<(std::ostream& ostr, const Rational& r);

    /**
     * Appropriate istream (extraction) operator '>>'
     *
     * When inputting a Rational, read a numerator, a '/', and a denominator
     * and set the Rational input reference with the appropriate value specified
     * by the values read.
     *
     * Any amount of whitespace may separate the three components
     * (numerator, '/', and denominator).  And the numerator and/or denominator
     * may be negative when read.
     */
    friend std::istream& operator>>(std::istream& istr, Rational& r);

    // Add additional function prototypes here
    // You can discern what additional prototypes are needed
    // by studying test-rational.cpp and figuring out what function
    // call is needed for each rational operation.
    // Use that exercise as a checklist for the prototypes that
    // need to be added here and implemented
    /* Do not make any friend functions unless they are necessary */

private:
    // Private helper functions that you must implement

    /**
     * Divides the numerator and denominator by the gcd
     * thus leaving it in reduced form.
     * 
     */
    void reduce();


    /**
         * If the numerator is 0, sets the denominator to 1
     * to provide a standard representation for 0.
         */
    void normalize0();

    // Private data members
    int n, d;

};

/** You may also add additional functions prototypes here if necessary **/

#endif
