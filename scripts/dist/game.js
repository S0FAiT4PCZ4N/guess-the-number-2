import { writeGuess } from "./input.js";
const input = document.getElementById("input");
const output = document.getElementById("output");
const circleLoad = document.getElementById("circleLoad");
export function win() {
    window.removeEventListener("keydown", writeGuess);
    input.classList.add("correct");
    output.style.opacity = '1';
    output.textContent = "CORRECT CORRECT CORRECT CORRECT CORRECT  CORRECT CORRECT CORRECT";
    output.classList.add("scrollText");
}
let ReadyForReloadPage = false;
let reloadPage;
export function gameEvents() {
    window.addEventListener("keydown", (e) => {
        if (e.key == 'Escape') {
            location.href = '/';
        }
        if (e.key === 'r' || e.key === 'R') {
            if (reloadPage == undefined) {
                reloadPage = setTimeout(function () { if (ReadyForReloadPage)
                    location.reload(); }, 1000);
            }
            ReadyForReloadPage = true;
            circleLoad.style.setProperty('--anim-play-state', 'running');
            circleLoad.style.setProperty('--anim', 'circleLoad 1s linear');
            circleLoad.style.opacity = '1';
        }
    });
    window.addEventListener("keyup", (e) => {
        if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            ReadyForReloadPage = false;
            reloadPage = undefined;
            circleLoad.classList.remove("circleLoad");
            circleLoad.style.setProperty('--anim-play-state', 'paused');
            circleLoad.style.setProperty('--anim', 'none');
            circleLoad.style.opacity = '0';
        }
    });
}
//# sourceMappingURL=game.js.map