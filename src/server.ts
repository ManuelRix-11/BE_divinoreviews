// src/server.ts
import express from 'express';
//import dotenv from 'dotenv';
import connectDB from './config/db';
//import userRoutes from './routes/userRoutes';

//dotenv.config();
const app = express();

app.use(express.json());
//app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
