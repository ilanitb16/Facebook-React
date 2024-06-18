import React from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from '../../providers/user_context';
import { useState, useEffect } from "react";
import Menu from "../Menu/Menu.js";
import Info from "../Info/Info.js";
import { updateUser, getUser } from '../../GeneralFunctions.js'
import './Account.css'; // Import the CSS file
import { jwtDecode } from 'jwt-decode' 

const Account = ({ darkMode, toggleDarkMode, toggleTheme }) => {
    const [user, setUser] = useUser();
    const navigate = useNavigate()
    const [newPostInput, setNewPostInput] = useState(false);
    const [accountImageName, setAccountImageName] = useState("No file choosen");
    const [formData, setFormData] = useState({
            first_name: (user?.displayName)?.split(' ')[0],
            last_name: (user?.displayName)?.split(' ')[1],
            password: user?.password,
            confirmPassword: user?.password,
            profilePic: user?.profilePic, 
    });

    const [imageBase64, setImageBase64] = useState();
    
    useEffect(() => {
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
              }
              
            }
          }
      
          initData()
      }, []);

  
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
  
        const selectedFile = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null; // Check if files exist and if there's at least one file selected
  
        //const selectedFile = e.target.files[0]; // Access files from e.target
    
        setFormData({
        ...formData,
      //  [name]: value,
        [name]: name === 'profilePic' ? selectedFile : value,
        });
    };
  
    const selectFile = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);
        setAccountImageName(e.target.files[0].name)
        fileReader.onload = () => {
            setImageBase64(fileReader.result);
        };
    
    }
  
      // Validation function meeting facebook's password requirements:
    function validatePassword(password) {
    // facebook's requirments: 
    //Passwords must be at least eight characters long, and include a combination 
    // of lower and uppercase letters, special characters, and numbers.

        
        // password length check
        if (password.length < 8) {
            return 'Password must be at least 8 characters long.';
        }
    
            // at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
        }
    
            // at least one lowercase letter
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
        }
    
        // at least one digit 
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least one digit.';
        }
    
        // at least one special character 
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            return 'Password must contain at least one special character.';
        }
    
        // all checks passed, returns empty string
        return '';
    }

    function validateConfirmPassword(password, confirmPassword){
    if (!confirmPassword || confirmPassword.trim().length === 0) {
        return 'Please confirm your password.';
    }
    if (!password || password.trim().length === 0) {
        return '';
    }
    if (password === confirmPassword) {
        return '';
    }
    return 'Passwords do not match.';
    }  
      
    function validateName(name){
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return 'Name and last name are required.';
    }
    
    // Regular expression pattern for letters only
    const pattern = /^[A-Za-z]+$/;
    
    // Test if the name contains only letters
    const containsOnlyLetters = pattern.test(name);
    
    if (!containsOnlyLetters) {
        return 'Invalid input. Names must contain letters only.';
    }
    
    return ''; // No errors
    
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault(); //  prevent page from getting reloaded (otherwise we will loose our state)
       
        // Validate form fields
      const firstnameError =  validateName(formData.first_name);
      const lastnameError =  validateName(formData.last_name);
      const passwordError = validatePassword(formData.password);
      const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
  
        // Check for validation errors
        if (firstnameError !== '' || lastnameError !== ''|| passwordError !== '' || confirmPasswordError !== ''){
        // update the state of the errors accordingly
        setErrors({
            first_name: firstnameError,
            last_name:lastnameError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });
        } 
        else {
            // No validation errors - success
            const updatedUser = {
                password: formData.confirmPassword,
                displayName: `${formData.first_name} ${formData.last_name}`,
                profilePic : imageBase64,
            }; 
        
            let result = await updateUser(user?.username, updatedUser);
            if(result){
                alert("User data was successfully updated");
                setErrors({});
                let response = await getUser(user?.username);
                setUser(response);
            }
        }
    };

    return (
        <React.Fragment>
          <Menu toggleTheme={toggleTheme} setNewPostInput={setNewPostInput} />
          <div className='account-main'>
            <div className="registration-box">
                <div className='registration-header'>
                <h2>Update account</h2>
                <h3>It’s quick and easy.</h3>
                </div >
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div style={{marginTop:'15px',display: 'flex', justifyContent:'space-between', width:'100%'}} className="form-group">
                        
                        <label></label>
                        <div className="editImg" style={{textAlign: 'left', width:'100%',marginTop: "20px"}}>
                        <label for="file-account-upload" className="edit-image-input">
                            Choose File
                        </label>
                        <span className="edit-img-title">{accountImageName}</span>
                        <input id="file-account-upload" type="file" onChange={selectFile} />
                        </div>
                        <div>
                        <img src={imageBase64} className="avatar" />
                        </div>
                        </div>
                        
                        <div className="name_inputs">
                        {errors.first_name && <span style={{position:'absolute'}} className="error-message">{errors.last_name}</span>}
                        <input 
                            className="registration-input left"
                            type="text"
                            name="first_name"
                            placeholder='First name'
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        
                        <input
                            className="registration-input right"
                            type="text"
                            name="last_name"
                            placeholder='Last name'
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div className="form-group">
                        {errors.password && <span className="error-message">{errors.password}</span>}
                        <label></label>
                        <input
                        type="password"
                        name="password"
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                        <label></label>
                        <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        />
                    </div>

                    <button className='registration-button' type="register">Update</button>

                    </form>
            </div>
            {user &&
                <Info user_name={user?.displayName} user_photo={user?.profilePic}/>
            } 
          </div>
        </React.Fragment>
    );
    
  
};

export default Account;