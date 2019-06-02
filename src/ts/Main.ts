import {Application} from './Application'
import { AutoCompleteTextArea } from './AutoCompleteTextArea';
import {nextRow} from './Utils'



export class Main extends Application {
    constructor(document_in : Document, console_in : Console) {
        super(document_in, console_in);

        let tb = new AutoCompleteTextArea('offsetter')
        this.Container.appendChild(tb.Container);
        this.Container.appendChild(nextRow());

        let ta = new AutoCompleteTextArea('ooooo spooky', [{
            Match : /@(.*)/g,
            MatchFinder : (s : RegExpMatchArray) => {return this.getSuggestion(s)}
        }]);
        this.Container.appendChild(ta.Container);
    }

    private getSuggestion(match : RegExpMatchArray) : string[] {
        let s = match[1];

        let filtered = this.options.filter(op => {
            return op.toUpperCase().indexOf(s.toUpperCase()) >= 0;
        })
        this.console.log('String: ' + s + ' | ' + filtered)
        return filtered
    }

    options : string[] = [
        'Jordan',
        'Kevin',
        'Alice',
        'Adrian',
        'Matt',
        'Matt and Jordan'
    ]
}  


