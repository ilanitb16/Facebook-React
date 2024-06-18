const {ok} = require("../utils");
const DecodedUser = require("../models/decodedUserModel");

module.exports.friendsRequestController = async (request, response, next) => {
    let result;
    let decodedUser = new DecodedUser(request)
    try{
        if(decodedUser.decoded){
            let filter = {username:request.params.id};
             
            let authUser = {
                username:decodedUser.username, 
                password:decodedUser.password
            };
            let user = await request.db.collection("users").findOne(filter);
            if(Array.isArray(user.friends) && user.friends.some( (req) => req.username === authUser.username)){
                result = {status:200, result:{message:"You are already friends!"}};
                ok(response, result);
                return;
            };

            if(Array.isArray(user.friendsRequest) && user.friendsRequest.some( (req) => req.username === authUser.username)){
                result = {status:200, result:{message:"Friend request already exists!"}};
                ok(response, result);
                return;
            };
            let dbAuthUser = await request.db.collection("users").findOne({username:authUser.username});
            let friendsReqObj = {
                username:dbAuthUser.username,
                displayName:dbAuthUser.displayName,
                profilePic:dbAuthUser.profilePic

            }
            if(Array.isArray(user.friendsRequest)){
                user.friendsRequest.push(friendsReqObj)
            }
            else{
                user.friendsRequest = [];
                user.friendsRequest.push(friendsReqObj)
            }

            const updatedUser = {$set: user};
            let dbResult = await request.db.collection("users").updateOne(filter, updatedUser);

            if(dbResult){
                result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}
            }
            else{
                result = {status:500, result: {message:"Server error"}}
            }
            ok(response, result);
            
            
        }
        else{
            result = {status: 500, result: {message:"Server error"}};
            ok(response, result); 
        }
    }
    catch(err){
        console.log(err)
        result = {status: 500, result: {message:err.message}};
        ok(response, result);
    }

}