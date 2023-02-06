import indexRouter from "./routes/index.routes";
import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import path from "path";
import "reflect-metadata";

const app: Express = express();
const port = 5000;

app.use(cors());

const swaggerSpec = YAML.load(path.join(__dirname, "../build/swagger.yaml"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(indexRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).json(err.message);
});

app.listen(port, () => {
  console.log(`${port} is running`);
});
