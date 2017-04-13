var Character = function(data) {
	var self = {};

	self.draw = function(ctx) {
		ctx.beginPath();
		
		// draw rect
		ctx.rect(self.x - 10, self.y, 20, -40);
		ctx.fillStyle = self.color;
		ctx.globalAlpha = 0.5;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.strokeStyle = self.color;
		ctx.stroke();

		// draw name
		ctx.textAlign = "center";
		ctx.fillText(self.name, self.x, self.y + 10);
	}

	self.init = function(pack) {
		self.x = pack.x;
		self.y = pack.y;
		self.name = pack.name;
		self.id = pack.id;
		self.color = pack.color;
	}

	self.update = function(pack) {
		self.x = pack.x;
		self.y = pack.y;
		self.id = pack.id;
	}

	self.init(data);

	return self;
}