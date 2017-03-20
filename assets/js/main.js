/**
 * Created by Zero on 3/10/2017.
 */

if(Hls.isSupported()){

	var video = document.getElementById('video');
	var hls = new Hls();

	// attach video to hls api
	hls.attachMedia(video);
	hls.on(Hls.Events.MEDIA_ATTACHED, function(){

		hls.loadSource("https://playertest.longtailvideo.com/adaptive/bipbop/bipbop.m3u8");

		hls.on(Hls.Events.MANIFEST_PARSED, function(event, data){

		});
	});

	// wait for video to finish loading metadata
	video.onloadedmetadata = function(){
		document.getElementById("seek-bar").max = video.duration;
		document.getElementById("loadedTotal").textContent = calculatedTime(video.duration);
	};

	// control-bar time left
	video.addEventListener('timeupdate', function(){
		var videoTime = this.currentTime;

		if(videoTime > 99.99){
			playToggle = false	// **changed
			playPause();
			this.currentTime = 0;
		}

		document.getElementById("loadedPercent").textContent = calculatedTime(videoTime);

		//seekbar
		document.getElementById("seek-bar").value = this.currentTime;
	});

	function calculatedTime(time){
		console.log(time);
		var seconds = Math.floor(time);
		var minutes = Math.floor(seconds / 60);
		var hours = Math.floor(minutes / 60);
		var totalTime = "";

		if(hours !== 0)
			totalTime += ("0" + hours).slice(-2) + ":";

		if(minutes == 0)
			totalTime += "0" + ":";
		else if (hours !== 0)
			totalTime += ("0" + minutes % 60).slice(-2) + ":";
		else
			totalTime += (minutes % 60) + ":";

		totalTime += ("0" + seconds % 60).slice(-2);

		return totalTime;
	}


	// play pause button
	var playToggle = true;
	document.getElementById("play-pause").addEventListener("click", function(){
		playPause();
	});

	function playPause(){
		if(playToggle)
			video.play();
		else
			video.pause();
		playToggle = !playToggle;
	}

	//config menu autoplay
	var autplayToggle = false;
	document.getElementById("autoplay").addEventListener("click", function(){
		autplayToggle = !autplayToggle;
	});


	(function(){
		if(autplayToggle)
			video.play();
	})();

	//user set time on seek bar
	function seekBar(bar){
		video.currentTime = bar.value;
	}

	//volume control
	var muteToggle = true;
	var muteButton = document.getElementById("mute");
	muteButton.addEventListener("click", function(){
		video.muted = muteToggle;
		muteToggle = !muteToggle;
	});
	
	muteButton.addEventListener("mouseover", function() {
		$("#volumebar").toggle(200).css("display", "inline-block");
	});

	//user set volume bar
	function volumeBar(bar){
		video.volume = bar.value;
	}

	//config menu quality dropdown
	hls.currentLevel = 0;
	function qualitySelector(selector){
		hls.currentLevel = selector.options[selector.selectedIndex].value;
	}

	var configToggle = true;
	document.getElementById("config").addEventListener("click", function(){
		var configMenu = document.getElementById("config-menu");

		if(configToggle)
			configMenu.style.display = "block";
		else
			configMenu.style.display = "none";

		configToggle = !configToggle;
	});

	//config menu speed dropdown
	function speedSelector(selector){
		video.playbackRate = selector.options[selector.selectedIndex].value;
	}

	//fullscreen button
	var fullscreen = document.getElementById("fullscreen");
	var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('videos').webkitRequestFullScreen);
	if(!fullScreenEnabled){
		fullscreen.style.display = 'none';
	}

	var isFullScreen = function(){
		return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
	};

	fullscreen.addEventListener("click", function(){
		if(isFullScreen()){
			$(".player-controlbar").removeClass("fullscreen");
			if(document.exitFullscreen) document.exitFullscreen();
			else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
			else if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();
			else if(document.msExitFullscreen) document.msExitFullscreen();
		}
		else{
			$(".player-controlbar").addClass("fullscreen");
			if(video.requestFullscreen) video.requestFullscreen();
			else if(video.mozRequestFullScreen) video.mozRequestFullScreen();
			else if(video.webkitRequestFullScreen) video.webkitRequestFullScreen();
			else if(video.msRequestFullscreen) video.msRequestFullscreen();
		}
	});
}









