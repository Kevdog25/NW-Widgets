import { Widget } from './Widget';
declare type MatchFinder = (current: RegExpMatchArray) => InputSuggestion[];
export interface InputSuggestion {
    ReplacementString: string;
    DisplayHTML: string;
}
export interface AutoCompletePattern {
    Match: RegExp;
    MatchFinder: MatchFinder;
}
interface Suggestion {
    ReplacementString: string;
    Div: HTMLDivElement;
}
export declare class AutoCompleteTextArea extends Widget {
    Patterns: AutoCompletePattern[];
    textArea: HTMLTextAreaElement;
    suggestionBox: HTMLElement;
    phantom: HTMLDivElement;
    activeSuggestions: Suggestion[];
    currentlySelected: Suggestion | null;
    mouseSelection: Suggestion | null;
    constructor(ghostText?: string, patterns?: AutoCompletePattern[]);
    private evaluateSuggestions;
    private showSuggestions;
    private placeSuggestionPopup;
    private hideSuggestions;
    private onblur;
    private resize;
    private onKeyDown;
    private onKeyUp;
    private rotateSelection;
    private highlightSuggestion;
    private clearSuggestions;
    private suggestionsVisible;
    private applySelection;
    private getCoordinates;
    properties: string[];
}
export {};
