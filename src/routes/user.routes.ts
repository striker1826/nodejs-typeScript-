import express, { Router } from "express";
import UserController from "../controller/user.controller";
import Container from "typedi";

const userController = Container.get(UserController);
const router: Router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);

export default router;
