import express, { Express, Router } from "express";
import userRouter from "./user.routes";
import postRouter from "./post.routes";
import commentRouter from "./comment.routes";
import refreshRouter from "./refresh.routes";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/refresh", refreshRouter);

export default router;
