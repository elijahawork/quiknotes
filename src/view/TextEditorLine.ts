import { View } from "./View";

export class TextEditorLine extends View<'div'> {
    get text() {
        return this.el.textContent!;
    }
    get length() {
        return this.text.length;
    }
    constructor(text: string, id?: string) {
        super('div', id, 'text-editor-line')
        this.el.textContent = text;
    }
}