// const express = require("express")
// const app = express()

// app.get("/", (req, res) => {
//     res.status(200).send("x")
// })

// app.listen(80, err => {
//     if(err) {
//         console.log("server cannot listen...");
//         return
//     }
//     console.log("server listen...");
// });

'use strict';

const express = require('express');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
  const app = express();
  app.get('/events', async function(req, res) {
    console.log('Got /events');
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    res.write('retry: 10000\n\n');
    let count = 0;

    while (true) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Emit', ++count);
      res.write(`data: ${count}\n\n`);
    }
  });

  const index = fs.readFileSync('./event.html', 'utf8');
  app.get('/', (req, res) => res.send(index));

  await app.listen(8080);
  console.log('Listening on port 80');
}