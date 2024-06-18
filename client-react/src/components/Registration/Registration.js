import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { users } from '../../Auth.js';
import { signUp } from '../../GeneralFunctions.js'
import './Registration.css'; // Import the CSS file for registration styles

function Registration() {
    const navigate = useNavigate();
    const [imageBase64, setImageBase64] = useState();
    const [registrationImageName, setRegistrationImageName] = useState("No file choosen");
  
    // a state var used to store data entered by user. 
    const [formData, setFormData] = useState({
        // contains key-value pairs for different form fields
        first_name: '',
        last_name:'',
        username: '',
        password: '',
        confirmPassword: '',
        profilePic: null, 
    });

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
      setRegistrationImageName(e.target.files[0].name)
      fileReader.onload = () => {
        //console.log("aaa", fileReader.result);
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
    
    // Username can be either a phone number or your email address
    function validateUsername(username){
      if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return 'Username is required.';
      }
      if (username.length < 3) {
        return 'Username is too short.';
      }
      if (username.length > 20) {
        return 'Username is too long.';
      }
    
      return ''; // No errors
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
    const usernameError = validateUsername(formData.username);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);

  // Check for validation errors
  if (firstnameError !== '' || lastnameError !== ''|| passwordError !== '' || confirmPasswordError !== '' || usernameError !== ''){
    // update the state of the errors accordingly
    setErrors({
        username: usernameError,
        first_name: firstnameError,
        last_name:lastnameError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
    });
  } else {
    // No validation errors - success
    const user = {
        username: formData.username,
        password: formData.confirmPassword,
        displayName: `${formData.first_name} ${formData.last_name}`,
        profilePic : imageBase64,
    }; 

    await signUp(user);
    navigate("/");
    setErrors({});

    }
  };

  return (
    <div className="registration-container">
      <h1 className='logo-text'>facebook</h1>

      <div className="registration-box">
        <div className='registration-header'>
          <h2>Create a new account</h2>
          <h3>It’s quick and easy.</h3>
        </div >

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div style={{marginTop:'15px',display: 'flex',justifyContent:'space-between', width:'100%'}} className="form-group">
              <div className="editImg" style={{textAlign: 'left', width:'100%',marginTop: "20px"}}>
                <label for="file-reg-upload" className="edit-image-input">
                    Choose File
                </label>
                <span className="edit-img-title">{registrationImageName}</span>
                <input id="file-reg-upload" type="file" name="profilePic" accept="image/*"  onChange={selectFile} />
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
              {errors.username && ( <span className="error-message">{errors.username}</span>)}
            <label></label>
            <input
              type="text"
              name="username"
              placeholder='User Name'
              value={formData.username}
              onChange={handleChange}
            />
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

          <button className='registration-button' type="register">Sign up</button>

          <p className="login-footer">
              <a href="/login">Already have an account?</a>  
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;



