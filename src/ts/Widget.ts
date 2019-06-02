import {WebElement} from './WebElement';

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