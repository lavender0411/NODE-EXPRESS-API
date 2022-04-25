const express = require('express');
const app = express();
const task = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');
require('dotenv').config();

// middleware
app.use(express.json()); // req.body
app.use(express.static('./public'));
// routes
// app.get('/', (req, res) => {
//   res.send('get');
// });

app.use('/api/v1/tasks', task);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
