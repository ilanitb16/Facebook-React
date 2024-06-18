import React, { createContext, useState } from 'react';

const initialState = {
  user: {
    authenticated: false
  }
}; 

const UserContext = createContext(initialState.user);
const UserDispatch= createContext();
const UserInitializer = createContext();

const UserProvider = ({ children }) => {
    const [user, setUserInner] = useState();

    const setUser = (user) => {
        setUserInner(user);
    }

    const initUser = () => {
        setUserInner(initialState.lists);
    }

    return (
        <UserContext.Provider value={user}>
            <UserDispatch.Provider value={setUser}>
                <UserInitializer.Provider value={initUser}>
                    {children}
                </UserInitializer.Provider>
            </UserDispatch.Provider>
        </UserContext.Provider>
    );
}

const useUser = () => {
    return [
        React.useContext(UserContext),
        React.useContext(UserDispatch),
        React.useContext(UserInitializer)
    ]
}

export {UserProvider, useUser}