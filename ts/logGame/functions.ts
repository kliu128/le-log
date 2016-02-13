import { default as log } from "./log";

function mSpeak(message) {
    log("%c" + message, "color: blue");
}

function wait(timeout) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, timeout);
    });
}

export { mSpeak as mSpeak };
export { wait as wait };