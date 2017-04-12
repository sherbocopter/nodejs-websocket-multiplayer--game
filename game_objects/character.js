var Entity = require('./entity');

var Character = function(id) {
	var self = Entity();
	self.type = "Character";

	self.id = id;
	self.name = "";
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.acceleration = 2;
	self.maxSpeed = 10;

	var super_update = self.update;
	self.update = function() {
		self.updateSpeed();
		super_update();
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
			id: self.id
		};
	};

	self.getUpdatePack = function() {
		return {
			x: self.x,
			y: self.y,
			id: self.id
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

	return character;
}

module.exports = Character;