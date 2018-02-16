import Post from "../models/Post";
import config from "../config/main";

const PostController = {
  // get all posts
  getAllPosts(req, res, next) {
    Post.find((err, posts) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.status(200).json({ posts });
    });
  },
  // get post by id
  getPostById(req, res, next) {
    const id = req.params.id;
    Post.findById(id, (err, post) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.status(200).json({ post });
    });
  },

  // create post
  createPost(req, res, next) {
    const title = req.body.title;
    const content = req.body.content;
    const photo = req.file;

    if (!title || !content) {
      res.status(422).json({ error: "All fields are required" });
    }
    const post = new Post({ title, content });
    if(photo) {
      const filePath = req.protocol + "://" + req.hostname + ':'+ config.port + '/' + photo.path;
      post.photoUrl = filePath;
    }

    post.save((err, post) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.status(201).json({ post });
    });
  },
  //update post by id
  updatePostById(req, res, next) {
    const id = req.params.id;
    const photo = req.file;
    if(photo) {
        const filePath = req.protocol + "://" + req.hostname + ':'+ config.port + '/' + photo.path;
        req.body.photoUrl = filePath;
    }

    Post.findByIdAndUpdate(id, req.body, (err, post) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.status(200).json({ post });
    });
  },

  // delete post by id
  deletePostById(req, res, next) {
    const id = req.params.id;
    Post.findByIdAndRemove(id, (err, post) => {
      if (err) {
        res.status(500).json({ err });
      }
      res.status(200).json({ post });
    });
  }
};

export default PostController;
