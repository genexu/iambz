const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const CONFIG = require('./config.js');
const EVENTS = require('./constants/events.js');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.resolve(__dirname, '../client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

server.listen(CONFIG.PORT, () => {
  console.log(`Linstening On Port ${CONFIG.PORT}`);
});

io.on('connection', (socket) => {
  console.log(`id ${socket.id} is connected`);
  socket.on(EVENTS.CLIENT_JOIN_ROOM, (res) => {
    console.log(`id ${socket.id} is join the room [${res.roomName}]`);
    socket.join(res.roomName);
    io.in(res.roomName).clients((err, clients) => {
      console.log(`IDs In Room:${res.roomName} [${clients}]`);
      io.in(res.roomName).emit(EVENTS.CLIENT_JOIN_ROOM, {
        id: socket.id,
        clientNumber: clients.length,
      });
    });
  });
  socket.on(EVENTS.SPACE_OWNER_GREETING, (res) => {
    socket.to(res.id).emit(EVENTS.SPACE_OWNER_GREETING);
  });
  socket.on(EVENTS.REQUEST_CLIENT_APPOINTMENT, (res) => {
    console.log(`Space Owner ID:${socket.id} Request Client Appointment`);
    io.in(res.roomName).clients((err, clients) => {
      console.log(`IDs In Room:${res.roomName} [${clients}]`);
    });
    socket.to(res.roomName).emit(EVENTS.REQUEST_CLIENT_APPOINTMENT, { sender: socket.id });
  });
  socket.on(EVENTS.CLIENT_SUBMIT_APPOINTMENT, (res) => {
    socket.to(res.receiver).emit(EVENTS.CLIENT_SUBMIT_APPOINTMENT, {
      appointment: res.appointment,
    });
  });
  socket.on(EVENTS.SPACE_OWNER_STATUS_CHANGE, (res) => {
    socket.to(res.roomName).emit(EVENTS.SPACE_OWNER_STATUS_CHANGE, { status: res.status });
  });
  socket.on('disconnecting', () => {
    console.log(`id ${socket.id} is disconnected`);
    Object.keys(socket.rooms)
      .filter(roomId => roomId !== socket.id)
      .map((roomId) => {
        socket.leave(roomId);
        io.in(roomId).clients((err, clients) => {
          console.log(`IDs In Room:${roomId} [${clients}]`);
          io.in(roomId).emit(EVENTS.CLIENT_LEAVE, { clientNumber: clients.length });
        });
        return true;
      });
  });
});
