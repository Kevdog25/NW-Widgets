import {Card} from './Card';
var fs = require('fs');

export class FileDisplayerCard extends Card {
    constructor() {
        super();

        fs.readdir('.', (error : any, files: any) => {
            files.forEach((file : any)  => {
                let el = document.createElement('span')
                el.innerHTML = file;
                this.Container.appendChild(el);
                this.Container.appendChild(document.createElement('br'));
            });
        })
    }
}