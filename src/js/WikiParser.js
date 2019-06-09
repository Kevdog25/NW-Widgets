"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Parse(raw) {
    return list(raw)
        // Bold
        .replace(/\*([^\s]?(.*)[^\s<>])\*/g, function (m, p1) {
        return '<strong>' + p1 + '</strong>';
    })
        // Italics
        .replace(/(?<!<)\/([^\s]?.*[^\s^<^>])\//g, function (m, p1) {
        return '<em>' + p1 + '</em>';
    })
        // Headings
        .replace(/^[^\S\r\n]*!.*/gm, function (m) {
        var matches = m.match(/([^\S\r\n]*!)+/);
        matches = matches[0].match(/!/g);
        m = m.replace(/^([^\S\r\n]*!)+/g, '');
        return '<h' + matches.length + '>' + m + '</h' + matches.length + '>';
    })
        // More natural breaks. Needs to be last
        .replace(/\n\n/g, function (m, p1) {
        return '<br/>';
    });
}
exports.Parse = Parse;
function list(str) {
    return str.replace(/(?:^[^\S\r\n]*\*.*\n?)+/gm, function (m) {
        if (m[m.length - 1] == '\n') {
            m = m.slice(0, m.length - 1);
        }
        return _list(m);
    });
}
function _list(str) {
    str = str.replace(/^\n/, '')
        .replace(/(^|\n)[^\S\r\n]*\*[^\S\r\n]*/g, "$1")
        .replace(/^.*/gm, function (line) {
        if (line.match(/^[^\S\r\n]*\*/)) {
            return line;
        }
        else {
            return '<li>' + line + '</li>';
        }
    });
    return '<UL>'
        + str.replace(/(?:(?:^|\n)[^\S\r\n]*\*.*)+/g, _list).replace('\n', '')
        + '</UL>';
}
//# sourceMappingURL=WikiParser.js.map