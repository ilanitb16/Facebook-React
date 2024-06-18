const { mongo } = require("../utils");
console.log("USER", process.env.MONGODB_USER);
let db = mongo(process.env.MONGODB_USER, process.env.MONGODB_PASS);

module.exports.mongodbInjector = (request, response, next) => {
    request.db = db;
    next();
};
