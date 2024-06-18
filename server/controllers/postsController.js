const DecodedUser = require("../models/decodedUserModel");
const {ok} = require("../utils");

module.exports.postsController = async (request, response, next) => {
    let result;
    let dbFriendsPostsResult = [];
    let dbPostsResult = [];
    let dbResult;
    let decodedUser = new DecodedUser(request)
    try{
        if(decodedUser.decoded){
            let dbResultUser = await request.db.collection("users").findOne({username: decodedUser.username});
            if(dbResultUser.friends && dbResultUser.friends.length > 0){
                let friendsFilter = {$match: {username: {$in:dbResultUser.friends} }};
                let friendsPostsQuery = [
                    friendsFilter,
                    {$sort: {  'create_date': -1 }},
                    {$limit: 20 }

                ] 
                dbFriendsPostsResult = await request.db.collection("posts").aggregate(friendsPostsQuery).toArray();
                let notInclude = [...dbResultUser.friends];
                notInclude.push(dbResultUser.username)
                let filter = {$match: {username: {$not: {$in:notInclude}}}};
                let postsQuery = [
                    filter,
                    
                    {$sort: {  'create_date': -1 }},
                    {$limit: 5 }
                ] 
                dbPostsResult = await request.db.collection("posts").aggregate(postsQuery).toArray();

                dbResult = dbFriendsPostsResult.concat(dbPostsResult)
            }
            else{
                dbResult =  await request.db.collection("posts").find({username:{$ne:dbResultUser.username}}).sort({'create_date': -1}).limit(5).toArray();
            }
 
            result = {status:200, result: dbResult};
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