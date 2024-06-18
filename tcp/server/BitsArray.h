#ifndef BITSARRAY_H
#define BITSARRAY_H
#include <vector>
#include "HashFunctions.h"
#include <string>

#define FILTER_ADD 1
#define FILTER_CHECK 2

class BitsArray {
public:
    BitsArray(int hashNumber, int size);
    int getArraySize() const;
    std::vector<int> getArray();
    void addURL(std::vector<int> bitsarray, std::string URL);
    bool blackListed(std::vector<int> bitsarray);
    bool checkFalsePossitive(std::string checkURL);
    void addURLToBitsArray(const std::string& inputLine);
    bool searchURLInBitArray(std::string inputLine);
    bool bloomFilter(int commandNumber, const std::string& URL);

private:
    int size;            // Size of the array
    HashFunctions hashFunctions;
    std::vector<int> array;  // Vector to store the bits
    std::vector<std::string> URLarray; //Vector to store the blacklist URL's
};

#endif