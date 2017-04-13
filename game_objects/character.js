var Entity = require('./entity');

var randomColor = require('../functions/random_color');

var Character = function(id) {
	var self = Entity();
	self.type = "Character";

	self.id = id;
	self.name = "";
	self.x = Math.floor(Math.random() * 600) + 100;
	self.y = Math.floor(Math.random() * 400) + 100;
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.acceleration = 2;
	self.maxSpeed = 13;
	self.color = randomColor();
	self.message = '';

	self.preMessage = '';

	var super_update = self.update;
	self.update = function() {
		self.message = self.preMessage;
		self.preMessage = '';
		self.updateSpeed();
		super_update();
		self.snapToBox();
	}

	self.snapToBox = function() {
		if (self.x < 30)
			self.x = 30;
		else if (self.x > 770)
			self.x = 770;
		if (self.y < 50)
			self.y = 50;
		else if (self.y > 570)
			self.y = 570;
	}

	self.updateSpeed = function() {
		if (self.pressingRight)
			self.spdX = self.maxSpeed;
		else if (self.pressingLeft)
			self.spdX = -self.maxSpeed;
		else
			self.spdX = 0;

		if (self.pressingUp)
			self.spdY = -self.maxSpeed;
		else if (self.pressingDown)
			self.spdY = self.maxSpeed;
		else
			self.spdY = 0;
	};

	self.getInitPack = function() {
		return {
			x: self.x,
			y: self.y,
			name: self.name,
			id: self.id,
			color: self.color,
			message: ''
		};
	};

	self.getUpdatePack = function() {
		return {
			x: self.x,
			y: self.y,
			id: self.id,
			message: self.message
		};
	}

	return self;
};

Character.onConnect = function(socket) {
	var character = Character(socket.id);
	character.name = socket.request.user.local.email;

	socket.on('keyPress', function(data) {
		if (data.inputId === 'left')
			character.pressingLeft = data.state;
		else if (data.inputId === 'right')
			character.pressingRight = data.state;
		else if (data.inputId === 'up')
			character.pressingUp = data.state;
		else if (data.inputId === 'down')
			character.pressingDown = data.state;
	});

	socket.on('send message', function(message) {
		character.preMessage = message;
	});

	return character;
}

module.exports = Character;