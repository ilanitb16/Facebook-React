const {ok} = require("../utils");
const DecodedUser = require("../models/decodedUserModel");

module.exports.deleteFriendsRequestController = async (request, response, next) => {
    let result;
    let decodedUser = new DecodedUser(request)
    try{
        if(decodedUser.decoded){
            let filter = {username:request.params.id};
            let fid = request.params.fid;
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
            let index;
            let foundReq = user.friendsRequest.find((req,i) => {
                index = i;
                return req.username === fid}
            )
            if(foundReq){
                user.friendsRequest.splice(index,1);
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
        result = {status: 500, result: {message:err.message}};
        ok(response, result);
    }

}