const socketio = require('socket.io');

let ioInstance = null;

module.exports = function createSocketInstance(server) {

  if (!ioInstance) {

    ioInstance = socketio(server); //Now our Websocket is also running on the same server instacne. Socket.io sets up a WebSocket server that runs on the same server instance as the HTTP server. This allows both HTTP and WebSocket protocols to be served by the same server.

    ioInstance.on('connection', (socket) => {

      console.log('A new user connected!');

      socket.on('UI_CLIENT_ID', (userId) => {

        console.log(`User ${userId} Listening  to the notifications`);
        socket.join(userId);//Use socket.join(userId) here to manage user-specific rooms
        
      });

      // Handle other events (e.g., disconnections)
      socket.on('disconnect', () => {

        console.log('A user disconnected!');
        
      });

    });
    
  }

  return ioInstance;
  
};

 
//  1- We create the createSocketInstance function that takes the server instance as an argument. As it is the default export,
//   we import it in the main index.js file and pass the server instance as a parameter.
// 2- Now, in our socket.js file, we get the server instance and pass the same server instance to the socketio library.
// 3- By doing this, our server and the socket.io run alongside each other.





// const socketio = require('socket.io');
// const messageModel = require('./models/Message.model');
// const conversationModel=require("./models/conversation.model");

// let ioInstance = null;

// module.exports = function createSocketInstance(server) {
  
//   if (!ioInstance) {
//     ioInstance = socketio(server); // Now our WebSocket is also running on the same server instance. Socket.io sets up a WebSocket server that runs on the same server instance as the HTTP server. This allows both HTTP and WebSocket protocols to be served by the same server.

//     ioInstance.on('connection', (socket) => {
//       console.log('A new user connected!');

//       // Handle user joining notification rooms
//       socket.on('UI_CLIENT_ID', (userId) => {
//         console.log(`User ${userId} Listening to the notifications`);
//         socket.join(userId); // Manage user-specific rooms
//       });

//      // Join conversation room
//      socket.on('joinConversation', (conversationId) => {
//       socket.join(conversationId);
//       console.log(`User joined conversation ${conversationId}`);
//     });

//      // Handle sending messages
//      socket.on('sendMessage', async (message) => {
//       const { conversationId, text, senderInfo } = message;
      
//       try {
//         // Create and save the message in the database
//         const newMessage = await messageModel.create({
//           conversationId,
//           senderInfo,
//           text,
//         });

//         // Update the last message in the conversation
//         await conversationModel.findByIdAndUpdate(conversationId, {
//           lastMessage: text,
//         });

//         // Emit the message to the conversation room
//         ioInstance.to(conversationId).emit('receiveMessage', {
//           conversationId,
//           text,
//           senderInfo,
//           createdAt: newMessage.createdAt,
//         });

//       } catch (error) {
//         console.error('Error sending message:', error);
//       }

//     });
   

//       // Handle disconnections
//       socket.on('disconnect', () => {
//         console.log('A user disconnected!');
//       });
//     });
//   }

//   return ioInstance;
// };


