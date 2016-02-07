"use strict";

import movableWindows = require("./movable-windows");
movableWindows(document.querySelectorAll("[data-movable]"));

import logGame = require('./logGame/main');
logGame();
import creditsControl = require('./credits-control');
creditsControl();
import devConsole = require('./dev-console');
devConsole();

// Everything's ready! Hide .no-js, show .js
Array.prototype.forEach.call(document.getElementsByClassName("no-js"), function (el) {
    el.style.display = "none";
});
Array.prototype.forEach.call(document.getElementsByClassName("js"), function (el) {
    el.style.display = "block";
});
