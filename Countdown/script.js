const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const titleEl = document.getElementById('title');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set Date Input Min Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input 
        inputContainer.hidden = true;

        // If the countdown has ended , show complete 
        if (distance < 0) {
            countdownEl.hidden = true;
            dateEl.value = '';
            titleEl.value = '';
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            localStorage.removeItem('countdown');
            completEl.hidden = false;
        } else {
            // Populate Countdown
            countdownElTitle.textContent = countdownTitle;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            // Show count down
            countdownEl.hidden = false;
        }
    }, second);
}

// Take Values from Form Inputs
function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    // Check for valid date
    if ((countdownDate !== '') && (countdownTitle !== '')) {
        localStorage.setItem('countdown', JSON.stringify(savedCountdown));
        // get number version of count Date
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    } else {
        alert('please select a date or the countdown title.');
    }

}
// Reset All Values 
function reset() {
    // Hide Countdowns ,Show Container 
    completEl.hidden = true;
    countdownEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    dateEl.value = '';
    titleEl.value = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
    // Get countdown from localStroge if avaible
    if (localStorage.getItem('countdown')) {
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}


// Event Listeners
inputContainer.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// On Load ,check local storge
restorePreviousCountdown();