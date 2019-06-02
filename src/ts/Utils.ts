export function setStyles(element : HTMLElement, styles : {[key : string] : string}) {
    Object.keys(styles).forEach(key => {
        element.style.setProperty(key, styles[key]);
    });
}

export function nextRow() : HTMLBRElement {
    let br = document.createElement('br');
    br.classList.add('clear');
    return br
}

export function extractCurrentWord(str : string, pos : number) : string {
    let reg = new RegExp(/[^\s]+/g)
    let match = reg.exec(str);
    let currentWord = '';
    while (match != null) {
        console.log(JSON.stringify(match))
        if (match.index <= pos && match.index + match[0].length >= pos){
            currentWord = match[0];
            break;
        }
        match = reg.exec(str);
    }
    return currentWord
}


export function removeChildren(el : HTMLElement) {
    while(el.lastChild){
        el.removeChild(el.lastChild);
    }
}