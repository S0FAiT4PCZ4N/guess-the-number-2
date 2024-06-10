import { customGamemode, editMode } from "./customSetup.js"

localStorage.setItem("Custom Mode", "false");

export let buttons: NodeListOf<HTMLButtonElement> = document.getElementById("main").querySelectorAll("button");
export let menuChosen: string = "main";
export let index: number;
let doubleMenu: boolean = false;
let buttonsMax: number = buttons.length-1;
let last: HTMLElement;
let keyboardUse: boolean = false;

window.addEventListener("load", () => { assignClickEventForButtons(); customGamemode(); });

window.addEventListener("keydown", (e: KeyboardEvent) => 
{
    if(editMode == true) return;

    changeButton(e);
});

window.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.key == "Enter") {
        eval(buttons[index].getAttribute("data-click"));
    }
});

window.addEventListener("mousemove", () => {
    if(keyboardUse == true)
    {
        keyboardUse = false;
        buttons[index].classList.remove('hover');
        index = undefined;
    }
});

function changeButton(e: KeyboardEvent): void
{
    if(e.key != "ArrowUp" && e.key != "ArrowDown" && e.key != "ArrowRight" && e.key != "ArrowLeft") return;

    keyboardUse = true;

    if(index == undefined) 
    {
        index = 0;
    }
    else if(e.key == 'ArrowUp')
    {
        if(doubleMenu == false)
            index--;
        else
            index -= 2;

        if(index < 0) index = buttonsMax;
    }
    else if(e.key == 'ArrowDown')
    {
        if(doubleMenu == false || (doubleMenu == true && index == buttonsMax - 1))
            index++;
        else
            index += 2;

        if(index > buttonsMax) index = 0;
    }
    else if(e.key == 'ArrowRight' && doubleMenu) {
        index++;
        if(index > buttonsMax) index = 0;
    }
    else if(e.key == 'ArrowLeft' && doubleMenu) {
        index--;
        if(index < 0) index = buttonsMax;
    }

    if(last != undefined)
        last.classList.remove("hover");

    buttons[index].classList.add("hover");
    last = buttons[index];
}

function changeMenu(name: string): void
{
    setTimeout(() => 
    {
        if(last != undefined)
            last.classList.remove("hover");
    
        document.getElementById(menuChosen).style.display = 'none';
        document.getElementById(name).style.display = 'flex';
        menuChosen = name;

        if(document.getElementById(name).querySelector(".double-menu")) {
            doubleMenu = true;
        }
        else {
            doubleMenu = false;
        }
    
        assignClickEventForButtons();
        resetButtonHoverPosition(name);
    });
}

function resetButtonHoverPosition(name: string): void
{
    if(keyboardUse == false) return;
    
    index = 0;
    buttons[index].classList.add("hover");
    last = buttons[index];
}

function assignClickEventForButtons(): void 
{
    buttons = document.getElementById(menuChosen).querySelectorAll("button");
    buttonsMax = buttons.length-1;

    buttons.forEach((button: HTMLElement) => {
        button.onclick = () => {
            eval(button.getAttribute("data-click"));
        }
    });
}