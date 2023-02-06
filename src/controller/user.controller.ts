import { NextFunction, Request, Response } from "express";
import Container, { Service } from "typedi";
import UserService from "../service/user.service";

@Service()
class UserController {
  userService = Container.get(UserService);

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, password } = req.body;
      if (!id || !password) {
        throw new Error("입력값을 확인해 주세요");
      }
      const newUser = await this.userService.createUser(id, password);
      res.status(201).json({
        status: 201,
        success: true,
        message: "유저 생성 성공",
        newUser,
      });
    } catch (err: any) {
      next(err);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, password } = req.body;
      if (!id || !password) {
        throw new Error("입력값을 확인해 주세요");
      }
      const loginUser = await this.userService.loginUser(id, password);
      res.status(201).json(loginUser);
    } catch (err: any) {
      next(err);
    }
  };
}

export default UserController;
