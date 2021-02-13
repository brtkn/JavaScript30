/* Get Our Elements */
const player = document.querySelector('.player'); // player is parent of all 
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');


const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); // [] because it is a attribute not a class
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full__screen');

/* Build out functions */   
//paused is a propty of video element 
function togglePlay(){
    const method = video.paused ? 'play' : 'pause' ;
    video[method](); 
    //toggle.textContent = '>>';
    /*if(video.paused){
        video.play();
    }else{
        video.paused();
    }*/
};
//there is no property called pause !
function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚' ;
    console.log(icon);
    toggle.textContent = icon;
}

function skip() {
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); // because this.dataset.skip is a string
}

function handleRangeUpdate() {
    video[this.name] = this.value ;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100  //currentTime and duration are video properties
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
};

/* Hook up the event listeners */

video.addEventListener('click',togglePlay);   // on the video
video.addEventListener('play', updateButton);
video.addEventListener('pause',updateButton);
// it is for progress filled 
video.addEventListener('timeupdate', handleProgress); //timeupdate triggered when video is updating its time code

toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip)); 
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));  //change  event
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);