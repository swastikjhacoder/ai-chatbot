import { Router } from "express";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controller.js";
//Protected API
const chatRouter = Router();
chatRouter.post("/new", generateChatCompletion);
chatRouter.get("/all-chats", sendChatsToUser);
chatRouter.delete("/delete", deleteChats);
export default chatRouter;
