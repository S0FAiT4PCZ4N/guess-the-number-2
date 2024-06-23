import { io } from "socket.io-client";
import { gameSetup } from "./customSetup.js";

let socket: any;
let nickname: string;
const connectInfo: HTMLElement = document.getElementById("connecting-to-server");
const waitingRoom: HTMLElement = document.getElementById("waiting-room-players");
const pingDiv: HTMLElement = document.getElementById("ping");

export function connectToServer(): void {
    socket = io("http://127.0.0.1:3000");
    let timer: NodeJS.Timeout = setTimeout(() => {
        connectInfo.textContent = "Connection failed.";
    }, 5000);

    socket.on("connect", () => {
        connectInfo.style.display = 'none';
        clearTimeout(timer);

        nickname = localStorage.getItem("Nickname");
        gameSetup[0].setValue(nickname+"'s room");

        socket.emit("join", nickname);
        setInterval(ping, 1000);
    });
}

export function createLobby(): void {
    waitingRoom.innerHTML =
    `
        <button><span style="color:gold">${nickname}</span></button>
    `;

    const playersCount: number = Number(localStorage.getItem('Players Count'));

    for(let i=1; i<playersCount; i++)
    {
        waitingRoom.innerHTML += `<button>.</button>`;
    }
}

function ping(): void {
    let time: number = 0;
    let timer: NodeJS.Timeout = setInterval(() => { time++; }, 1);
    socket.emit("ping");
    socket.on("pong", () => {
        clearInterval(timer);
        pingDiv.textContent = "Ping: "+time+"ms";
        time = 0;
    });
}