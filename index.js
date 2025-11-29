import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import UserRegister from "./routes/user.js";
import LoginUser from "./routes/login.js";
import ProductRouter from "./routes/product.js";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mongoDbUrl = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

await connectDb(mongoDbUrl, dbName);

// Register User
app.use("/api/user", UserRegister);

// Login User
app.use("/api/user", LoginUser);

// Product
app.use("/api/product", ProductRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to E-Commerce Backend",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port:${port}`);
});
