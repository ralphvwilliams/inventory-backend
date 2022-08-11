import mongoose from 'mongoose';
import express from 'express';
import 'dotenv/config';
import routes from './routes/index.js';

export const app = express();
const port = 8080;
let DB_URL;

process.env.NODE_ENV == 'development'
  ? (DB_URL = process.env.DB_URL)
  : (DB_URL = process.env.TEST_DB_URL);

mongoose
  .connect(DB_URL)
  .then((res) => {
    console.log('DB Connected');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Listening',
  });
});

app.use(routes);
app.listen(port, () => {
  console.log(`This app is listening on http://localhost:${port}`);
});
