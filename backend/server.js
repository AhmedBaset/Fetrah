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
  updateRoomStatus,
  updatePrivateRoomById,
  deletePrivateRoomById,
  AddNewMessagesInRoom,
} = require("./controllers/chat");
//app
const app = express();
const http = require("http").Server(app);

const socketIO = require("socket.io")(http, {
  cors: {
    origin: process.env.CLIENT_URL,
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

  socket.on("userAcceptance", async ({ roomId, username }) => {
    socket.to(roomId).emit("userAcceptance", { username });
  });

  socket.on("userRejection", async ({ roomId, username, rejectionReason }) => {
    socket.to(roomId).emit("userRejection", { username, rejectionReason });
  });
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

//db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch((e) => console.log(e));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cookieParser());

//cors
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));

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
