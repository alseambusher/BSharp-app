var remote = require('electron').remote; 
var dialog = remote.require('dialog');
const ipcRenderer = require('electron').ipcRenderer;

var navs = ["home", "store", "tools"];

navs.forEach(function (e){
	document.getElementById("nav-"+e).addEventListener('click', function(event){
  		event.preventDefault();
		navs.forEach(function (e_){
			document.getElementById("pane-"+e_).style.display="none";
		});
		document.getElementById("pane-"+e).style.display="block";
	});
});

document.getElementById("button-midi-start").addEventListener('click', function(event){
	ipcRenderer.send('midi-start-record');
});

