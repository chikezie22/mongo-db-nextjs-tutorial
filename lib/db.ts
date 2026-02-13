import mongoose from 'mongoose';
const MONGODB_URL = process.env.MONGO_DB;
let isConnected = false;
export async function connectDb() {
  if (isConnected) {
    console.log('mongodb is already connected');
    return;
  }
  try {
    const db = await mongoose.connect(MONGODB_URL!);
    isConnected = db.connections[0]?.readyState === 1;
    console.log(db.connections);
  } catch (error) {
    console.log(error);
    throw error;
  }
}


