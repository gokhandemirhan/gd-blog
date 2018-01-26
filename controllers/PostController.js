import Post from '../models/Post';

const PostController = {
    // get all posts
    getAllPosts(req, res, next) {
        Post.find((err, posts) => {
            if (err) {
                res.status(500).json({err});
            }
            res.status(200).json({posts});
        });
    }
// get post by id
    

// create post

//update post by id

// delete post by id

};

export default PostController;