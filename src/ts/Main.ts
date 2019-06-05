import {Application} from './Application'
import { AutoCompleteTextArea, InputSuggestion } from './AutoCompleteTextArea'

//import tingo = require('tingodb');


export class Main extends Application {
    constructor(document_in : Document, console_in : Console) {
        super(document_in, console_in);

        let ta = new AutoCompleteTextArea('', [
            {
                Match : /\[\[(.*)(\]\])?/,
                MatchFinder : (reg) => this.getSuggestions(reg)
            }
        ])

        this.Container.appendChild(ta.Container);
    }


    private getSuggestions(reg : RegExpMatchArray) : InputSuggestion[]{
        let inputName = reg[1]
        let validNames = this.names.filter((name) => {
            return name.toUpperCase().indexOf(inputName.toUpperCase()) >= 0;
        })
        let suggestions : InputSuggestion[] = []
        validNames.forEach(name => {
            suggestions.push({
                DisplayHTML : name,
                ReplacementString : '[[' + name + ']]'
            })
        });
        return suggestions
    }

    names = [
        'Kevin',
        'Kyle',
        'Adrian',
        'Alice',
        'Jordan'
    ]



}  


