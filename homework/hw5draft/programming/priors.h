#ifndef PRIORS_HPP
#define PRIORS_HPP

#include <string>
#include <unordered_map>
#include <cmath>
#include <iostream>
#include "types.h"

/// A container for the prior distribution.
class Priors {
public:
    /// Initialize a new priors container.
    /// :parameter categories: all possible categories of a record.
    /// :parameter features: all features to classify a record with.
    Priors(const string_set& categories, const string_set& features) {
        string_set::const_iterator it;
        for (it = categories.begin(); it != categories.end(); it++) {
            this->category_likelihood[*it] = 0.0;
            this->category_trained[*it] = 0;
        }
        for (it = features.begin(); it != features.end(); it++) {
            this->feature_likelihood[*it] = this->category_likelihood;
            this->feature_trained[*it] = this->category_trained;
        }
    }

    /// TODO: implement
    /// Add a categorized record to the probability table.
    /// :parameter features: all features the record satisfies.
    /// :parameter category: the category the record falls into.
    void learn(const string_set& features, const std::string& category);

    /// TODO: implement
    /// Pre-compute the log-likelihood probabilities.
    void compute();

    /// TODO: implement
    /// Compute the probability of a record being of a certain category.
    /// :parameter features: all features the record satisfies.
    /// :parameter category: the category to check the probability of the record falling into.
    float probability(const string_set& features, const std::string& category) const;

private:
    /// How many records have thus been used in training.
    int records_trained;

    /// The probability of each category.
    probability_map category_likelihood;

    /// The frequency of record category trained.
    count_map category_trained;

    /// A table crossing features and probabilities with the probability in each cell.
    /// The top level key is the feature, the second level is category, and the final value is the probability of
    /// the category given the feature.
    std::unordered_map<std::string, probability_map> feature_likelihood;

    /// The frequency of records with a feature being in a certain category.
    std::unordered_map<std::string, count_map> feature_trained;
};

#endif
