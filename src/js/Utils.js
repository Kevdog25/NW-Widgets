"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setStyles(element, styles) {
    Object.keys(styles).forEach(function (key) {
        element.style.setProperty(key, styles[key]);
    });
}
exports.setStyles = setStyles;
function nextRow() {
    var br = document.createElement('br');
    br.classList.add('clear');
    return br;
}
exports.nextRow = nextRow;
function extractCurrentWord(str, pos) {
    var reg = new RegExp(/[^\s]+/g);
    var match = reg.exec(str);
    var currentWord = '';
    while (match != null) {
        console.log(JSON.stringify(match));
        if (match.index <= pos && match.index + match[0].length >= pos) {
            currentWord = match[0];
            break;
        }
        match = reg.exec(str);
    }
    return currentWord;
}
exports.extractCurrentWord = extractCurrentWord;
function removeChildren(el) {
    while (el.lastChild) {
        el.removeChild(el.lastChild);
    }
}
exports.removeChildren = removeChildren;
//# sourceMappingURL=Utils.js.map