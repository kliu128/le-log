"use strict";

import { default as movableWindows } from "./movable-windows";
movableWindows(document.querySelectorAll("[data-movable]"));

import { default as logGame } from "./logGame/main";
logGame();
import { default as creditsControl } from "./credits-control";
creditsControl();
import { default as devConsole } from "./dev-console";
devConsole();

// Everything's ready! Hide .no-js, show .js
Array.prototype.forEach.call(document.getElementsByClassName("no-js"), function (el) {
    el.style.display = "none";
});
Array.prototype.forEach.call(document.getElementsByClassName("js"), function (el) {
    el.style.display = "block";
});
