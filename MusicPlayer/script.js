const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [{
        name: 'jacinto-1',
        displayName: 'Electrique Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight,Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];
// Check if Playing
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');

    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0

// Prev Song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) { songIndex = songs.length - 1; }
    loadSong(songs[songIndex]);
    playSong();

}

// Next Song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) { songIndex = 0; }
    loadSong(songs[songIndex]);
    playSong();

}

// Updata Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate dispalay for current time
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSecond = Math.floor(currentTime % 60);
        if (currentSecond < 10) {
            currentSecond = `0${currentSecond}`;
        }
        // Delay switching current Element 
        if (currentSecond) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSecond}`;
        }

    }
}

function updateDuration(e) {
    const { duration } = e.srcElement;
    // Calculate dispalay for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
        durationSecond = `0${durationSecond}`;
    }
    // Delay switching duration Element to avoid Nan
    if (durationSecond) {
        durationEl.textContent = `${durationMinutes}:${durationSecond}`;
    }
}
// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    const progressPercent = Math.floor((clickX / width) * 100);
    progress.style.width = `${progressPercent}%`;

    // Update progress bar and current time
    const currentProgressTime = Math.floor((clickX / width) * duration);
    music.currentTime = currentProgressTime;
    const currentMinutes = Math.floor(currentProgressTime / 60);
    let currentSecond = Math.floor(currentProgressTime % 60);
    if (currentSecond < 10) {
        currentSecond = `0${currentSecond}`;
    }
    // Delay switching current Element 
    if (currentSecond) {
        currentTimeEl.textContent = `${currentMinutes}:${currentSecond}`;
    }
}

// On Load  
loadSong(songs[songIndex]);

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('durationchange', updateDuration);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);