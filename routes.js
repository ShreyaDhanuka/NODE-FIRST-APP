const fs = require("fs");

const requestHandler = (req, res) => {
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
      console.log(chunk);
      body.push(chunk); // with push we are changing that data brhind that body element
    });
    return req.on("end", () => {
      //we register a function to be called in the future
      //register another event listener i.e. end event
      const parsedBody = Buffer.concat(body).toString(); //Buffer is available globally by nodejs
      const message = parsedBody.split("=")[1]; //node registers this as an action to be executed.
      fs.writeFile("message.txt", message, (err) => {
        //callback
        res.statusCode = 302; //statusCode for redirection
        res.setHeader("Location", "/");
        return res.end(); // this response should only be sent when we are done working with the file.
      }); //will execute after statuscode
    }); //next part of code runs before this part coz this part is just a callback
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title> My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};
//module.exports = requestHandler;

module.exports = {
  handler: requestHandler,
  someText: "SOME HARD CODED TEXT",
};

//module.exports.handler=requestHandler;
//module.exports.someText='Some hard coded text';
