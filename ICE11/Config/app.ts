import createError from 'http-errors';
import express, { NextFunction } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose, {mongo} from 'mongoose';

import indexRouter from '../Routes/index';
import usersRouter from '../Routes/users';

const app = express();

// DB configuration
import * as DBConfig from './db';

mongoose.connect(DBConfig.RemoteURI);

const db = mongoose.connection; // alias for the mongoose connection
db.on('error', function()
{
  console.error('connection error');
});

db.once('open', function(){
  console.log(`Connected to MongoDB at: ${DBConfig.Host}`);
});

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../Client')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  next(createError(404));
});

// error handler
app.use(function(err: createError.HttpError, req: express.Request, 
  res: express.Response, next: NextFunction) 
  {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
