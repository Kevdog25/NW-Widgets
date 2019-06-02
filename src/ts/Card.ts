import {setStyles} from './Utils';
import {Widget} from './Widget';

export class Card extends Widget {
    constructor() {
        super();
        this.Container.classList.add(
            'card',
            'container'
        );
    }
}