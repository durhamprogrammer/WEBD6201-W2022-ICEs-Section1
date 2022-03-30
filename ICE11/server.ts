#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './Config/app';
import debug from 'debug';
debug('temp:server');
import http from 'http';
import { HttpError } from 'http-errors';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000') as number;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) 
{
  const port = parseInt(val, 10);

  if (isNaN(port)) 
  {
    // named pipe
    return val;
  }

  if (port >= 0) 
  {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
  if (error.syscall !== 'listen') 
  {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) 
  {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() 
{
  let addr = server.address() as string;
  let bind = 'pipe ' + addr;
  debug('Listening on ' + bind);
}
