#include "classifier.hpp"

using namespace std;

template<class TRecord>
template<template<class> class TDatabase>
void Classifier<TRecord>::train(TDatabase<TRecord> database) {
    static_assert(
        std::is_base_of<Database<TRecord>, TDatabase<TRecord>>::value,
        "TDatabase does not derive virtual database");
    while (!database->empty()) {
        std::pair<TRecord, std::string> next = database->next();
        this->priors.learn(next.first->features(), next.second);
    }
}

template<class TRecord>
string Classifier<TRecord>::classify(TRecord record) const {
    string_set::const_iterator it = this->categories.begin();
    string prediction = *it;
    float highest = this->priors.probability(record->features(), *it);
    for (it++; it != this->categories.end(); it++) {
        float probability = this->priors.probability(record->features(), *it);
        if (probability > highest) {
            prediction = *it;
            highest = probability;
        }
    }
    return prediction;
}
