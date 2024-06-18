const {ok} = require("../utils");
const DecodedUser = require("../models/decodedUserModel");

module.exports.getUserFriendsController = async (request, response, next) => {
    let result;
    let decodedUser = new DecodedUser(request)
    try{
        if(decodedUser.decoded){
            let username = request.params.id;
            let authUser = {
                username:decodedUser.username, 
                password:decodedUser.password
            };

            let dbResponseAuthUser = await request.db.collection("users").findOne({username: decodedUser.username });
            authUser.friends = dbResponseAuthUser.friends ? dbResponseAuthUser.friends : [];

            if(authUser.username === username || authUser.friends.some((friend) => friend.username === username)){
                let dbResult = await request.db.collection("users").findOne({username: username});
                result = {status:200, result: {username: dbResult.username, displayName:dbResult.displayName, friends: dbResult.friends}};
            }
            else{
                result = {status:200, result: []};
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