import mongoose from "mongoose";

// 0 :: variation
if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const MONGODB_URI: string = process.env.MONGODB_URI;

// 1 :: type Definition for mongoose in Global Scope:
let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};

// 2 :: Caching Mongoose Instance
let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

// 3 :: Database Connect Function
async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
