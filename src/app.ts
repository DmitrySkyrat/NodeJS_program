import express, { Application }  from 'express';
import { validationErrorHandler } from "./ValidationErrorHandler/errorHandler";

const app: Application = express();
const homeRoute = require('./routes/home');
const usersRoute = require('./routes/users');
const mongoose = require('mongoose');
 
const port: number = 8080;
const mongodbUrl: string = 'mongodb+srv://user:214365879@cluster0.w2spu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.json());
app.use(homeRoute);
app.use(usersRoute);
app.use(validationErrorHandler);

mongoose.connect(mongodbUrl, { useUnifiedTopology: true, useNewUrlParser: true }, (error: Error): void => {
  console.log('mongo database is connected', error ? error : 'successfully');
});


app.listen(port, (): void => {
  console.log(`server started on port ${port}`);
});
