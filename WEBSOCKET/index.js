// 'use strict';

// const express = require('express');
// const path = require('path');
// const { createServer } = require('http');

// const { WebSocketServer } = require('../..');

// const app = express();
// app.use(express.static(path.join(__dirname, '/public')));

// const server = createServer(app);
// const wss = new WebSocketServer({ server });

// wss.on('connection', function (ws) {
//   const id = setInterval(function () {
//     ws.send(JSON.stringify(process.memoryUsage()), function () {
//       //
//       // Ignore errors.
//       //
//     });
//   }, 100);
//   console.log('started client interval');

//   ws.on('close', function () {
//     console.log('stopping client interval');
//     clearInterval(id);
//   });
// });

// server.listen(8080, function () {
//   console.log('Listening on http://localhost:8080');
// });

const http = require("http");
const WebSocketServer = require("websocket").server
let connection = null;

// client message
const httpserver = http.createServer((req, res) => {
  console.log("we have recieve a request");
});

const websocket = new WebSocketServer({
  "httpServer": httpserver
})

httpserver.listen(8080, () => console.log("my server is listening"));

websocket.on("request", request => {

  connection = request.accept(null, request.origin)
  connection.on("open", () => console.log("Opened!!!"))
  connection.on("close", () => console.log("CLOSED!!!"))
  connection.on("message", message => {
    console.log(`Received message ${message.utf8Data}`)
    connection.send(`got your message: ${message.utf8Data}`)
  })

  sendEvery5Seconds();
})

function sendEvery5Seconds()
{
  connection.send(`Message ${Math.random()}`);
  setTimeout(sendEvery5Seconds, 5000);
}