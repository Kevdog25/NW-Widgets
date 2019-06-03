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
var Selector = /** @class */ (function (_super) {
    __extends(Selector, _super);
    function Selector(options) {
        var _this = _super.call(this) || this;
        _this.AllOptions = [];
        _this.selectCallbacks = [];
        _this.input = _this.document.createElement('input');
        _this.input.type = 'text';
        _this.input.setAttribute('list', 'selectorList');
        _this.datalist = _this.document.createElement('datalist');
        _this.datalist.id = 'selectorList';
        _this.Container.appendChild(_this.input);
        _this.Container.appendChild(_this.datalist);
        _this.SetOptions(options);
        _this.input.addEventListener('change', function (ev) { return _this.autoSelect(); });
        _this.input.addEventListener('select', function (ev) { return _this.onSelect(); });
        return _this;
    }
    Selector.prototype.addSelectListener = function (f) {
        this.selectCallbacks.push(f);
    };
    Selector.prototype.onSelect = function () {
        var _this = this;
        this.selectCallbacks.forEach(function (f) {
            f(_this.input.value);
        });
    };
    /*
        Given the current selection, will try to complete it
        with the avialable optioins
    */
    Selector.prototype.autoSelect = function () {
        var s = this.input.value.toUpperCase();
        if (s.length == 0)
            return;
        var found = false;
        for (var i = 0; i < this.AllOptions.length; i++) {
            if (this.AllOptions[i].slice(0, s.length).toUpperCase() == s) {
                this.input.value = this.AllOptions[i];
                this.onSelect();
                found = true;
                break;
            }
        }
        if (!found)
            this.input.value = '';
    };
    Selector.prototype.SetOptions = function (options) {
        var _this = this;
        while (this.datalist.firstChild) {
            this.datalist.removeChild(this.datalist.firstChild);
        }
        this.AllOptions = [];
        options.forEach(function (op) {
            var o = _this.document.createElement('option');
            o.value = op;
            _this.datalist.appendChild(o);
            _this.AllOptions.push(op);
        });
        if (this.AllOptions.indexOf(this.input.value) < 0) {
            this.input.value = '';
        }
    };
    return Selector;
}(Widget_1.Widget));
exports.Selector = Selector;
