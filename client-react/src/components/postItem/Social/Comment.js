import React, { useState } from "react";
import './Social'; // Import the CSS file for registration styles
import { useEffect } from "react";
import { useUser } from '../../../providers/user_context.js';
import { getPosts,updateUserPost,getUserPosts} from '../../../GeneralFunctions.js';
import { useParams } from 'react-router-dom';

function Comment({ commentPressed, user_name, user_photo,post,postList, setPostList,comments, setComments }) {
  const [commentContent, setCommentContent] = useState(""); //current comment being typed
  const [editIndex, setEditIndex] = useState(null); //track of the index of the comment
  const [showIcons, setShowIcons] = useState(false); //show the editing icon
  const [user, setUser] = useUser();
  const params = useParams();

  useEffect(() => {
    if(!post.comments){
      post.comments = [];
      setComments(post.comments)
    }
    
  },[post])
  
  

  const handleCommentChange = (event) => {
    setCommentContent(event.target.value);
  };

  const noEmptyComment = () => {
    if (commentContent.trim() === "") {
      return;
    }
    let newComment = {
      username:user.username,
      displayName:user.displayName,
      profilePic:user.profilePic,
      description:commentContent
    }
    if (editIndex !== null) {
      post.comments.splice(editIndex,1,newComment)
      setEditIndex(null);
    } else {
      post.comments.push(newComment)
      setCommentContent("");
      
    }
    setComments(post.comments);
    updatePost()
  };

  const handleEditComment = (index) => {
    setEditIndex(index);
    setCommentContent(comments[index].description);
    setShowIcons(!showIcons);
  };

  const handleDeleteComment = (index) => {
    let updatedComments = comments.filter((_, i) => i !== index);
    post.comments = updatedComments;
    setComments(post.comments);
    updatePost()
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
    <span className="comment-container">
      {commentPressed && (
        <div className="comments-section">
          <div className="comment-input">
            <input
              type="text"
              value={commentContent}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
              onKeyPress={(event) => event.key === "Enter" && noEmptyComment()}
            />
            <button className="post-comment" onClick={noEmptyComment}>
              Post Comment
            </button>
            <button className="edit-comments" onClick={() => setShowIcons(!showIcons)}>
              Edit Comments
            </button>
          </div>
          <div className="comments" style={{ height: "120px", overflowY: "auto" }}>
            {comments?.map((comment, index) => (
              <div key={index} className="comment-item">
                <img className="img-profile-comments" src={comment.profilePic} alt="..." /><label className="userInfoComment">
                <b >{"@" + comment.displayName + ": "}</b>
                {comment.description}</label>
                {showIcons && (
                  <span className="comment-actions">
                    <i className="icon editComment bi bi-sliders" onClick={() => handleEditComment(index)}></i>
                    <i className="icon bi bi-trash3" onClick={() => handleDeleteComment(index)}></i>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </span>
  );
}

export default Comment;
