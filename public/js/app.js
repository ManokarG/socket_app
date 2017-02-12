var socket = io();
var now=moment();

var $form = jQuery('#message-form');
var connectionId;

$form.on('submit', function(event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		time:now.valueOf()
	});
});

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('message', function(message) {
	console.log(message.text);
	jQuery('.messages').append('<p><strong>'+moment.utc(message.time).local().format('h:mm a')+'</strong> : ' + message.text + '</p>');
});