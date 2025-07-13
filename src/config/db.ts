// src/config/db.ts
import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/DIVINO2'; // URI fisso

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
