import express from 'express';
import cors from 'cors';

import papersRouter from './routes/papers.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/papers', papersRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});