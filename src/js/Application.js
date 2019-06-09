"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Globals_1 = require("./Globals");
var Widget_1 = require("./Widget");
/*
    This method establishes the typical global variables: doucment and console.
    They are not natively available in the Node.JS server context.
    This just gives that code access. The base class (WebElement) gives these globals to
    all other objects.
*/
function setupGlobals(document_in, console_in, window_in) {
    Globals_1.globals.document = document_in;
    Globals_1.globals.console = console_in;
    Globals_1.globals.window = window_in;
}
/*
    This is the main application code.
    This defines the behavior of the app.
*/
var Application = /** @class */ (function (_super) {
    __extends(Application, _super);
    function Application(document_in, console_in, window_in) {
        var _this = this;
        setupGlobals(document_in, console_in, window_in);
        _this = _super.call(this) || this;
        return _this;
    }
    return Application;
}(Widget_1.Widget));
exports.Application = Application;
//# sourceMappingURL=Application.js.map