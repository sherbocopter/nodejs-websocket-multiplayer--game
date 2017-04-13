var canv = document.getElementById('game-canvas');
var ctx = canv.getContext('2d');

var socket = io();
var characters = [];


// socket.on('newPositions', function(pack) {
// 	ctx.clearRect(0, 0, canv.width, canv.height);

// 	for (i in pack) {
// 		character = Character(pack[i]);
// 		character.draw(ctx);
// 	}
// });

socket.on('init', function(data) {
	for (var i = 0; i < data.characters.length; ++i) {
		var pack = data.characters[i];
		characters[pack.id] = Character(pack);
	}
});

socket.on('update', function(data) {
	for (var i = 0; i < data.characters.length; ++i) {
		var pack = data.characters[i];
		var character = characters[pack.id];
		if (character) {
			character.update(pack);
		}
	}
});

socket.on('remove', function(data) {
	for (var i = 0; i < data.characters.length; ++i) {
		delete characters[data.characters];
	}
});

setInterval(function() {
	ctx.clearRect(0, 0, canv.width, canv.height);
	for (var i in characters) {
		characters[i].draw(ctx);
	}
}, 40);

var isChatOn = false;
var toggleChat = function(b) {
	if (b === true) {
		isChatOn = true;
		
		var formChat = document.getElementById('formChat');
		formChat.style.visibility = 'visible';

		var inputChat = document.getElementById('inputChat');
		inputChat.value = '';
		inputChat.focus();
	}
	else {
		isChatOn = false;
		
		var formChat = document.getElementById('formChat');
		formChat.style.visibility = 'hidden';

		var inputChat = document.getElementById('inputChat');
		inputChat.value = '';
	}
}

var sendMessage = function(message) {
	console.log('sending message: ' + message);
}

$('#formChat').submit(function() {
	var inputChat = document.getElementById('inputChat');

	sendMessage(inputChat.value);
	toggleChat(false);

	return false;
});

document.onkeydown = function(event) {
	if (isChatOn === false) {
		if (event.keyCode === 89) // y
			toggleChat(true);
		else if (event.keyCode === 68) // d
			socket.emit('keyPress', {inputId: 'right', state: true});
		else if (event.keyCode === 83) // s
			socket.emit('keyPress', {inputId: 'down', state: true});
		else if (event.keyCode === 65) // a
			socket.emit('keyPress', {inputId: 'left', state: true});
		else if (event.keyCode === 87) // w
			socket.emit('keyPress', {inputId: 'up', state: true});
	}
	else {

	}
};

document.onkeyup = function(event) {
	if (event.keyCode === 68)
		socket.emit('keyPress', {inputId: 'right', state: false});
	else if (event.keyCode === 83)
		socket.emit('keyPress', {inputId: 'down', state: false});
	else if (event.keyCode === 65)
		socket.emit('keyPress', {inputId: 'left', state: false});
	else if (event.keyCode === 87)
		socket.emit('keyPress', {inputId: 'up', state: false});
};