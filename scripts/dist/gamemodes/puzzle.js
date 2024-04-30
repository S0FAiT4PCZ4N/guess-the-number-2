import { getGuess, clearGuess } from "../input.js";
import { setOutput } from "../output.js";
import { init, win, rand } from "../game.js";
const hint = document.getElementById("hint");
const features = {
    even: false,
    divisibleBy3: false,
    prime: true,
    graterThan50: false,
    inFibonacciSequence: isInFibonacciSequence(rand)
};
function puzzleGamemode() {
    let guess = getGuess();
    if (guess == rand)
        win();
    else
        setOutput("INCORRECT");
    if (guess != rand)
        clearGuess();
}
window.addEventListener("load", () => {
    if (rand > 50)
        features.graterThan50 = true;
    if (rand % 2 == 0)
        features.even = true;
    if (rand % 3 == 0)
        features.divisibleBy3 = true;
    if (features.even == false && features.divisibleBy3 == false) {
        for (let i = 4; i < rand; i++) {
            if (rand % i == 0) {
                features.prime = false;
                break;
            }
        }
    }
    else
        features.prime = false;
    hint.innerHTML = '<span class="faint">The number is: </span>';
    if (features.even == true)
        hint.innerHTML += "even, &nbsp;";
    else
        hint.innerHTML += "odd, &nbsp;";
    if (features.divisibleBy3 == true)
        hint.innerHTML += "divisible by 3, &nbsp;";
    else
        hint.innerHTML += "NOT divisible by 3, &nbsp;";
    if (features.prime == true)
        hint.innerHTML += "prime, &nbsp;";
    if (features.inFibonacciSequence == true)
        hint.innerHTML += "in Fibonacci Sequence, &nbsp;";
    if (features.graterThan50 == true)
        hint.innerHTML += "greater than 50.";
    else
        hint.innerHTML += "less than or equal to 50.";
});
function isInFibonacciSequence(num) {
    let n1 = 1;
    let n2 = 1;
    let temp;
    if (num < 1)
        return false;
    else if (num == n1)
        return true;
    for (let i = 0; i < Infinity; i++) {
        temp = n1 + n2;
        if (num == temp)
            return true;
        else if (temp > num)
            return false;
        if (i % 2 == 0)
            n1 = temp;
        else
            n2 = temp;
    }
}
init(puzzleGamemode);
//# sourceMappingURL=puzzle.js.map