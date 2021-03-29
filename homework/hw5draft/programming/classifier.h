#ifndef CLASSIFIER_HPP
#define CLASSIFIER_HPP

#include <string>
#include "types.hpp"
#include "priors.hpp"

class Record {
public:
    /// Get a set of all features this record satisfies.
    virtual string_set features() const = 0;
};

/// A database used for training a classifier.
template<class TRecord>
class Database {
    // Assert that TRecord implements virtual methods at compile time
    static_assert(
        std::is_base_of<Record, TRecord>::value,
        "TRecord does not derive virtual Record");

public:
    /// Get a classified record from the database.
    /// Throws an exception if there are no more.
    virtual std::pair<TRecord, std::string> next() = 0;

    /// Reports whether there are any records left in the database.
    virtual bool empty() = 0;
};

/// A classifier for a specific type of record.
/// :template TRecord: the record type the classifier should operate on.
template<class TRecord>
class Classifier {
    static_assert(
        std::is_base_of<Record, TRecord>::value,
        "TRecord does not derive virtual Record");

public:
    /// Initialize a classifier with all categories and features.
    /// :parameter categories: all possible categories of a record.
    /// :parameter features: all features to classify a record with.
    Classifier(const string_set& categories, const string_set& features) :
        categories(categories), priors(categories, features) {}

    /// TODO: implement
    /// Train the classifier with a database of records.
    /// For practice, try adding a static assert that makes sure the database
    /// type inherits from the virtual Database.
    /// :template TDatabase: a database class that can yield TRecords.
    /// :parameter database: the database to read classified records from.
    template<template<class> class TDatabase>
    void train(TDatabase<TRecord> database);

    /// TODO: implement
    /// Classify a record as a category.
    std::string classify(TRecord record) const;

private:
    /// All possible categories in the classifier.
    const string_set categories;

    /// The prior distribution container used for classification.
    Priors priors;
};

#endif
