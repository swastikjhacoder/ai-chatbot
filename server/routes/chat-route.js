import { Router } from "express";
import {
  deleteChats,
  generateChatCompletion,
  saveChats,
} from "../controllers/chat-controller.js";
//Protected API
const chatRouter = Router();
chatRouter.post("/new", generateChatCompletion);
chatRouter.get("/save", saveChats);
chatRouter.delete("/delete", deleteChats);
export default chatRouter;
