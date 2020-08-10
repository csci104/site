// Libraries may be included as necessary
#include <stdexcept>
#include "rational.h"

Rational::Rational()
{
    n = 0;
    d = 1;
}

Rational::Rational(int num, int denom)
{

    // Since the denominator cannot be zero an exception is thrown
    if (denom == 0) throw std::invalid_argument("Can't have denom = 0");
    // Continue your implementation below.
    // You should likely call this->reduce() and this->normalize0()


}

void Rational::normalize0()
{
    if (n == 0 && d != 1) d = 1;
}

