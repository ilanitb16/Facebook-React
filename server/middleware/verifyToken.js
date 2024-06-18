const notProtectedRoutes = ["/api/tokens", '/api/users', '/', '/static']
const {ok} = require("../utils");
const jwt = require('jsonwebtoken');
const privateKey = 'privateKey';

module.exports.verifyToken = (request, response, next) => {
    let url = request.url;
	
    if(url.indexOf("/api") < 0 || url.indexOf('/api/posts/image/') >= 0  || url.indexOf('/api/users/image/') >= 0 || notProtectedRoutes.includes(url)) {
        next();
        return;
    };
    
    let token = request.header('Authorization');
    let result;

    try {
        if (!token){
            result = {status: 401, result: {message:"Access denied"}}
            ok(response, result);
            return;
        } 

        token = token.replace("Bearer ", "");
        const decoded = jwt.verify(token, privateKey);
        request.decoded = decoded;
        next()
    
    } 
	catch (error) {
        result = {status: 401, result: {message:"Invalid token"}};
        ok(response, result);
    }
};