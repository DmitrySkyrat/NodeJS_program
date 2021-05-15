import express, {Application}  from 'express';
import {validationErrorHandler} from "./middlewares/errorHandler";
import router from './routes/user.routes';
import {port} from './config/config';

const app: Application = express();
const homeRoute = require('./routes/home');

app.use(express.json());
app.use(homeRoute);
app.use(router);
app.use(validationErrorHandler);

app.listen(port, (): void => {
  console.log(`server started on port ${port}`);
});
