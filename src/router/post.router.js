import { Router } from "express";
import PostController from "../controller/post.controller.js";

const postRouter = Router()
const controller = new PostController()

postRouter.post('/post', (req, res, next) => controller.addPostController(req, res, next))

postRouter.get("/posts", (req, res, next) => controller.getAllPostsController(req, res, next))

postRouter.get("/post/:id", (req, res, next) => controller.getPostByIdController(req, res, next))

postRouter.put("/post/:id", (req, res, next) => controller.updatePostByIdController(req, res, next))

postRouter.delete("/post/:id", (req, res, next) => controller.deletePostByIdController(req, res, next))

export default postRouter