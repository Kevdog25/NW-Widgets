import { Widget } from "./Widget";

export class TextCard extends Widget {
    constructor(text : string = '') {
        super();
        this.Container.innerHTML = text;
        this.Container.classList.add('card');
    }

    public setText(text : string){
        this.Container.innerHTML = text;
    }
    public getText() : string {
        return this.Container.innerHTML;
    }
}