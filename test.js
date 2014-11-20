var GetterSetter = require('./');

var fred = {
	health: 90
}

GetterSetter(fred, 'health');

function operate() {
	fred.health += 10;
}

function doctor() {
	operate();
}

doctor();