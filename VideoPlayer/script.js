const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const prevBtn = document.getElementById('prev-btn');
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const speed = document.querySelector('.player-speed');
const fullscreenBtn = document.querySelector('.fullscreen');

// Define Data URL Video 
const urlData = JSON.parse(localStorage.getItem('data'));

// Current video
let videoIndex = 0;
let statusVideo = false;

// Play & Pause ----------------------------------- //

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');
        statusVideo = true;
    } else {
        video.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
        playBtn.setAttribute('title', 'Play');
        statusVideo = false;
    }
}

// Prev video 
function prevVideo() {
    videoIndex--;
    if (videoIndex < 0) { videoIndex = urlData.length - 1; }
    video.setAttribute('src', urlData[videoIndex].sources);
    video.currentTime = 0;
    updateProgress();
    (statusVideo) ? video.play(): video.pause();
}
// Next video 
function nextVideo() {
    videoIndex++;
    if (videoIndex > urlData.length - 1) { videoIndex = 0; }
    video.setAttribute('src', urlData[videoIndex].sources);
    video.currentTime = 0;
    updateProgress();
    (statusVideo) ? video.play(): video.pause();
}


// On Video End ,show play button icon
video.addEventListener('ended', () => {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
});

// Progress Bar ---------------------------------- //

//Calculate Dispaly time format 
function displayTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    if (minutes < 10 && seconds < 10) {
        return `0${minutes}:0${seconds}`;
    } else if (minutes < 10) {
        return `0${minutes}:${seconds}`;
    } else {
        return `${minutes}:${seconds}`;
    }
}

// Update progress bar as video plays
function updateProgress() {
    progressBar.style.width = `${(video.currentTime/video.duration) * 100}%`;
    currentTime.textContent = displayTime(video.currentTime) + ' / ';
}

function updateDuration() {
    progressBar.style.width = '0%';
    duration.textContent = displayTime(video.duration);
}

//Click to seek within the video
function setProgress(e) {
    const newTime = e.offsetX / progressRange.offsetWidth;
    video.currentTime = newTime * video.duration;
    updateProgress();
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Volume Bar
function ChangeVolume(e) {
    let newVolume = e.offsetX / volumeRange.offsetWidth;
    //Rounding volume up or down
    if (newVolume < 0.1) {
        newVolume = 0;
    }
    if (newVolume > 0.9) {
        newVolume = 1;
    }
    volumeBar.style.width = `${newVolume * 100}%`;
    video.volume = newVolume;
    // Change icon depending on volume
    volumeIcon.className = '';
    if (newVolume > 0.7) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
    } else if (newVolume <= 0.7 && newVolume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
    } else if (newVolume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-mute');
    }

    lastVolume = newVolume;
}

// Volume Mute/Unmute
function toggleMute() {
    volumeIcon.className = '';
    if (video.volume) {
        lastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    } else {
        volumeBar.style.width = `${lastVolume * 100}%`;
        video.volume = lastVolume;
        if (lastVolume > 0.7) {
            volumeIcon.classList.add('fas', 'fa-volume-up');
        } else if (lastVolume <= 0.7 && lastVolume > 0) {
            volumeIcon.classList.add('fas', 'fa-volume-down');
        } else if (lastVolume === 0) {
            volumeIcon.classList.add('fas', 'fa-volume-mute');
        }
        volumeIcon.setAttribute('title', 'Mute');
    }
}

// Change Playback Speed -------------------- //

function changeSpeed() {
    video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        /* Firefox */
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        /* IE/Edge */
        element.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        /* IE/Edge */
        document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
}

let fullscreen = false;

// Toggle Fullscreen
function toggleFullscreen() {
    if (!fullscreen) {
        openFullscreen(player);
    } else {
        closeFullscreen();
    }
    fullscreen = !fullscreen;
}

// Event Listeners
prevBtn.addEventListener('click', prevVideo);
playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextVideo);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('durationchange', updateDuration);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', ChangeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);

// key board Event function 
function keyboardShortcat(e) {
    if (e.code === 'Space') { togglePlay(); }
    if (e.shiftKey && e.code === 'KeyN') { nextVideo(); }
    if (e.shiftKey && e.code === 'KeyP') { prevVideo(); }
    if (e.code === 'KeyF') { toggleFullscreen(); }
}

//keybord Event Listeners 
document.addEventListener('keydown', keyboardShortcat);

//On load 
video.setAttribute('src', urlData[videoIndex].sources);