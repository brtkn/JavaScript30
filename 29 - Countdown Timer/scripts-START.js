let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');


function timer(seconds){
    // clear ant existing timers => if there is a timer in countdown clear
   clearInterval(countdown);

   const now = Date.now();   // now is ms so seconds * 1000
   const then = now + seconds * 1000
   // to display the amount of time left , run it  every second 1000ms

   displayTimeLeft(seconds);
   displayEndTime(then);

   countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000 ) ; 
        // check if we should stop it!
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;         // interval going to run but it is not show us anything, you should use clearInterval
        }
        // display it
        displayTimeLeft(secondsLeft);
   }, 1000);
}

// setInterval waits first second
function displayTimeLeft (seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;   
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;  // your page title is dynamic
    timerDisplay.textContent = display;
    console.log({minutes, remainderSeconds});
};

function displayEndTime(timestamp){
    const end = new Date(timestamp);   // Date.now() = 112343292429 ms => new Date(112343292429); => Saturday Feb 20 2021 18:10:21 GMT-0500
    const hour = end.getHours();
    // const adjustedHour = hour > 12 ? hour - 12 : hour ;  // same thing
    const minutes = end.getMinutes();
    // if minutes < 10 , 0 + MINUTES if not return nothing('').   
    endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour }:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);    // real number parseInt()
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();    // when we submit the custom minute page will not reload
    const mins = this.minutes.value;   // minutes comes from <input name="minutes" />
    console.log(mins);
    timer(mins * 60);
    this.reset();
})  

//document.customForm.minutes   minutes nested inside the customForm