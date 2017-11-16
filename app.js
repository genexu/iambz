const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

server.listen(3001, () => {
  console.log('Linstening On Port 3001');
});

io.on('connection', (socket) => {
  console.log(`id ${socket.id} is connected`);
  socket.on('JOIN_ROOM', (res) => {
    console.log(`id ${socket.id} is join the room [${res.roomName}]`);
    socket.join(res.roomName);
  });
  socket.on('REQUEST_CLIENT_APPOINTMENT', (res) => {
    console.log(`Space Owner ID:${socket.id} Request Client Appointment`);
    io.in(res.roomName).clients((err, clients) => {
      console.log(`IDs In Room:${res.roomName} [${clients}]`);
    });
    socket.to(res.roomName).emit('APPOINTMENT_SUBMIT_ONDER', { sender: socket.id });
  });
  socket.on('SUBMIT_APPOINTMENT', (res) => {
    socket.to(res.receiver).emit('RECEIVE_APPOINTMENT', {
      appointment: res.appointment,
    });
  });
  socket.on('disconnecting', () => {
    console.log(`id ${socket.id} is disconnected`);
  });
});
