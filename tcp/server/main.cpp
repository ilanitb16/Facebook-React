#include <iostream>
#include <sys/socket.h>
#include <cstdio>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>
#include <thread>

#include "BitsArray.cpp"
#include "HashFunctions.cpp"

BitsArray bitsArray(2, 256);

void handle_connection(int client_sock){
    char buffer[4096];
    memset(buffer, 0, 4096);

    int expected_data_len = sizeof(buffer);
    int read_bytes = recv(client_sock, buffer, expected_data_len, 0);

    std::cout << "data received: " << read_bytes << "\n";

    if (read_bytes == 0){
        std::cout << "connection closed\n";
        // connection is closed
    }
    else if (read_bytes < 0) {
        std::cout << "data is empty\n";
    }
    else {
        char data[read_bytes];

        std::string url( reinterpret_cast<char const* >(buffer)) ;
//        std::cout << "DATA:" << url << "\n";

        bool isForbidden = bitsArray.bloomFilter(FILTER_CHECK, url);

        std::string res = isForbidden ? "FORBIDDEN" : "ALLOWED";
        std::byte bytes[res.length()];
        std::memcpy(bytes, res.data(), res.length());

        int sent_bytes = send(client_sock, bytes, res.length(), 0);
        std::cout << url << ": " << res << "\n";

//        std::string res = "Hello Mike!";
//        std::byte bytes[res.length()];
//        std::memcpy(bytes, res.data(), res.length());
//        int sent_bytes = send(client_sock, bytes, res.length(), 0);
        //int sent_bytes = send(client_sock, buffer, read_bytes, 0);

        if (sent_bytes < 0){
            perror("error sending to client");
        }

        std::cout << "SENT: " << sent_bytes << "\n";
    }

    close(client_sock);
}

void start_listening(int socket){
    while(1){
        struct sockaddr_in client_addr;
        socklen_t client_addr_len = sizeof(client_addr);

        listen(socket, 5);
        int client_sock = client_sock = accept(socket, (struct sockaddr *) &client_addr, &client_addr_len);
        std::cout << "accepted\n";

        if(client_sock < 0){
            perror("Error: Failed to connect to incoming connection.\n");
        }

        //Start new thread to handle request
        std::thread t1 (&handle_connection, client_sock);
        t1.detach();
    }
}

int main()
{
    std::cout << "started\n";

    bitsArray.bloomFilter(FILTER_ADD, "https://google.com");
    bitsArray.bloomFilter(FILTER_ADD, "https://youtube.com");

    std::cout << "blacklist initialized\n";

    bool isGoogleForbidden = bitsArray.bloomFilter(FILTER_CHECK, "https://google.com");
    bool isYoutubeForbidden = bitsArray.bloomFilter(FILTER_CHECK, "https://youtube.com");
    bool isFacebookForbidden = bitsArray.bloomFilter(FILTER_CHECK, "https://facebook.com");

    std::cout << "GOOGLE FORBIDDEN: " << isGoogleForbidden << "\n";
    std::cout << "YOUTUBE FORBIDDEN: " << isYoutubeForbidden << "\n";
    std::cout << "FACEBOOK FORBIDDEN: " << isFacebookForbidden << "\n";

    const int server_port = 5555;
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    std::cout << "socket created\n";

    if (sock < 0) {
        perror("error creating socket");
    }

    struct sockaddr_in sin;

    memset(&sin, 0, sizeof(sin));

    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);

    if (bind(sock, (struct sockaddr*)&sin, sizeof(sin)) < 0){
        perror("error binding socket");
    }

    start_listening(sock);
    return 0;
}


