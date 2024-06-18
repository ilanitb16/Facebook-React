import PostItem from "../postItem/PostItem";

function PostListReslts({posts, postList, setPostList, user_name, user_photo, friendsList, setFriendsList}){
    const postListOriginal = posts?.map((post, index) => {
        return <PostItem key={index} postList={postList} setPostList={setPostList} {...post} user_name={user_name} user_photo={user_photo} friendsList={friendsList} setFriendsList= {setFriendsList} post={post}/>;
    });
    
    return(
        <div className="row gx-3">{postListOriginal}</div>
    );
}
export default PostListReslts;