const mongoose = require("mongoose");
let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

async function connectDB() {
  // Check karo connection alive hai ya nahi
  if (cached.conn && mongoose.connection.readyState === 1) {
    console.log("Reusing existing DB connection");
    return cached.conn;
  }

  // Reset karo agar connection dead hai
  cached.conn = null;
  cached.promise = null;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000, // 10 sec timeout
      socketTimeoutMS: 45000,
    });
  }
  try {
    cached.conn = await cached.promise;
    console.log("Connected to the DB");
  } catch (error) {
    cached.promise = null;
    console.log(error);
    throw error;
  }
  return cached.conn;
}

module.exports = connectDB;
