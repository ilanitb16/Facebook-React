import FeedPage from "../components/FeedPage/FeedPage";
import posts from "../components/postItem/allPosts.json";

import { UserProvider } from '../providers/user_context';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

describe('FeedPage test', () => {
  let user =  { username: 'user1', password: 'Password1!', photo: '/profile/layla.jpeg' };

  it('renders without crashing', () => {
    render(<BrowserRouter><UserProvider><FeedPage currentUser={user} postList={posts} setPostList={()=>{}} toggleTheme={()=>{}} /></UserProvider></BrowserRouter>);

    // login was successful 
    expect(window.location.pathname).toBe('/');
    expect(screen.getByText('aston martin')).toBeInTheDocument();
    expect(screen.getByText('dogging :)')).toBeInTheDocument();
  });


  it('displays search input', () => {
     render(<BrowserRouter><UserProvider><FeedPage currentUser={user} postList={posts} setPostList={()=>{}} toggleTheme={()=>{}} /></UserProvider></BrowserRouter>);
    expect(screen.getByPlaceholderText('Search Facebook')).toBeInTheDocument();
  });
});