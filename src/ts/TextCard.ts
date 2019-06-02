import {Card} from './Card'

export class TextCard extends Card {
    constructor(text : string = '') {
        super();
        this.Container.innerHTML = text;
    }

    public setText(text : string){
        this.Container.innerHTML = text;
    }
    public getText() : string {
        return this.Container.innerHTML;
    }
}