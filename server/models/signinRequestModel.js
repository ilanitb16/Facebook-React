module.exports = class SigninRequest{
    constructor(request){
        if(!request.body.username || !request.body.password){
            throw Error("User name or password is empty");
        }

        this.user = request.body.username;
        this.pass = request.body.password;
    }
}