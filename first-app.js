const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit"></button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //registering the event listener, on allows to listen to diff events
      console.log("chunk");
      body.push(chunk); // with push we are changing that data brhind that body element
    });
    req.on("end", () => {
      //register another event listener i.e. end event
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1]; //node registers this as an action to be executed.
      fs.writeFileSync("message.txt", "message"); //make it part of the to be executed code
    });
    res.statusCode = 302; //statusCode for redirection
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
  //console.log("HAID");
});

server.listen(3000);
