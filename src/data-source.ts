import "reflect-metadata";
import { DataSource } from "typeorm";
import { Comment } from "./entity/Comment";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Post, Comment],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize();
