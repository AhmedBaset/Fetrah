const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//bring routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const tagRoutes = require("./routes/tag");
const formRoutes = require("./routes/form");
const {
  createPrivateRoom,
  readPrivateRoomById,
  updatePrivateRoomById,
  deletePrivateRoomById,
  AddNewMessagesInRoom,
} = require("./controllers/chat");
//app
const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const privateRooms = {};

// When a new client connects
socketIO.on("connection", (socket) => {
  // When a client wants to join a private room
  socket.on("joinPrivateRoom", async (roomId, joinedUserName) => {
    let room = await readPrivateRoomById(roomId);

    let previousMessages = room ? room.messages : [];
    if (room) {
      const roomClients = room.clients;
      roomClients.push(joinedUserName);
      if (room.clients.length === 2) {
        // Notify the other client that they have a new partner in the room
        const partnerId = room.clients.find(
          (clientId) => clientId !== socket.id
        );
        socketIO.to(partnerId).emit("partnerJoined", roomId);
      }
    } else {
      // Create the room and add the client
      const roomClients = [socket.id];
      room = await createPrivateRoom(roomId, roomClients);
    }
    // Add the client to the room
    socket.join(roomId);
    console.log(`Client ${socket.id} joined private room ${roomId}`);

    // Notify the client that they have successfully joined the room
    socket.emit("privateRoomJoined", roomId, previousMessages);

    if (room.clients.length >= 2) {
      // Notify the clients that the room is full
      socketIO.to(roomId).emit("privateRoomFull");
    }
  });

  // When a client sends a private message
  socket.on(
    "privateMessage",
    async ({ roomId, senderUserName, message, responseTo }) => {
      await AddNewMessagesInRoom(roomId, senderUserName, message, responseTo);
      socket
        .to(roomId)
        .emit("privateMessage", { message, senderUserName, responseTo });
    }
  );

  // When a client disconnects
  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
    // Remove the client from any private rooms they were in
    Object.entries(privateRooms).forEach(([roomId, roomClients]) => {
      if (roomClients.includes(socket.id)) {
        socketIO.to(roomId).emit("partnerLeft");
        privateRooms[roomId] = roomClients.filter(
          (clientId) => clientId !== socket.id
        );
      }
    });
  });
});

// //Add this before the app.get() block
// socketIO.on("connection", (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on("message", (data) => {
//     socketIO.emit("messageResponse", data);
//   });

//   //Listens when a new user joins the server
//   socket.on("newUser", (data) => {
//     //Adds the new user to the list of users
//     users.push(data);
//     console.log(users);
//     //Sends the list of users to the client
//     socketIO.emit("newUserResponse", users);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔥: A user disconnected");
//     //Updates the list of users when a user disconnects from the server
//     users = users.filter((user) => user.socketID !== socket.id);
//     console.log(users);
//     //Sends the list of users to the client
//     socketIO.emit("newUserResponse", users);
//     socket.disconnect();
//   });
// });

//db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "8mb" }));
app.use(cookieParser());

//cors
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

//routes middlewares
app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", tagRoutes);
app.use("/api", formRoutes);

const port = process.env.PORT || 8000;

http.timeout = 60000;

http.listen(port, () => console.log(`Listening on port ${port}`));
