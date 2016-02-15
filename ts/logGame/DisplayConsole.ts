let _c = document.createElement("span");
_c.className = "cursor";
_c.textContent = "_";

class DisplayConsole {
    static entry = document.getElementById("entry")
    static cursor = _c
    static displayCursor() {
        this.entry.appendChild(this.cursor);
    }
    static removeCursor() {
        if (this.cursor.parentNode) {
            this.cursor.parentNode.removeChild(this.cursor);
        }
    }
    static typeCharacters(text: string) {
        let _this = this;
        let index = 0;
        let resolver;

        return new Promise(function typeCharacter(resolve, reject) {
            // Such hack.
            resolver = resolver || resolve;
            if (index < text.length) {
                _this.entry.textContent += text[index++];
                setTimeout(typeCharacter, 25);
            } else {
                resolver();
            }
        });
    }
    static displayCommand(commandToType: string, output: string) {
        this.removeCursor();
        return new Promise<void>((resolve, reject) => {
            this.typeCharacters(commandToType).then(() => {
                // Only add newline + output if output is not empty
                if (output !== "") {
                    this.entry.textContent += "\n\n" + output + "\n\n> ";
                } else {
                    this.entry.textContent += "\n\n> ";
                }
                this.displayCursor();
                resolve();
            });
        });
    }
    static removeDevConsoleWarning() {
        let devConsoleEl = document.getElementById("dev-console-info");
        if (devConsoleEl.parentNode) {
            devConsoleEl.parentNode.removeChild(devConsoleEl);
        } else {
            throw new Error("Dev console already removed, cannot remove it again.");
        }
    }
    static clear() {
        this.entry.textContent = "";
    }
    static displayText(text: string) {
        this.entry.textContent += text;
    }
}

export default DisplayConsole;