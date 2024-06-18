module.exports = class SignupRequest{
    constructor(request){
        if(!request.body.username){
            throw Error("User name or password is empty");
        }

        this.username = request.body.username;
        this.password = request.body.password;
        this.displayName = request.body.displayName;
        this.profilePic = request.body.profilePic;
    }
}