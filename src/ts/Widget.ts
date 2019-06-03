import {WebElement} from './WebElement';
import { setStyles } from './Utils';

/*
    All a Widget is is an object associated with a div
    somewhere in the document.
*/
export class Widget extends WebElement{
    Container : HTMLElement;
    constructor() {
        super();
        this.Container = this.document.createElement('div');
        this.Container.classList.add(
            'k-widget'
        );
    }

    /*
        Overrides default styles for this widget's container.
    */
    public SetStyles(styles : {[key : string] : string}) {
        setStyles(this.Container, styles);
    }

}