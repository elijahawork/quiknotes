import { ButtonView } from "./ButtonView";
import { InlineTextView } from "./InlineTextView";

export class AddButtonView extends ButtonView {
    constructor(id?: string, className?: string) {
        super(id, className);
        this.addChild(new InlineTextView('+'));
    }
}