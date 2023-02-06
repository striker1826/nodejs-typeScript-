import express, { Router } from "express";
import RefreshController from "../controller/refresh.controller";
import RefreshService from "../service/refresh.service";

const refreshService = new RefreshService();
const refreshController = new RefreshController(refreshService);
const router: Router = express.Router();

router.use("/", refreshController.refresh);

export default router;
