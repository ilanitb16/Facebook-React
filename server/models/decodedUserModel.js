module.exports = class DecodedUser{
    constructor(request){
        if(!request.decoded){
            throw Error("User name is empty");
        }

        this.decoded = request.decoded;
        this.username = this.decoded.username;
        this.password = this.decoded.password;
    }
}