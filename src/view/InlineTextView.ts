import { View } from "./View";

export class InlineTextView extends View<'span'> {
    set text(text: string) {
        this.el.textContent = text;
    }
    get text(): string {
        return this.el.textContent!;
    }
    constructor(text: string, id?: string, className?: string) {
        super('span', id, className);
        this.text = text;
    }
} 