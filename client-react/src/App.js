import React, { useState, createContext } from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { UserProvider } from './providers/user_context';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import FeedPage from './components/FeedPage/FeedPage';
import Account from './components/Account/Account';
import "./App.css";

import "./styles/app.css";

export const ThemeContext = createContext(null);

const App = () => {
  const [postList, setPostList] = useState();
  const[theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FeedPage postList={postList} setPostList={setPostList} toggleTheme={toggleTheme} />,
    },
    {
      path: "/:id",
      element: <FeedPage postList={postList} setPostList={setPostList} toggleTheme={toggleTheme} />,
    },
    {
      path: "/registration",
      element: <Registration />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/account",
      element: <Account />,
    },
    
  ])

  return (
    

  <ThemeContext.Provider value={{theme, setTheme}}>
    <div className="container-fluid" id={theme}>
      <div className="main-layout">
      <div className='logo'>
        <h1>
          <font className="logo-text">
            <b>Facebook</b>
          </font>
        </h1>
      </div>
      </div>
        <div className="row top">
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </div>
    </div>
    </ThemeContext.Provider>
  );
};

// import React from 'react';
// import Home from './components/Home';
// import Registration from './components/Registration';

// function App() {
//   return (
//     <Router>
      
//         <Route exact path="/" component={Login} />
//         <Route path="/home" component={Home} />
//         <Route path="/register" component={Registration} /> {/* Add this route */}
      
//     </Router>

// <Login /> {/* Render the Login component */}
//   );
// }



export default App;

