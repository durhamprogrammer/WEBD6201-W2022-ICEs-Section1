import http from 'http'; // import pre-bundled module(s)
import fs from 'fs';

const hostname = '127.0.0.1'; // AKA localhost
const port = 3000;

// Create an Instance of a Server (Immutable)
const server = http.createServer(function(req, res)
{
    let path = req.url;
    if(path == "/" || path == "/home")
    {
        path = "/index.html";
    }

    console.log(path);

    fs.readFile(__dirname  + path, function(err, data)
    {
        if (err) 
        {
            res.writeHead(404);
            res.end("ERROR: 404 - File Not Found! " + err.message);
            return;
          }
          res.writeHead(200);
          res.end(data);
      
    });

  /* res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!'); */
});

// like addEventListener("user req on a port")
server.listen(port, hostname, function() {
  console.log(`Server running at http://${hostname}:${port}/`);
});