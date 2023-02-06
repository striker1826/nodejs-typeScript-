import bcrypt from "bcrypt";
import UserRepository from "../repository/user.repository";
import { signJwt, signRefresh } from "../util/jwt-util";
import { schema } from "../util/validation-util";

class UserService {
  constructor(private userRepository: UserRepository) {}

  createUser = async (id: string, password: string) => {
    try {
      await schema.validateAsync({ id, password });
    } catch (err) {
      throw new Error("입력 조건을 확인해 주세요");
    }
    const existById = await this.userRepository.findById(id);
    if (existById) {
      throw new Error("이미 존재하는 아이디 입니다");
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.userRepository.createUser(id, hashedPassword);

    return {
      userId: newUser.userId,
      id: newUser.id,
    };
  };

  loginUser = async (id: string, password: string) => {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("아이디 혹은 비밀번호를 확인해 주세요");
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error("아이디 혹은 비밀번호를 확인해 주세요");
    }
    const access_token = signJwt({ id: user.userId, userId: user.id });
    const refresh_token = signRefresh({ id: user.userId, userId: user.id });
    return {
      access_token: `Bearer ${access_token}`,
      refresh_token: `Bearer ${refresh_token}`,
    };
  };
}

export default UserService;
