const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration-time')




// MUSIC

const songs = [

    {
        name: 'HumNashe',
        displayName: 'Hum Nashe Mein Toh Nahin',
        artist: 'Bhool Bhulaiyaa 2| Kartik Kiara | Pritam Amitabh B Arijit Tulsi',
    },

    {
        name: 'terijhukinazar',
        displayName: 'Teri Jhuki Nazar ',
        artist: 'Murder 3 | Pritam, Shafqat Amanat Ali',
    },

    {
        name: 'kali',
        displayName: 'Kali Kali Zulfon Ke',
        artist: ' Madhur Sharma | Ustad Nusrat Fateh Ali Khan | ',
    },

    {
        name: 'beete',
        displayName: 'Thoda Thoda Pyaar',
        artist: 'Sidharth Malhotra,Neha Sharma|Stebin Ben,Nilesh Ahuja,Kumaar',
    },

    {
        name: 'channaMereya',
        displayName: 'Channa Mereya ',
        artist: 'Ae dil hai Mushkil |  Arijit Singh Unplugged',
    },

    //  {
    //     name : '1',
    //     displayName : 'Hum Nashe Mein Toh Nahin',
    //     artist : 'Bhool Bhulaiyaa 2| Kartik Kiara | Pritam Amitabh B Arijit Tulsi',
    //  },

    //  {
    //     name : '1',
    //     displayName : 'Hum Nashe Mein Toh Nahin',
    //     artist : 'Bhool Bhulaiyaa 2| Kartik Kiara | Pritam Amitabh B Arijit Tulsi',
    //  },

    //  {
    //     name : '1',
    //     displayName : 'Hum Nashe Mein Toh Nahin',
    //     artist : 'Bhool Bhulaiyaa 2| Kartik Kiara | Pritam Amitabh B Arijit Tulsi',
    //  },

    //  {
    //     name : '1',
    //     displayName : 'Hum Nashe Mein Toh Nahin',
    //     artist : 'Bhool Bhulaiyaa 2| Kartik Kiara | Pritam Amitabh B Arijit Tulsi',
    //  },

    //  {
    //     name : '1',
    //     displayName : 'Hum Nashe Mein Toh Nahin',
    //     artist : 'Bhool Bhulaiyaa 2| Kartik Kiara | Pritam Amitabh B Arijit Tulsi',
    //  },







];


let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');

    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {

    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


// on load - select First song

let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) { songIndex = songs.length - 1; }
    loadSong(songs[songIndex]);
    playSong();

}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) { songIndex = 0; }
    loadSong(songs[songIndex]);
    playSong();

}

loadSong(songs[songIndex]);
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        // update the progress bar

        const progresspercent = (currentTime / duration) * 100;
        console.log(progresspercent)

        progress.style.width = `${progresspercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes', durationMinutes);

        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds', durationSeconds);

        if (durationSeconds)
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;


        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    }

}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    // console.log('rgggh', (clickX / width) * duration);
    music.currentTime = (clickX / width) * duration;




}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgress);