import express from 'express';
import path from 'path';
let router = express.Router();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "./Client")));
app.use(express.static(path.join(__dirname, "./node_modules")));

// app configuration
app.set("views", path.join(__dirname, "./Views"));
app.set("view engine", "ejs");



app.use(router);

router.get('/', function(req, res)
{
  res.render("index", {title: "Hello, World!"});
});

router.get('/home', function(req, res)
{
  res.render("index", {title: "Home"});
});


/* app.use("/", function(req, res)
{
  res.send("Hello, World!");
}); */

app.listen(port, function()
{
  console.log(`Server listening at ${port}`);
});

export default app;







/* import http from 'http'; // import pre-bundled module(s)
import fs from 'fs';
import mime from 'mime-types'; // third-party module
let lookup = mime.lookup; // alias for mime.lookup

const port = process.env.PORT || 3000;

// Create an Instance of a Server (Immutable)
const server = http.createServer(function(req, res)
{
    let path = req.url as string;

    if(path == "/" || path == "/home")
    {
        path = "/index.html";
    }

    let mime_type = lookup(path.substring(1)) as string;

    fs.readFile(__dirname  + path, function(err, data)
    {
        if (err) 
        {
            res.writeHead(404);
            res.end("ERROR: 404 - File Not Found! " + err.message);
            return;
          }
          res.setHeader("X-Content-Type-Options", "nosniff"); // security guard
          res.writeHead(200, {'Content-Type': mime_type});
          res.end(data);
      
    });
});

// like addEventListener("user req on a port")
server.listen(port, function() {
  console.log(`Server running at Port:${port}`);
}); */