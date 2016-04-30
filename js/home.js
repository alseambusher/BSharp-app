const electron = require("electron");
const ipc = electron.ipcMain;
var reader = require("./midi-reader.js");
var led = require("./led.js");

exports.mode = 0; // 0 - simple, 1 - learner, 2 - expert

exports.song = [];

exports.interrupt = true;

exports.init = function() {
	setTimeout(function() {
		reader.start(function(deltaTime, message) {
			m = message.toString().split(",");
			exports.song.push([parseInt(m[0]),parseInt(m[1]),parseInt(m[2]), parseFloat(deltaTime)]);
		});
	}, 1000);

	ipc.on("midi-start-record-simple", () => {
		exports.interrupt = false;
		console.log("asdaS");
		exports.song = [];
	});

	ipc.on("midi-stop-record", () => {
		//reader.stop();
		exports.interrupt = true;
	});


 	midi_start_record_simple();
}
	function midi_start_record_simple(){
		if (exports.song.length > 0 && !exports.interrupt){
			node = exports.songs.shift();
			key = -node[1]+ 78 + 28;
			if (node[0] == 128)
				led.strip.pixel(key).color("black");
			else
				led.strip.pixel(key).color("green");
			led.strip.show();
		}
		setTimeout(midi_start_record_simple, 10);
	}
