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
var Utils_1 = require("./Utils");
var Utils_2 = require("./Utils");
var AutoCompleteTextArea = /** @class */ (function (_super) {
    __extends(AutoCompleteTextArea, _super);
    function AutoCompleteTextArea(ghostText, patterns) {
        if (ghostText === void 0) { ghostText = ''; }
        if (patterns === void 0) { patterns = []; }
        var _this = _super.call(this) || this;
        _this.activeSuggestions = [];
        _this.currentlySelected = null;
        _this.mouseSelection = null;
        _this.properties = [
            'direction',
            'box-sizing',
            'width',
            'height',
            'overflow-x',
            'overflow-y',
            'border-top-width',
            'border-right-width',
            'border-bottom-width',
            'border-left-width',
            'border-style',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            // https://developer.mozilla.org/en-US/docs/Web/CSS/font
            'font-style',
            'font-variant',
            'font-weight',
            'font-stretch',
            'font-size',
            'font-size-adjust',
            'line-height',
            'font-family',
            'text-align',
            'text-transform',
            'text-indent',
            'text-decoration',
            'letter-spacing',
            'word-spacing',
            'tab-size'
        ];
        _this.textArea = _this.document.createElement('TextArea');
        _this.textArea.placeholder = ghostText;
        _this.suggestionBox = _this.document.createElement('div');
        _this.suggestionBox.classList.add('dropdown', 'notransition');
        _this.Container.appendChild(_this.suggestionBox);
        _this.phantom = _this.document.createElement('div');
        _this.phantom.id = 'input-textarea-caret-position-mirror-div';
        _this.Container.appendChild(_this.phantom);
        _this.Patterns = patterns;
        _this.textArea.addEventListener('keydown', function (ev) { return _this.onKeyDown(ev); });
        _this.textArea.addEventListener('keyup', function (ev) { return _this.onKeyUp(ev); });
        _this.textArea.addEventListener('scroll', function (ev) { return _this.resize(); });
        _this.textArea.addEventListener('focus', function (ev) { setTimeout(function () { return _this.evaluateSuggestions(); }, 0); });
        _this.textArea.addEventListener('blur', function (ev) { return _this.onblur(); });
        _this.Container.appendChild(_this.textArea);
        Utils_2.setStyles(_this.Container, {
            width: '100%'
        });
        Utils_2.setStyles(_this.textArea, {
            overflow: 'hidden',
            width: '100%',
            resize: 'none'
        });
        return _this;
    }
    AutoCompleteTextArea.prototype.evaluateSuggestions = function () {
        var found = false;
        var currentWord = Utils_1.extractCurrentWord(this.textArea.value, this.textArea.selectionStart);
        for (var i = 0; i < this.Patterns.length; i++) {
            var pattern = this.Patterns[i];
            pattern.Match.lastIndex = 0;
            var match = pattern.Match.exec(currentWord);
            if (match != null && match[0].length == currentWord.length) {
                var results = pattern.MatchFinder(match);
                if (results.length > 0 &&
                    results.filter(function (r) { return r.ReplacementString == currentWord; }).length == 0) {
                    this.showSuggestions(results);
                    found = true;
                }
                break;
            }
        }
        if (!found) {
            this.hideSuggestions();
        }
    };
    AutoCompleteTextArea.prototype.showSuggestions = function (suggestions) {
        var _this = this;
        if (suggestions.length == 0)
            return;
        // Here I am storing off the replacement string for the current selected
        // suggestion. This is to maintain the users current selection even if the list changes.
        // I am not sure if its better or worse to compare the replacement strings or the 
        // display strings here. It probably doesn't matter.
        var lastSelectedString = '';
        if (this.currentlySelected) {
            lastSelectedString = this.currentlySelected.ReplacementString;
        }
        this.clearSuggestions();
        // Start at -1 here so we can tell whether or not we 
        // selected one of the new suggestions yet in the loop.
        // Default to 0 later.
        var startHighlight = -1;
        suggestions.forEach(function (s) {
            if (s.ReplacementString == lastSelectedString && startHighlight < 0)
                startHighlight = _this.activeSuggestions.length;
            var el = _this.document.createElement('div'), suggestion = {
                ReplacementString: s.ReplacementString,
                Div: el
            };
            el.innerHTML = s.DisplayHTML;
            el.classList.add('selectable');
            el.onmouseover = function (ev) {
                _this.mouseSelection = suggestion;
            };
            _this.activeSuggestions.push(suggestion);
            _this.suggestionBox.appendChild(el);
        });
        this.placeSuggestionPopup();
        startHighlight = Math.max(startHighlight, 0);
        this.highlightSuggestion(this.activeSuggestions[startHighlight]);
    };
    AutoCompleteTextArea.prototype.placeSuggestionPopup = function () {
        var currentWord = Utils_1.extractCurrentWord(this.textArea.value, this.textArea.selectionStart);
        var startPos = this.textArea.value.indexOf(currentWord, this.textArea.selectionStart - currentWord.length);
        var coords = this.getCoordinates(startPos);
        var s = window.getComputedStyle(this.textArea);
        var lineHeight = parseInt(s.lineHeight || '0');
        if (isNaN(lineHeight)) {
            lineHeight = parseInt(s.fontSize || '0');
        }
        this.suggestionBox.style.left = coords.left + 'px';
        this.suggestionBox.style.top = (coords.top + lineHeight + 3) + 'px';
        this.suggestionBox.style.visibility = 'visible';
    };
    AutoCompleteTextArea.prototype.hideSuggestions = function () {
        this.suggestionBox.style.visibility = 'hidden';
        this.clearSuggestions();
    };
    AutoCompleteTextArea.prototype.onblur = function () {
        // If we lose focus to one of our suggestions, 
        // assume its becasue it was clicked and grab the focus back.
        if (this.mouseSelection) {
            this.highlightSuggestion(this.mouseSelection);
            this.applySelection();
            this.textArea.focus();
        }
    };
    AutoCompleteTextArea.prototype.resize = function (ev) {
        if (ev === void 0) { ev = null; }
        var el = this.textArea;
        el.style.height = '1px';
        el.scrollTop = 1;
        el.style.height = (el.scrollHeight - el.clientHeight + parseInt(el.style.height)) + 'px';
    };
    AutoCompleteTextArea.prototype.onKeyDown = function (ev) {
        if (this.currentlySelected) {
            // If we have a drop down showing, redirect certain commands to 
            // affect the popup instead.
            switch (ev.keyCode) {
                case 38: { // Up
                    this.rotateSelection(-1);
                    ev.preventDefault();
                    return;
                }
                case 40: { // Down
                    this.rotateSelection(1);
                    ev.preventDefault();
                    return;
                }
                case 13: { // Enter
                    this.applySelection();
                    ev.preventDefault();
                }
                case 9: { // Tab
                    this.applySelection();
                    ev.preventDefault();
                }
                default: {
                    break;
                }
            }
        }
    };
    AutoCompleteTextArea.prototype.onKeyUp = function (ev) {
        // If we are already handling these keys, ignore them on the upstroke.
        if (this.suggestionsVisible() &&
            (ev.keyCode == 38 || ev.keyCode == 40 || ev.keyCode == 13 || ev.keyCode == 9)) {
            return;
        }
        // Keys that hide suggestions - 
        if (ev.keyCode == 27 || ev.keyCode == 8) {
            this.hideSuggestions();
            return;
        }
        // If they aren't useful for autocomplete, just forget it.
        // If they are above the normal chars, then ignore it.
        // Also shift, alt, ctrl capslock
        if (ev.keyCode > 90 && ev.keyCode < 186 ||
            (ev.keyCode == 16 || ev.keyCode == 17 || ev.keyCode == 18 || ev.keyCode == 20)) {
            return;
        }
        this.evaluateSuggestions();
    };
    AutoCompleteTextArea.prototype.rotateSelection = function (dir) {
        if (!this.currentlySelected)
            return;
        var next = this.activeSuggestions.indexOf(this.currentlySelected) + dir;
        next = Math.max(Math.min(next, this.activeSuggestions.length - 1), 0);
        this.currentlySelected.Div.classList.remove('highlighted');
        this.highlightSuggestion(this.activeSuggestions[next]);
    };
    AutoCompleteTextArea.prototype.highlightSuggestion = function (s) {
        if (!this.suggestionsVisible())
            return;
        s.Div.classList.add('highlighted');
        this.currentlySelected = s;
    };
    AutoCompleteTextArea.prototype.clearSuggestions = function () {
        Utils_1.removeChildren(this.suggestionBox);
        this.activeSuggestions = [];
        this.currentlySelected = null;
        this.mouseSelection = null;
    };
    AutoCompleteTextArea.prototype.suggestionsVisible = function () {
        return this.suggestionBox.style.display != 'none';
    };
    AutoCompleteTextArea.prototype.applySelection = function () {
        if (!this.currentlySelected)
            return;
        var s = this.currentlySelected.ReplacementString, pos = this.textArea.selectionStart, text = this.textArea.value;
        var currentWord = Utils_1.extractCurrentWord(text, pos);
        var startPos = text.indexOf(currentWord, pos - currentWord.length), endPos = startPos + currentWord.length;
        this.textArea.value = text.slice(0, startPos) + s + text.slice(endPos, text.length);
        this.textArea.selectionStart = startPos + s.length;
        this.textArea.selectionEnd = startPos + s.length;
        this.hideSuggestions();
    };
    /*

    General strategy here -
    Create a div with all of the same styles as the textArea.
    Hide it, and all but the last character of text in it.
    Then put a span on the end that holds the last written char.
    Use position of span to figure out position of cursor.

    The following function was mostly swiped from a standalone package.
    ----
    The MIT License (MIT)

    Copyright (c) 2015 Jonathan Ong me@jongleberry.com

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software
    and associated documentation files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or
    substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
    BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
    */
    AutoCompleteTextArea.prototype.getCoordinates = function (position) {
        var el = this.textArea;
        Utils_1.removeChildren(this.phantom);
        var div = this.phantom;
        var style = div.style;
        var computed = window.getComputedStyle ? window.getComputedStyle(el) : el.style; // currentStyle for IE < 9
        // Default textarea styles
        style.whiteSpace = 'pre-wrap';
        style.wordWrap = 'break-word';
        // Position off-screen
        style.position = 'absolute'; // required to return coordinates properly
        style.visibility = 'hidden'; // not 'display: none' because we want rendering
        // Transfer the element's properties to the div
        this.properties.forEach(function (prop) {
            style.setProperty(prop, computed.getPropertyValue(prop));
        });
        style.overflow = 'hidden';
        div.textContent = el.value.substring(0, position);
        var span = this.document.createElement('span');
        // Wrapping must be replicated *exactly*, including when a long word gets
        // onto the next line, with whitespace at the end of the line before (#7).
        // The  *only* reliable way to do that is to copy the *entire* rest of the
        // textarea's content into the <span> created at the caret position.
        // For inputs, just '.' would be enough, but no need to bother.
        span.textContent = el.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
        div.appendChild(span);
        var offSetRect = el.getBoundingClientRect();
        var coordinates = {
            top: span.offsetTop + offSetRect.top,
            left: span.offsetLeft + offSetRect.left,
            height: parseInt(computed.lineHeight || '0')
        };
        return coordinates;
    };
    ;
    return AutoCompleteTextArea;
}(Widget_1.Widget));
exports.AutoCompleteTextArea = AutoCompleteTextArea;
