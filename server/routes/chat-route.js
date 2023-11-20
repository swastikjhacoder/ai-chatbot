import { Router } from "express";
import {
  deleteChats,
  generateChatCompletion,
  getChats,
} from "../controllers/chat-controller.js";
import { verifyToken } from "../utils/verify-token.js";
//Protected API
const chatRouter = Router();
chatRouter.post("/new", generateChatCompletion);
chatRouter.get("/get-all-chats", verifyToken, getChats);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
