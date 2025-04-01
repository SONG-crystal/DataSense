require("dotenv").config();
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || "datasense-db";

// Ensure global mongoose cache exists
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI not defined. Skipping database connection.");
    return null;
  }

  if (global.mongoose.conn) return global.mongoose.conn;

  if (!global.mongoose.promise) {
    console.log("🔗 Connecting to MongoDB...");
    global.mongoose.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: DB_NAME,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      })
      .then((mongoose) => {
        console.log(`✅ Connected to MongoDB: ${MONGODB_URI}`);
        return mongoose;
      });
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default connectToDatabase;
