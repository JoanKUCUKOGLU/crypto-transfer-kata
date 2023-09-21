import express from 'express';
import router from './router';

// create an express app
const app = express();

// allows any cors origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', "*")
  next();
});

app.use(express.json());
app.use(router);

// run the express app
app.listen(3000, () => {
  console.log('server started on port 3000');
});

