import {Widget} from './Widget'
import {extractCurrentWord, removeChildren} from './Utils'

type MatchFinder = (current : RegExpMatchArray) => string[]
export interface AutoCompletePattern {
    Match : RegExp
    MatchFinder : MatchFinder
}

export class AutoCompleteTextArea extends Widget {

    Patterns : AutoCompletePattern[];
    textArea : HTMLTextAreaElement;

    suggestionBox : HTMLElement;

    phantom : HTMLDivElement;

    activeSuggestions : HTMLSpanElement[] = [];
    currentlySelected : number = -1;

    constructor(ghostText : string = '', patterns : AutoCompletePattern[] = []) {
        super();

        this.textArea = this.document.createElement('TextArea') as HTMLTextAreaElement;
        this.textArea.placeholder = ghostText;

        this.suggestionBox = this.document.createElement('div');
        this.suggestionBox.classList.add(
            'dropdown',
            'notransition'
        );
        this.Container.appendChild(this.suggestionBox);

        this.phantom = this.document.createElement('div');
        this.phantom.id = 'input-textarea-caret-position-mirror-div';
        this.Container.appendChild(this.phantom);

        this.Patterns = patterns;
        this.textArea.addEventListener('keydown', (ev) => this.onKeyDown(ev));
        this.textArea.addEventListener('keyup', (ev) => this.onKeyUp(ev));
        this.textArea.addEventListener('scroll', (ev) => this.resize());
        this.textArea.style.overflow = 'hidden';
        this.Container.appendChild(this.textArea)
    }

    private resize(ev: KeyboardEvent | null = null) {
        let el = this.textArea;
        el.style.height = '1px';
        el.scrollTop = 1;
        el.style.height = (el.scrollHeight - el.clientHeight + parseInt(el.style.height)) + 'px';
    }

    private onKeyDown(ev : KeyboardEvent) {
        if (this.suggestionsVisible()) {
            // If we have a drop down showing, redirect certain commands to 
            // affect the popup instead.
            switch (ev.keyCode) {
                case 38: { // Up
                    this.highlightSuggestion(this.currentlySelected - 1);
                    ev.preventDefault();
                    return
                }
                case 40: { // Down
                    this.highlightSuggestion(this.currentlySelected + 1);
                    ev.preventDefault();
                    return
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
    }

    private onKeyUp(ev : KeyboardEvent) {

        // If we are already handling these keys, ignore them on the upstroke.
        if (this.suggestionsVisible() && 
            (ev.keyCode == 38 || ev.keyCode == 40 || ev.keyCode == 13 || ev.keyCode == 9)) {
                return
        }

        // Keys that hide suggestions - 
        if (ev.keyCode == 27) {
            this.hideSuggestions();
        }

        // If they aren't useful for autocomplete, just forget it.
        // If they are above the normal chars, then ignore it.
        // Also shift, alt, ctrl capslock
        if (ev.keyCode > 90 && ev.keyCode < 186 || 
            (ev.keyCode == 16 || ev.keyCode == 17 || ev.keyCode == 18 || ev.keyCode == 20)) {
                return
        }

        let found = false;
        let currentWord = extractCurrentWord(this.textArea.value, this.textArea.selectionStart);
        for (let i = 0; i < this.Patterns.length; i++) {
            let pattern = this.Patterns[i];
            pattern.Match.lastIndex = 0;
            let match = pattern.Match.exec(currentWord);
            if (match != null && match[0].length == currentWord.length) {
                let results = pattern.MatchFinder(match)
                if (results.length > 0) {
                    this.showSuggestions(results);
                    found = true;
                }
                break;
            }
        }

        if (!found) {
            this.hideSuggestions();
        }
    }

    private showSuggestions(suggestions : string[]) {
        let lastSelectedString = ''
        if (this.suggestionsVisible()) {
            lastSelectedString = this.activeSuggestions[this.currentlySelected].innerText;
        }

        this.clearSuggestions();

        let startHighlight = 0;
        suggestions.forEach(s => {
            if (s == lastSelectedString) startHighlight = this.activeSuggestions.length;
            let el = this.document.createElement('span');
            el.innerText = s;
            el.classList.add('selectable');
            el.onclick = (ev) => {
                this.currentlySelected = this.activeSuggestions.indexOf(el);
                this.applySelection();
                this.textArea.focus();
            }
            this.activeSuggestions.push(el)
            this.suggestionBox.appendChild(el);
            this.suggestionBox.appendChild(this.document.createElement('br'));
        });
        this.placeSuggestionPopup();
        this.highlightSuggestion(startHighlight);
    }

    private placeSuggestionPopup() {
        let currentWord = extractCurrentWord(this.textArea.value, this.textArea.selectionStart);
        let startPos = this.textArea.value.indexOf(currentWord, this.textArea.selectionStart - currentWord.length)
        let coords = this.getCoordinates(startPos);

        let s = window.getComputedStyle(this.textArea);
        let lineHeight = parseInt(s.lineHeight || '0');
        if (isNaN(lineHeight)){
            lineHeight = parseInt(s.fontSize || '0');
        }
        this.suggestionBox.style.left = coords.left + 'px';
        this.suggestionBox.style.top = (coords.top + lineHeight + 3) + 'px';
        this.suggestionBox.style.display = 'inline-block';
    }

    private highlightSuggestion(next : number){
        if (!this.suggestionsVisible()) return

        this.activeSuggestions[this.currentlySelected].classList.remove('highlighted');
        next = Math.max(Math.min(next, this.activeSuggestions.length-1), 0);
        this.activeSuggestions[next].classList.add('highlighted');
        this.currentlySelected = next;
    }

    private hideSuggestions() {
        this.suggestionBox.style.display = 'none';
        this.clearSuggestions();
    }

    private clearSuggestions() {
        removeChildren(this.suggestionBox);
        this.activeSuggestions = []
        this.currentlySelected = -1;
    }

    private suggestionsVisible() : boolean {
        return this.currentlySelected >= 0;
    }

    private applySelection() {
        if (!this.suggestionsVisible()) return
        let s = this.activeSuggestions[this.currentlySelected].innerText,
            pos = this.textArea.selectionStart,
            text = this.textArea.value
        let currentWord = extractCurrentWord(text, pos);
        let startPos = text.indexOf(currentWord, pos - currentWord.length),
            endPos = startPos + currentWord.length
        this.textArea.value = text.slice(0, startPos) + s + text.slice(endPos, text.length)
        this.textArea.selectionStart = startPos + s.length;
        this.textArea.selectionEnd = startPos + s.length;
        this.hideSuggestions();
    }
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
    private getCoordinates(position : number){
        let el = this.textArea

        removeChildren(this.phantom);
        let div = this.phantom

        var style = div.style;
        var computed = window.getComputedStyle ? window.getComputedStyle(el) : el.style;  // currentStyle for IE < 9

        // Default textarea styles
        style.whiteSpace = 'pre-wrap';
        style.wordWrap = 'break-word'; 

        // Position off-screen
        style.position = 'absolute';  // required to return coordinates properly
        style.visibility = 'hidden';  // not 'display: none' because we want rendering

        // Transfer the element's properties to the div
        this.properties.forEach( prop =>{
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
        span.textContent = el.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
        div.appendChild(span);


        let offSetRect = el.getBoundingClientRect();
        var coordinates = {
            top: span.offsetTop + offSetRect.top,
            left: span.offsetLeft + offSetRect.left,
            height: parseInt(computed.lineHeight || '0')
        };

        return coordinates;
    };

    properties : string[] = [
        'direction',  // RTL support
        'box-sizing',
        'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
        'height',
        'overflow-x',
        'overflow-y',  // copy the scrollbar for IE
      
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
        'text-decoration',  // might not make a difference, but better be safe
      
        'letter-spacing',
        'word-spacing',
      
        'tab-size'
      ];

}