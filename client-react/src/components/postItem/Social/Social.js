import "./Social.css";
import React, { useState } from "react";
import { useEffect } from "react";
import Share from "./Share";
import Comment from "./Comment";
import { useParams } from 'react-router-dom';
import { getPosts,updateUserPost,getUserPosts} from '../../../GeneralFunctions';
import { useUser } from '../../../providers/user_context.js';

function Social({user_name, user_photo,post,postList,setPostList}) {
  const [user, setUser] = useUser();
  const isPressed = () => {
    return post.likes && post.likes.length > 0 && post.likes.some((like) => like.username === user?.username)
  }
  const params = useParams();
  const [likePressed, setLlikePressed] = useState(isPressed());
  const [commentPressed, setCommentPressed] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    if(!post.likes){
      post.likes = [];
      setLikes(post.likes)
    }
  },[post])

  const handleClickLike = () => {
    if(post.likes && post.likes.length > 0 && post.likes.some((like) => like.username === user.username)){
      let updatedLikes = post.likes.filter((like) => like.username !== user.username);
      post.likes = updatedLikes;
    }
    else{
      let newLike = {
        username:user.username,
        displayName:user.displayName,
        profilePic:user.profilePic,
      }
      post.likes.push(newLike)
    }
    setLikes(post.likes);
    setLlikePressed(isPressed());
    updatePost()
  };

  const handleClickComment = () => {
    setCommentPressed((pressed) => !pressed);
  };

  const updatePost = async () => {
    const updatedPost = {...post};
    await updateUserPost(updatedPost.userName, updatedPost._id, updatedPost);
    let response;
    if(params && params.id){
      response = await getUserPosts(params.id);
    }
    else{
      response = await getPosts();
    }  
    setPostList(response);
  };


  return (
    <div>
      <div className="icon social">
        <span className="likeButton">
        <i
            className={`bi bi-social bi-hand-thumbs-up${likePressed ? "-fill" : ""}`}
            style={{ fontSize: "1.3rem", cursor: "pointer" }}
            onClick={handleClickLike}
          ></i>
          {likes && likes.length > 0 && (
            <span className="commentsCount">{likes.length}</span>
          )}
          
        </span>
        <span
        className="commentButton"
        onClick={() => {
          setCommentPressed(!commentPressed);
        }}
        >
         
        <i
          className={`bi bi-social bi-chat${commentPressed ? "-fill" : ""}`}
          style={{ fontSize: "1.3rem", cursor: "pointer" }}
          onClick={handleClickComment}
        ></i>
        {comments && comments.length > 0 && (
            <span className="commentsCount">{comments.length}</span>
        )} 
      </span>
        {/* <Share /> */}
      </div>
      <div className="commentSection">
  
      <Comment commentPressed={commentPressed} user_name={user_name} user_photo={user_photo} post={post} postList = {postList} setPostList = {setPostList} comments={comments} setComments={setComments}  />
      </div>
    </div>
  );
}
export default Social;
