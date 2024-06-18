module.exports = class PostReq{
    constructor(request){
        if(!request.body){
            throw Error("Payload is empty");
        }

        this.username = request.body.username;
        this.description = request.body.description;
        this.img = request.body.img;
        this.title = request.body.title;
        this.profilePic = request.body.profilePic;
        this.create_date = request.body.create_date;
        this.img = request.body.img;
        this.displayName = request.body.displayName;
        this.comments = request.body.comments;
        this.likes = request.body.likes
    }
}