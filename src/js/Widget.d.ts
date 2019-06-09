import { WebElement } from './WebElement';
export declare class Widget extends WebElement {
    Container: HTMLElement;
    constructor();
    SetStyles(styles: {
        [key: string]: string;
    }): void;
}
