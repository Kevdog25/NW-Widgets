import {globals} from './Globals'
import { Widget } from './Widget';
declare var nw : any;


/*
    This method establishes the typical global variables: doucment and console. 
    They are not natively available in the Node.JS server context. 
    This just gives that code access. The base class (WebElement) gives these globals to 
    all other objects.
*/
function setupGlobals(document_in : Document, console_in : Console, window_in : Window){
    globals.document = document_in;
    globals.console = console_in;
    globals.window = window_in;
}

/*
    This is the main application code. 
    This defines the behavior of the app. 
*/
export class Application extends Widget {
    constructor(document_in : Document, console_in : Console, window_in : Window) {
        setupGlobals(document_in, console_in, window_in);
        super();
    }
}

