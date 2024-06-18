const {ok} = require("../utils");

module.exports.updateUserController = async (request, response, next) => {
    try{
        let result;
        let user = {};
        let filter = {username: request.params.id};

        if(request.body.username){
            user.username = request.body.username
        }
        if(request.body.password){
            user.password = request.body.password
        }
        if(request.body.displayName){
            user.displayName = request.body.displayName
        }
        if(request.body.profilePic){
            user.profilePic = request.body.profilePic
        }
        if(request.body.friends){
            user.friends = request.body.friends
        }

        const updatedUser = {$set: user};
        let dbResult = await request.db.collection("users").updateOne(filter,updatedUser);
        if(dbResult){
            result = {status:200, result:{modifiedCount: dbResult.modifiedCount}}
        }
        else{
            result = {status:500, result: {message:"Server error"}}
        }
        ok(response, result);
    }
    catch(error){
        result = {status:500, result:{error:error.message}}
        ok(response, result)
    }
    

}