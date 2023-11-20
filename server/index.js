import express from "express";
import { config } from "dotenv";
import { dbConnect } from "./db/dbconnection.js";
import userRouter from "./routes/user-route.js";

config();
const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT} 🤘🏻`);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server 😊" });
});

dbConnect().then(() => {
  console.log("successfully connected to MongoDB database 👍🏻");
});

app.use("/user", userRouter);
