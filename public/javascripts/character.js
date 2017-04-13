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
		ctx.fillStyle = '#000000';
		ctx.fillText(self.name, self.x, self.y + 10);

		// draw message
		if (self.message !== '') {
			ctx.textAlign = "center";
			ctx.fillStyle = '#000000';
			ctx.fillText(self.message, self.x, self.y - 50);
		}
	}

	self.init = function(pack) {
		self.x = pack.x;
		self.y = pack.y;
		self.name = pack.name;
		self.id = pack.id;
		self.color = pack.color;
		self.addMessage(pack.message);
	}

	self.update = function(pack) {
		self.x = pack.x;
		self.y = pack.y;
		self.id = pack.id;

		if (pack.message !== '') {
			self.addMessage(pack.message);
		}
	};

	var timeoutChat = null;
	self.addMessage = function(message) {
		self.message = message;
		clearTimeout(timeoutChat);
		timeoutChat = setTimeout(function() {
			self.message = '';
		}, 5000);
	};

	self.init(data);

	return self;
}