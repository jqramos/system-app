export class PageListModel<T> {
    private _content: Array<T> = [];
    private _totalPages: number | undefined;
    private _totalElements: number | undefined;
    private _last: boolean | undefined;
    private _size: number | undefined;
    private _number: number | undefined;
    private _numberOfElements: number | undefined;
    private _first: boolean | undefined;
    private _empty: boolean | undefined;

    get content(): Array<T> {
        return this._content;
    }

    set content(value: Array<T>) {
        this._content = value;
    }

    get totalPages(): number {
        return <number>this._totalPages;
    }

    set totalPages(value: number) {
        this._totalPages = value;
    }

    get totalElements(): number {
        return <number>this._totalElements;
    }

    set totalElements(value: number) {
        this._totalElements = value;
    }

    get last(): boolean {
        return <boolean>this._last;
    }

    set last(value: boolean) {
        this._last = value;
    }

    get size(): number {
        return <number>this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    get number(): number {
        return <number>this._number;
    }

    set number(value: number) {
        this._number = value;
    }

    get numberOfElements(): number {
        return <number>this._numberOfElements;
    }

    set numberOfElements(value: number) {
        this._numberOfElements = value;
    }

    get first(): boolean {
        return <boolean>this._first;
    }

    set first(value: boolean) {
        this._first = value;
    }

    get empty(): boolean {
        return <boolean>this._empty;
    }

    set empty(value: boolean) {
        this._empty = value;
    }
}
