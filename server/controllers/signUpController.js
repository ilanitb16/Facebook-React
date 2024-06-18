const SignupRequest = require("../models/signupRequestModel");
const {ok} = require("../utils");


module.exports.signUpController = async (request, response, next) => {
    console.log("signUpController")
    let result = {};
    let user = {};
    let signupRequest = new SignupRequest(request);
    
    if(signupRequest.username){
        let searchedUser = await request.db.collection("users").findOne({username: signupRequest.username});
       
        if(searchedUser){
            result.status = 409;
            result.result = {message:"User name already exsists"}
            ok(response, result);
            return
        }
        else{
            user.username = signupRequest.username
        }
    }
    
    if(signupRequest.password){
        user.password = signupRequest.password
    }
    if(signupRequest.displayName){
        user.displayName = signupRequest.displayName
    }
    if(signupRequest.profilePic){
        user.profilePic = signupRequest.profilePic
    }

    try{
        let dbRes = await request.db.collection("users").insertOne(user);
        if(dbRes){
            result = {status:200, result:{insertedId:dbRes.insertedId}}
        }
        else{
            result = {status:500, result:{}}
        }
        ok(response, result)
        
    }
    catch(error){
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
}