declare let interact: any;

function registerMovables(elements: NodeList): void {
    Array.prototype.forEach.call(elements, function (el: HTMLElement) {
        let windowId = el.dataset["windowId"];

        function foreground(target) {
            Array.prototype.forEach.call(elements, function (otherEl: HTMLElement) {
                otherEl.style.zIndex = "0";
            });

            target.style.zIndex = 1;
        }
        function dragMoveListener(event) {
            let target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            foreground(target);

            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            
            // Remember the x and y in localstorage
            localStorage.setItem("windowData#" + windowId, JSON.stringify({ x: x, y: y }));
        }

        interact(el)
            .draggable({
                onmove: dragMoveListener
            });
        // To foreground the window when the user clicks on it, not just when 
        // it moves
        el.addEventListener("click", function () { foreground(el); }, false);
        
        // Load initial window position, if it exists
        let initialWindowData =
            JSON.parse(localStorage.getItem("windowData#" + windowId)) ||
            { x: 0, y: 0 };

        el.style.transform =
        "translate(" +
        initialWindowData.x + "px, " +
        initialWindowData.y + "px)";
        el.dataset["x"] = initialWindowData.x;
        el.dataset["y"] = initialWindowData.y;
    });
}

export default registerMovables;