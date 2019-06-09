import { Widget } from './Widget';
declare type OnSelectCallback = (selection: string) => void;
export declare class Selector extends Widget {
    AllOptions: string[];
    input: HTMLInputElement;
    datalist: HTMLDataListElement;
    selectCallbacks: OnSelectCallback[];
    constructor(options: string[]);
    addSelectListener(f: OnSelectCallback): void;
    private onSelect;
    private autoSelect;
    SetOptions(options: string[]): void;
}
export {};
