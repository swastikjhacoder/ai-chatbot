import User from "../models/user-model.js";
import dotenv from "dotenv";
import OpenAI from "openai";

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

export const saveChats = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.session.user_id });
    if (user) {
      console.log(`user id: ${user._id}`);
    }
  } catch (error) {
    next(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteChats = async (req, res, next) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
