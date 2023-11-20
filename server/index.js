import express from "express";
import { config } from "dotenv";
import { dbConnect } from "./db/dbconnection.js";
import userRouter from "./routes/user-route.js";
import chatRouter from "./routes/chat-route.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

config();
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["POST", "GET", "UPDATE", "DELETE", "PUT", "PATCH"],
};

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

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
app.use("/chat", chatRouter);
