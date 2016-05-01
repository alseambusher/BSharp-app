const electron = require("electron");
const ipc = electron.ipcMain;
var reader = require("./midi-reader.js");
var led = require("./led.js");

exports.mode = 0; // 0 - simple, 1 - learner, 2 - expert

exports.song = [];
exports.song_out =[[144,30,25,0], [144, 31,31,0.1], [144, 32,32,0.9]];

exports.interrupt = true;

exports.init = function() {
	reader.start(function(deltaTime, message) {
		//console.log(message, deltaTime);
		m = message.toString().split(",");
		exports.song.push([parseInt(m[0]),parseInt(m[1]),parseInt(m[2]), parseFloat(deltaTime)]);
		});

	ipc.on("midi-start-record-record", () => {
		exports.interrupt = false;
		exports.song = [];
 		midi_start_record();
	});

	ipc.on("midi-start-record-simple", () => {
		exports.interrupt = false;
		exports.song = [];
 		midi_start_record_simple();
	});

	ipc.on("midi-start-record-expert", () => {
		exports.interrupt = false;
 		midi_start_record_expert();
	});

	ipc.on("midi-start-record-learner", () => {
		exports.interrupt = false;
		exports.song = [];
		midi_start_record_learner(undefined);
	});

	ipc.on("midi-stop-record", () => {
		//reader.stop();
		exports.interrupt = true;
	    	//exports.strip.color("#000");
	});

}

function midi_start_record(){
	if (exports.interrupt) {
		exports.song_out = exports.song.slice(0);
	} else
		setTimeout(midi_start_record, 10);
}

function midi_start_record_simple(){
	if (!exports.interrupt){
		if (exports.song.length > 0){
			node = exports.song.shift();
			key = node[1] - 28;
			if (node[0] == 128)
				led.strip.pixel(key).color("black");
			else
				led.strip.pixel(key).color("green");
			led.strip.show();
		}
		setTimeout(midi_start_record_simple, 10);
	}
}

function midi_start_record_learner(wait){
	if (!exports.interrupt){
		if (wait == undefined){
			if (exports.song_out.length > 0){
				node = exports.song_out.shift();
				key = node[1] - 28;
				if (node[0] != 128){
					led.strip.pixel(key).color("green");
					wait = key;
				}
				led.strip.show();
			}
		} else {
			if (exports.song.length > 0){
				node = exports.song.shift();
				key = node[1] - 28;
				if (node[0] != 128){
					if (wait != key)
						led.strip.pixel(key).color("red");
					else{
						led.strip.pixel(key).color("#000");
						wait = undefined;
					}
				}
				led.strip.show();
			}
		}
		setTimeout( function() { midi_start_record_learner(wait)}, 10);
	}
}

function midi_start_record_expert(){
	if (!exports.interrupt){
		if (exports.song_out.length > 0){
			node = exports.song_out.shift();
			key = node[1] - 28;
			if (node[0] == 128)
				led.strip.pixel(key).color("black");
			else
				led.strip.pixel(key).color("green");
			led.strip.show();
			if (exports.song_out.length > 0)
				setTimeout(midi_start_record_expert, exports.song_out[0][3]*1000);
		}
	}
}
