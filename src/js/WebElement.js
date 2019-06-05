"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = require("./Globals");
/*
    This is just to grab the typically global variables
    and propogate them through all of the widgets in the
    node.js context.
*/
var WebElement = /** @class */ (function () {
    function WebElement() {
        this.document = Globals_1.globals.document;
        this.console = Globals_1.globals.console;
        this.window = Globals_1.globals.window;
    }
    return WebElement;
}());
exports.WebElement = WebElement;
