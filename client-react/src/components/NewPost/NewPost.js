import React, { useState } from "react";
import { createPost } from '../../GeneralFunctions.js';
import { getPosts, getUserPosts } from '../../GeneralFunctions.js';
import { useParams } from 'react-router-dom';
import { useUser } from '../../providers/user_context';
import './NewPost.css';

function NewPost({
  postList,
  setPostList,
  user_name,
  user_photo,
  newPostInput,
  setNewPostInput,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imgNewPost, setImgNewPost] = useState(null);
  const params = useParams();
  const [user, setUser] = useUser();
  const [updateImageName, setUpdateImageName] = useState("No file choosen");

  const getPostslist = async() => {
    return new Promise(async (resolve, reject) => {
      let list;
      if(params && params.id){
        list = await getUserPosts(params.id);
      }
      else{
        list = await getPosts();
      } 
      resolve(list)
    })
    
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event) => {
    const fileReader = new FileReader();
    let file=event.target.files[0];
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = () => {
      //console.log("aaa", fileReader.result);
      setImgNewPost(fileReader.result);
      setUpdateImageName(file.name)
    };
  };

  // const currentDate = new Date();
  // const formattedDate = `${currentDate.getDate()}/${
  //   currentDate.getMonth() + 1
  // }/${currentDate.getFullYear()}`;

  const addPost = async () => {
    // Check if an image is selected
    const img = imgNewPost ? imgNewPost : null;

    const newPost = {
      title: title,
      username: user_name,
      description: description,
      profilePic: user_photo,
      img: img,
      likes:[],
      comments:[]
    };
    if(user){
      newPost.displayName = user.displayName
    }
    let result = await createPost(user_name,newPost);
    if(result && result.insertedId){
      alert( "Post was successfully created.");
      let list = await getPostslist();
      setPostList(list);
    }
    deleteData();
  };

  const deleteData = () => {
    setTitle("");
    setDescription("");
    setImgNewPost(null);
    setUpdateImageName("No file choosen")
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="row post">
      <div className="col-5"></div>
      <div className="col-6 new-post-content">
        <div className="card" href="details.html">
          {newPostInput && (
            <div className="row top-card">
              <p className="newPostContent">
                <label className="post-title">Create Post</label>
                <br />
                <br />
                <h3 className="display-pic">
                    <img src={user_photo} className="img-profile-user" alt="..." />
                    <b className="user-name">{"@" + user.displayName}</b>
                </h3>   
                <input placeholder="Title" type="text" value={title} onChange={handleTitleChange} />
                <br />
                <label></label>
                <br />
                             
              <textarea
                  placeholder={`What's on your mind, ${user_name}?`}
                  rows="4"
                  style={{ width: "100%" }}
                  value={description}
                  onChange={handleDescriptionChange}
                ></textarea>
                <div className="editImg">
                  <label for="file-edit-upload" className="edit-image-input">
                      Choose File
                  </label>
                  <span className="edit-img-title">{updateImageName}</span>
                <input id="file-edit-upload" type="file" onChange={handleImageChange} />
                </div>
                </p>
                <div className="newPostButtons btn-group" role="group" aria-label="Basic example">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      addPost();
                      setNewPostInput(false);
                      // handleScrollToBottom();
                    }}
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setNewPostInput(false)}
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setNewPostInput(false);
                      deleteData();
                    }}
                  >
                    Cancel
                  </button>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewPost;
