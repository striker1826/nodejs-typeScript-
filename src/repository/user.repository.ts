import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Service } from "typedi";

class UserRepository {
  createUser = async (id: string, hashedPassword: string) => {
    const newUser = await AppDataSource.getRepository(User).save({
      id,
      password: hashedPassword,
    });
    return newUser;
  };

  findById = async (id: string) => {
    const result = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });
    return result;
  };
}

export default UserRepository;
