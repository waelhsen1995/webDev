const videElement = document.getElementById('video');
const startButton = document.getElementById('button');
const deviceButton = document.getElementById('button2')
    //prompt to select media stream , pass to video element , then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videElement.srcObject = mediaStream;
        videElement.onloadedmetadata = () => {
            videElement.play();
        }
    } catch (error) {
        //Catch Error Here
        console.error('error ', error);
    }
}

startButton.addEventListener('click', async() => {
    // Disabled Button
    startButton.disabled = true;
    // Start Picture in Picture
    await videElement.requestPictureInPicture();
    // Reset Button 
    startButton.disabled = false;
});
deviceButton.addEventListener('click', selectMediaStream);


//on load
selectMediaStream();