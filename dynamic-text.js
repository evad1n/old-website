const phrase = "Will Dickinson";
const phraseElement = document.querySelector("#phrase");
const cursorElement = document.querySelector("#blinking-cursor")

var index = 0;

(function loop() {
    var rand = Math.round(Math.random() * 130 + 20);
    setTimeout(function() {
            //alert('A');
            incrementIndex();
            if (index <= phrase.length) {
                loop();
            }
    }, rand);
}());

function incrementIndex() {
    index++;
    phraseElement.innerHTML = getWord();
    if(index > phrase.length){
        cursorElement.classList.add("blink");
    } 
}

function getWord() {
    return phrase.slice(0, index);
}