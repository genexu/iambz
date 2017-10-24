const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');

const app = express();
const server = http.Server(app);
const io = socket(server);

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

server.listen(3000, () => {
  console.log('Linstening On Port 3000');
});

io.on('connection', (client) => {
  console.log(`id ${client.id} is connected`);
});
