import * as interact from "interact.js";

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;
}

// Unfocus the cursor from an <input>, etc.
function unfocus() {
    let focusHackEl = document.getElementById("focus-hack");
    focusHackEl.focus();
}

function registerMovables(elements: NodeList): void {
    Array.prototype.forEach.call(elements, function (el: HTMLElement) {
        let windowId = el.dataset["windowId"];

        function foreground(target: HTMLElement) {
            Array.prototype.forEach.call(elements, function (otherEl: HTMLElement) {
                otherEl.style.zIndex = "0";
            });

            target.style.zIndex = "1";
        }
        function dragMoveListener(event: Interact.InteractEvent) {
            let target = event.target,
                // Calculate current coordinates
                x = (parseFloat(target.dataset["x"]) || 0) + event.dx,
                y = (parseFloat(target.dataset["y"]) || 0) + event.dy;
            
            // Move the movable
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

            // Set current coordinates in data attributes, to calculate new 
            // coordinates on next move
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            
            // Remember the x and y in localstorage
            localStorage.setItem("windowData#" + windowId, JSON.stringify(new Position(x, y)));
        }

        interact(el)
            .draggable({
                onmove: dragMoveListener
            });
        el.addEventListener("mousedown", function () {
            // Bring movable to front
            foreground(el);

            // Unfocus all elements, because we've clearly "focused" on 
            // something else - the window/movable
            unfocus();
        }, false);
        
        // Load initial window position, if it exists
        let initialWindowPos: Position =
            JSON.parse(localStorage.getItem("windowData#" + windowId)) ||
            <Position>{ x: 0, y: 0 };

        el.style.transform =
            "translate(" +
            initialWindowPos.x + "px, " +
            initialWindowPos.y + "px)";
        el.dataset["x"] = initialWindowPos.x.toString();
        el.dataset["y"] = initialWindowPos.y.toString();
    });
}

export default registerMovables;