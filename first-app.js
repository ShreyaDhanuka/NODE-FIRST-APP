const http = require("http");

const routes = require("./routes");

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(3000);

//thread is like the process running in OS
//It handles multiple requests : event loop is started by node js, event loop handles event callbacks
//filesystem operation is sent to "worker pool" :responsible for heavy files
//Worker pool runs on different threads
//Timers: Execute setTimeout, setInterval Callbacks
//Pending Callbacks: Execute I/O (File/Network operations) related callbacks that were deferred
//Poll phase:where nodejs will look for more I/O events and execute callbacks faster
//Poll also checks any timer callbacks are present or not
//Check: Execute setimmediate() callbacks
//process.exit: finish the event loop
