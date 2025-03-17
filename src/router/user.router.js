import { Router } from "express";
import UserController from "../controller/user.controller.js";

const userRouter = Router()
const controller = new UserController()

userRouter.post('/user', (req, res, next) => controller.addUserController(req, res, next))

userRouter.get('/users', (req, res, next) => controller.getAllUsersController(req, res, next))

userRouter.get('/user/:id', (req, res, next) => controller.getUserByIdController(req, res, next))

userRouter.put('/user/:id', (req, res, next) => controller.updateUserByIdController(req, res, next))

userRouter.delete('/user/:id', (req, res, next) => controller.deleteUserByIdController(req, res, next))

export default userRouter