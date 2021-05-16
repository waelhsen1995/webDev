const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(joke) {
    VoiceRSS.speech({
        key: 'd86dba1b266b409a966d01b1263c1622',
        src: joke,
        hl: 'en-us',
        v: 'Mary',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get Jokes from Joke API 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    //const apiUrl ='https://v2.jokeapi.dev/joke/Any?lang=fr&idRange=0'
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.type);

        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
            console.log(joke);
            tellMe(joke);
        } else {
            joke = data.joke;
            console.log(joke);
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        //catch Error here
        console.error(error);
    }
}
// Event Listenner
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton);