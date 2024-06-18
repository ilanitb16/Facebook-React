#include "BitsArray.h"
#include "HashFunctions.h"
#include <utility>
#include <vector>

//constructor
BitsArray::BitsArray(int hashNumber, int size) : hashFunctions(hashNumber) {
    //the size of the array
    this->size = size;
    //the array itself
    this->array = std::vector<int>(size, 0);
}

//getting the size of the array
int BitsArray::getArraySize() const {
    return this->size;
}

//getting the array itself
std::vector<int> BitsArray::getArray() {
    return this->array;
}

//add the URL by hash and by name to the system
void BitsArray::addURL(std::vector<int> bitsarray, std::string URL) {
    //add the URL by his hash result
    for (int i = 0; i < this->size; i++) {
        if (bitsarray[i] == 1) {
            this->array[i] = 1;
        }
    }
    //add the URL to the list of black list  URLs
    this->URLarray.push_back(URL);
}

//check if URL (by array after hashing) is in the system
bool BitsArray::blackListed(std::vector<int> bitsarray) {
    //if return true the URL is indeed in the list
    for (int i = 0; i < this->getArraySize(); i++) {
        if (this->array[i] == 0 && bitsarray[i] == 1) {
            return false;
        }
    }
    return true;
}


//checking if the URL is in the black listed URL
bool BitsArray::checkFalsePossitive(std::string checkURL) {
    for (int i = 0; i < this->URLarray.size(); i++){
        if (URLarray[i] == checkURL) {
            return true;
        }
    }
    return false;
}
//getting the hashing result and add the URL to the black list
void BitsArray::addURLToBitsArray(const std::string& url) {
    std::vector<int> hash = this->hashFunctions.mixHashArray(url, this->getArraySize());
    this->addURL(hash, url);
}

//checking out if the URL is in the system by his hashing array
bool BitsArray::searchURLInBitArray(std::string url) {
    //get the hash result
    std::vector<int> checking = this->hashFunctions.mixHashArray(std::move(url), this->getArraySize());
    //check if the URL is in the system
    return this->blackListed(checking);
}


//checks what to do, insert or search and do it
bool BitsArray::bloomFilter(int commandNumber, const std::string& url) {
    // FILTER_ADD - add the url to blacklist
    if (commandNumber == FILTER_ADD) {
        this->addURLToBitsArray(url);
        return true;
    }

    // FILTER_CHECK - check if the url is in the blacklist
    if (commandNumber == FILTER_CHECK) {
        //checking out if the URL is in the system by his hashing array
        bool blackList = this->searchURLInBitArray(url);

        //checking if the URL is in the black listed URL
        bool falsePositive = this->checkFalsePossitive(url);

        return blackList; // && !falsePositive;
    }

    return false;
}
