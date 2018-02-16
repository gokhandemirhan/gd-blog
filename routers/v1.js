import * as express from "express";
import PostController from "../controllers/PostController";
import AuthController from "../controllers/AuthController";
import multer from "multer";
import passport from "passport";

export default app => {
  const apiRoutes = express.Router();
  const postRoutes = express.Router();
  const authRoutes = express.Router();


  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads");
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
  });

  var upload = multer({ storage: storage });
  require('../config/passport')(passport);

    /*
       * Post Routes
       */

  //Append postRoutes to apiRoutes
  apiRoutes.use("/posts", passport.authenticate('jwt', { session: false }), postRoutes);

  postRoutes.get("/", PostController.getAllPosts);
  postRoutes.get("/:id", PostController.getPostById);
  postRoutes.post("/", upload.single("photo"), PostController.createPost);
  postRoutes.put("/:id", upload.single("photo"), PostController.updatePostById);
  postRoutes.delete("/:id", PostController.deletePostById);

  /*
   * Auth Routes
   */
  apiRoutes.use("/users", authRoutes);

  authRoutes.post("/register",AuthController.register);
  authRoutes.post("/authenticate",AuthController.authenticate);



  /*
     * Api Routes
     */
  app.use("/api", apiRoutes);
};
