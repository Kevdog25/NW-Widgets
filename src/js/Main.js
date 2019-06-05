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
//import tingo = require('tingodb');
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(document_in, console_in, window_in) {
        var _this = _super.call(this, document_in, console_in, window_in) || this;
        _this.names = [
            'Kevin',
            'Kyle',
            'Adrian',
            'Alice',
            'Jordan'
        ];
        var ta = new AutoCompleteTextArea_1.AutoCompleteTextArea('', [
            {
                Match: /\[\[(.*)(\]\])?/g,
                MatchFinder: function (reg) { return _this.getSuggestions(reg); }
            }
        ]);
        Utils_1.setStyles(_this.Container, {
            width: '80%',
            height: '50%',
            'min-height': '300px'
        });
        _this.Container.appendChild(ta.Container);
        return _this;
    }
    Main.prototype.getSuggestions = function (reg) {
        var inputName = reg[1];
        var validNames = this.names.filter(function (name) {
            return name.toUpperCase().indexOf(inputName.toUpperCase()) >= 0;
        });
        var suggestions = [];
        validNames.forEach(function (name) {
            suggestions.push({
                DisplayHTML: name,
                ReplacementString: '[[' + name + ']]'
            });
        });
        return suggestions;
    };
    return Main;
}(Application_1.Application));
exports.Main = Main;
