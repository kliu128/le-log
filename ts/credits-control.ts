// Set up credits
declare let dialogPolyfill: any;

// Barebones type def
interface HTMLDialogElement extends HTMLElement {
    showModal: () => void;
    close: () => void;
}

function init() {
    let creditsBox: HTMLDialogElement = <HTMLDialogElement>document.getElementById("credits-box");

    if (typeof window["showModalDialog"] === 'undefined') {
        // Polyfill dialog if not supported
        dialogPolyfill.registerDialog(creditsBox);
    }

    document.getElementById("controls__credits").addEventListener(
        "click",
        function () {
            creditsBox.showModal();
        }, false);
    creditsBox.addEventListener("dblclick", creditsBox.close, false);
}

export default init;