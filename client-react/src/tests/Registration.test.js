import Registration from "../components/Registration.js";
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

describe('Registration test', () => {
  it('displays error message for empty username and password', () => { 
    render(<BrowserRouter><Registration /></BrowserRouter>);
    fireEvent.click(screen.getByText('sign up')); // Simulate login button click

    expect(screen.getByText('Name and last name are required.')).toBeInTheDocument();
    expect(screen.getByText('Username is required.')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();
  });

  it('test registration proccess', () => { 
    render(<BrowserRouter><Registration /></BrowserRouter>);
  
    // Simulate entering username and password
    fireEvent.change(screen.getByPlaceholderText('First name'), {target: {value: 'Laila'}});
    fireEvent.change(screen.getByPlaceholderText('Last name'), {target: {value: 'Michailovna'}});

    fireEvent.click(screen.getByText('sign up')); // Simulate signup button click
    expect(screen.getByText('Password must be at least 8 characters long.')).toBeInTheDocument();
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('User Name'), {target: {value: 'superdog'}});
    fireEvent.change(screen.getByPlaceholderText('Password'), {target: {value: 'pass!357'}});

    fireEvent.click(screen.getByText('sign up')); // Simulate signup button click
    expect(screen.getByText('Please confirm your password.')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {target: {value: 'pass!357'}});

    fireEvent.click(screen.getByText('sign up')); // Simulate signup button click

    // Registration was successful 
    expect(window.location.pathname).toBe('/')
  });
});

