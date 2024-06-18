# Multithreaded Client-Server Application with Bloom Filter Integration

This repository contains the implementation of a multithreaded client-server application with bloom filter integration. The application is designed to handle multiple client connections simultaneously, communicate using a defined protocol, and filter suspicious URLs in posts using a bloom filter.
## Features

- **Multithreading**: The server is implemented to handle multiple client connections concurrently using multithreading, providing efficient communication and responsiveness.
  
- **Protocol Implementation**: A communication protocol is defined and implemented between clients and the server, ensuring structured interaction and data exchange.

- **Bloom Filter Integration**: The application integrates with a bloom filter to filter suspicious URLs in posts, enhancing security and trustworthiness of the content.

## Setup

To run the application, follow these steps:

1.	**Clone the Repository**: Clone this repository to your local machine using the following command:
  ```
  git clone https://github.com/ilanitb16/dynamic-client-server.git
  ```

2. Follow The instructions in the wiki folder under setup.md.

3. Follow The instructions in the wiki folder under execution.md.

## Usage

Once the server and client are running, you can perform the following actions:

- Connect to the server using the client application.
- Send requests to the server.
- Receive responses from the server based on the requested actions.

## NOTE:
Explenation to the person checking this task. For this project we separated from previous teams. Therefore we had to open a new git repository so our projects would be seperated from now on. In the very first commits you can see the react and android code are "inserted" to the folders client-react and client-android. This is because all of the commits were in a different git repo. The contribution to these projects can be found in this repo:

https://github.com/ilanitb16/facebook-ex2.git
https://github.com/ShmuelGranot/Facebook-iso-APP.git

## Detailes on the work proccess: 
The following branches were used:
-	The main branch which is where all the code will be. This is the branch to be checked. After finishing the work on all the branches, they were merged into the main branch. After the tcp was properly functioning, minor changes to the node.js server were made to handle the URLs as requested in the task. 
-	The server-dev branch which includes the react site code along with the code of the node.js server. Note (Ilanit): developed in it prior to the start of this part (on accident, I thought that each part was supposed to have a different repository so I started the development there), which is why you might see some old commits.
-	The android branch. Dedicated to filling in missing parts in previoius code and overall improving this app. It was important to us that the final project will be as good as possible, so we decided to completely improve it and submit a new version in hopes that this would effect the project for the better.
-	The tcp-server branch. A branch used for developing the multithreaded tcp server. The integration of the bloom filter was also done there. Also minor changes in the node.js server.

None of the branches were deleted after the merge on purpose so the work flow would be clear and easier to check. The final version is in the main branch.
