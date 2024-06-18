const {ok} = require("../utils");
const DecodedUser = require("../models/decodedUserModel");

module.exports.approveFriendsRequestController = async (request, response, next) => {
    let result;
    let decodedUser = new DecodedUser(request)
    try{
        if(decodedUser){
            let fid = request.params.fid;
            let filter = {username:request.params.id};
            let fidFilter = {username:request.params.fid};
            let authUser = {
                username:decodedUser.username, 
                password:decodedUser.password
            };

            if(authUser.username !== request.params.id){
                result = {status:200, result:{message:"Unauthorized action"}};
                ok(response, result);
                return;
            }
            
            let user = await request.db.collection("users").findOne(filter);
            let friendsReqObj = {
                username:user.username,
                displayName:user.displayName,
                profilePic:user.profilePic
            }
            let fidUser = await request.db.collection("users").findOne(fidFilter);
            let index;
            let foundReq = user.friendsRequest.find((req,i) => {
                index = i;
                return req.username === fid}
            )
            if(foundReq){
                user.friendsRequest.splice(index,1);
                if(Array.isArray(user.friends)){
                    user.friends.push(foundReq)
                }
                else{
                    user.friends = [];
                    user.friends.push(foundReq);
                }
            }
            if(Array.isArray(fidUser.friends)){
                fidUser.friends.push(friendsReqObj)
            }
            else{
                fidUser.friends = [];
                fidUser.friends.push(friendsReqObj);
            }
            const updatedUser = {$set: user};
            const updatedFidUser = {$set: fidUser};
            let dbResultUser = await request.db.collection("users").updateOne(filter, updatedUser);
            let dbResultFidUser = await request.db.collection("users").updateOne(fidFilter, updatedFidUser);
            if(dbResultUser){
                result = {status:200, result:{modifiedCount: dbResultUser.modifiedCount}}
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
        result = {status: 500, result: {message:err.message}};
        ok(response, result);
    }

}