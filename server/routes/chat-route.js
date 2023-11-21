import { Router } from "express";
import {
  generateChatCompletion,
  getChats,
} from "../controllers/chat-controller.js";
//Protected API
const chatRouter = Router();
chatRouter.post("/new", generateChatCompletion);
chatRouter.get("/get-all-chats/:id", getChats);
export default chatRouter;
