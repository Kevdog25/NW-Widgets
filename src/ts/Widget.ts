import {WebElement} from './WebElement';

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
}