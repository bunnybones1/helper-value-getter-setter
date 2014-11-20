var defaultMax = 100;

function GetterSetterValue(object, valueKey, logGet, logSet, traceSet, traceGet, max) {
	max = max === undefined ? defaultMax : max;
	var _this = this;
	_this.originalMax = max;
	_this._value = object[valueKey];
	_this.__logGet = logGet !== false;
	_this.__logSet = logSet !== false;
	_this.__traceGet = traceGet !== false;
	_this.__traceSet = traceSet !== false;
	_this.__countLogGet = max;
	_this.__countLogSet = max;
	_this.__countTraceGet = max;
	_this.__countTraceSet = max;
	Object.defineProperty(object, valueKey, {
		get: function() {
			console.log(_this);
			if(_this.__logGet && _this.__countLogGet >= 0) {
				console.log("getting", _this._value);
				if(_this.__countLogGet == 0) {
					console.log("max number of get logs reached (", _this.originalMax, ")")
				}
				_this.__countLogGet--;
			}
			if(_this.__traceGet && _this.__countTraceGet >= 0) {
				try {
					throw Error("Who read this value?");
				} catch(err) {
					console.log(err.message);
					console.log(err.stack);
				}
				if(_this.__countTraceGet == 0) {
					console.log("max number of get traces reached (", _this.originalMax, ")")
				}
				_this.__countTraceGet--;
			}
			return _this._value;
		},
		set: function(val) {
			if(_this.__logSet && _this.__countLogSet >= 0) {
				console.log("setting", val);
				if(_this.__countLogSet == 0) {
					console.log("max number of set logs reached (", _this.originalMax, ")")
				}
				_this.__countLogSet--;
			}
			if(_this.__traceSet && _this.__countTraceSet >= 0) {
				try {
					throw Error("Who wrote this value?");
				} catch(err) {
					console.log(err.message);
					console.log(err.stack);
				}
				if(_this.__countTraceSet == 0) {
					console.log("max number of set traces reached (", _this.originalMax, ")")
				}
				_this.__countTraceSet--;
			}
			_this._value = val;
		}
	});
}

module.exports = GetterSetterValue;