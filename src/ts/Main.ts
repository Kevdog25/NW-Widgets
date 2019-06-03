import {Application} from './Application'
import { AutoCompleteTextArea, InputSuggestion } from './AutoCompleteTextArea';
import {nextRow} from './Utils'



export class Main extends Application {
    constructor(document_in : Document, console_in : Console) {
        super(document_in, console_in);

        let tb = new AutoCompleteTextArea('offsetter')
        this.Container.appendChild(tb.Container);
        this.Container.appendChild(nextRow());

        let ta = new AutoCompleteTextArea('ooooo spooky', [{
            Match : /\[\[(.*)(\]\])?/g,
            MatchFinder : (s : RegExpMatchArray) => {return this.getSuggestion(s)}
        }]);
        this.Container.appendChild(ta.Container);
        this.Container.style.width = '80%';
    }

    private getSuggestion(match : RegExpMatchArray) : InputSuggestion[] {
        let s = match[1];
        let filtered = this.options.filter(op => {
            return op.ReplacementString.toUpperCase().indexOf(s.toUpperCase()) >= 0;
        })
        return filtered
    }

    options : InputSuggestion[] = [
        {
            DisplayHTML : 'Jordan',
            ReplacementString : '[[Jordan]]'
        },
        {
            DisplayHTML : '<b>Kevin</b>',
            ReplacementString : '[[Kevin]]'
        },
        {
            DisplayHTML : 'Alice',
            ReplacementString : '[[Alice]]'
        },
        {
            DisplayHTML : 'Adrian',
            ReplacementString : '[[Adrian]]'
        },
        {
            DisplayHTML : 'Jordan and Matt',
            ReplacementString : '[[Jordan and Matt]]'
        },
    ]
}  


