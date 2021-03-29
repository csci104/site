#include "priors.h"

using namespace std;

void Priors::learn(const string_set& features, const std::string& category) {
    this->records_trained++;
    this->category_trained.at(category)++;
    for (string_set::const_iterator it = features.begin(); it != features.end(); it++) {
        this->feature_trained.at(*it).at(category)++;
    }
}

void Priors::compute() {
    int records_trained = max(1, this->records_trained);
    for (probability_map::iterator it = this->category_likelihood.begin(); it != this->category_likelihood.end(); it++) {
        it->second = log((this->category_trained.at(it->first) + 1) / (float)records_trained);
    }
    for (unordered_map<string, probability_map>::iterator it = this->feature_likelihood.begin(); it != this->feature_likelihood.end(); it++) {
        for (probability_map::iterator jt = it->second.begin(); jt != it->second.end(); jt++) {
            jt->second = log((this->feature_trained.at(it->first).at(jt->first) + 1) / (float)max(1, this->category_trained.at(jt->first)));
        }
    }
}

float Priors::probability(const string_set& features, const std::string& category) const {
    float sum = this->category_likelihood.at(category);
    for (string_set::const_iterator it = features.begin(); it != features.end(); it++) {
        sum += this->feature_likelihood.at(*it).at(category);
    }
    return sum;
}
