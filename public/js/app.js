const socket = io();
const now=moment();
const room=getQuery('room');
const name=getQuery('name');

console.log(`${name} wants to join ${room}`);

const $form = jQuery('#message-form');
var connectionId;

$form.on('submit', function(event) {
	event.preventDefault();
	const $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val(),
		time:now.valueOf(),
		name:name
	});
});

socket.on('connect', function() {
	console.log('Connected to server');
});

socket.on('message', function(message) {
	console.log(message.text);
	$message=jQuery('.messages');
	$message.append('<p> '+ message.name +' <strong>'+moment.utc(message.time).local().format('h:mm a')+'</strong> </p>');
	$message.append('<p>'+ message.text + '</p>');
});