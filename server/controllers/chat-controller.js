import dotenv from "dotenv";
import OpenAI from "openai";
import User from "../models/user-model.js";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatCompletion = async (req, res, next) => {
  const userPrompt = req.body.userPrompt;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: userPrompt }],
    max_tokens: 100,
  });
  res.send(response.choices[0].message.content);
};

export const getChats = async (req, res, next) => {
  try {
    await User.findById(
      { _id: req.params.id },
      { "chats.role": 1, "chats.content": 1, _id: 0 }
    ).then((data) => {
      if (!data)
        return res.status(404).json({ message: "conversations not found!" });
      return res.status(200).json(data);
    });
  } catch (error) {
    next(error);
    res.status(500).json({ message: error.message });
  }
};
