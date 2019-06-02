import {globals} from './Globals';

export class WebElement {
    document : Document;
    console : Console;

    constructor() {
        this.document = globals.document;
        this.console = globals.console;
    }
}