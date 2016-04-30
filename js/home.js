const electron = require("electron");
const ipc = electron.ipcMain;

exports.init = function() {
	ipc.on("midi-start-record", () => {
		require("midi");
	});
}
