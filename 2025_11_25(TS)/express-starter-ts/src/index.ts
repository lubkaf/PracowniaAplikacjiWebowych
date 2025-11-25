import express, { Express } from 'express';
import wpisyRouter from '../routes/wpisy.js';

const app: Express = express();

app.use(express.json()); // żeby Express czytał body w JSON
app.use('/wpisy', wpisyRouter);

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000');
});
