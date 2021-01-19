import { InlineTextView } from "./InlineTextView";
import { View } from "./View";

export class AssignmentView extends View<'li'> {
    private assignmentName: View<'span'>;
    private assignmentDue: View<'span'>;

    constructor(name: string, due: string, id?: string, className?: string) {
        super('li', id, 'assignment');
        if (className)
            this.el.classList.add(className);
        this.assignmentName = this
            .addChild(new InlineTextView(name, undefined, 'assignment-name'));
        this.assignmentDue = this
            .addChild(new InlineTextView(due, undefined, 'assignment-due'));
    }

}