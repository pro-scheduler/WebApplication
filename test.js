let Stomp = require('stompjs');
let stock = require('sockjs');
const WebSocket = require('ws');

let socket = new WebSocket('ws://localhost:8084/api/chat/chat');

console.log("Connecting")
let ws = Stomp.over(socket);

ws.connect({}, function(frame) {
    ws.subscribe("/api/chat/topic/1/push", function(message) {
        console.log("Error " + message.body);
    });

}, function(error) {
    console.log("STOMP error " + error);
});