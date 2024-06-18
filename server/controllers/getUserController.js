const {ok} = require("../utils");

module.exports.getUserController = async (request, response, next) => {
    try{
        let result;
        let dbResult = await request.db.collection("users").findOne({username: request.params.id});
        
        if(dbResult){
            result = {status:200, result:dbResult}
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