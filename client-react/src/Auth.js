// src/services/AuthService.js

// Simulated user data (will be replaced with actual user data later on)
export const users = [
    { username: 'user1', password: 'Password1!', photo: '/profile/layla.jpeg' },
    { username: 'laili', password: 'Password2!', photo: '/profile/laylaFlower2.jpg' },
    { username: 'laylaber', password: 'Layla1!', photo: '/profile/laylaFunny.jpg' },
];
  
export const authenticateUser = (username, password) => {
  // authentication logic
  const user = users.find((user) => user.username === username && user.password === password);

  if (user) {
    // Authentication successful

    return user;
  } else {
    // Authentication failed
    return null;
  }
};

export default {
  users,
}
  