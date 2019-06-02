import {Widget} from './Widget';

type OnSelectCallback = (selection : string) => void;

export class Selector extends Widget {
    AllOptions : string[] = [];

    input : HTMLInputElement
    datalist : HTMLDataListElement
    selectCallbacks : OnSelectCallback[] = [];

    constructor(options : string[]) {
        super();

        this.input = this.document.createElement('input');
        this.input.type = 'text';
        this.input.setAttribute('list', 'selectorList');
        this.datalist = this.document.createElement('datalist');
        this.datalist.id = 'selectorList';
        
        this.Container.appendChild(this.input);
        this.Container.appendChild(this.datalist);

        this.SetOptions(options);

        this.input.addEventListener('change', ev => this.autoSelect())
        this.input.addEventListener('select', ev => this.onSelect())
    }

    public addSelectListener(f : OnSelectCallback) {
        this.selectCallbacks.push(f);
    }
    private onSelect(){
        this.selectCallbacks.forEach(f => {
            f(this.input.value);
        });
    }

    /*
        Given the current selection, will try to complete it 
        with the avialable optioins
    */
    private autoSelect() {
        let s : string = this.input.value.toUpperCase();
        if (s.length == 0) return;

        let found = false;
        for(let i = 0; i < this.AllOptions.length; i++){
            if (this.AllOptions[i].slice(0, s.length).toUpperCase() == s){
                this.input.value = this.AllOptions[i];
                this.onSelect();
                found = true;
                break;
            }
        }
        if (!found) this.input.value = '';
    }

    public SetOptions(options : string[]) {
        while (this.datalist.firstChild){
            this.datalist.removeChild(this.datalist.firstChild);
        }
        this.AllOptions = [];

        options.forEach(op => {
            let o = this.document.createElement('option');
            o.value = op;
            this.datalist.appendChild(o);
            this.AllOptions.push(op)
        });
        if (this.AllOptions.indexOf(this.input.value) < 0){
            this.input.value = ''
        }
    }
}