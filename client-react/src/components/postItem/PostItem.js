import "./PostItem.css";
import React, { useState } from "react";
import Social from "./Social/Social";
import EditPost from "./EditPost";
import { getPosts,updateUserPost,getUserPosts,friendsRequest,getUser  } from '../../GeneralFunctions.js';
import {Link} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useUser } from '../../providers/user_context';


function PostItem({
  postList,
  setPostList,
  _id,
  title,
  username,
  description,
  create_date,
  profilePic,
  displayName,
  likes,
  comments,
  img,
  user_name,
  user_photo,
  friendsList,
  setFriendsList,
  post
}) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newImg, setNewImg] = useState(img);
  const [imageName, setImageName] = useState("No file choosen");
  const params = useParams();
  // const [isFriendOrCurrentUser, setIsFriendOrCurrentUser] = useState(
  //   friendsList && (friendsList.includes(username) || username === user_name)
  // );
  const [user, setUser] = useUser();

  const updatePost = async () => {
    let searched = postList.find((post) => post._id == _id );
    if(searched){
      const updatedPost = {...searched, title: newTitle, description: newDescription, img: newImg};
      await updateUserPost(user_name, updatedPost._id, updatedPost);
      let response;
      if(params && params.id){
        response = await getUserPosts(params.id);
      }
      else{
        response = await getPosts();
      }  
      setPostList(response);
    }
    setEditMode(false);

  };

  const isAuthUser = () => {
    return params && params.id && params.id === user.username
  }

  const deleteChanges = () => {
    setNewTitle(title);
    setNewDescription(description);
    setNewImg(img);
    setImageName("No file choosen")
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewImg(reader.result);
    };
    if(file) {
      setImageName(file.name)
      reader.readAsDataURL(file);
    }
  };

  const handleFriendRequest = async() => {
    if(user){
      let response =  await friendsRequest(username)
      if(response.modifiedCount > 0){
        alert ('Your request was sent successfully')
      }
      else if(response.message){
        alert (response.message)
      }
      
      // setIsFriendOrCurrentUser(true);
    }
    
  };

  const getDate = () => {
    if(create_date){
      const date = new Date(create_date);
      return `${date.getDate()}/${date.getMonth() + 1 }/${date.getFullYear()}`
    }
  }

  return (
    <div className="row post">
      <div className="col-5"></div>
      
      <div className="col-6 main-content">
      <div className="card" href="details.html">
        <div className="row top-card">
          <div>
            <p className="card-author">
              
              {!isAuthUser() ?
              <div className="flex-display">
                <div>
                  <Link to={`/${username}`} >
                    <span className="authorInfo">
                      <img className="img-profile" src={profilePic} alt="..."></img>
                      <b className="display-name">{"@" + displayName}</b>
                    </span>
                  </Link>
                  <span className="w-90 text-end">
                    <i className="addFriend bi bi-person-fill-add bi-friend" style={{ fontSize: "1.6rem" }} onClick={handleFriendRequest}></i>
                  </span>
                </div>
                <span className="item-date">{" " + getDate()}</span>
              </div>
              : 
              <div className="flex-display">
                <div>
                  <div >
                    <span className="authorInfo">
                      <img className="img-profile" src={profilePic} alt="..."></img>
                      <b className="display-name">{"@" + displayName}</b>
                    </span>
                  </div>
                </div>
                <div>
                  <span>{" " + getDate()}</span>
                  <div className="edit-area">
                  <EditPost
                  _id = {_id}
                  title={title}
                  postList={postList}
                  setPostList={setPostList}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  deleteChanges={deleteChanges}
                  username={user_name}
                  
                  />
                </div>
                </div>
              </div> 
              }
            </p>
          </div>
        </div>
        <div className="line"></div>   
        <div className="card-body">
          {!editMode && (
            <div>
              <h5 className="card-title">{title}</h5>
              <p className="card-description">{description}</p>
            </div>
          )}
          {editMode && (
            <div className="editPost">
              <label className="edit-label">Title:</label>
              <input
                className="edit-input"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <br />
              <div className="description">
                <label className="edit-label">Description:</label>
                <textarea
                  className="edit-desc"
                  rows="1"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="editImg">
                <label for="file-upload" className="edit-image-input">
                    Choose File
                </label>
                <span className="edit-img-title">{imageName}</span>
                <input id="file-upload" type="file" onChange={handleImageChange} />
              </div>
              <div className="editButtons">
                <button key="update" className="edit-btn update" onClick={updatePost} >
                  Update
                </button>
                <button
                  key="cancel"
                  onClick={() => {
                    deleteChanges();
                    setEditMode(false);
                  }}
                  className="edit-btn delete"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
        <img className="card-img" src={img} alt="..."></img>
        <Social user_name={user_name} user_photo={user_photo} post={post} postList = {postList} setPostList = {setPostList} />
      </div>
      </div>
     
      
      {/* {!isFriendOrCurrentUser && (
          <div className="col-6 main-content">
            <div className="card" href="details.html">
              <div className="row top-card">
                <p className="card-author">
                  <img className="img-profile" src={profilePic} alt="..." />
                  <span className="authorInfo">
                    <b>{"@" + username}</b>
                  </span>
                </p>
                <div className="w-90 text-end">
                  <i className="addFriend bi bi-person-fill-add" style={{ fontSize: "1.6rem" }} onClick={handleFriendRequest}></i>
                </div>
              </div>
            </div>
          </div>
          )} */}
    </div>
  );
}

export default PostItem;
