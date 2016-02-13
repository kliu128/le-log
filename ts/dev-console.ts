import { default as log } from "./logGame/log";

function init() {
    // Hide .console-window while DevTools is open, show while DevTools is 
    // closed.
    var consoleWindow = document.getElementById("console-window");
    window.addEventListener("devtoolschange", function (event: any) {
        if (event.detail.open === true) {
            consoleWindow.hidden = true;
        } else {
            consoleWindow.hidden = false;
        }
    }, false);
    
    // Wire up exec button for console-window
    document.getElementById("console-exec-form").addEventListener("submit", function (e) {
        var commandInput = <HTMLInputElement>document.getElementById("console-exec-form__command");

        try {
            eval(commandInput.value);
        } catch (e) {
            log(e);
        } finally {
            commandInput.value = "";
            e.preventDefault();
        }
    }, false);
}

export default init;