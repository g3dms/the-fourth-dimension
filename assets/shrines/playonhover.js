var html5_audiotypes={
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
};

function createsoundbite(sound){
	var html5audio=document.createElement('audio');
	if (html5audio.canPlayType){
		for (var i=0; i<arguments.length; i++){
			var sourceel=document.createElement('source');
			sourceel.setAttribute('src', arguments[i]);
			if (arguments[i].match(/\.(\w+)$/i))
				sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
			html5audio.appendChild(sourceel);
		}
		html5audio.load();
		html5audio.playclip=function(){
			html5audio.pause();
			html5audio.currentTime=0;
			html5audio.play();
		};
		return html5audio;
	}
	else{
		return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio :(")}};
	}
}

var mouseoversound=createsoundbite("https://files.catbox.moe/tfvcfd.ogg", "https://files.catbox.moe/in2jg7.mp3");
var clicksound=createsoundbite("https://files.catbox.moe/y64ls3.ogg", "https://files.catbox.moe/dkr4km.mp3");