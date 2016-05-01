var remote = require('electron').remote; 
var dialog = remote.require('dialog');
const ipcRenderer = require('electron').ipcRenderer;

var navs = ["home", "tools"];

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
	mode = document.getElementById("record-mode").value;
	speed = parseFloat(document.getElementById("record-mode-speed").value);
	ipcRenderer.send('midi-start-record-'+mode, speed);
});

document.getElementById("button-midi-stop").addEventListener('click', function(event){
	mode = document.getElementById("record-mode").value;
	ipcRenderer.send('midi-stop-record');
});

document.getElementById("button-midi-clear").addEventListener('click', function(event){
	ipcRenderer.send('clear-keyboard');
});

function loadSong(song){
	ipcRenderer.send('midi-load-song', song);
}

function getStore() {
	$.get("http://b-sharp.co/store", function(data){
		songs = JSON.parse(data);
		console.log(songs[0].song);
		var html = "";
		for (var i=0; i<songs.length; i++){
			
			html += "<tr onclick='loadSong("+JSON.stringify(songs[i].song)+")'><td>";
			html += songs[i].timestamp;
			html += "</td><td>"+songs[i].song.length+"</td></tr>";

		}
		document.getElementById("store").innerHTML=html;
	});
}

getStore();

