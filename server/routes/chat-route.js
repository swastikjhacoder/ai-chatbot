import { Router } from "express";
import {
  deleteChats,
  generateChatCompletion,
  // saveChats,
} from "../controllers/chat-controller.js";
import { verifyToken } from "../utils/verify-token.js";
//Protected API
const chatRouter = Router();
chatRouter.post("/new", generateChatCompletion);
// chatRouter.post("/save", verifyToken, saveChats);
chatRouter.delete("/delete", verifyToken, deleteChats);
export default chatRouter;
