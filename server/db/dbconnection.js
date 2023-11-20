import { connect } from "mongoose";
import { config } from "dotenv";

config();

export const dbConnect = async () => {
  try {
    await connect(process.env.MONGODB_URL);
  } catch (error) {
    console.error(`Error in connecting to MongoDB. Error: ${error.message}`);
  }
};
