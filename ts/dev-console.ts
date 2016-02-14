import { default as log } from "./logGame/log";
import * as devtools from "devtools-detect";

function init() {
    // Hide .console-window while DevTools is open, show while DevTools is 
    // closed.
    let consoleWindow = document.getElementById("console-window");
    window.addEventListener("devtoolschange", function (event: DevtoolsDetect.DevtoolsChangeEvent) {
        // Webpack is TOO SMART, we have to tell it that we're actually using 
        // `devtools` by accessing one of its properties or else it won't
        // include the module.
        devtools.open;

        if (event.detail.open === true) {
            consoleWindow.hidden = true;
        } else {
            consoleWindow.hidden = false;
        }
    }, false);
    
    // Wire up exec button for console-window
    document.getElementById("console-exec-form").addEventListener("submit", function (e) {
        let commandInput = <HTMLInputElement>document.getElementById("console-exec-form__command");

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