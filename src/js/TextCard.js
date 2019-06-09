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
var Widget_1 = require("./Widget");
var TextCard = /** @class */ (function (_super) {
    __extends(TextCard, _super);
    function TextCard(text) {
        if (text === void 0) { text = ''; }
        var _this = _super.call(this) || this;
        _this.Container.innerHTML = text;
        _this.Container.classList.add('card');
        return _this;
    }
    TextCard.prototype.setText = function (text) {
        this.Container.innerHTML = text;
    };
    TextCard.prototype.getText = function () {
        return this.Container.innerHTML;
    };
    return TextCard;
}(Widget_1.Widget));
exports.TextCard = TextCard;
//# sourceMappingURL=TextCard.js.map