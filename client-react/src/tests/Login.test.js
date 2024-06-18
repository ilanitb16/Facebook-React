import React from 'react';
import Login from "../components/Login.js";
import { UserProvider } from '../providers/user_context';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

describe('Login test', () => {
  it('displays error message for empty username and password', () => { 
    render(<BrowserRouter><Login /></BrowserRouter>);
      fireEvent.click(screen.getByText('Login')); // Simulate login button click
      expect(screen.getByText('Incorrect username or password. Please try again.')).toBeInTheDocument();
  });

  it('validates login with correct username and password', () => {

    // Render the Login component
    render(<BrowserRouter><UserProvider><Login /></UserProvider></BrowserRouter>);
    
    // Simulate entering username and password
    fireEvent.change(screen.getByPlaceholderText('Username'), {target: {value: 'user1'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: 'Password1!'}});

    // Simulate login button click
    fireEvent.click(screen.getByText('Login'));

    // login was successful 
    expect(window.location.pathname).toBe('/')
  });
});