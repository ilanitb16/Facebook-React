FROM gcc:latest
WORKDIR /src
COPY . /src
RUN g++ -o Main Main.cpp BitsArray.cpp HashFunctions.cpp InputOutput.cpp
CMD ["./Main"]
