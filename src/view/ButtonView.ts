import { View } from "./View";

export class ButtonView extends View<'button'> {
    constructor(id?: string, className?: string) {
        super('button', id, className);
    }
}