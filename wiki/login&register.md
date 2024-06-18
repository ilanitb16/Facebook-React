# Login and Registration

## Introduction

The login and registration guide for both our app and website. Describes the process of accessing your account and creating a new one.
Login and registration are fundamental features of our facebook app, allowing users to securely access personalized content and features.

Follow the step-by-step instructions below to seamlessly login to your existing account or register for a new one. Additionally, we'll provide insights into how authentication works behind the scenes and offer best practices for maintaining the security of your account credentials.

# Login

## REACT
1. After running the react website as described in the setup guide, the login screen will appear.

2. If you already have an account, type in your username and password. Incorrect username or password will result in failure and access to the website will be denied.

3. Successful login will grant the user access to the Hompage which allows to see 20 posts of friends (sorted by date) and 5 posts of other users (which are NOT the current user).
  
### IMAGES
![image](https://github.com/ilanitb16/Android-App/assets/97344492/7e8f9ddb-9530-4db1-b624-c94a623c5193)
![image](https://github.com/ilanitb16/Android-App/assets/97344492/bca9fd4d-1e7d-4056-a53a-0036f3d14380)

## ANDROID
1. After running the Android app, the following screen will appear:

2. If you already have an account, type in your username and password. Incorrect username or password will result in failure and access to the website will be denied.

3.  Successful login will grant the user access to the Hompage which allows to see 20 posts of friends (sorted by date) and 5 posts of other users (which are NOT the current user).

Note: When logging in the app, a defualt users' credentials will already be filled out, this was on purpose so we would not have to write them up all the time. This could be easily erased. We just thought it would be easier for you to check too.
### IMAGES

![image](https://github.com/ilanitb16/Android-App/assets/97344492/15c24d43-2ba2-49e3-a500-b6b667019c85)

# Registration

1. For registration, click on the "Sign up for Facebook" underneath the login page to get redirected to the registration page.

2. Follow the validation guidelines, making sure the fields all match the requirements. If these requirements are not met, login or registration will not be completed.
- All fields must be non-empty.
- Password must be at least 8 characters long.
- Password must contain both capital and small letters.
- Password must contain numbers.
- Password must contain at least one special character.
- Confirm password must match the password.


## REACT
![image](https://github.com/ilanitb16/Android-App/assets/97344492/addc3b1f-34bb-48bf-ab09-01d2268b6594)

## ANDROID
![image](https://github.com/ilanitb16/Android-App/assets/97344492/d54c2331-5ef6-4d12-a4a4-c3af21f63b7a)


## Authentication
- Login Credentials: When a user attempts to log in, they provide their credentials, in our case a username and password combination.
  
- Client-Server Interaction: Upon entering their credentials, the client (such as a web browser or mobile app) sends a login request to the server. This request contains the user's credentials.

- Server-Side Verification: If a user is found in the system, a JWT token is created, encrypted with a private key which is returned in the body of a response with information about the user. A token is passed in each request as an "Authorization" HTTP header. If not found or expired - a response with a ststus 401 error is returned to the client side.

- In case of registration: A username is transferred from the client side. On the server side, it is checked whether a username already exists in the system.
If it does - a response is returned with status code 409. Otherwise, a new user is registered in the DB.
Logout: When the user chooses to log out, the session is terminated, and any associated session tokens or cookies are invalidated. This prevents unauthorized access to the user's account.

These are our users if you are interested to test them.

![WhatsApp Image 2024-04-25 at 20 07 23_aefd9234](https://github.com/ilanitb16/Android-App/assets/97344492/84bccdf0-e38e-4c2c-8518-e57fc15dcd08)

