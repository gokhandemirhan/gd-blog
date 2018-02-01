import * as express from 'express';
import PostController from '../controllers/PostController';

export default (app) => {

    const apiRoutes = express.Router();
    const postRoutes = express.Router();

    /*
     * Post Routes
     */

    //Append postRoutes to apiRoutes
    apiRoutes.use('/posts',postRoutes);

    postRoutes.get('/',PostController.getAllPosts);
    postRoutes.get('/:id',PostController.getPostById);
    postRoutes.post('/',PostController.createPost);
    postRoutes.put('/:id',PostController.updatePostById);
    postRoutes.delete('/:id',PostController.deletePostById);

    /*
     * Api Routes
     */
    app.use('/api',apiRoutes);

}