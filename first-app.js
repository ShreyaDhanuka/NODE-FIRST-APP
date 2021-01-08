const path = require("path");

const http = require("http");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { dirname } = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3030);

//extended:false   it should be able to parse non-default features

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
