import * as express from "express";
import PostController from "../controllers/PostController";
import multer from "multer";

export default app => {
  const apiRoutes = express.Router();
  const postRoutes = express.Router();

  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "uploads");
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
  });

  var upload = multer({ storage: storage });

  /*
     * Post Routes
     */

  //Append postRoutes to apiRoutes
  apiRoutes.use("/posts", postRoutes);

  postRoutes.get("/", PostController.getAllPosts);
  postRoutes.get("/:id", PostController.getPostById);
  postRoutes.post("/", upload.single("photo"), PostController.createPost);
  postRoutes.put("/:id", upload.single("photo"), PostController.updatePostById);
  postRoutes.delete("/:id", PostController.deletePostById);

  /*
     * Api Routes
     */
  app.use("/api", apiRoutes);
};
