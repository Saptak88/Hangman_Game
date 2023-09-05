const worddisplay = document.querySelector(".worddisplay");
const keyboarddiv = document.querySelector(".keyboard");
const guessestext = document.querySelector(".guesses-text b");
const hangimg = document.querySelector(".hangman-box img");
const gamemodal = document.querySelector(".game-modal");
const playagainbtn = document.querySelector(".play-again");
let clk = new Audio("click-button-140881.mp3");
let maxguesses = 6;
let correctletters = [];
const resetgame = () => {
    correctletters = [];
    maxguesses = 6;
    gamemodal.classList.remove("show");
    guessestext.innerText = `0 / 6`;
    hangimg.src = `images/hangman-0.svg`;
    keyboarddiv.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
    worddisplay.innerHTML = currentword
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
};
const getRandomword = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentword = word;
    document.querySelector(".hinttext b").innerText = hint;
    resetgame();
};
getRandomword();
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modtext = isVictory ? `You found the word.` : `The correct word is: ${currentword}.`;
        gamemodal.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`;
        gamemodal.querySelector("h4").innerText = `${isVictory ? "Congratulations!" : "Game Over!"}`;
        gamemodal.querySelector("p").innerText = modtext;
        gamemodal.classList.add("show");
    }, 300);
};
const initgame = (button, clickedletter) => {
    if (currentword.includes(clickedletter)) {
        [...currentword].forEach((letter, index) => {
            if (letter === clickedletter) {
                correctletters.push(letter);
                worddisplay.querySelectorAll("li")[index].innerText = letter;
                worddisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        maxguesses--;
        guessestext.innerText = `${6 - maxguesses} / 6`;
        hangimg.src = `images/hangman-${6 - maxguesses}.svg`;
    }
    if (maxguesses === 0) return gameOver(false);
    if (correctletters.length === currentword.length) return gameOver(true);
    button.disabled = true;
};
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboarddiv.appendChild(button);
    button.addEventListener("click", (e) => {
        initgame(e.target, String.fromCharCode(i));
        clk.play();
    });
}
playagainbtn.addEventListener("click", getRandomword);
