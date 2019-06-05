import {globals} from './Globals';

/*
    This is just to grab the typically global variables
    and propogate them through all of the widgets in the 
    node.js context.
*/
export class WebElement {
    document : Document;
    console : Console;
    window : Window;

    constructor() {
        this.document = globals.document;
        this.console = globals.console;
        this.window = globals.window;
    }
}