const {ok} = require("../utils");
const { ObjectId } = require("mongodb");

module.exports.postImageController = async (request, response, next) => {
    try{
		let id = request.params.id; // "65e7080e43bd451a13734232"
        let post = await request.db.collection("posts").findOne({_id: new ObjectId(id)});
    
		// console.log(post.img);

		if(post != null){
			let index = post.img.indexOf("base64,");
			let imageBase64 = post.img.substring(index + 7);
			let contentType = post.img.substring(5, post.img.indexOf(";"));


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