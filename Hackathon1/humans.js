const image = document.getElementById('cover');

const music = new Audio();
const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Human',
        cover: 'humans.jpg',
    }
];

let isPlaying = false;
function togglePlay(){
    if(isPlaying){
        pauseMusique();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true; 
    
}