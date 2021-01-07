const express = require("express");
var cors = require("cors");
const app = express();

const port = 5000;

app.use(cors());

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} has connected`);
  socket.emit("connected", { socketId: socket.id });

  socket.on("handRaise", ({ name, topic }) => {
    data = {
      name,
      topic,
    };

    console.log("Sending notification ...");
    io.emit("notify", data);
    console.log("Notifiction Sent");
    console.log({ data });
  });

  socket.on("disconnect", () =>
    console.log(`Socket ${socket.id} has disconnected`)
  );
});
