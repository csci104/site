#include <iostream>
#include <string>

using namespace std;

// Abstract base class for the chain of responsibility
class QuestionHandler {
protected:
    QuestionHandler* next;

public:
    QuestionHandler() : next(nullptr) {}
    virtual ~QuestionHandler() {}

    // Set the next handler in the chain
    void setNext(QuestionHandler* nextHandler) {
        next = nextHandler;
    }

    // Handle the question by delegating through the chain
    string handle(string q) {
        if (canAnswer(q)) {
            return answerQueues(q);
        } else if (next != nullptr) {
            return next->handle(q);
        } else {
            return "Sorry, no one can answer that question.";
        }
    }

    // Pure virtual methods to be implemented by concrete handlers
    virtual bool canAnswer(string q) = 0;
    virtual string answerQueues(string q) = 0;
};

// Concrete handler: Teaching Assistant
class TAAnswerer : public QuestionHandler {
public:
    bool canAnswer(string q) override {
        // TA can answer about homework and basic concepts
        return q.find("homework") != string::npos || 
               q.find("syntax") != string::npos;
    }

    string answerQueues(string q) override {
        return "TA: Here's help with " + q;
    }
};

// Concrete handler: Professor
class ProfAnswerer : public QuestionHandler {
public:
    bool canAnswer(string q) override {
        // Professor can answer about algorithms, design, and theory
        return q.find("algorithm") != string::npos || 
               q.find("design") != string::npos ||
               q.find("theory") != string::npos;
    }

    string answerQueues(string q) override {
        return "Professor: The answer to your question about " + q + " is...";
    }
};

// Concrete handler: AI
class AIAnswerer : public QuestionHandler {
public:
    bool canAnswer(string q) override {
        // AI can try to answer anything
        return true;
    }

    string answerQueues(string q) override {
        return "AI: Based on my knowledge base, " + q + " means...";
    }
};

// Student class that asks questions
class Student {
private:
    QuestionHandler* handlers;

public:
    Student() : handlers(nullptr) {}

    void setHandlers(QuestionHandler* handlerChain) {
        handlers = handlerChain;
    }

    void ask(string question) {
        cout << "Student: " << question << endl;
        if (handlers != nullptr) {
            string answer = handlers->handle(question);
            cout << answer << endl;
        } else {
            cout << "No handlers set up!" << endl;
        }
        cout << endl;
    }
};

// Demo program
int main() {
    // Create concrete handlers
    TAAnswerer ta;
    ProfAnswerer prof;
    AIAnswerer ai;

    // Set up the chain: TA -> Professor -> AI
    ta.setNext(&prof);
    prof.setNext(&ai);

    // Create a student
    Student student;
    student.setHandlers(&ta);

    // Ask various questions
    student.ask("Can you help me with homework?");
    student.ask("Explain this algorithm");
    student.ask("What is the weather?");
    student.ask("How do I fix a syntax error?");

    return 0;
}
