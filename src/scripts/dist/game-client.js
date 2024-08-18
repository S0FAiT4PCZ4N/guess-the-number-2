import { io } from "socket.io-client";
import { freezeGame, unfreezeGame, dead, forceRand } from "./game.js";
import { setText } from "./output.js";
let socket;
let endGame = false;
let yourPoints;
const nickname = localStorage.getItem("Nickname");
const gameID = sessionStorage.getItem("lobby");
//CONFIG//
const pointsToWin = 3;
const preRoundTime = 3;
const postRoundTime = 5;
const preScoreboardTime = 1;
//////////
window.addEventListener("load", () => {
    if (sessionStorage.getItem("multiplayer") == "true")
        freezeGame();
});
export function connectToServer() {
    socket = io("http://127.0.0.1:3000");
    socket.on("connect", () => {
        socket.emit("connectToGame", gameID, nickname);
    });
    socket.on("multiplayerWin", (nickname) => {
        roundEnd();
        dead(nickname.toUpperCase() + " WON THE ROUND");
    });
    socket.on("startMatch", (scoreboard) => {
        loadScoreboard(scoreboard);
        timerStart();
    });
    socket.on("getRandomNumber", (randomNumber) => {
        forceRand(randomNumber);
    });
    socket.on("startNewRound", () => {
        sessionStorage.setItem("multiplayer", "true");
        location.reload();
    });
    socket.on("updateScoreboard", (scoreboardLobby) => {
        updateScoreboard(scoreboardLobby);
    });
    socket.on("endGame", (winner) => {
        updateScoreboardInfo(winner + " WON THE GAME!");
        setText(winner + " WON THE GAME!");
    });
}
export function multiplayerWin() {
    roundEnd();
    if (yourPoints < pointsToWin - 1)
        socket.emit("multiplayerWin", gameID, nickname, postRoundTime);
    else
        socket.emit("multiplayerWin", gameID, nickname, postRoundTime, true);
}
function loadScoreboard(scoreboard) {
    const div = document.createElement("div");
    div.setAttribute("id", "scoreboard");
    for (let key in scoreboard) {
        div.innerHTML += `
            <div class="row" id="scoreboard-${key}">
                <div>${key}</div>
                <div class="point"></div>
                <div class="point"></div>
                <div class="point"></div>
            </div>
        `;
    }
    div.innerHTML += `<div class="row info" id="scoreboard-info">
             WAITING FOR OTHER PLAYERS
        </div>`;
    document.body.appendChild(div);
    updateScoreboard(scoreboard);
}
function hideScoreboard() {
    document.getElementById("scoreboard").style.opacity = '0';
}
function showScoreboard() {
    document.getElementById("scoreboard").style.opacity = '';
    updateScoreboardInfo("NEXT ROUND WILL START SOON");
}
function updateScoreboard(scoreboard) {
    for (let key in scoreboard) {
        const points = document.getElementById("scoreboard-" + key).querySelectorAll(".point");
        for (let i = 0; i < scoreboard[key]; i++) {
            points[i].classList.add("win");
        }
    }
    console.log(scoreboard);
    yourPoints = scoreboard[nickname];
    console.log(yourPoints);
}
let timer;
function timerStart() {
    let time = preRoundTime;
    timer = setInterval(() => {
        time -= 1;
        document.getElementById("scoreboard-info").textContent = time + "...";
        if (time <= 0) {
            clearInterval(timer);
            roundStart();
        }
    }, 1000);
}
function roundStart() {
    unfreezeGame();
    hideScoreboard();
}
function roundEnd() {
    socket.emit("updateScoreboard", gameID);
    freezeGame();
    setTimeout(() => {
        showScoreboard();
    }, preScoreboardTime * 1000);
}
function updateScoreboardInfo(text) {
    document.getElementById("scoreboard-info").textContent = text;
}
//# sourceMappingURL=game-client.js.map