import express, { Router } from "express";
import UserController from "../controller/user.controller";
import UserService from "../service/user.service";
import UserRepository from "../repository/user.repository";

const router: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
