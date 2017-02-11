const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
var count = 0;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	count += 1;
	console.log(`Client ${count} connected`);
	socket.emit('onconnection',count);
	socket.on('disconnect', function() {
		console.log(`Client ${count} disconnected`);
		count -= 1;
	});

	socket.on('message', function(message) {
		console.log(`${message.text}`);
		io.emit('message', {
			text: message.text
		});
	});
});

http.listen(PORT, function() {
	console.log(`Server running on ${PORT}`);
});