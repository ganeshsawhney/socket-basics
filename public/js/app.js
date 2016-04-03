var name = getQueryVariable('name') || 'Annonymous';
var room = getQueryVariable('room') || 'Public Chat';
var socket = io();

socket.on('connect',function (){
	console.log('Connected to Socket.io server');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
})

jQuery('.room-title').text(room);

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	console.log('New Message:');
	console.log(message.text);

	$messages.append('<p><strong>' + message.name + ' ||| ' + momentTimestamp.local().format("DMMM h:mm:ssa") + ':&nbsp </strong></p>');

	$messages.append('<p>' + message.text + '</p>');
})


//handles submitting of new message
/*
var $form = jQuery('title');
var $form = jQuery('input');
*/
var $form = jQuery('#message-form');

//wait for user to click on submit button
$form.on('submit', function(event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');

});