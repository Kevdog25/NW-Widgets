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
var WebElement_1 = require("./WebElement");
var Utils_1 = require("./Utils");
/*
    All a Widget is is an object associated with a div
    somewhere in the document.
*/
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget() {
        var _this = _super.call(this) || this;
        _this.Container = _this.document.createElement('div');
        _this.Container.classList.add('k-widget');
        return _this;
    }
    /*
        Overrides default styles for this widget's container.
    */
    Widget.prototype.SetStyles = function (styles) {
        Utils_1.setStyles(this.Container, styles);
    };
    return Widget;
}(WebElement_1.WebElement));
exports.Widget = Widget;
