/**
 * Created by yuanl on 2017/3/22.
 */
import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from "@angular/core";
import {SuggestionModel} from "./suggestion.model";

@Component({
    selector: 'auto-suggestion',
    templateUrl: 'auto-suggestion.html',
    styleUrls: ['auto-suggestion.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AutoSuggestionComponent implements OnInit {
    suggestions: SuggestionModel[] = [];
    showSuggestion: boolean = false;
    hasSuggestion: boolean = false;
    selectItemText: string = '';
    selectedItemValue: string;
    private _dataSource: SuggestionModel[] = [];

    @Input()
    set keyword(value: string) {
        value = value == undefined ? '' : value.trim();
        if (this.selectItemText == value.trim()) {
            return;
        }

        this.selectItemText = value;
        this.toggleSuggestion(true);
        this.getSuggestions();
    }

    get keyword(): string {
        return this.selectItemText;
    }

    @Input()
    placeholder: string;

    /**
     * The number of list items per time. It will be ignored when {@link dataSource} is not specified.
     * @type {number}
     */
    @Input()
    listPerTime: number = 5;

    /**
     * Will auto clear input box if true.
     */
    @Input()
    autoReset: boolean = false;

    /**
     * Data source will be used to load or refresh the suggestion according to input text changing.
     * @type {SuggestionModel[]}
     */
    @Input()
    set dataSource(data: SuggestionModel[]) {
        this._dataSource = data;
        this.initSuggestions(this._dataSource);
    }

    /**
     * Suggestions will be fetched from data source, and inputChange event will not be emitted.
     * @type {boolean}
     */
    @Input()
    oneTimeBinding: boolean = false;

    @Input()
    caseSensitive: boolean = false;

    @Output()
    itemClick: EventEmitter<SuggestionModel> = new EventEmitter<SuggestionModel>();

    @Output()
    inputChange: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit() {
        this.getSuggestions();
    }

    private  initHighlight(newSuggestions: SuggestionModel[]): void {
        newSuggestions.forEach(item => {
            let text = item.text;
            if (this.keyword) {
                let matchedIndex = item.text.toLowerCase().search(this.keyword.toLowerCase());
                let matchedStr = item.text.substr(matchedIndex, this.keyword.length);
                text = item.text.replace(matchedStr, `<span>${matchedStr}</span>`);
            }

            this.suggestions.push(new SuggestionModel(item.value, item.text, text));
        });
    }

    private  getSuggestions(): void {
        if (this.oneTimeBinding) {
            let regStr = this.caseSensitive ? this.keyword : this.keyword.toLowerCase();
            this.initSuggestions(this._dataSource.filter(item => {
                let target = this.caseSensitive ? item.text : item.text.toLowerCase();
                return target.search(regStr) > -1;
            }));

            return;
        }

        if (this.inputChange) {
            this.inputChange.emit(this.selectItemText);
        }
    }

    private initSuggestions(source: SuggestionModel[]): void {
        this.suggestions = [];
        this.hasSuggestion = source && source.length > 0;
        if (!this.hasSuggestion) {
            this.suggestions.push(new SuggestionModel('0', '', '-- No matched item found --'));
            return;
        }

        let take = source.length > this.listPerTime ? this.listPerTime : source.length;
        this.initHighlight(source.slice(0, take));
    }

    toggleSuggestion(show: boolean = false): void {
        this.showSuggestion = show;
    }

    onSuggestionItemClick(selectedItem: SuggestionModel): void {
        this.toggleSuggestion();
        if (!this.hasSuggestion) {
            return;
        }

        if (this.autoReset) {
            this.selectItemText = '';
            this.selectedItemValue = '';
        } else {
            this.selectItemText = selectedItem.text;
            this.selectedItemValue = selectedItem.value;
        }

        if (this.itemClick) {
            this.itemClick.emit(selectedItem);
        }
    }
}