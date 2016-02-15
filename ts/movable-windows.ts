import * as interact from "interact.js";

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    x: number;
    y: number;
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
        function dragMoveListener(event) {
            let target = event.target,
                x = (parseFloat(target.dataset["x"]) || 0) + event.dx,
                y = (parseFloat(target.dataset["y"]) || 0) + event.dy;

            foreground(target);

            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            
            // Remember the x and y in localstorage
            localStorage.setItem("windowData#" + windowId, JSON.stringify(new Position(x, y)));
        }

        interact(el)
            .draggable({
                onmove: dragMoveListener
            });
        // To foreground the window when the user clicks on it, not just when 
        // it moves
        el.addEventListener("click", function () { foreground(el); }, false);
        
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