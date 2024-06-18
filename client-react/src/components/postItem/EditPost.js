import "./PostItem.css";
import React, { useState, useRef } from "react";
import { deleteUserPost, getPosts,getUserPosts } from '../../GeneralFunctions.js'
import { useParams } from 'react-router-dom';

function EditPost({ _id, title, postList, setPostList, editMode, setEditMode, deleteChanges, user_name }) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const menuRef = useRef();
  const iconRef = useRef();

  window.addEventListener("click", (e) => {
    if (e.target !== menuRef.current && e.target !== iconRef.current) {
      setOpen(false);
    }
  });

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
  
  
  const removePost = async () => {
    await deleteUserPost(user_name, _id)
    let list = await getPostslist();
    setPostList(list);
  };
  
  return (
    <div>
    <div className="threeDots">
      <div className="">
        <i
          className="threeDots-item bi bi-three-dots-vertical"
          style={{ fontSize: "1.6rem" }}
          ref={iconRef}
          onClick={() => { 
            if (!editMode) {
              setOpen(!open);
            }
          }}
        >
          
        </i>
      </div>
    </div>
    {open && (
      <div ref={menuRef} className="threeDots-item absolute-left">
        <ul style={{ listStyleType: "none", padding: 0, margin:0 }}>
          {!editMode && (
            <li key="edit" onClick={() => {setEditMode(true); deleteChanges();}} className="edit">
              <i className="bi bi-sliders"></i> Edit
            </li>
          )}
          <li key="delete" onClick={() => {removePost();}} className="delete">
            <i className="bi bi-trash3"></i> Delete
          </li>
        </ul>
      </div>
    )}
    </div>
  );
}

export default EditPost;
