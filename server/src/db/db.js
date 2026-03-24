const mongoose = require("mongoose");

let cached = global.mongoose || (global.mongoose = { conn: null, promise: null });

async function connectDB() {
  if (cached.conn) {
    console.log("Reusing existing DB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false,
      maxPoolSize: 10,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("Connected to the DB");
  } catch (error) {
    cached.promise = null; // reset karo taki next time retry ho
    console.log(error);
    throw error;
  }

  return cached.conn;
}

module.exports = connectDB;
