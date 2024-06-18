const {ok} = require("../utils");
const { ObjectId } = require("mongodb");

module.exports.deleteUserController = async (request, response, next) => {
    try{
        let result;
        let filter = {_id: new ObjectId(request.params.id)};
        let dbResult = await request.db.collection("users").deleteOne(filter);
        
        if(dbResult){
            result = {status:200, result:{deletedCount: dbResult.deletedCount}}
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