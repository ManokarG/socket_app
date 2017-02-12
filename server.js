const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');
const now = moment();
var count = 0;

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	count += 1;
	console.log(`Client ${count} connected`);

	socket.on('disconnect', function() {
		console.log(`Client ${count} disconnected`);
		count -= 1;
	});

	socket.on('message', function(message) {
		console.log(`${now.utc(message.time).local().format('h:mm a')}  ${message.text}`);
		io.emit('message', {
			text: message.text,
			time: message.time
		});
	});
});

http.listen(PORT, function() {
	console.log(`Server running on ${PORT}`);
});