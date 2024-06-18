import "./FeedPage.css";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../providers/user_context';
import Menu from "../Menu/Menu.js";
import Search from "../Search/Search.js";
import PostListReslts from "../PostListResults/PostListResults.js";
import Info from "../Info/Info.js";
import NewPost from "../NewPost/NewPost.js";
import { getPosts, getUserPosts,getUser,getUserFriends } from '../../GeneralFunctions.js';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Loader from "../Loader/Loader.js"; 

function FeedPage({ postList, setPostList, toggleTheme, currentUser}) {
  const [user, setUser] = useUser();
  const [newPostInput, setNewPostInput] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [friendsList, setFriendsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const getPostslist = async() => {
    return new Promise(async (resolve, reject) => {
      let list;
      if(params && params.id){
        list = await getUserPosts(params.id);
      }
      else{
        list = await getPosts();
      } 
      resolve(list);
    })
    
  }

  const doSearch =  async(q) => {
    if (q == '' || !q){
      let list = await getPostslist();
      setPostList(list);
      return
    }
    let searched = postList.filter((post) => {
      if(post.title && post.title.indexOf(q) > -1){
        return post;
      }
    })
    if(searched){
      setPostList(searched)
    }
  };

  let user_name = user?.username;
  let user_photo = user?.profilePic;

  useEffect(() => {
    if((user && params && params.id && params.id !== user.username) || !params.id){
       setNewPostInput(false)
    }
    const initPostlist = async() => {
      setIsLoaded(true);
      let list = await getPostslist();
      if(list && list.length == 0){
        setIsLoaded(false);
        if(params.id !== user?.username)
          alert ("There are no suitable posts");
      }
      setPostList(list);
      setIsLoaded(false);
    }

    const initFriendslist = async(user) => {
      let list = await getUserFriends(user.username)
      if(list && list.friends)
        setFriendsList(list.friends);
    }

    const initData = async() => {
      if(!user){
        let token = localStorage.getItem("AuthorizationToken")
        if(!token){
          navigate("/login");
          return;
        }
        let decoded = jwtDecode(token);
        let userResult = await getUser(decoded.username);
        if(userResult){
          setUser(userResult);
          user_name = userResult?.username;
          user_photo = userResult?.profilePic;
          initPostlist();
          initFriendslist(userResult)
        }
        
      }
      else{
        user_name = user?.username;
        user_photo = user?.profilePic;
        initPostlist();
        initFriendslist(user)
      }
     
    }

    initData()

    
  }, [params.id]);



  return (
    <React.Fragment>
      <Menu toggleTheme={toggleTheme} setNewPostInput={setNewPostInput} friendsList={friendsList} setFriendsList={setFriendsList} />
      {!isLoaded ? 
        <div className="col-9 main-content">
          <Search doSearch={doSearch} />
          {newPostInput && (
            <NewPost postList={postList} setPostList={setPostList} user_name={user_name} user_photo={user_photo} newPostInput={newPostInput} setNewPostInput={setNewPostInput}/>
          )}
          <PostListReslts posts={postList} postList={postList} setPostList={setPostList} user_name={user_name} user_photo={user_photo} friendsList={friendsList} setFriendsList={setFriendsList} />
          <div><label></label></div>
          <div><label></label></div>
          <div><label></label></div>
        </div>
        :
        <Loader/>
      }
      {user &&
        <Info user_name={user?.displayName} user_photo={user?.profilePic}/>
      }   
      
      
    </React.Fragment>
  );
 
  
}

export default FeedPage;
