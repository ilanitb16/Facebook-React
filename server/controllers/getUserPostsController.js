const {ok} = require("../utils");
const DecodedUser = require("../models/decodedUserModel");

module.exports.getUserPostsController = async (request, response, next) => {
    let result;
    let decodedUser = new DecodedUser(request)
    try{
        let friend;
        if(decodedUser.decoded){
            let username = request.params.id;
            let authUser = {
                username:decodedUser.username, 
                password:decodedUser.password
            };

            if(authUser.username === username){
                let filter = {$match:{username: username }};
                query = [
                    filter, 
                    {$sort: {'create_date': -1 }},
                ]

                let dbResult = await request.db.collection("posts").aggregate(query).toArray();
                if(dbResult){
                    result = {status:200, result: dbResult};
                }
                else{
                    result = {status: 200, result: {message:"You have no posts"}};
                    
                }
                ok(response, result); 
                return;    
            }
            let user = await request.db.collection("users").findOne({username: username });
            if(user && user.friends){
                friend = user.friends.find(friend => friend.username == authUser.username);
                if(friend){
                    let filter = {$match:{username: username }};
                    query = [
                        filter, 
                        {$sort: {'create_date': -1 }},
                    ]
    
                    let dbResult = await request.db.collection("posts").aggregate(query).toArray();
                    result = {status:200, result: dbResult};
                    
                }
                else{
                    result = {status:200, result: []};
                }
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