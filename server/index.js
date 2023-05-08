// const app = require("express")();
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

// const port = process.env.PORT || 8080;

// io.on("connection", (socket) => {
//   socket.emit("greeting-from-server", {
//     greeting: "Hello Client",
//   });
//   socket.on("greeting-from-client", function (message) {
//     console.log(message);
//   });
// });

// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

//Node has experimental support for ES modules.
//To enable them, in the package.json file add “type” : “module”
import express from "express";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 8080;

// create an Express server on port 3000
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

/*
Socket.IO is a JavaScript real-time chat library
Socket.IO works by adding event listeners to an instance of http.Server
Socket.IO has many flags or methods we can call to perform many functions such as emitting an event, listening to events, etc.
Socket.ON(): takes an event name and a callback as parameters, it listens for an event emitted from the server or vice versa, and the callback is used to retrieve any data associated with the event
Socket.EMIT(): emits/sends an event with or without data to the listening sockets including itself
Socket.Broadcast.Emit(): emits an event to other connected clients without itself included
*/

// create a Socket.IO server
const socketIo = new Server(server, {
  cors: {
    origin: "*", // Allow any origin for testing purposes. This should be changed on production.
  },
});

// on("connection") is called when a new connection from the client side is initiated
socketIo.on("connection", (socket) => {
  console.log("New connection created");

  // get the auth token provided on handshake
  const token = socket.handshake.auth.token;
  console.log("Auth token", token);

  try {
    // verify the token here and get user info from JWT token
  } catch (error) {
    // if the JWT is malicius disconnect the client
    socket.disconnect(true);
  }

  // a client is disconnected
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  // read message recieved from client
  socket.on("message_from_client", (data) => {
    console.log("message_from_client: ", data);
  });

  // send a message to the connected client 5 seconds after the connection is created
  setTimeout(() => {
    socket.emit("message_from_server", `Message: ${Math.random()}`);
  }, 5_000);
});
