const {ok} = require("../utils");

module.exports.userImageController = async (request, response, next) => {
    try{
		let username = request.params.username; 
        let user = await request.db.collection("users").findOne({username: username});
    
		// console.log(post.profilePic);

		if(user != null){
			let index = user.profilePic.indexOf("base64,");
			let imageBase64 = user.profilePic.substring(index + 7);
			let contentType = user.profilePic.substring(5, user.profilePic.indexOf(";"));


			let image = Buffer.from(imageBase64, 'base64');
			
			response.writeHead(200, {
				'Content-Type': contentType,
				'Content-Length': image.length
			});

			response.end(image);
		}
	}
    catch(err){
        let result = {status: 500, result: {message:err.message}};
        ok(response, result);
    }
    

}