/**
 * Created by Zero on 3/10/2017.
 */
if(Hls.isSupported()){

	var videos = document.getElementsByTagName('video');
	var currentVideoNumber = 0;
	var currentVideo = videos[currentVideoNumber];

	loadVideo(currentVideo);
	console.log(videos)
	console.log(currentVideo)

	var hls = new Hls();

	function loadVideo(video){
		hls = new Hls();
		hls.attachMedia(video);
		hls.on(Hls.Events.MEDIA_ATTACHED, function(){

			hls.loadSource(video.src);
			console.log(video)

			//http://playertest.longtailvideo.com/adaptive/bipbop/bipbop.m3u8
			hls.on(Hls.Events.MANIFEST_PARSED, function(event, data){
				console.log("video and hls.js are now bound together !");
			});
		});
	}

	currentVideo.onloadedmetadata = function(){
		document.getElementById("seek-bar").max = currentVideo.duration;
	};

	currentVideo.addEventListener('timeupdate', function(){
		var time = this.currentTime;
		var seconds = Math.round(time);
		var minutes = Math.round(seconds / 60);
		var hours = Math.round(minutes / 60);

		document.getElementById("loadedPercent").textContent = ("0" + hours).slice(-2) + ":" + ("0" + minutes % 59).slice(-2) + ":" + ("0" + seconds % 59).slice(-2);

		//seekbar
		document.getElementById("seek-bar").value = currentVideo.currentTime;
	});

	var playToggle = true;
	document.getElementById("play-pause").addEventListener("click", function(){
		if(playToggle)
			currentVideo.play();
		else
			currentVideo.pause();
		playToggle = !playToggle;
	});

	document.getElementById("next-video").addEventListener("click", function(){
		currentVideo = videos[(currentVideoNumber < videos.length)? ++currentVideoNumber:currentVideoNumber = 0];
		loadVideo(currentVideo);
	});

	var autplayToggle = false;
	document.getElementById("autoplay").addEventListener("click", function(){
		autplayToggle = !autplayToggle
	});

	//autoplay
	(function(){
		if(autplayToggle)
			currentVideo.play();
	})();

	function seekBar(bar){
		currentVideo.currentTime = bar.value;
	}

	var muteToggle = true;
	document.getElementById("mute").addEventListener("click", function(){
		currentVideo.muted = muteToggle;
		muteToggle = !muteToggle;
	});

	function volumeBar(bar){
		currentVideo.volume = bar.value;
		console.log(bar.value);
	}

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

	function speedSelector(selector){
		currentVideo.playbackRate = selector.options[selector.selectedIndex].value;
	}

	var fullscreen = document.getElementById("full-screen");
	var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('videos').webkitRequestFullScreen);
	if(!fullScreenEnabled){
		fullscreen.style.display = 'none';
	}

	var isFullScreen = function(){
		return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
	};

	fullscreen.addEventListener("click", function(){
		if(isFullScreen()){
			if(document.exitFullscreen) document.exitFullscreen();
			else if(document.mozCancelFullScreen) document.mozCancelFullScreen();
			else if(document.webkitCancelFullScreen) document.webkitCancelFullScreen();
			else if(document.msExitFullscreen) document.msExitFullscreen();
		}
		else{
			if(currentVideo.requestFullscreen) currentVideo.requestFullscreen();
			else if(currentVideo.mozRequestFullScreen) currentVideo.mozRequestFullScreen();
			else if(currentVideo.webkitRequestFullScreen) currentVideo.webkitRequestFullScreen();
			else if(currentVideo.msRequestFullscreen) currentVideo.msRequestFullscreen();
		}
	})
}







