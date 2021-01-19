import { View } from "./View";

export class HeaderView extends View<'header'> {
    constructor(id?: string, className?: string) {
        super('header', id, className);
    }
}