#include <vector>
#include <sstream>
#include "HashFunctions.h"

//constructor
HashFunctions::HashFunctions(int number) {
    this->hash1 = number == 1;
    this->hash2 = number != 1;
}

//return if need to use the first function
bool HashFunctions::getHash1(){
    return this->hash1;
}

//return if need to use the second function
bool HashFunctions::getHash2(){
    return this->hash2;
}

//make an "array" of bits, if need to use the hash1 function,
//do hash and fill the array by modelo of the URL
std::vector<int> HashFunctions::hash1Function(std::string input, int arraySize) {
    std::vector<int> bits(arraySize, 0);
    if (this->hash1) {
        std::hash<std::string> hasher;
        size_t copy = hasher(input);
        size_t value = copy % arraySize;
        bits[value] = 1;
    }
    //return the array
    return bits;
}

//make an "array" of bits, if need to use the hash2 function,
//do hash, do it again and fill the array by modelo of the URL
std::vector<int> HashFunctions::hash2Function(std::string input, int arraySize) {
    std::vector<int> bits(arraySize, 0);
    if (this->hash2) {
        std::hash<std::string> hasher;
        size_t copy = hasher(input);
        //convert to string and do it again
        copy = hasher(std::to_string(copy));
        size_t value = copy % arraySize;
        bits[value] = 1;
    }
    return bits;
}

//get the arrays from the hashing of the URL and make from them one array
std::vector<int> HashFunctions::mixHashArray(std::string inputLine, int arraySize) {
    std::vector<int> hash1 = this->hash1Function(inputLine, arraySize);
    std::vector<int> hash2 = this->hash2Function(inputLine, arraySize);
    //make new array
    std::vector<int> bits(arraySize, 0);
    //if there is 1 in one of the arrays, in the new one will be 1 too
    for (int i = 0; i < hash1.size(); i++) {
        if ((hash1[i] == 1) || (hash2[i] == 1)) {
            bits[i] = 1;
        }
    }
    //return the new array
    return bits;
}