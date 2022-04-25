require('dotenv').config();
require('express-async-errors');

// const connectDB = require('./db/connect');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connectDB
    // await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};
start();
