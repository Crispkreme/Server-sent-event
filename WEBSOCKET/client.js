let ws = new WebSocket("ws://localhost:8080");

ws.onmessage = message => console.log(`We recieve the message from our server ${message.data}`)