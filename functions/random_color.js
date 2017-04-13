var colors = [
	'#0000FF',
	'#00FF00',
	'#00FFFF',
	'#FF0000',
	'#FF00FF',
	'#FFFF00',
];

module.exports = function() {
	var color = colors[Math.floor(Math.random() * colors.length)];

	return color;
}