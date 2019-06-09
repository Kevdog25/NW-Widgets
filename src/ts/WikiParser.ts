export function Parse(raw : string) : string {
    return list(raw)
        // Bold
        .replace(/\*([^\s]?(.*)[^\s<>])\*/g, (m, p1) : string => {
            return '<strong>' + p1 + '</strong>'
        })
        // Italics
        .replace(/(?<!<)\/([^\s]?.*[^\s^<^>])\//g, (m, p1) : string => {
            return '<em>' + p1 + '</em>'
        })
        // Headings
        .replace(/^[^\S\r\n]*!.*/gm, (m) : string => {
            let matches = m.match(/([^\S\r\n]*!)+/)!;
            matches = matches[0].match(/!/g)!;
            m = m.replace(/^([^\S\r\n]*!)+/g, '');
            return '<h' + matches.length + '>' + m + '</h' + matches.length + '>';
        })
        // More natural breaks. Needs to be last
         .replace(/\n\n/g, (m, p1) : string => {
             return '<br/>'
        })
}

function list(str : string) : string {
    return str.replace(/(?:^[^\S\r\n]*\*.*\n?)+/gm, (m) => {
        if (m[m.length-1] == '\n'){
            m = m.slice(0, m.length - 1)
        }
        return _list(m);
    });
}

function _list(str : string) : string {
    str = str.replace(/^\n/, '')
            .replace(/(^|\n)[^\S\r\n]*\*[^\S\r\n]*/g, "$1")
            .replace(/^.*/gm, (line) => {
        if (line.match(/^[^\S\r\n]*\*/)){
            return line;
        } else {
            return '<li>' + line + '</li>';
        }
    });
    return '<UL>' 
            + str.replace(/(?:(?:^|\n)[^\S\r\n]*\*.*)+/g, _list).replace('\n', '')
            + '</UL>';
}