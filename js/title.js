var my_audio = new Audio("se/start.mp3");

function start() {
    my_audio.play();
    setTimeout(function () {
        window.location.href = "main.html";
    }, 1000);
}

function score() {
    setTimeout(function () {
        window.location.href = "score.html";
    }, 1000);
}

document.getElementById('start').addEventListener('click', start, false);
document.getElementById('score').addEventListener('click', score, false);