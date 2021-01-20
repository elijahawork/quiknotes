import { View } from "./View";

export class Caret extends View<'div'> {
    constructor() {
        super('div', undefined, 'caret');
        this.attachToHTMLElement(document.body);
    }
    public moveTo(x: number, y: number) {
        this.el.style.left = `${x}px`;
        this.el.style.top = `${y}px`;
    }
}