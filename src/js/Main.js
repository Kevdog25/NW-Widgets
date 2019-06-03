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
var Application_1 = require("./Application");
var AutoCompleteTextArea_1 = require("./AutoCompleteTextArea");
var Utils_1 = require("./Utils");
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(document_in, console_in) {
        var _this = _super.call(this, document_in, console_in) || this;
        _this.options = [
            'Jordan',
            'Kevin',
            'Alice',
            'Adrian',
            'Matt',
            'Matt and Jordan'
        ];
        var tb = new AutoCompleteTextArea_1.AutoCompleteTextArea('offsetter');
        _this.Container.appendChild(tb.Container);
        _this.Container.appendChild(Utils_1.nextRow());
        var ta = new AutoCompleteTextArea_1.AutoCompleteTextArea('ooooo spooky', [{
                Match: /@(.*)/g,
                MatchFinder: function (s) { return _this.getSuggestion(s); }
            }]);
        _this.Container.appendChild(ta.Container);
        ta.SetStyles({
            width: '200px'
        });
        _this.Container.style.width = '100%';
        return _this;
    }
    Main.prototype.getSuggestion = function (match) {
        var s = match[1];
        var filtered = this.options.filter(function (op) {
            return op.toUpperCase().indexOf(s.toUpperCase()) >= 0;
        });
        return filtered;
    };
    return Main;
}(Application_1.Application));
exports.Main = Main;
