import express from 'express';
import cors from 'cors';
import connectDB from './connectDB.js';
import dotenv from 'dotenv';
import papersRouter from './routes/papers.js';

const app = express();
const PORT = 5000;
dotenv.config({path: ".env"})

app.use(cors());
app.use(express.json());

app.use('/api/papers', papersRouter);

try {
  connectDB(process.env.mongodb);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
} catch (err) {
  console.log(err);
};