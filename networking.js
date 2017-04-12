var Character = require('./game_objects/character');

var characters = {};
var sockets = {};

var initPack = {characters: []};
var removePack = {characters: []};

module.exports = function(io) {
	io.sockets.on('connection', function(socket) {
		console.log("connected: " + socket.id);
		
		sockets[socket.id] = socket;

		var character = Character.onConnect(socket);
		characters[socket.id] =  character;
		initPack.characters.push(character.getInitPack());

		socket.on('disconnect', function() {
			console.log("disconnected: " + socket.id);

			removePack.characters.push(characters[socket.id].id);

			delete sockets[socket.id];
			delete characters[socket.id];
		});

		var localInitPack = {characters: []};
		for (var i in characters) {
			localInitPack.characters.push(characters[i].getInitPack());
		}
		socket.emit('init', localInitPack);
	});
}

setInterval(function() {
	pack = {characters: []};
	for (var i in characters) {
		character = characters[i];
		character.update();

		pack.characters.push(character.getUpdatePack());
	}

	//TODO: use io.broadcast to room instead
	for (var i in sockets) {
		socket = sockets[i];
		socket.emit('init', initPack);
		socket.emit('update', pack);
		socket.emit('remove', removePack);
	}

	initPack.characters = [];
	removePack.characters = [];
}, 1000/25); //TODO: delta time