# Compilation and Execution

## Introduction
This guide explains how to compile and run the application.

## Compiling Server-Side Code

1. Modify the `.env` file. Change the IP address to the address of your machine (VM).
2. To start the server, navigate to the server directory `cd server`
3. Then run:`Node index.js`
4. When asking to run in a different port- type yes. 
   I 
This command will start a development server, and the application will be accessible at `http://localhost:3000` by default.

NOTE: If you made any modifications in our project, to access the app on the server, you must run: `npm run build` in the client-react directory first, then copy it's content into public folder in the client-react directory and then run node.js server as described above. 

## Usage
Once the application is running, you can access it via a web browser by navigating to `http://localhost:3000`. From there, you can register as a new user, log in with existing credentials, view your feed, post new content, manage friends, and perform other actions as described in the features section.

3. Then run the tcp server using the Virtual Machine or any linux computer.
4. Navigate to the tcp directory `cd tcp`.
5. Then navigate to the server directory `cd server`.
6. Run the code.

## Compiling Client-Side Code

### REACT
1. Navigate to the project directory:`cd client-react`
2. Make sure all the necessary dependancies are installed.
3. Run `npm start`.

### ANDROID
1. Navigate to the project directory:`cd client-android`  
2.Before running the android app, follow the following steps:
3. `cd Java`
4. `cd com.isof.acebook`
5. `cd api`
6. `cd endPoints`
7. change the first line `public static final String baseUrl = "http://10.0.0.17:3000"; ` to the ip address of the computer the node.js is ran on.
IMPORTANT NOTE: Both the phone and the computer should be connected to the same network.
