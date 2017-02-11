var socket = io();

var $form = jQuery('#message-form');
var connectionId;

	$form.on('submit', function(event) {
	event.preventDefault();
	var $message=$form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});
});

socket.on('connect', function() {
	console.log('Connected to server');
	socket.on('message', function(message) {
		console.log(message.text);
	});

});