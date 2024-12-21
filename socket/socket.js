const socketio = require("socket.io");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
let ioInstance = null;

module.exports = function createSocketInstance() {
  if (!ioInstance) {
    ioInstance = socketio(server); //Now our Websocket is also running on the same server instacne. Socket.io sets up a WebSocket server that runs on the same server instance as the HTTP server. This allows both HTTP and WebSocket protocols to be served by the same server.

    ioInstance.on("connection", (socket) => {
      console.log("A new user connected!");

      socket.on("UI_CLIENT_ID", (userId) => {
        console.log(`User ${userId} Listening  to the notifications`);
        socket.join(userId); //Use socket.join(userId) here to manage user-specific rooms
      });

      // Handle other events (e.g., disconnections)
      socket.on("disconnect", () => {
        console.log("A user disconnected!");
      });
    });
  }

  return ioInstance;
};

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
