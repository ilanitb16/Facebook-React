#ifndef HASHFUNCTIONS_H
#define HASHFUNCTIONS_H
#include <vector>
#include <string>
#include "HashFunctions.h"
class HashFunctions {
public:
    HashFunctions(int number);
    bool getHash1();
    bool getHash2();
    std::vector<int> hash1Function(std::string input, int arraySize);
    std::vector<int> hash2Function(std::string input, int arraySize);
    std::vector<int> mixHashArray(std::string inputLine, int arraySize);
private:
    bool hash1;
    bool hash2;
};

#endif