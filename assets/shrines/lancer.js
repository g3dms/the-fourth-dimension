function replaceImage() {
    const imageElement = document.getElementById('lancer');
    const audioElement = document.getElementById('lancerAudio');

    imageElement.src = 'https://files.catbox.moe/jlvlmv.webp';

    audioElement.play();
}

setTimeout(replaceImage, 3000);

function showTempImage() {
    const tempImageElement = document.getElementById('explosion');

    tempImageElement.style.display = 'block';

    setTimeout(() => {
        tempImageElement.style.display = 'none';
    }, 700);
}

setTimeout(showTempImage, 2000)