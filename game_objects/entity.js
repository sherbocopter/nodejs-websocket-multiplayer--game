var Entity = function() {
	var self = {
		x: 0,
		y: 0,
		spdX: 0,
		spdY: 0,
		id: "",
		type: "Entity"
	};

	self.update = function () {
		self.updatePosition();
	};

	self.updatePosition = function() {
		self.x += self.spdX;
		self.y += self.spdY;
	}

	return self;
}

module.exports = Entity;