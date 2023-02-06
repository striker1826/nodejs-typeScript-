import indexRouter from "./routes/index.routes";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import path from "path";

const app = express();
const port = 5000;

const corsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));

const swaggerSpec = YAML.load(path.join(__dirname, "../build/swagger.yaml"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(indexRouter);

app.use(function (err, req, res, next) {
  res.status(500).json({ success: false, message: err.message });
});

app.listen(port, () => {
  console.log(`${port} is running`);
});
