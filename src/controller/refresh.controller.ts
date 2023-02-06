import { NextFunction, Request, Response } from "express";
import RefreshService from "../service/refresh.service";

class RefreshController {
  refreshService = new RefreshService();

  refresh = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.refresh) {
        throw new Error("refresh 토큰이 존재하지 않습니다");
      }
      const refresh_token = req.headers.refresh;
      const access_token = this.refreshService.refresh(refresh_token);

      res.status(201).json(access_token);
    } catch (err) {
      next(err);
    }
  };
}

export default RefreshController;
