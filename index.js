import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import AuthRouter from "./routes/user.js";
import ProductRouter from "./routes/product.js";
import CartRouter from "./routes/cart.js";

dotenv.config({ path: ".env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mongoDbUrl = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;

await connectDb(mongoDbUrl, dbName);

// Auth Router
app.use("/api/user", AuthRouter);

// Product Router
app.use("/api/product", ProductRouter);

// Cart Router
app.use("/api/cart", CartRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to E-Commerce Backend 🚀",
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
