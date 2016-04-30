const electron = require("electron");
const ipc = electron.ipcMain;
var reader = require("./midi-reader.js");
var led = require("./led.js");

exports.mode = 0 // 0 - simple, 1 - learner, 2 - expert
exports.init = function() {
	ipc.on("midi-start-record", () => {
		reader.start(function(deltaTime, message) {
  			//console.log('m:' + message + ' d:' + deltaTime);
			if (exports.mode == 0){
				key = 78+28-parseInt(message.toString().split(",")[1]);
				isKeyDown = parseInt(message.toString().split(",")[0]) == 128 ? false : true;
				if (!isKeyDown)
					led.strip.pixel(key).color("black");
				else
					led.strip.pixel(key).color("green");
				led.strip.show();
			}
		});
	});
	ipc.on("midi-stop-record", () => {
		reader.stop();
	});
}
