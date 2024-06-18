import React from 'react';
import { useState } from "react";
import { useUser } from '../../providers/user_context';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { approveFriendsRequest,getUser,deleteFriendsRequest,deleteUser } from '../../GeneralFunctions.js';
import "./Menu.css";

function Menu({toggleTheme, setNewPostInput, friendsList, setFriendsList}) {
  const [user, setUser] = useUser();
  const [mode, setMode] = useState(false);
  const navigate = useNavigate();
  const [showFriends, setShowFriends] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const logout = ()=> {
    setUser(null);
    localStorage.removeItem("AuthorizationToken");
    navigate('/login')
  }

  const approveRequest = async(requestUsername)=>{
    let result = await approveFriendsRequest(user.username,requestUsername, );
    if(result){
      let response = await getUser(user.username);
      setUser(response);
      setFriendsList(user.friends)
      
    }
  }

  const removeRequest = async(requestUsername)=>{
    let result = await deleteFriendsRequest(user.username,requestUsername );
    if(result){
      let response = await getUser(user.username);
      setUser(response);
      setFriendsList(user.friends)
      
    }
  }
  
  const deleteAccount = async() =>{
    let result = await deleteUser(user._id);
    if(result && result.deletedCount > 0){
      localStorage.removeItem("AuthorizationToken");
      navigate('/registration')
    }
    
  }
  return (
    <div className="menu col-2 vh-100">
      <ul className="list-group side-menu">
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="home w-100 m-1 ms-3" onClick={handleScrollToTop}>
              <i className="bi bi-house-fill bi-menu"></i>
              <label>
                <Link  className="textMenu link" to="/">Home</Link>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
          <Link  to={`/${user?.username}`} className="newPost w-100 m-1 ms-3" onClick={() => {setNewPostInput(true);handleScrollToTop()}}>
              <i className="bi bi-plus-circle-fill link bi-menu"></i>
              <label>
                <div className="textMenu link">New Post</div>
              </label>
            </Link>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myAccount w-100 m-1 ms-3">
              <i className="bi bi-person-circle bi-menu"></i>
              <label>
                <Link className="textMenu link" to="/account">My account</Link>
                {/* <div className="textMenu"></div> */}
              </label>
            </span>
          </div>
        </li>

        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myAccount w-100 m-1 ms-3">
              <i className="bi bi-x-circle-fill bi-menu"></i>
              <label>
                <div className="textMenu link" onClick={() => { deleteAccount();}}>Delete account</div>
                {/* <div className="textMenu"></div> */}
              </label>
            </span>
          </div>
        </li>
        
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myAccount w-100 m-1 ms-3" onClick={() => { logout();}}>
            <i className="bi bi-box-arrow-right bi-menu"></i>
              <label>
                <div className="textMenu">Log out</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
          <span className="myAccount w-100 m-1 ms-3" onClick={() => { toggleTheme(); setMode(!mode); }}>
            <i
          className={`bi bi-menu bi-toggle-${mode ? "on" : "off"}`}
        ></i>
              <label>
                <div className="textMenu">Change Mode</div>
              </label>
            </span>
          </div>
        </li>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myFriends w-100 m-1 ms-3" onClick={() => setShowFriends(!showFriends)}>
            <i className="bi bi-people-fill bi-menu"></i>
              <label>
                <div className="textMenu inline">My friends</div>
              </label>
            </span>
          </div>
        </li>
        
        <div className="friends-list">
          {(user?.friends && user?.friends.length > 0) && (
            <div>
              <ul>
                {user?.friends.map((friend, index) => (
                <li key={index}>
                  <img src={friend.profilePic} className="friend-img" alt="..." />
                  <span className='friend-name'>{friend.displayName}</span>
                </li>
                ))}
              </ul>
            </div>
          )}
          
        </div>
        <li className="list-group-item d-flex align-items-center">
          <div className="menuObject">
            <span className="myFriends w-100 m-1 ms-3">
            <i className="bi bi-person-fill-add bi-menu"></i>
              <label>
                <div className="textMenu inline">Friends request</div>
              </label>
            </span>
          </div>
        </li>
        <div className="friends-list">
          {(user?.friendsRequest && user?.friendsRequest.length > 0) && (
            <div>
              <ul>
                {user?.friendsRequest.map((requestUser, index) => (
                  <li className='req' key={index}>
                    <img src={requestUser.profilePic} className="friend-img" alt="..." />
                    <span className='friend-name'>{requestUser.displayName}</span>
                    <span className='approve' onClick={() => { approveRequest(requestUser.username)}}>
                      <i className="bi bi-person-plus-fill bi-menu"></i>
                    </span>
                    <span className='remove' onClick={() => { removeRequest(requestUser.username)}}>
                      <i className="bi bi-person-x-fill bi-menu"></i>
                    </span>
                  </li>
                ))}
                
              </ul>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Menu;
