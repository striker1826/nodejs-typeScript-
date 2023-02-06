import express, { Router } from "express";
import RefreshController from "../controller/refresh.controller";
const refreshController = new RefreshController();
const router: Router = express.Router();

router.use("/", refreshController.refresh);

export default router;
